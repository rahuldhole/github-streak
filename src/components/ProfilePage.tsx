/** @jsxImportSource hono/jsx */
import { html } from 'hono/html'

export function ProfilePage({ origin, user, theme, profile }: { origin: string, user: string, theme: string, profile?: any }) {
  const name = profile?.name || user;
  const title = `${name}'s GitHub Portfolio`
  const description = profile?.bio || `Check out ${name}'s GitHub contribution streak and portfolio! Generated with GitHub Streak Widget.`
  const imageUrl = `${origin}/?user=${user}&theme=${theme}`
  const ogImageUrl = `${origin}/og/${user}?theme=${theme}`
  const pageUrl = `${origin}/profile/${user}/${theme}`

  // Ensure website URL has scheme
  let websiteUrl = profile?.websiteUrl;
  if (websiteUrl && !websiteUrl.startsWith('http')) {
    websiteUrl = 'https://' + websiteUrl;
  }

  // Treat transparent theme as light mode for the page itself, but SVG keeps transparent
  const isLight = theme === 'light' || theme === 'transparent';
  const rootVars = isLight
    ? `--bg: #ffffff; --text: #09090b; --muted: #52525b; --border: rgba(0,0,0,0.1); --card-bg: rgba(0,0,0,0.03); --accent-gradient: linear-gradient(135deg, #a855f7, #ec4899, #f43f5e);`
    : `--bg: #09090b; --text: #fafafa; --muted: #a1a1aa; --border: rgba(255,255,255,0.1); --card-bg: rgba(255,255,255,0.03); --accent-gradient: linear-gradient(135deg, #a855f7, #ec4899, #f43f5e);`;

  const bodyBg = 'var(--bg)';
  const bgImage = `radial-gradient(circle at 15% 50%, rgba(168, 85, 247, 0.15), transparent 25%), radial-gradient(circle at 85% 30%, rgba(236, 72, 153, 0.15), transparent 25%)`;

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
          <meta property="og:type" content="profile" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={ogImageUrl} />
          <link rel="canonical" href={pageUrl} />
          <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
          <style dangerouslySetInnerHTML={{
            __html: `
          :root { ${rootVars} }
          .avatar,h1{background:var(--accent-gradient)}.header,.links,.meta,.meta-item,.username{display:flex}.cta-btn,.footer a,.link-btn,.pinned-card{text-decoration:none}body{font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;background-color:var(--bg);color:var(--text);line-height:1.6;margin:0;padding:0;min-height:100vh}.container{width:100%;max-width:900px;margin:0 auto;padding:3rem 1.5rem}.header{flex-direction:column;align-items:center;text-align:center;margin-bottom:2rem;animation:.8s ease-out fadeUp}.avatar{width:100px;height:100px;border-radius:50%;border:4px solid rgba(255,255,255,.1);padding:4px;margin-bottom:1.5rem;box-shadow:0 0 30px rgba(168,85,247,.4)}.link-btn,.pinned-card,.stat-card{background:var(--card-bg);backdrop-filter:blur(10px)}.avatar img{width:100%;height:100%;border-radius:50%;object-fit:cover;background:var(--bg)}h1{font-size:2.2rem;font-weight:800;margin:0 0 .5rem;letter-spacing:-.05em;-webkit-background-clip:text;-webkit-text-fill-color:transparent}.username{font-size:1.1rem;color:var(--muted);margin-bottom:1.2rem;font-weight:500;align-items:center;gap:.5rem}.bio{font-size:1rem;max-width:600px;color:var(--text);margin-bottom:1.5rem}.meta{gap:1.5rem;flex-wrap:wrap;justify-content:center;color:var(--muted);font-size:.95rem;margin-bottom:2rem}.meta-item{align-items:center;gap:.4rem}.meta-icon{opacity:.7}.links{gap:1rem;flex-wrap:wrap;justify-content:center;margin-bottom:2rem}.link-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1rem;border-radius:99px;border:1px solid var(--border);color:var(--text);font-weight:500;font-size:.85rem;transition:.2s;opacity:0.85}.pinned-section h2,.stat-value{font-size:1.2rem;font-weight:700}.link-btn:hover{background:rgba(255,255,255,.1);transform:translateY(-2px);border-color:rgba(255,255,255,.3);opacity:1}.stats-grid{display:flex;justify-content:center;gap:1rem;margin-bottom:2rem;animation:1s ease-out fadeUp;flex-wrap:wrap}.stat-card{border:1px solid var(--border);border-radius:12px;padding:.75rem 1.5rem;text-align:center;transition:transform .3s,border-color .3s;flex:1;min-width:120px;max-width:180px;opacity:0.75}.stat-card:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.2);opacity:1}.stat-value{margin-bottom:.1rem;color:var(--text)}.stat-label{font-size:.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;font-weight:600}.pinned-section{margin-bottom:3rem;animation:1.1s ease-out fadeUp;opacity:0.85}.pinned-section:hover{opacity:1}.pinned-section h2{margin-bottom:1.5rem;text-align:center;color:var(--muted);font-size:1.1rem;text-transform:uppercase;letter-spacing:.1em}.pinned-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem}.pinned-card,.pinned-name{display:flex;color:var(--text)}.pinned-card{border:1px solid var(--border);border-radius:12px;padding:1.25rem;text-align:left;transition:transform .2s,border-color .2s;flex-direction:column}.pinned-card:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.2)}.pinned-name{font-weight:600;font-size:1rem;margin-bottom:.5rem;align-items:center;gap:.5rem}.pinned-desc{font-size:.8rem;color:var(--muted);margin-bottom:1rem;line-height:1.5;flex-grow:1}.pinned-meta,.pinned-meta-item{display:flex;align-items:center}.pinned-meta{gap:1rem;font-size:.7rem;color:var(--muted)}.pinned-meta-item{gap:.3rem}.lang-dot{width:10px;height:10px;border-radius:50%;display:inline-block}.streak-section{animation:1s ease-out fadeUp;display:flex;flex-direction:column;align-items:center;margin-bottom:4rem;width:100%}.streak-section h2{display:none}.preview-container{padding:0;margin-bottom:0;transition:transform .3s;width:100%;max-width:100%;background:transparent;backdrop-filter:none;}.preview-container:hover{transform:scale(1.02)}.preview-img{width:100%;height:auto;display:block}.cta-section{text-align:center;margin-top:4rem;padding-top:3rem;border-top:1px solid var(--border)}.cta-btn{display:inline-flex;align-items:center;justify-content:center;padding:1rem 2rem;background:var(--text);color:var(--bg);border:none;border-radius:12px;cursor:pointer;font-weight:700;font-size:1.1rem;transition:.2s;box-shadow:0 4px 15px rgba(255,255,255,.2)}.cta-btn:hover{background:#e5e5e5;transform:translateY(-2px);box-shadow:0 8px 25px rgba(255,255,255,.3)}.footer{margin-top:3rem;font-size:.9rem;color:var(--muted);text-align:center}.footer a{color:var(--text);font-weight:500}.footer a:hover{text-decoration:underline}@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@media (max-width:768px){h1{font-size:1.8rem}.container{padding:1.5rem 1rem}.avatar{width:80px;height:80px}}

          `}} />
        </head>
        <body>
          <div class="container">
            <header class="header">
              <div class="avatar">
                <img src={profile?.avatarUrl || `https://github.com/${user}.png`} alt={name} />
              </div>
              <h1>{name}</h1>
              <a href={`https://github.com/${user}`} target="_blank" class="username" style="text-decoration: none;">
                <svg class="meta-icon" height="20" viewBox="0 0 16 16" width="20" fill="currentColor">
                  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.46-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
                @{user}
              </a>

              {profile?.bio && <p class="bio">{profile.bio}</p>}

              <div class="meta">
                {profile?.location && (
                  <div class="meta-item">
                    <svg class="meta-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path></svg>
                    {profile.location}
                  </div>
                )}
                {profile?.company && (
                  <div class="meta-item">
                    <svg class="meta-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.75.75 0 0 1-.197-1.473c.099-.017.197-.027.297-.027h3.15a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.75.75 0 0 1-.197-1.473c.099-.017.197-.027.297-.027h3.15a.25.25 0 0 0 .25-.25v-3h-1.5a.75.75 0 0 1 0-1.5h1.5v-3h-1.5a.75.75 0 0 1 0-1.5h1.5v-3h-1.5a.75.75 0 0 1 0-1.5h1.5v-2h-3v2h1.5a.75.75 0 0 1 0 1.5h-1.5v3h1.5a.75.75 0 0 1 0 1.5h-1.5v3h1.5a.75.75 0 0 1 0 1.5h-1.5v3h1.5a.75.75 0 0 1 0 1.5h-1.5v2h-8.5a.25.25 0 0 1-.25-.25v-12.5a.25.25 0 0 1 .25-.25h8.5a.25.25 0 0 1 .25.25v12.5c0 .138-.112.25-.25.25h-3.5a.75.75 0 0 0 0 1.5h3.5A1.75 1.75 0 0 0 12 14.25V1.75A1.75 1.75 0 0 0 10.25 0h-8.5A1.75 1.75 0 0 0 0 1.75v12.5A1.75 1.75 0 0 0 1.75 16h8.5a1.75 1.75 0 0 0 1.75-1.75v-12.5a.75.75 0 0 0-1.5 0v12.5a.25.25 0 0 1-.25.25h-8.5a.25.25 0 0 1-.25-.25Z"></path></svg>
                    {profile.company}
                  </div>
                )}
              </div>

              <div class="links">
                {websiteUrl && (
                  <a href={websiteUrl} target="_blank" class="link-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    Website
                  </a>
                )}
                {profile?.twitterUsername && (
                  <a href={`https://twitter.com/${profile.twitterUsername}`} target="_blank" class="link-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    Twitter
                  </a>
                )}
                {profile?.email && (
                  <a href={`mailto:${profile.email}`} class="link-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    Email
                  </a>
                )}
              </div>
            </header>

            <section class="streak-section">
              <div class="preview-container">
                <img
                  src={imageUrl}
                  alt={`${user}'s GitHub Streak`}
                  class="preview-img"
                  loading="lazy"
                />
              </div>
            </section>

            <div class="stats-grid">
              {profile?.followers !== undefined && (
                <div class="stat-card">
                  <div class="stat-value">{profile.followers >= 1000 ? (profile.followers / 1000).toFixed(1) + 'k' : profile.followers}</div>
                  <div class="stat-label">Followers</div>
                </div>
              )}
              {profile?.following !== undefined && (
                <div class="stat-card">
                  <div class="stat-value">{profile.following >= 1000 ? (profile.following / 1000).toFixed(1) + 'k' : profile.following}</div>
                  <div class="stat-label">Following</div>
                </div>
              )}
              {profile?.repositories !== undefined && (
                <div class="stat-card">
                  <div class="stat-value">{profile.repositories.toLocaleString()}</div>
                  <div class="stat-label">Repositories</div>
                </div>
              )}
            </div>

            {profile?.pinnedItems && profile.pinnedItems.length > 0 && (
              <section class="pinned-section">
                <h2>Pinned Projects</h2>
                <div class="pinned-grid">
                  {profile.pinnedItems.map((repo: any) => (
                    <a href={repo.url} target="_blank" class="pinned-card">
                      <div class="pinned-name">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
                        {repo.name}
                      </div>
                      <div class="pinned-desc">{repo.description}</div>
                      <div class="pinned-meta">
                        {repo.primaryLanguage && (
                          <div class="pinned-meta-item">
                            <span class="lang-dot" style={`background-color: ${repo.primaryLanguage.color || '#ccc'}`}></span>
                            {repo.primaryLanguage.name}
                          </div>
                        )}
                        {repo.stargazerCount > 0 && (
                          <div class="pinned-meta-item">
                            <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" width="16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                            {repo.stargazerCount}
                          </div>
                        )}
                        {repo.forkCount > 0 && (
                          <div class="pinned-meta-item">
                            <svg aria-label="fork" role="img" height="16" viewBox="0 0 16 16" width="16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>
                            {repo.forkCount}
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            <div class="footer" style={{ marginTop: '4rem', marginBottom: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                Built with ❤️ | <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Generate your own</a> | <a href="https://github.com/rahuldhole/github-streak" target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a> | <a href="#" onclick="document.getElementById('cache-card').style.display = document.getElementById('cache-card').style.display === 'none' ? 'block' : 'none'; return false;" style={{ color: 'inherit', textDecoration: 'none' }}>Cache Invalidation</a>
              </div>

              <div id="cache-card" style={{
                display: 'none',
                marginTop: '1rem',
                width: '100%',
                maxWidth: '600px',
                padding: '0.75rem',
                backgroundColor: 'rgba(255, 171, 0, 0.05)',
                borderLeft: '3px solid #ffab00',
                borderRadius: '6px',
                textAlign: 'left',
                border: '1px solid var(--border)',
                borderLeftWidth: '3px',
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#ffab00', fontSize: '0.8rem', fontWeight: 'bold' }}>⚠️ Caching Strategy</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted)', lineHeight: '1.4' }}>
                  To save on API quota, we cache the most recent 6 months of data for 1 hour, and older history for 1 month.
                </p>
                <details style={{ margin: '0.5rem 0 0 0', cursor: 'pointer' }}>
                  <summary style={{ fontSize: '0.75rem', color: '#ffab00', fontWeight: '600', outline: 'none' }}>
                    README not updating?
                  </summary>
                  <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.75rem', color: 'var(--muted)', lineHeight: '1.4', paddingLeft: '0.5rem', borderLeft: '2px solid #ffab00' }}>
                    <strong>Note:</strong> GitHub aggressively caches all images via their Camo proxy. This is outside of our control. If your streak is updated here but stuck on your profile README, you can install our <strong>Browser Extension</strong> to easily purge GitHub's image cache.
                  </p>
                </details>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  <button onclick={`window.location.href='?no-cache=true&theme=${theme}'`} style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', fontWeight: '600', backgroundColor: '#ffab00', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    Soft Refresh
                  </button>
                  <button onclick={`if(confirm('A Hard Refresh will recalculate your entire history since you joined GitHub. This may take some time. Are you sure?')) window.location.href='?full-refresh=true&theme=${theme}'`} style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', fontWeight: '600', backgroundColor: '#d73a49', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    Hard Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>

          <script dangerouslySetInnerHTML={{ __html: `
            if (window.location.search.includes('full-refresh=true') || window.location.search.includes('no-cache=true')) {
              const url = new URL(window.location);
              url.searchParams.delete('full-refresh');
              url.searchParams.delete('no-cache');
              window.history.replaceState({}, document.title, url);
            }
          `}} />
        </body>
      </html>
    </>
  )
}
