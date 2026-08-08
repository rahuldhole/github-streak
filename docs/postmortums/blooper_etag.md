# Blooper: ETag vs GraphQL

**The Bug:** Private commits weren't updating the streak graph, even after 10 minutes.
**The Cause:** We tried to save GraphQL API limits by first checking the REST API (`/events/public`) with a `HEAD` request and an `If-None-Match` ETag. If it returned `304 Not Modified`, we skipped the GraphQL fetch entirely. 
**The Catch:** The public events API doesn't track *private* commits! Also, GraphQL (which uses `POST`) doesn't support ETags natively. This meant private commits never changed the REST ETag, and thus never triggered a GraphQL update.
**The Fix:** Removed the flawed `HEAD` proxy check. We now rely entirely on the 5-minute background refresh to directly fetch the GraphQL calendar, ensuring all commits (public and private) are accurately counted.
