

export default defineContentScript({
  matches: ['*://github.com/*'],
  main() {
    console.log('GitHub Streak: Profile Injector loaded');
    
    // Check if we're on a profile page
    const calendarGraph = document.querySelector('.js-calendar-graph');
    if (!calendarGraph) return;

    // Get username from meta tag or URL
    const metaUsername = document.querySelector('meta[name="user-login"]')?.getAttribute('content');
    const urlParts = window.location.pathname.split('/');
    const username = metaUsername || (urlParts.length >= 2 ? urlParts[1] : null);
    
    if (!username) return;

    // Determine current theme
    const htmlTag = document.documentElement;
    const colorMode = htmlTag.getAttribute('data-color-mode'); // 'light', 'dark', or 'auto'
    let theme = 'light';
    if (colorMode === 'dark') {
      theme = 'dark';
    } else if (colorMode === 'auto') {
      // Check system preference or fallback if auto
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark || htmlTag.getAttribute('data-dark-theme') === 'dark') {
        theme = 'dark';
      }
    }

    // Inject the widget if not already injected
    const existingWidget = document.getElementById('github-streak-widget');
    if (existingWidget) return;

    const img = document.createElement('img');
    img.id = 'github-streak-widget';
    img.src = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}`;
    img.style.width = '100%';
    img.style.marginBottom = '16px';
    img.style.borderRadius = '6px';

    // Insert above the calendar graph
    const container = calendarGraph.parentElement;
    if (container) {
      container.insertBefore(img, calendarGraph);
    }
  },
});
