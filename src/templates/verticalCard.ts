export const verticalCard = `<svg width="240" height="420" viewBox="0 0 240 420" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #161b22; --l1: #0e4429; --l2: #006d32; --l3: #26a641; --l4: #39d353; --text-l0: #c9d1d9; --text-l1: #ffffff; --text-l2: #ffffff; --text-l3: #000000; --text-l4: #000000; }
    .label { font: bold 11px sans-serif; fill: #8b949e; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 26px sans-serif; fill: #c9d1d9; }
    .date { font: 10px sans-serif; fill: #8b949e; }
  </style>
  <rect width="240" height="420" rx="16" fill="#0d1117" stroke="#30363d" stroke-width="2"/>
  
  <g transform="translate(25, 40)">
    <text class="label">Current Streak</text>
    <text y="32" class="stat">🔥 {{currentStreak}}</text>
    <text y="50" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(25, 120)">
    <text class="label">Personal Best</text>
    <text y="32" class="stat">🏆 {{personalBest}}</text>
    <text y="50" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(25, 200)">
    <text class="label">Total Contribs</text>
    <text y="32" class="stat">✨ {{totalContribs}}+</text>
    <text y="50" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(15, 280)">
    <rect x="0" y="0" width="26" height="80" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="13" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day0Label}}</text>
    <text x="13" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="30" y="0" width="26" height="80" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="43" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day1Label}}</text>
    <text x="43" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="60" y="0" width="26" height="80" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="73" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day2Label}}</text>
    <text x="73" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="90" y="0" width="26" height="80" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="103" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day3Label}}</text>
    <text x="103" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="120" y="0" width="26" height="80" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="133" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day4Label}}</text>
    <text x="133" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="150" y="0" width="26" height="80" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="163" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day5Label}}</text>
    <text x="163" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="180" y="0" width="26" height="80" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="193" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day6Label}}</text>
    <text x="193" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="215" y="400" text-anchor="end" font-size="8" fill="#8b949e" opacity="0.6">{{lastUpdated}}</text>
</svg>`;
