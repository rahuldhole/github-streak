export const nord = `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #3b4252; --l1: #5e81ac; --l2: #81a1c1; --l3: #88c0d0; --l4: #8fbcbb; --text-l0: #d8dee9; --text-l1: #eceff4; --text-l2: #2e3440; --text-l3: #2e3440; --text-l4: #2e3440; }\n        .label { font: bold 10px sans-serif; fill: #d8dee9; text-transform: uppercase; letter-spacing: 1.5px; }
    .stat { font: bold 24px sans-serif; fill: #8fbcbb; }
    .date { font: 10px sans-serif; fill: #4c566a; }
  </style>
  <rect width="420" height="180" rx="16" fill="#2e3440" stroke="#3b4252" stroke-width="2"/>
  
  <g transform="translate(25, 40)">
    <text class="label">CURRENT STREAK</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label">PERSONAL BEST</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label">TOTAL CONTRIBS</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="8" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="54" width="46" height="40" rx="8" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="108" width="46" height="40" rx="8" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="162" width="46" height="40" rx="8" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="216" width="46" height="40" rx="8" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="270" width="46" height="40" rx="8" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="324" width="46" height="40" rx="8" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#4c566a" opacity="0.8">{{lastUpdated}}</text>
</svg>`;
