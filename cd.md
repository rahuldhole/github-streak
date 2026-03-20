# Cloudflare Workers
1. Create a GitHub classic token with `user:read` permissions.
2. Add the token:
   ```bash
   npx wrangler secret put GITHUB_TOKEN
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

# Netlify
1. Create a GitHub classic token with `user:read` permissions.
2. Add `GITHUB_TOKEN` to environment variables in the Netlify UI.
3. Deploy (automatic on push) or manually:
   ```bash
   npx netlify deploy --prod
   ```