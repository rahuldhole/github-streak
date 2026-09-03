export const tripleColumnPulse = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 195" width="500" height="195">
  <style>
    @keyframes currstreak {
      0% { font-size: 3px; opacity: 0.2; }
      80% { font-size: 34px; opacity: 1; }
      100% { font-size: 28px; opacity: 1; }
    }
    @keyframes fadein {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    .text-title { font-family: system-ui, sans-serif; font-weight: 400; font-size: 14px; fill: #A6ACCD; opacity: 0; animation: fadein 0.5s linear forwards 0.7s; }
    .text-stat { font-family: system-ui, sans-serif; font-weight: 700; font-size: 28px; fill: #FFFFFF; opacity: 0; animation: fadein 0.5s linear forwards 0.6s; }
    .text-date { font-family: system-ui, sans-serif; font-weight: 400; font-size: 12px; fill: #717CB4; opacity: 0; animation: fadein 0.5s linear forwards 0.8s; }
    .streak-stat { font-family: system-ui, sans-serif; font-weight: 700; font-size: 28px; fill: #F7768E; animation: currstreak 0.6s linear forwards; }
    .streak-title { font-family: system-ui, sans-serif; font-weight: 700; font-size: 14px; fill: #F7768E; opacity: 0; animation: fadein 0.5s linear forwards 0.9s; }
  </style>
  <defs>
    <clipPath id="outer_rect">
      <rect width="500" height="195" rx="16"/>
    </clipPath>
    <mask id="ring_mask">
      <rect width="500" height="195" fill="white"/>
      <ellipse cx="250" cy="32" rx="13" ry="18" fill="black"/>
    </mask>
    <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ffcc00" />
      <stop offset="40%" stop-color="#ff6600" />
      <stop offset="100%" stop-color="#cc0000" />
    </linearGradient>
  </defs>
  
  <g clip-path="url(#outer_rect)">
    <rect width="500" height="195" rx="16" fill="#1A1B26"/>
    
    <line x1="166" y1="30" x2="166" y2="165" stroke="#292E42" stroke-width="2" stroke-linecap="round"/>
    <line x1="334" y1="30" x2="334" y2="165" stroke="#292E42" stroke-width="2" stroke-linecap="round"/>
    
    <g transform="translate(83, 48)">
      <text x="0" y="32" text-anchor="middle" class="text-stat">{{totalContribs}}</text>
    </g>
    <g transform="translate(83, 84)">
      <text x="0" y="32" text-anchor="middle" class="text-title">Total Contributions</text>
    </g>
    <g transform="translate(83, 114)">
      <text x="0" y="32" text-anchor="middle" class="text-date">{{totalContribsDate}}</text>
    </g>

    <g transform="translate(250, 108)">
      <text x="0" y="32" text-anchor="middle" class="streak-title">Current Streak</text>
    </g>
    <g transform="translate(250, 145)">
      <text x="0" y="21" text-anchor="middle" class="text-date" style="animation-delay: 0.9s;">{{currentStreakDate}}</text>
    </g>
    <g mask="url(#ring_mask)">
      <circle cx="250" cy="71" r="40" fill="none" stroke="#73DACA" stroke-width="4" style="opacity: 0; animation: fadein 0.5s linear forwards 0.4s"/>
    </g>
    <g transform="translate(250, 19.5)" style="opacity: 0; animation: fadein 0.5s linear forwards 0.6s">
      <path d="M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z" fill="url(#fireGrad)"/>
    </g>
    <g transform="translate(250, 48)">
      <text x="0" y="32" text-anchor="middle" class="streak-stat">{{currentStreak}}</text>
    </g>

    <g transform="translate(416, 48)">
      <text x="0" y="32" text-anchor="middle" class="text-stat" style="animation-delay: 1.2s;">{{personalBest}}</text>
    </g>
    <g transform="translate(416, 84)">
      <text x="0" y="32" text-anchor="middle" class="text-title" style="animation-delay: 1.3s;">Personal Best</text>
    </g>
    <g transform="translate(416, 114)">
      <text x="0" y="32" text-anchor="middle" class="text-date" style="animation-delay: 1.4s;">{{personalBestDate}}</text>
    </g>
  </g>
  <text x="490" y="185" text-anchor="end" font-family="system-ui, sans-serif" font-size="10" fill="#414868">{{lastUpdated}}</text>
</svg>`;
