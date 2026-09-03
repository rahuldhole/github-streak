export const gruvbox = `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #3c3836; --l1: #458588; --l2: #d79921; --l3: #b8bb26; --l4: #fb4934; --text-l0: #ebdbb2; --text-l1: #282828; --text-l2: #282828; --text-l3: #282828; --text-l4: #282828; }\n        .label { font: bold 10px sans-serif; fill: #a89984; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px sans-serif; fill: #ebdbb2; }
    .date { font: 10px sans-serif; fill: #a89984; }
  </style>
  <rect width="420" height="180" rx="10" fill="#282828" stroke="#3c3836" stroke-width="2"/>
  <g transform="translate(25, 40)">
    <text class="label" fill="#fb4934">Current Streak</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label" fill="#b8bb26">Personal Best</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label" fill="#83a598">Total Contribs</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    <rect x="54" width="46" height="40" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    <rect x="108" width="46" height="40" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    <rect x="162" width="46" height="40" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    <rect x="216" width="46" height="40" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    <rect x="270" width="46" height="40" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    <rect x="324" width="46" height="40" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#a89984">{{lastUpdated}}</text>
</svg>`;
