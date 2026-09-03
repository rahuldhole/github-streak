/** @jsxImportSource hono/jsx */
import { html } from 'hono/html'
import pkg from '../../package.json' with { type: 'json' }
import aiTemplates from '../ai-templates.json' with { type: 'json' }
import { baseTemplates } from "../templates/index.ts"

export function CustomizePage({ origin = '' }: { origin?: string }) {
  const version = pkg.version
  const templates = { ...baseTemplates, ...(aiTemplates as Record<string, string>) }

  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>GitHub Streak | Customize Template</title>
          <style>
            {html`
            :root { --bg: #ffffff; --text: #1a1a1a; --muted: #666666; --border: #e1e4e8; --accent: #2c974b; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; }
            .main { display: flex; flex: 1; overflow: hidden; }
            .editor-panel { width: 50%; display: flex; flex-direction: column; border-right: 1px solid var(--border); }
            .preview-panel { width: 50%; display: flex; flex-direction: column; background: #f6f8fa; overflow-y: auto; }
            .sandbox-area { padding: 2rem; display: flex; flex-direction: column; align-items: center; width: 100%; box-sizing: border-box; }
            .bottom-area { background: #ffffff; border-top: 1px solid var(--border); padding: 2rem; width: 100%; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; flex: 1; }
            textarea { flex: 1; width: 100%; padding: 1rem; border: none; outline: none; resize: none; font-family: monospace; font-size: 0.85rem; box-sizing: border-box; background: #fafbfc; color: #24292e; }
            .controls { padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
            .preview-img { max-width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 20px; }
            .url-box { margin-top: 2rem; width: 100%; max-width: 600px; }
            .url-box input, .code-block { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; box-sizing: border-box; font-family: monospace; font-size: 0.8rem; margin-top: 0.5rem; margin-bottom: 1rem; background: #fafbfc; color: #24292e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .copy-btn { padding: 0.25rem 0.5rem; background: var(--border); border: none; border-radius: 4px; font-size: 0.75rem; cursor: pointer; color: var(--text); }
            .copy-btn:hover { background: #e2e8f0; }
            button { padding: 0.5rem 1rem; background: var(--text); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem; }
            button:hover { background: #333; }
            .theme-select { padding: 0.4rem; border: 1px solid var(--border); border-radius: 4px; font-size: 0.8rem; }
            .hide-mobile { display: inline; }
            .show-mobile { display: none; }
            @media (max-width: 768px) {
              .main { flex-direction: column; }
              .editor-panel, .preview-panel { width: 100%; height: 50%; }
              .hide-mobile { display: none !important; }
              .show-mobile { display: inline-block !important; }
              .controls { padding: 0.5rem; }
            }
            .CodeMirror { flex: 1; height: 100%; font-family: monospace; font-size: 14px; }
            .tactile-btn { transition: transform 0.1s; }
            .tactile-btn:active { transform: scale(0.85); }
            @keyframes spin { 100% { transform: rotate(360deg); } }
            .spin-anim { animation: spin 0.5s ease-in-out; }
            `}
          </style>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/material-ocean.min.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/xml/xml.min.js"></script>
        </head>
        <body>
          <div class="main">
            <div class="editor-panel">
              <div class="controls">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <a href="/" title="Back to Home" style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  </a>
                  <h1 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🔥 <span class="hide-mobile">GitHub Streak</span> <span class="hide-mobile" style={{ color: 'var(--muted)', fontWeight: 400 }}>/ Customize</span>
                  </h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1' }}>
                    <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true" fill="currentColor">
                      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                    </svg>
                    <input type="text" id="preview-user" placeholder="GitHub Username (for preview)" oninput="debounceUpdate()" style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.8rem', flex: '1', minWidth: '150px' }} />
                  </div>
                  <select id="template-select" class="theme-select" onchange="loadTemplate()">
                  <optgroup label="Standard Themes">
                    <option value="default">Default</option>
                    <option value="catppuccin">Catppuccin</option>
                    <option value="nord">Nord</option>
                    <option value="dracula">Dracula</option>
                    <option value="monokai">Monokai</option>
                    <option value="synthwave">Synthwave</option>
                    <option value="solarizedDark">Solarized Dark</option>
                    <option value="solarizedLight">Solarized Light</option>
                    <option value="onedark">One Dark</option>
                    <option value="gruvbox">Gruvbox</option>
                  </optgroup>
                  <optgroup label="Advanced Themes">
                    <option value="animatedGradient">✨ Animated Gradient</option>
                    <option value="compactMinimal">📦 Compact Minimal</option>
                    <option value="verticalCard">📐 Vertical Card</option>
                    <option value="glassmorphism">💎 Glassmorphism</option>
                    <option value="neonPulse">💜 Neon Pulse</option>
                    <option value="auroraBorealis">🌌 Aurora Borealis</option>
                    <option value="cyberpunkMatrix">🖥️ Cyberpunk Matrix</option>
                    <option value="oceanWaves">🌊 Ocean Waves</option>
                    <option value="fireEmber">🔥 Fire Ember</option>
                    <option value="midnightCity">🌙 Midnight City</option>
                    <option value="tripleColumnPulse">📊 Triple Column Pulse</option>
                  </optgroup>
                  {Object.keys(aiTemplates).length > 0 && (
                    <optgroup label="AI Generated">
                      {Object.keys(aiTemplates).map((key) => (
                        <option value={key}>🤖 {key}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
                </div>
              </div>
              <textarea id="editor" style={{ display: 'none' }}>{templates.default}</textarea>
            </div>
            <div class="preview-panel">
              <div style={{ margin: '1.5rem 2rem 0 2rem', background: '#e1e4e8', padding: '0.5rem', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '6px', padding: '0 8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                </div>
                <button onclick="triggerReload(this)" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '0 0.2rem', color: '#586069', display: 'flex', alignItems: 'center' }} title="Reload Preview">↻</button>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input type="text" id="custom-url" placeholder="Paste your generated URL here..." oninput="handleUrlPaste(event)" onclick="this.select()" style={{ width: '100%', padding: '0.4rem 2rem 0.4rem 0.8rem', border: '1px solid #d1d5da', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '0.75rem', background: '#ffffff', color: '#24292e', outline: 'none' }} />
                  <button class="tactile-btn" onclick="clearCustomUrl()" style={{ position: 'absolute', right: '4px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#959da5', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Clear">✖</button>
                </div>
                <button class="copy-btn tactile-btn" onclick="copyIcon(this)" style={{ background: '#ffffff', border: '1px solid #d1d5da', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, fontSize: '0.9rem' }} title="Copy URL">📋</button>
              </div>
              <div class="sandbox-area" style={{ paddingTop: '1rem', borderLeft: '1px solid #e1e4e8', borderRight: '1px solid #e1e4e8', borderBottom: '1px solid #e1e4e8', margin: '0 2rem 1.5rem 2rem', borderRadius: '0 0 8px 8px', backgroundColor: '#ffffff', width: 'auto' }}>
                <iframe id="preview" style={{ border: 'none', width: '100%', height: '500px', minHeight: '300px', background: 'transparent', resize: 'vertical', display: 'block' }} sandbox="allow-scripts allow-same-origin"></iframe>
              </div>
              
              <div class="bottom-area">
                <div class="url-box" style={{ width: '100%', maxWidth: '800px', background: '#f6f8fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '1.5rem' }}>Embed Options</h2>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Markdown Snippet</label>
                    <button class="copy-btn tactile-btn" onclick="copyCode('md-code', this, true)">Copy</button>
                  </div>
                  <input type="text" class="code-block" id="md-code" readonly onclick="this.select()" style={{ marginBottom: '1.5rem', background: '#ffffff', width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '0.8rem', color: '#24292e' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>HTML Snippet</label>
                    <button class="copy-btn tactile-btn" onclick="copyCode('html-code', this, true)">Copy</button>
                  </div>
                  <input type="text" class="code-block" id="html-code" readonly onclick="this.select()" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '0.8rem', background: '#ffffff', color: '#24292e' }} />
                </div>

                <div style={{ width: '100%', maxWidth: '800px', textAlign: 'left' }}>
                  <h2 style={{ fontSize: '1.2rem', marginTop: 0 }}>Usage Guide</h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.5' }}>
                    This editor allows you to fully customize your GitHub Streak SVG by modifying the raw markup. 
                    The backend processes your template and dynamically substitutes placeholders with your live GitHub data.
                  </p>
                  
                  <h3 style={{ fontSize: '1rem', marginTop: '1.5rem' }}>Available Variables</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
                    <div style={{ background: '#f6f8fa', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                      <strong>Statistics</strong>
                      <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                        <li><code>{"{{currentStreak}}"}</code> - Current streak length</li>
                        <li><code>{"{{currentStreakDate}}"}</code> - Current streak date range</li>
                        <li><code>{"{{personalBest}}"}</code> - Longest streak length</li>
                        <li><code>{"{{personalBestDate}}"}</code> - Longest streak date range</li>
                        <li><code>{"{{totalContribs}}"}</code> - Total lifetime contributions</li>
                        <li><code>{"{{totalContribsDate}}"}</code> - Total contribution date range</li>
                      </ul>
                    </div>
                    <div style={{ background: '#f6f8fa', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                      <strong>Visuals & Dates</strong>
                      <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                        <li><code>{"{{heatStrip}}"}</code> - Renders default 7-day activity boxes</li>
                        <li><code>{"{{lastUpdated}}"}</code> - Date the SVG was generated</li>
                        <li><code>{"{{dayXCount}}"}</code> - Contrib count for day X (0-6)</li>
                        <li><code>{"{{dayXLevel}}"}</code> - Heat level for day X (0-4)</li>
                        <li><code>{"{{dayXLabel}}"}</code> - Day of week label (e.g. Mon)</li>
                      </ul>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1rem', marginTop: '1.5rem' }}>How to Embed</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.5' }}>
                    Once you're happy with your design, copy the <strong>Markdown</strong> or <strong>HTML</strong> snippet from above and paste it into your <code>README.md</code>. 
                    Alternatively, keep your <strong>Custom URL</strong> safe. Whenever you paste that URL back into the browser bar above, it will instantly load your custom SVG back into the editor!
                  </p>
                  <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    Having trouble with stale data or GitHub caching? <a href="/#caching-strategy" target="_blank" style={{ color: '#ffab00', textDecoration: 'none', fontWeight: '600' }}>Read our Caching Strategy & Refresh Guide</a>
                  </p>

                  <div id="mcp" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1.4rem' }}>🤖</span>
                      <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>Connect via Model Context Protocol (MCP)</h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.5', margin: '0 0 1.25rem 0' }}>
                      Connect your AI assistant (Claude Desktop, Cursor, VS Code, Windsurf, Roo Code, etc.) directly to GitHub Streak to generate and iterate on custom SVG templates using natural language.
                    </p>

                    <div style={{ background: '#f6f8fa', borderRadius: '8px', border: '1px solid var(--border)', padding: '1.25rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--text)' }}>MCP Server URL (SSE)</strong>
                        <button class="copy-btn tactile-btn" onclick="copyCode('mcp-url', this, true)" style={{ position: 'static' }}>Copy URL</button>
                      </div>
                      <input type="text" class="code-block" id="mcp-url" value={origin ? `${origin}/mcp` : '/mcp'} readonly onclick="this.select()" style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--border)', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '0.85rem', background: '#ffffff', color: '#24292e' }} />
                    </div>

                    <div style={{ background: '#f6f8fa', borderRadius: '8px', border: '1px solid var(--border)', padding: '1.25rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--text)' }}>Configuration (Claude Desktop / Cursor / Continue)</strong>
                        <button class="copy-btn tactile-btn" onclick="copyCode('mcp-json-code', this, false)" style={{ position: 'static' }}>Copy JSON</button>
                      </div>
                      <pre id="mcp-json-code" style={{ margin: 0, padding: '0.75rem', background: '#ffffff', borderRadius: '6px', border: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.8rem', color: '#24292e', overflowX: 'auto' }}>{`{
  "mcpServers": {
    "github-streak": {
      "url": "${origin || 'http://localhost:8888'}/mcp"
    }
  }
}`}</pre>
                    </div>

                    <div style={{ background: '#f6f8fa', borderRadius: '8px', border: '1px solid var(--border)', padding: '1.25rem' }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>Provided MCP Tools</strong>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <li><code>get_template_guide</code> — Returns template variables, theme keys, and design guidelines for AI prompts.</li>
                        <li><code>generate_widget_url</code> — Accepts a custom SVG template string and returns a live, compressed widget URL with interactive preview.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <script dangerouslySetInnerHTML={{ __html: `window.PREDEFINED_TEMPLATES = ${JSON.stringify(templates)}; window.APP_VERSION = "${version}";` }}></script>
          {html`
          <script>
            let debounceTimer;
            let editorInstance;
            
            document.addEventListener('DOMContentLoaded', () => {
              const mcpUrlInput = document.getElementById('mcp-url');
              if (mcpUrlInput && (!mcpUrlInput.value || mcpUrlInput.value.startsWith('/'))) {
                mcpUrlInput.value = window.location.origin + '/mcp';
              }
              const mcpJsonCode = document.getElementById('mcp-json-code');
              if (mcpJsonCode && mcpJsonCode.textContent.includes('http://localhost:8888')) {
                mcpJsonCode.textContent = mcpJsonCode.textContent.replace('http://localhost:8888', window.location.origin);
              }

              if (window.location.hash === '#mcp') {
                const mcpEl = document.getElementById('mcp');
                if (mcpEl) {
                  setTimeout(() => mcpEl.scrollIntoView({ behavior: 'smooth' }), 150);
                }
              }

              const textArea = document.getElementById('editor');
              editorInstance = CodeMirror.fromTextArea(textArea, {
                mode: "xml",
                theme: "material-ocean",
                lineNumbers: true,
                lineWrapping: true
              });
              
              editorInstance.on('change', () => {
                debounceUpdate();
              });
              
              updatePreview();
            });

            function debounceUpdate() {
              clearTimeout(debounceTimer);
              debounceTimer = setTimeout(updatePreview, 800);
            }

            function loadTemplate() {
              const val = document.getElementById('template-select').value;
              const tpl = window.PREDEFINED_TEMPLATES[val];
              if (tpl && editorInstance) {
                editorInstance.setValue(tpl);
              }
            }

            async function updatePreview() {
              const code = editorInstance ? editorInstance.getValue() : document.getElementById('editor').value;
              
              try {
                const res = await fetch('/api/compress', {
                  method: 'POST',
                  headers: { 'Content-Type': 'text/plain' },
                  body: code
                });
                
                if (!res.ok) throw new Error('Failed to compress');
                
                const { compressed } = await res.json();
                
                const baseUrl = window.location.origin;
                const username = document.getElementById('preview-user').value.trim();
                const finalUrl = (username && username !== 'YOUR_USERNAME') ? (baseUrl + '/v1/?user=' + encodeURIComponent(username) + '&custom=' + compressed + '&v=' + window.APP_VERSION) : (baseUrl + '/v1/sample.svg?custom=' + compressed + '&v=' + window.APP_VERSION);
                const renderedUrl = baseUrl + '/v1/?user=' + (username || 'YOUR_USERNAME') + '&custom=' + compressed + '&v=' + window.APP_VERSION;
                
                // Fetch the SVG and render it safely inside the sandboxed iframe
                const svgResponse = await fetch(finalUrl);
                if (svgResponse.ok) {
                  const svgContent = await svgResponse.text();
                  const htmlDoc = \`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          body {
                            display: flex;
                            margin: 0;
                            min-height: 100vh;
                            background: transparent;
                          }
                          .container {
                            margin: auto;
                            padding: 20px;
                          }
                          svg {
                            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                            border-radius: 20px;
                            display: block;
                            max-width: 100%;
                            height: auto;
                          }
                        </style>
                      </head>
                      <body>
                        <div class="container">\${svgContent}</div>
                      </body>
                    </html>
                  \`;
                  document.getElementById('preview').srcdoc = htmlDoc;
                } else {
                  document.getElementById('preview').srcdoc = \`<html style="color:red;font-family:sans-serif;text-align:center;padding:2rem;">Failed to load preview</html>\`;
                }

                document.getElementById('custom-url').value = renderedUrl;
                document.getElementById('md-code').value = \`![GitHub Streak](\${renderedUrl})\`;
                document.getElementById('html-code').value = \`<img src="\${renderedUrl}" alt="GitHub Streak" />\`;
                
              } catch (e) {
                console.error(e);
              }
            }

            function clearCustomUrl() {
              document.getElementById('custom-url').value = '';
            }

            function triggerReload(btn) {
              btn.classList.remove('spin-anim');
              void btn.offsetWidth;
              btn.classList.add('spin-anim');
              updatePreview();
            }

            function copyIcon(btn) {
              const el = document.getElementById('custom-url');
              navigator.clipboard.writeText(el.value);
              btn.textContent = '✅';
              setTimeout(() => btn.textContent = '📋', 1500);
            }

            async function handleUrlPaste(e) {
              const urlStr = e.target.value.trim();
              if (!urlStr) return;
              try {
                const url = new URL(urlStr);
                const customParam = url.searchParams.get('custom');
                if (customParam) {
                  const res = await fetch('/api/decompress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: customParam
                  });
                  if (res.ok) {
                    const data = await res.json();
                    if (data.decompressed && editorInstance) {
                      editorInstance.setValue(data.decompressed);
                    }
                  }
                }
                const userParam = url.searchParams.get('user');
                if (userParam) {
                  document.getElementById('preview-user').value = userParam;
                }
              } catch (err) {
                // Not a valid URL, ignore
              }
            }

            function copyCode(id, btn, isInput = false) {
              const el = document.getElementById(id);
              const text = isInput ? el.value : el.textContent;
              navigator.clipboard.writeText(text);
              const oldText = btn.textContent;
              btn.textContent = 'Copied!';
              setTimeout(() => btn.textContent = oldText, 2000);
            }
          </script>
          `}
        </body>
      </html>
    </>
  )
}
