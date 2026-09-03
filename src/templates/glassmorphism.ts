export const glassmorphism = `<svg width="450" height="200" viewBox="0 0 450 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: rgba(255,255,255,0.1); --l1: rgba(255,255,255,0.3); --l2: rgba(255,255,255,0.5); --l3: rgba(255,255,255,0.7); --l4: rgba(255,255,255,1); --text-l0: #ffffff; --text-l1: #ffffff; --text-l2: #000000; --text-l3: #000000; --text-l4: #000000; }
    .label { font: bold 10px sans-serif; fill: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 26px sans-serif; fill: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .date { font: 10px sans-serif; fill: rgba(255,255,255,0.6); }
    .glass-rect { fill: rgba(255, 255, 255, 0.1); stroke: rgba(255, 255, 255, 0.2); stroke-width: 1.5; backdrop-filter: blur(10px); }
  </style>
  <defs>
    <linearGradient id="bg-grad-glass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4158D0" />
      <stop offset="46%" stop-color="#C850C0" />
      <stop offset="100%" stop-color="#FFCC70" />
    </linearGradient>
  </defs>
  <rect width="450" height="200" rx="20" fill="url(#bg-grad-glass)"/>
  
  <rect x="15" y="15" width="420" height="170" rx="16" class="glass-rect"/>
  
  <g transform="translate(35, 50)">
    <text class="label">Current Streak</text>
    <text y="30" class="stat">{{currentStreak}}</text>
    <text y="48" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(175, 50)">
    <text class="label">Personal Best</text>
    <text y="30" class="stat">{{personalBest}}</text>
    <text y="48" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(315, 50)">
    <text class="label">Total Contribs</text>
    <text y="30" class="stat">{{totalContribs}}+</text>
    <text y="48" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(35, 120)">
    <rect x="0" width="48" height="45" rx="8" fill="var(--l{{day0Level}})"/>
    <text x="24" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day0Label}}</text>
    <text x="24" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="55" width="48" height="45" rx="8" fill="var(--l{{day1Level}})"/>
    <text x="79" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day1Label}}</text>
    <text x="79" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="110" width="48" height="45" rx="8" fill="var(--l{{day2Level}})"/>
    <text x="134" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day2Label}}</text>
    <text x="134" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="165" width="48" height="45" rx="8" fill="var(--l{{day3Level}})"/>
    <text x="189" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day3Label}}</text>
    <text x="189" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="220" width="48" height="45" rx="8" fill="var(--l{{day4Level}})"/>
    <text x="244" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day4Label}}</text>
    <text x="244" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="275" width="48" height="45" rx="8" fill="var(--l{{day5Level}})"/>
    <text x="299" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day5Label}}</text>
    <text x="299" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="330" width="48" height="45" rx="8" fill="var(--l{{day6Level}})"/>
    <text x="354" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day6Label}}</text>
    <text x="354" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="425" y="192" text-anchor="end" font-size="8" fill="rgba(255,255,255,0.4)">{{lastUpdated}}</text>
</svg>`;
