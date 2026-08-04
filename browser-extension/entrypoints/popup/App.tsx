import { useState, useEffect } from 'react';
import './App.css';
import { browser } from 'wxt/browser';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [purging, setPurging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [purgeAll, setPurgeAll] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setImageLoading(true);
  }, [username, refreshTrigger]);

  useEffect(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const url = tabs[0]?.url;
      if (url) {
        // match github.com/<username> or github.com/<username>/*
        const match = url.match(/^https:\/\/github\.com\/([a-zA-Z0-9-]+)(?:\/.*)?$/);
        if (match && match[1]) {
          const matchedUser = match[1];
          const reserved = ['pulls', 'issues', 'marketplace', 'explore', 'notifications', 'settings', 'new', 'organizations', 'search', 'about', 'pricing', 'features', 'enterprise', 'team', 'contact', 'login', 'join'];
          if (!reserved.includes(matchedUser.toLowerCase())) {
            setUsername(matchedUser);
          }
        }
      }
    });
  }, []);

  const purgeCache = async () => {
    setPurging(true);
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      if (tabs[0]?.id) {
        await browser.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [purgeAll],
          func: (purgeAllImages: boolean) => {
            const markdownBody = document.querySelector('.markdown-body');
            if (!markdownBody) {
              alert('No README found on this page.');
              return;
            }
            const images = Array.from(markdownBody.querySelectorAll('img'));
            
            // Collect targets first
            const targets = images.filter(img => {
              const src = img.src;
              if (!src.includes('camo.githubusercontent.com')) return false;
              if (purgeAllImages) return true;
              
              const canonicalSrc = img.getAttribute('data-canonical-src') || '';
              return canonicalSrc.includes('streak-stats') || canonicalSrc.includes('github-readme-streak-stats') || canonicalSrc.includes('github-streak');
            });

            if (targets.length > 0) {
              targets.forEach(img => {
                fetch(img.src, { method: 'PURGE' }).catch(console.error);
                const url = new URL(img.src);
                url.searchParams.set('t', Date.now().toString());
                img.src = url.toString();
              });
              alert(`Purged ${targets.length} Camo Cache image(s)!`);
            } else {
              alert('No matching Camo images found to purge.');
            }
          }
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshTrigger(Date.now());
      setPurging(false);
    }
  };

  if (!username) {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h2>GitHub Streak</h2>
        <p style={{ marginBottom: '20px', color: '#ccc', lineHeight: '1.5' }}>Please navigate to a GitHub user profile or repository to see their streak!</p>
        <a href="https://github-streak.rahuldhole.com" target="_blank" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 'bold' }}>Go to Web App</a>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2 style={{ margin: 0, fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {username}'s Streak
          <a 
            href={`https://github-streak.rahuldhole.com/profile/${username}`} 
            target="_blank"
            title="View Full Profile"
            style={{ color: '#8b949e', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </h2>

        {/* Settings Toggle */}
        <button 
          onClick={() => setShowSettings(!showSettings)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: showSettings ? '#c9d1d9' : '#8b949e' }}
          title="Options"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>

      {/* Widget Image */}
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '195px', alignItems: 'center', position: 'relative' }}>
        {imageLoading && (
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="spinner"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            <span style={{ color: '#8b949e', fontSize: '12px' }}>Loading Stats...</span>
          </div>
        )}
        <img 
          src={`https://github-streak.rahuldhole.com/profile-svg/${username}?theme=dark&t=${refreshTrigger}`} 
          alt="GitHub Streak"
          onLoad={() => setImageLoading(false)}
          style={{ width: '100%', height: 'auto', borderRadius: '4px', opacity: imageLoading ? 0 : 1, transition: 'opacity 0.3s' }} 
        />
      </div>

      {/* Revealable Settings */}
      {showSettings && (
        <div style={{ marginTop: '12px', padding: '12px', background: '#161b22', borderRadius: '6px', border: '1px solid #30363d', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#c9d1d9', fontWeight: '600' }}>Embed in README</span>
              <a 
                href={`https://github-streak.rahuldhole.com/customize?user=${username}`} 
                target="_blank"
                style={{ fontSize: '12px', color: '#58a6ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Customize Theme
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input 
                readOnly 
                value={`[![GitHub Streak](https://github-streak.rahuldhole.com?user=${username}&theme=dark)](https://github-streak.rahuldhole.com)`}
                onClick={(e) => e.currentTarget.select()}
                style={{ flex: 1, padding: '6px 8px', borderRadius: '4px', border: '1px solid #30363d', background: '#0d1117', color: '#8b949e', fontSize: '11px', fontFamily: 'monospace', outline: 'none' }}
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`[![GitHub Streak](https://github-streak.rahuldhole.com?user=${username}&theme=dark)](https://github-streak.rahuldhole.com)`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                title="Copy to clipboard"
                style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid', borderColor: copied ? '#2ea043' : '#30363d', background: copied ? '#238636' : '#21262d', color: copied ? '#ffffff' : '#c9d1d9', cursor: 'pointer', fontSize: '12px', transition: 'all 0.2s ease', minWidth: '60px' }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #30363d', paddingTop: '12px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#8b949e', lineHeight: '1.4' }}>
              Is the streak image on this user's README stuck on old data due to GitHub Camo caching?{' '}
              <a href="https://github-streak.rahuldhole.com/#caching-strategy" target="_blank" style={{ color: '#58a6ff', textDecoration: 'none' }}>
                Learn how caching works
              </a>
            </p>
            <button 
              onClick={purgeCache} 
              disabled={purging}
              style={{ width: '100%', padding: '6px 12px', borderRadius: '4px', background: '#21262d', color: '#c9d1d9', border: '1px solid #30363d', cursor: 'pointer', fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: '0.2s' }}
            >
              {purging ? '⏳ Refreshing...' : '🔄 Refresh README Image Cache'}
            </button>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', color: '#8b949e', fontSize: '11px', marginTop: '8px' }}>
              <input 
                type="checkbox" 
                checked={purgeAll} 
                onChange={(e) => setPurgeAll(e.target.checked)} 
                style={{ cursor: 'pointer', margin: 0 }}
              />
              Purge all detected Camo images
            </label>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;
