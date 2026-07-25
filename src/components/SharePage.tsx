/** @jsxImportSource hono/jsx */
import { html } from 'hono/html'

export function SharePage({ origin, user, theme }: { origin: string, user: string, theme: string }) {
  const title = `${user}'s GitHub Streak`
  const description = `Check out ${user}'s GitHub contribution streak! Generated with GitHub Streak Widget.`
  const imageUrl = `${origin}/share-svg/${user}?theme=${theme}`
  const ogImageUrl = `${origin}/.netlify/images?url=${encodeURIComponent(`/share-svg/${user}?theme=${theme}`)}&fm=png&w=1200&h=630&fit=cover`
  const pageUrl = `${origin}/share/${user}`

  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={ogImageUrl} />
          <link rel="canonical" href={pageUrl} />
          <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>" />
          <style>
            {html`
            :root { --bg: #ffffff; --text: #1a1a1a; --muted: #666666; --border: #e1e4e8; --accent: #2c974b; --error: #d73a49; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); line-height: 1.5; margin: 0; padding: 1rem; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; min-height: 100vh; justify-content: center; }
            .container { width: 100%; max-width: 800px; text-align: center; }
            h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; text-align: center; }
            p { color: var(--muted); text-align: center; margin-bottom: 2rem; font-size: 1.1rem; }
            .preview-container { border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; background: #f6f8fa; margin-bottom: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .preview-img { max-width: 100%; height: auto; }
            .btn { display: inline-flex; align-items: center; justify-content: center; padding: 0.75rem 1.5rem; background: var(--text); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 1rem; text-decoration: none; transition: background 0.2s; margin-top: 1rem; }
            .btn:hover { background: #333; }
            .footer { margin-top: 3rem; font-size: 0.85rem; color: var(--muted); }
            .footer a { color: inherit; text-decoration: underline; }
            `}
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🔥 {user}'s GitHub Streak</h1>
            <p>Check out this awesome contribution streak!</p>
            
            <div class="preview-container">
              <img 
                src={imageUrl} 
                alt={`${user}'s GitHub Streak`} 
                class="preview-img"
              />
            </div>

            <a href="/" class="btn">Create Your Own Widget</a>

            <div class="footer">
              Built with ❤️ | <a href="https://github.com/rahuldhole/github-streak" target="_blank">GitHub Repository</a>
            </div>
          </div>
        </body>
      </html>
    </>
  )
}
