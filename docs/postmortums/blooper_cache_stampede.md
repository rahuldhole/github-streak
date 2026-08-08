# Blooper: Cache Stampede (Thundering Herd)

**The Bug:** GitHub API rate limits were being exhausted rapidly. Production logs showed duplicate `github_api_fetch` calls firing simultaneously or within seconds of each other.

**The Cause:** When our 5-minute background cache TTL expired, multiple concurrent requests to the SVG endpoint would independently evaluate the cache as "stale." Because the background refresh logic (`refreshUserData` running inside a non-blocking `waitUntil`) took a second or two to fetch data from GitHub and update the cache timestamp in the Netlify Blob store, every request arriving during that small window triggered a duplicate background fetch. This was exacerbated by eventual consistency across Netlify's edge regions, where nodes might take a few extra seconds to see the updated timestamp, creating a localized thundering herd.

**The Fix:** Added an optimistic cache timestamp update. Now, when a request detects a stale cache and decides to initiate the background fetch, it immediately writes an updated `timestamp` to the Netlify Blob store *before* starting the GitHub API call. This acts as a soft lock. Within the same edge region, it immediately prevents concurrent requests from duplicating the fetch. Across different regions, while there is still a tiny window where eventual consistency might cause a duplicate fetch (e.g., if a request hits Tokyo milliseconds after one hits New York), this drastically reduces the stampede from dozens of duplicate requests down to a maximum of 2 or 3, successfully protecting our GitHub API rate limits.

**Limitations:**
- Because Netlify Blobs are eventually consistent across global regions, there is still a tiny window (a few hundred milliseconds) where a request hitting a different region might not see the optimistic timestamp update and trigger a duplicate fetch. This means the stampede is mitigated (e.g., from 20 duplicate fetches down to 2 or 3) but not completely eliminated.
- If the background `refreshUserData` fetch fails or errors out, the optimistic timestamp remains in the cache, meaning the app won't retry the fetch until the next 5-minute TTL expires. For this application, this is an acceptable tradeoff to avoid rate-limit exhaustion.

**Future Steps:**
- Monitor production logs to see if the rate of duplicate fetches drops as expected.
- If cross-region cache stampedes still pose a threat to our rate limit in the future, we could consider migrating to a strongly consistent centralized store (like Redis/Upstash), though this would add infrastructure complexity and latency.
