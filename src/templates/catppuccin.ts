export const catppuccin = `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #313244; --l1: #89b4fa; --l2: #cba6f7; --l3: #f38ba8; --l4: #fab387; --text-l0: #bac2de; --text-l1: #11111b; --text-l2: #11111b; --text-l3: #11111b; --text-l4: #11111b; }\n        .label { font: bold 10px monospace; fill: #bac2de; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px monospace; fill: #cba6f7; }
    .date { font: 10px monospace; fill: #a6adc8; }
  </style>
  <rect width="420" height="180" rx="12" fill="#1e1e2e" stroke="#313244" stroke-width="2"/>
  
  <g transform="translate(25, 40)">
    <text class="label" fill="#f38ba8">CURRENT STREAK</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label" fill="#f9e2af">PERSONAL BEST</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label" fill="#89b4fa">TOTAL CONTRIBS</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="54" width="46" height="40" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="108" width="46" height="40" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="162" width="46" height="40" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="216" width="46" height="40" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="270" width="46" height="40" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="324" width="46" height="40" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="395" y="170" text-anchor="end" font-size="8" font-family="monospace" fill="#6c7086" opacity="0.8">{{lastUpdated}}</text>
</svg>`;
