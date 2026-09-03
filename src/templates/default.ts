export const defaultTemplate = `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #1e293b14; --l1: #0e4429ff; --l2: #006d32ff; --l3: #26a641ff; --l4: #39d353ff; --text-l0: #c9d1d9; --text-l1: #ffffff; --text-l2: #ffffff; --text-l3: #000000; --text-l4: #000000; }\n        .label { font: bold 10px sans-serif; fill: #8b949e; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px sans-serif; fill: #c9d1d9; }
    .date { font: 10px sans-serif; fill: #8b949e; }
    .day { font: 9px sans-serif; fill: #ffffff; }
    .count { font: bold 11px sans-serif; fill: #ffffff; }
  </style>
  <rect width="420" height="180" rx="20" fill="#0d1117"/>
  <rect x="0.5" y="0.5" width="419" height="179" rx="19.5" stroke="#30363d"/>
  
  <g transform="translate(25, 40)">
    <text class="label">Current Streak</text>
    <text y="28" class="stat">🔥 {{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label">Personal Best</text>
    <text y="28" class="stat">🏆 {{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label">Total Contribs</text>
    <text y="28" class="stat">✨ {{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(25, 110)">
    <!-- Day 0 -->
    <g transform="translate(0, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day0Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day0Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    </g>
    <!-- Day 1 -->
    <g transform="translate(54, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day1Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day1Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    </g>
    <!-- Day 2 -->
    <g transform="translate(108, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day2Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day2Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    </g>
    <!-- Day 3 -->
    <g transform="translate(162, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day3Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day3Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    </g>
    <!-- Day 4 -->
    <g transform="translate(216, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day4Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day4Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    </g>
    <!-- Day 5 -->
    <g transform="translate(270, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day5Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day5Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    </g>
    <!-- Day 6 -->
    <g transform="translate(324, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day6Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day6Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
    </g>
  </g>
  
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#8b949e" opacity="0.6">{{lastUpdated}}</text>
</svg>`;
