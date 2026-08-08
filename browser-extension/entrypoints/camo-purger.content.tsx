
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const RefreshButton = ({ camoUrl, imgElement }: { camoUrl: string, imgElement: HTMLImageElement }) => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Send PURGE request to Camo URL
      await fetch(camoUrl, { method: 'PURGE' });
      // Add timestamp to bypass local cache
      const url = new URL(camoUrl);
      url.searchParams.set('t', Date.now().toString());
      imgElement.src = url.toString();
    } catch (e) {
      console.error('Failed to purge camo cache:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
        fontSize: '12px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {loading ? '⏳' : '🔄'} Refresh
    </button>
  );
};

export default defineContentScript({
  matches: ['*://github.com/*'],
  main() {
    console.log('GitHub Streak: Camo Purger loaded');
    
    // Periodically check for new images in case of dynamic loading or client-side navigation
    const checkImages = () => {
      const markdownBody = document.querySelector('.markdown-body');
      if (!markdownBody) return;

      const images = markdownBody.querySelectorAll('img');
      images.forEach((img) => {
        // Skip if we've already processed this image
        if (img.parentElement?.classList.contains('camo-purger-wrapper')) return;
        
        const src = img.src;
        const canonicalSrc = img.getAttribute('data-canonical-src') || '';
        
        // Ensure it's a Camo URL and points to our streak domain (or similar pattern)
        if (src.includes('camo.githubusercontent.com') && 
            (canonicalSrc.includes('streak-stats') || canonicalSrc.includes('github-readme-streak-stats'))) {
          
          // Wrap the image to safely position the button
          const wrapper = document.createElement('div');
          wrapper.className = 'camo-purger-wrapper';
          wrapper.style.position = 'relative';
          wrapper.style.display = 'inline-block';
          
          img.parentNode?.insertBefore(wrapper, img);
          wrapper.appendChild(img);

          const uiContainer = document.createElement('div');
          wrapper.appendChild(uiContainer);

          const root = createRoot(uiContainer);
          root.render(<RefreshButton camoUrl={src} imgElement={img} />);
        }
      });
    };

    // Run on initial load
    checkImages();
  },
});
