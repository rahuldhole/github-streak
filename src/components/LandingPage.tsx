/** @jsxImportSource hono/jsx */
import { html } from 'hono/html'
import pkg from '../../package.json' with { type: 'json' }

export function LandingPage({ origin = '', cacheInfo }: { origin?: string, cacheInfo?: any }) {
  const initialUser = ''
  const fastMins = cacheInfo?.fast || 5
  const slowMins = cacheInfo?.slow || 60
  const camoSecs = cacheInfo?.camo !== undefined ? cacheInfo.camo : 120
  const initialTheme = 'dark'
  const version = pkg.version
  const sampleUrl = `${origin}/sample.svg?theme=${initialTheme}&v=${version}`
  const escapedHtmlSampleUrl = sampleUrl.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
  const escapedHtml = `<img src="${escapedHtmlSampleUrl}" alt="GitHub Streak" />`
  const escapedMarkdown = `![GitHub Streak](${escapedHtmlSampleUrl})`


  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>GitHub Streak | Streak Widget Generator</title>
          <meta name="description" content="Generate a Duolingo-inspired GitHub streak widget for your profile README. Track your daily contributions and share your streak." />
          <meta property="og:title" content="GitHub Streak | Streak Widget Generator" />
          <meta property="og:description" content="Generate a Duolingo-inspired GitHub streak widget for your profile README. Track your daily contributions and share your streak." />
          <meta property="og:image" content={`${origin}/og.png`} />
          <meta property="og:url" content={origin} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="GitHub Streak | Streak Widget Generator" />
          <meta name="twitter:description" content="Generate a Duolingo-inspired GitHub streak widget for your profile README." />
          <meta name="twitter:image" content={`${origin}/og.png`} />
          <link rel="canonical" href={origin} />
          <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>" />
          <style>
            {html`
            :root { --bg: #ffffff; --text: #1a1a1a; --muted: #666666; --border: #e1e4e8; --accent: #2c974b; --error: #d73a49; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); line-height: 1.5; margin: 0; padding: 1rem; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; min-height: 100vh; }
            .container { width: 100%; max-width: 600px; }
            h1 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; text-align: center; }
            p { color: var(--muted); text-align: center; margin-bottom: 2rem; font-size: 0.9rem; }
            .card { border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            .form-group { margin-bottom: 1.5rem; }
            label { display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--muted); margin-bottom: 0.5rem; }
            .input-group { display: flex; gap: 0.5rem; }
            input { flex: 1; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-width: 0; }
            .generate-btn { padding: 0.75rem 1.25rem; background: var(--text); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem; white-space: nowrap; }
            .generate-btn:hover { background: #333; }
            .themes { display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
            .themes button { flex: 1; padding: 0.5rem; border: 1px solid var(--border); background: white; border-radius: 6px; cursor: pointer; font-size: 0.8rem; min-width: 80px; }
            .themes button.active { background: var(--text); color: white; border-color: var(--text); }
            .preview-container { position: relative; display: flex; justify-content: center; align-items: center; border: 1px solid var(--border); border-radius: 8px; padding: 1rem; background: #f6f8fa; margin-top: 1rem; min-height: 120px; overflow: hidden; }
            .preview-img { max-width: 100%; height: auto; transition: opacity 0.3s ease; }
            .loading-overlay { display: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(246, 248, 250, 0.8); display: none; flex-direction: column; justify-content: center; align-items: center; z-index: 10; font-size: 0.8rem; font-weight: 500; color: var(--text); }
            .loading-msg { margin-top: 0.5rem; color: var(--muted); font-size: 0.7rem; max-width: 250px; text-align: center; line-height: 1.4; }
            .error-banner { display: none; background: #fff5f5; border: 1px solid #feb2b2; color: #c53030; padding: 0.75rem; border-radius: 6px; font-size: 0.8rem; margin-top: 1rem; text-align: center; }
            .error-banner a { color: #c53030; font-weight: 600; text-decoration: underline; }
            .code-box { position: relative; margin-top: 1.5rem; }
            pre { background: #f6f8fa; padding: 1rem; border-radius: 6px; font-size: 0.8rem; overflow-x: auto; margin: 0; color: #24292e; border: 1px solid var(--border); }
            .copy-btn { position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.4rem 0.8rem; border: 1px solid var(--border); background: white; border-radius: 4px; font-size: 0.7rem; cursor: pointer; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
            .copy-btn:active { background: #f3f4f6; }
            .share-section { display: none; margin-top: 1.5rem; text-align: center; }
            .share-section.active { display: block; }
            .share-buttons { display: flex; gap: 0.5rem; justify-content: center; margin-top: 0.5rem; }
            .share-btn { padding: 0.35rem 0.6rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; text-decoration: none; color: white; display: inline-flex; align-items: center; gap: 0.3rem; border: none; cursor: pointer; font-family: inherit; }
            .share-btn.copy { background: var(--muted); }
            .share-btn.x { background: #000000; }
            .share-btn.linkedin { background: #0a66c2; }
            .share-btn.native { background: var(--accent); }
            .footer { margin-top: 2rem; font-size: 0.75rem; color: var(--muted); text-align: center; }
            .footer a { color: inherit; text-decoration: none; border-bottom: 1px solid var(--border); }

            @media (max-width: 480px) {
              body { padding: 1rem 0.5rem; }
              .input-group { flex-direction: column; }
              .generate-btn { width: 100%; }
              .card { padding: 1rem; border-radius: 8px; }
              .themes button { font-size: 0.75rem; padding: 0.4rem; }
              .desktop-only { display: none; }
            }
            `}
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style={{ marginBottom: '0.5rem' }}>🔥 GitHub Streak</h1>
            <p style={{ marginBottom: '1.25rem' }}>Generate a Duolingo-inspired GitHub streak widget for your profile.</p>
            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="https://github.com/rahuldhole/github-streak/releases" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', height: '32px', padding: '0 0.6rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: '#f6f8fa', fontSize: '0.75rem', fontWeight: '600', color: 'var(--muted)', textDecoration: 'none', boxSizing: 'border-box' }}>
                v{version}
              </a>
              

              <a href="https://github.com/rahuldhole/github-streak" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', height: '32px', padding: '0 0.75rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: '#f6f8fa', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text)', textDecoration: 'none', boxSizing: 'border-box', gap: '0.4rem' }}>
                <svg height="16" viewBox="0 0 16 16" width="16" style={{ fill: 'currentColor' }}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                View on GitHub
              </a>

              <a href="https://github.com/rahuldhole/github-streak" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', height: '32px', padding: '0 0.75rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: '#f6f8fa', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text)', textDecoration: 'none', boxSizing: 'border-box', gap: '0.4rem' }}>
                <svg height="16" viewBox="0 0 16 16" width="16" style={{ fill: '#eac54f' }}><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path></svg>
                Star
                <span id="star-count" style={{ color: 'var(--muted)', fontWeight: '400', fontSize: '0.8rem' }}></span>
              </a>

              <iframe src="https://github.com/sponsors/rahuldhole/button" title="Sponsor rahuldhole" height="32" width="114" style={{ border: 0, borderRadius: '6px' }}></iframe>
            </div>
            
            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginBottom: '2.5rem', alignItems: 'center', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text)' }}>
              <span style={{ fontWeight: '600' }}>Browser Extension:</span>
              <a href="https://chromewebstore.google.com/detail/github-streak/nabgmpdcbbjmjcmnbbjcfaofkclolbdm" target="_blank" style={{ color: '#ffab00', textDecoration: 'none', fontWeight: '600' }}>Chrome</a>
              <span style={{ color: 'var(--border)' }}>|</span>
              <a href="https://addons.mozilla.org/en-US/firefox/addon/github-streak-extension/" target="_blank" style={{ color: '#ffab00', textDecoration: 'none', fontWeight: '600' }}>Firefox</a>
              <span style={{ color: 'var(--border)' }}>|</span>
              <a href="https://microsoftedge.microsoft.com/addons/detail/githubstreakextension/pfnpbclbamfpfcmcnlkdamabjkddibja" target="_blank" style={{ color: '#ffab00', textDecoration: 'none', fontWeight: '600' }}>Edge</a>
              <span style={{ color: 'var(--border)' }}>|</span>
              <span style={{ color: 'var(--muted)' }}>Opera (soon)</span>
            </div>

            <div class="card">
              <div class="form-group">
                <label>GitHub Username</label>
                <div class="input-group">
                  <input type="text" id="username" placeholder="Enter GitHub username" value={initialUser} autocomplete="off" />
                  <button class="generate-btn" onclick="update()">Generate</button>
                </div>
              </div>

              <div class="form-group">
                <label>Theme</label>
                <div class="themes" style={{ alignItems: 'center' }}>
                  <button onclick="setTheme('transparent')" id="theme-transparent">Transparent</button>
                  <button onclick="setTheme('light')" id="theme-light">Light</button>
                  <button onclick="setTheme('dark')" id="theme-dark" class="active">Dark</button>
                  <a href="/customize" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'white', fontSize: '0.8rem', color: 'var(--text)', textDecoration: 'none', boxSizing: 'border-box', gap: '0.4rem', flex: '1', minWidth: '80px' }}>
                    <svg height="14" viewBox="0 0 16 16" width="14" style={{ fill: 'currentColor' }}><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm1.414 1.06a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354l-1.086-1.086ZM11.189 6.25 9.75 4.811 2.96 11.602a.25.25 0 0 0-.064.108l-.637 2.227 2.227-.636a.25.25 0 0 0 .108-.064L11.19 6.25Z"></path></svg>
                    <span>Customize</span>
                  </a>
                  <a href="/customize#mcp" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'white', fontSize: '0.8rem', color: 'var(--text)', textDecoration: 'none', boxSizing: 'border-box', gap: '0.4rem', flex: '1', minWidth: '80px' }}>
                    <svg height="14" viewBox="0 0 16 16" width="14" style={{ fill: 'currentColor' }}><path d="M7.53 1.28a.75.75 0 0 1 .94 0l1.47 1.17 1.83-.46a.75.75 0 0 1 .9.65l.23 1.87 1.63.95a.75.75 0 0 1 .28 1.05l-1.01 1.58.55 1.81a.75.75 0 0 1-.49.92l-1.8.52-.73 1.74a.75.75 0 0 1-.98.39l-1.68-.84-1.68.84a.75.75 0 0 1-.98-.39l-.73-1.74-1.8-.52a.75.75 0 0 1-.49-.92l.55-1.81-1.01-1.58a.75.75 0 0 1 .28-1.05l1.63-.95.23-1.87a.75.75 0 0 1 .9-.65l1.83.46 1.47-1.17Z"/></svg>
                    <span>AI (MCP)</span>
                  </a>
                </div>
              </div>



              <div id="error-banner" class="error-banner"></div>

              <div class="preview-container">
                <div id="loading-overlay" class="loading-overlay">
                  <div>Generating...</div>
                  <div class="loading-msg">Accounts with years of history might take a few seconds to calculate first time.</div>
                </div>
                <img id="preview-img" class="preview-img" src={sampleUrl} alt="GitHub Streak Preview" />
              </div>

              <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--muted)', textAlign: 'center' }}>
                Github refresh cycle: {fastMins + Math.ceil(camoSecs / 60)} minutes
              </div>

              <div id="share-section" class="share-section">
                <label>Share your streak</label>
                <div class="share-buttons">
                  <button id="share-copy" class="share-btn copy" onclick="copyShareText(this)">
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>
                    Copy Link
                  </button>
                  <a id="share-x" class="share-btn x" href="#" target="_blank">
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/></svg>
                    X
                  </a>
                  <a id="share-linkedin" class="share-btn linkedin" href="#" target="_blank" onclick="shareLinkedIn(event)">
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
                    LinkedIn
                  </a>
                  <button id="share-native" class="share-btn native" style="display: none;">
                    <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>
                    Share
                  </button>
                </div>
              </div>

              <label style={{ marginTop: '1.5rem', display: 'block' }}>Markdown</label>
              <div class="code-box">
                <pre id="md-code">{escapedMarkdown}</pre>
                <button class="copy-btn" onclick="copy('md-code', this)">Copy</button>
              </div>

              <label style={{ marginTop: '1.5rem', display: 'block' }}>HTML</label>
              <div class="code-box">
                <pre id="html-code">{escapedHtml}</pre>
                <button class="copy-btn" onclick="copy('html-code', this)">Copy</button>
              </div>
            </div>


            <div id="caching-strategy" style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              backgroundColor: 'rgba(255, 171, 0, 0.1)',
              borderLeft: '4px solid #ffab00',
              borderRadius: '6px',
              textAlign: 'left'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#ffab00', fontSize: '0.9rem' }}>⚠️ Caching Strategy</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text)', lineHeight: '1.5' }}>
                To save on API quota, we cache the most recent 6 months of data for {fastMins} minutes (fast lane), and older history for 1 month (soft refreshed every {slowMins} minutes). If you recently deleted repositories or made significant changes, you can explicitly force a refresh to recalculate your history cache.
              </p>
              <details style={{ margin: '0.5rem 0 0 0', cursor: 'pointer' }}>
                <summary style={{ fontSize: '0.8rem', color: '#ffab00', fontWeight: '600', outline: 'none' }}>
                  README not updating?
                </summary>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'var(--text)', lineHeight: '1.5', paddingLeft: '0.5rem', borderLeft: '2px solid #ffab00' }}>
                  <strong>Note:</strong> GitHub aggressively caches all images via their Camo proxy for up to {camoSecs / 60} minutes. This is outside of our control. If your streak is updated here but stuck on your profile README, you can install our Browser Extension (
                  <a href="https://chromewebstore.google.com/detail/github-streak/nabgmpdcbbjmjcmnbbjcfaofkclolbdm" target="_blank" style={{ color: '#ffab00', textDecoration: 'underline' }}>Chrome</a> |{' '}
                  <a href="https://addons.mozilla.org/en-US/firefox/addon/github-streak-extension/" target="_blank" style={{ color: '#ffab00', textDecoration: 'underline' }}>Firefox</a> |{' '}
                  <a href="https://microsoftedge.microsoft.com/addons/detail/githubstreakextension/pfnpbclbamfpfcmcnlkdamabjkddibja" target="_blank" style={{ color: '#ffab00', textDecoration: 'underline' }}>Edge</a> |{' '}
                  <span style={{ color: 'var(--muted)' }}>Opera (soon)</span>
                  ) to easily purge GitHub's image cache.
                </p>
              </details>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                <button onclick="forceRefreshCache(false)" id="soft-refresh-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: '600', backgroundColor: '#ffab00', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Soft Refresh (Recent 6 mo)
                </button>
                <button onclick="forceRefreshCache(true)" id="hard-refresh-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: '600', backgroundColor: '#d73a49', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Hard Refresh (Full History)
                </button>
              </div>
            </div>

            <div class="footer">
              Built with ❤️ by <a href="https://rahuldhole.com" target="_blank">Rahul Dhole</a> |
              <a href="https://github.com/rahuldhole/github-streak" target="_blank">GitHub Repository</a>
              <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--muted)', fontWeight: '400' }}>
                Need more granular streaks (like weekdays/weekends only) or more UI customization?
                Check out <a href="https://streak-stats.demolab.com/" target="_blank" style={{ color: 'var(--accent)', fontWeight: '600' }}>GitHub Streak Stats</a>.
              </p>
              <p style={{ marginTop: '1rem', fontSize: '0.7rem' }}>
                Notice an error? Please open a <a href="https://github.com/rahuldhole/github-streak/issues" target="_blank">GitHub Issue</a> or <a href="https://github.com/rahuldhole/github-streak/pulls" target="_blank">Pull Request</a>.
              </p>
            </div>
          </div>

          {html`
          <script>
            let theme = '${initialTheme}';
            const version = '${version}';
            const usernameInput = document.getElementById('username');
            const previewImg = document.getElementById('preview-img');
            const loadingOverlay = document.getElementById('loading-overlay');
            const mdCode = document.getElementById('md-code');
            const htmlCode = document.getElementById('html-code');
            const errorBanner = document.getElementById('error-banner');
            const generateBtn = document.querySelector('.generate-btn');

            const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

            async function update(forceRefresh = false, fullRefresh = false) {
              const user = usernameInput.value.trim();
              
              if (!user || !GITHUB_USERNAME_REGEX.test(user)) {
                if (!user) return; // Silent return if empty
                usernameInput.style.borderColor = '#d73a49';
                usernameInput.style.boxShadow = '0 0 0 3px rgba(215, 58, 73, 0.1)';
                generateBtn.textContent = 'Invalid User';
                setTimeout(() => {
                  usernameInput.style.borderColor = '';
                  usernameInput.style.boxShadow = '';
                  generateBtn.textContent = 'Generate';
                }, 2000);
                return;
              }

              errorBanner.style.display = 'none';
              loadingOverlay.style.display = 'flex';
              previewImg.style.opacity = '0';
              document.getElementById('share-section').classList.remove('active');

              const baseUrl = window.location.origin;
              const baseCardUrl = \`\${baseUrl}/?user=\${user}&theme=\${theme}&v=\${version}\`;
              let fetchUrl = baseCardUrl;
              if (fullRefresh) {
                fetchUrl += '&full-refresh=true';
              } else if (forceRefresh) {
                fetchUrl += '&no-cache=true';
              }
              
              generateBtn.textContent = 'Generating...';
              generateBtn.disabled = true;
              generateBtn.style.opacity = '0.7';

              try {
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                  let message = 'Something went wrong.';
                  if (response.status === 404) message = 'GitHub User not found.';
                  if (response.status === 429) message = 'Too many requests. Please slow down.';
                  if (response.status === 503) message = 'GitHub API is unavailable or rate limited.';
                  
                  errorBanner.innerHTML = \`\${message} Please try again or <a href="https://github.com/rahuldhole/github-streak/issues" target="_blank">create an issue</a>.\`;
                  errorBanner.style.display = 'block';
                  generateBtn.textContent = 'Error';
                } else {
                  // Wait for the browser to actually finish fetching AND rendering the SVG bytes
                  const onloadPromise = new Promise((resolve) => {
                    previewImg.onload = resolve;
                    previewImg.onerror = resolve; // Continue reveal even if image is broken
                  });
                  previewImg.src = fetchUrl;
                  await onloadPromise;

                  const markdown = \`![GitHub Streak](\${baseCardUrl})\`;
                  const htmlStr = \`<img src="\${baseCardUrl}" alt="GitHub Streak" />\`;
                  mdCode.textContent = markdown;
                  htmlCode.textContent = htmlStr;
                  generateBtn.textContent = 'Generate';

                  const sharePageUrl = \`\${baseUrl}/profile/\${user}/\${theme}\`;
                  const shareText = encodeURIComponent(\`Check out my GitHub Streak! 🔥\n\n\`);
                  const shareXUrl = \`https://twitter.com/intent/tweet?text=\${shareText}&url=\${encodeURIComponent(sharePageUrl)}\`;
                  const shareLinkedInUrl = \`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(sharePageUrl)}\`;
                  
                  document.getElementById('share-x').href = shareXUrl;
                  document.getElementById('share-linkedin').href = shareLinkedInUrl;
                  
                  // Store for copy button
                  const copyBtn = document.getElementById('share-copy');
                  copyBtn.dataset.text = sharePageUrl;
                  
                  // Store for LinkedIn fallback copying
                  const linkedInText = \`Check out my GitHub Streak! 🔥 \${sharePageUrl}\`;
                  document.getElementById('share-linkedin').dataset.text = linkedInText;
                  
                  const nativeBtn = document.getElementById('share-native');
                  if (navigator.share) {
                    nativeBtn.style.display = 'inline-flex';
                    nativeBtn.onclick = () => {
                      navigator.share({
                        title: 'GitHub Streak',
                        text: 'Check out my GitHub Streak! 🔥',
                        url: sharePageUrl
                      }).catch(console.error);
                    };
                  } else {
                    nativeBtn.style.display = 'none';
                  }
                  
                  document.getElementById('share-section').classList.add('active');
                }
              } catch (err) {
                errorBanner.innerHTML = \`Network error. Please try again or <a href="https://github.com/rahuldhole/github-streak/issues" target="_blank">create an issue</a>.\`;
                errorBanner.style.display = 'block';
                generateBtn.textContent = 'Error';
              } finally {
                loadingOverlay.style.display = 'none';
                previewImg.style.opacity = '1';
                generateBtn.disabled = false;
                generateBtn.style.opacity = '1';
                if (generateBtn.textContent === 'Error') {
                  setTimeout(() => {
                    generateBtn.textContent = 'Generate';
                  }, 2000);
                }
              }
            }

            function setTheme(t) {
              theme = t;
              document.querySelectorAll('.themes button').forEach(b => b.classList.remove('active'));
              document.getElementById('theme-' + t).classList.add('active');
              
              if (usernameInput.value.trim()) {
                update();
              } else {
                previewImg.src = \`\${window.location.origin}/sample.svg?theme=\${theme}&v=\${version}\`;
              }
            }

            async function forceRefreshCache(isFull) {
              const user = usernameInput.value.trim();
              if (!user || !GITHUB_USERNAME_REGEX.test(user)) {
                alert('Please enter a valid GitHub username and click Generate first.');
                return;
              }
              if (isFull) {
                const confirmed = confirm('A Hard Refresh will recalculate your entire history since you joined GitHub. This may take some time. Are you sure?');
                if (!confirmed) return;
              }
              const btnId = isFull ? 'hard-refresh-btn' : 'soft-refresh-btn';
              const btn = document.getElementById(btnId);
              const originalText = btn.textContent;
              btn.textContent = 'Refreshing...';
              btn.disabled = true;
              btn.style.opacity = '0.7';

              await update(true, isFull);
              
              btn.textContent = originalText;
              btn.disabled = false;
              btn.style.opacity = '1';
            }

            function copy(id, btn) {
              const text = document.getElementById(id).textContent.trim();
              executeCopy(text, btn);
            }

            function copyShareText(btn) {
              const text = btn.dataset.text;
              executeCopy(text, btn, 'Copied!');
            }

            function shareLinkedIn(e) {
              const btn = e.currentTarget;
              const text = btn.dataset.text;
              if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
                // Try to copy to clipboard so user can paste it on LinkedIn
                navigator.clipboard.writeText(text).catch(() => {});
              }
              // Normal link behavior will open LinkedIn
            }

            function executeCopy(text, btn, successText = 'Copied!') {
              const original = btn.textContent;
              const handleSuccess = () => {
                btn.textContent = successText;
                setTimeout(() => {
                  btn.innerHTML = original;
                }, 2000);
              };

              const fallbackCopy = () => {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                textArea.setSelectionRange(0, 99999);
                try {
                  document.execCommand('copy');
                  handleSuccess();
                } catch (err) {
                  console.error('All copy methods failed', err);
                }
                document.body.removeChild(textArea);
              };

              if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text)
                  .then(handleSuccess)
                  .catch(() => fallbackCopy());
              } else {
                fallbackCopy();
              }
            }

            if (usernameInput) {
              usernameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') update();
              });
            }

            // Fetch GitHub stars for custom button
            fetch('https://api.github.com/repos/rahuldhole/github-streak')
              .then(res => res.json())
              .then(data => {
                const count = data.stargazers_count;
                const starCountEl = document.getElementById('star-count');
                if (starCountEl && count !== undefined) {
                  starCountEl.textContent = count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count;
                }
              })
              .catch(err => console.error('Failed to fetch stars', err));
          </script>
          `}
        </body>
      </html>
    </>
  )
}
