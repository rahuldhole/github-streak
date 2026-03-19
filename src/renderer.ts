import { GitHubContributionDay, Theme } from './types'
import { getIntensityColor } from './logic'

export function renderSVG(streak: number, last7: GitHubContributionDay[], maxCount: number, theme: Theme = 'transparent') {
  const width = 420
  const height = 160
  const padding = 20

  const themes = {
    light: {
      bg: '#FFFFFF',
      border: '#E2E8F0',
      text: '#0F172A',
      textMuted: '#64748B',
    },
    dark: {
      bg: '#0B1220',
      border: '#1E293B',
      text: '#FFFFFF',
      textMuted: '#94A3B8',
    },
    transparent: {
      bg: 'none',
      border: 'none',
      text: '#626a75ff',
      textMuted: '#576374ff',
    }
  }

  const t = themes[theme] || themes.dark
  const dayLabels = last7.map(d => new Date(d.date).toLocaleDateString("en", { weekday: "short" })[0])

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${t.bg !== 'none' ? `<rect width="${width}" height="${height}" rx="16" fill="${t.bg}"/>` : ''}
      ${t.border !== 'none' ? `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="15.5" stroke="${t.border}"/>` : ''}

      <!-- Streak Text -->
      <text x="${padding}" y="40" fill="${t.text}" font-family="sans-serif" font-size="20" font-weight="bold">
        🔥 ${streak} day streak
      </text>
      <text x="${padding}" y="60" fill="${t.textMuted}" font-family="sans-serif" font-size="12">
        based on consecutive contribution days
      </text>

      <!-- Heat Strip -->
      ${last7.map((d, i) => {
    const x = padding + i * ((width - 2 * padding - 6 * 8) / 7 + 8)
    const rectW = (width - 2 * padding - 6 * 8) / 7
    const color = getIntensityColor(d.contributionCount, maxCount)
    return `
          <g>
            <rect x="${x}" y="85" width="${rectW}" height="45" rx="8" fill="${color}"/>
            <text x="${x + rectW / 2}" y="105" fill="#ffffffff" font-family="sans-serif" font-size="10" text-anchor="middle">
              ${dayLabels[i]}
            </text>
            <text x="${x + rectW / 2}" y="120" fill="#ffffffff" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">
              ${d.contributionCount}
            </text>
          </g>
        `
  }).join('')}
    </svg>
  `
}

export function renderLandingPage() {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Streak Pulse | GitHub Streak Widget</title>
        <style>
          :root { --bg: #ffffff; --text: #1a1a1a; --muted: #666666; --border: #e1e4e8; --accent: #2c974b; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); line-height: 1.5; margin: 0; padding: 2rem; display: flex; flex-direction: column; align-items: center; }
          .container { width: 100%; max-width: 600px; }
          h1 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; text-align: center; }
          p { color: var(--muted); text-align: center; margin-bottom: 2rem; font-size: 0.9rem; }
          .card { border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem; }
          .form-group { margin-bottom: 1.5rem; }
          label { display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--muted); margin-bottom: 0.5rem; }
          input { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; box-sizing: border-box; font-size: 1rem; }
          .themes { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
          .themes button { flex: 1; padding: 0.5rem; border: 1px solid var(--border); background: white; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
          .themes button.active { background: var(--text); color: white; border-color: var(--text); }
          .preview { display: flex; justify-content: center; align-items: center; border: 1px solid var(--border); border-radius: 8px; padding: 1rem; background: #f6f8fa; margin-top: 1.5rem; min-height: 160px; }
          .preview img { max-width: 100%; height: auto; }
          .code-box { position: relative; margin-top: 1.5rem; }
          pre { background: #f6f8fa; padding: 1rem; border-radius: 6px; font-size: 0.85rem; overflow-x: auto; margin: 0; color: #24292e; border: 1px solid var(--border); }
          .copy-btn { position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.4rem 0.8rem; border: 1px solid var(--border); background: white; border-radius: 4px; font-size: 0.7rem; cursor: pointer; font-weight: 600; }
          .copy-btn:active { background: #f3f4f6; }
          .footer { margin-top: 3rem; font-size: 0.75rem; color: var(--muted); text-align: center; }
          .footer a { color: inherit; text-decoration: none; border-bottom: 1px solid var(--border); }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🔥 Streak Pulse</h1>
          <p>A Duolingo-inspired GitHub streak widget.</p>

          <div class="card">
            <div class="form-group">
              <label>GitHub Username</label>
              <input type="text" id="username" placeholder="username" value="rahuldhole">
            </div>

            <div class="form-group">
              <label>Theme</label>
              <div class="themes">
                <button onclick="setTheme('transparent')" id="theme-transparent" class="active">Transparent</button>
                <button onclick="setTheme('light')" id="theme-light">Light</button>
                <button onclick="setTheme('dark')" id="theme-dark">Dark</button>
              </div>
            </div>

            <div class="preview">
              <img id="preview-img" src="/?user=rahuldhole" alt="Streak Pulse Preview">
            </div>
          </div>

          <label>Markdown</label>
          <div class="code-box">
            <pre id="md-code"></pre>
            <button class="copy-btn" onclick="copy('md-code')">Copy</button>
          </div>

          <label style="margin-top: 1.5rem;">HTML</label>
          <div class="code-box">
            <pre id="html-code"></pre>
            <button class="copy-btn" onclick="copy('html-code')">Copy</button>
          </div>

          <div class="footer">
            Built by <a href="https://github.com/rahuldhole/streak-pulse" target="_blank">Streak Pulse</a>
          </div>
        </div>

        <script>
          let theme = 'transparent';
          const usernameInput = document.getElementById('username');
          const previewImg = document.getElementById('preview-img');
          const mdCode = document.getElementById('md-code');
          const htmlCode = document.getElementById('html-code');

          function update() {
            const user = usernameInput.value || 'username';
            const baseUrl = window.location.origin;
            const cardUrl = \`\${baseUrl}/?user=\${user}&theme=\${theme}\`;
            
            previewImg.src = cardUrl;
            
            const markdown = \`![Streak Pulse](\${cardUrl})\`;
            const html = \`<img src="\${cardUrl}" alt="Streak Pulse" />\`;
            
            mdCode.textContent = markdown;
            htmlCode.textContent = html;
          }

          function setTheme(t) {
            theme = t;
            document.querySelectorAll('.themes button').forEach(b => b.classList.remove('active'));
            document.getElementById('theme-' + t).classList.add('active');
            update();
          }

          function copy(id) {
            const text = document.getElementById(id).textContent;
            navigator.clipboard.writeText(text);
            const btn = event.target;
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = original, 2000);
          }

          usernameInput.addEventListener('input', update);
          update();
        </script>
      </body>
    </html>
  `
}
