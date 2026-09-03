export const animatedGradient = `<svg width="600" height="200" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #1e1e2e88; --l1: #89b4fa; --l2: #cba6f7; --l3: #f38ba8; --l4: #fab387; --text-l0: #bac2de; --text-l1: #11111b; --text-l2: #11111b; --text-l3: #11111b; --text-l4: #11111b; }
    .label { font: bold 12px sans-serif; fill: #bac2de; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 28px sans-serif; fill: #ffffff; }
    .date { font: 11px sans-serif; fill: #a6adc8; }
    @keyframes gradientBG {
      0% { stop-color: #ff7eb3; }
      50% { stop-color: #ff758c; }
      100% { stop-color: #ff7eb3; }
    }
    @keyframes gradientBG2 {
      0% { stop-color: #8fd3f4; }
      50% { stop-color: #84fab0; }
      100% { stop-color: #8fd3f4; }
    }
    .anim-stop-1 { animation: gradientBG 4s ease infinite; }
    .anim-stop-2 { animation: gradientBG2 4s ease infinite; }
  </style>
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff7eb3" class="anim-stop-1" />
      <stop offset="100%" stop-color="#8fd3f4" class="anim-stop-2" />
    </linearGradient>
  </defs>
  <rect width="600" height="200" rx="20" fill="url(#bg-grad)"/>
  <rect x="2" y="2" width="596" height="196" rx="18" fill="#11111B" opacity="0.9"/>
  
  <g transform="translate(40, 50)">
    <text class="label">Current Streak</text>
    <text y="36" class="stat">{{currentStreak}}</text>
    <text y="58" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(240, 50)">
    <text class="label">Personal Best</text>
    <text y="36" class="stat">{{personalBest}}</text>
    <text y="58" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(440, 50)">
    <text class="label">Total Contribs</text>
    <text y="36" class="stat">{{totalContribs}}+</text>
    <text y="58" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(40, 130)">
    <rect x="0" width="60" height="40" rx="8" fill="var(--l{{day0Level}})"/>
    <text x="30" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day0Label}}</text>
    <text x="30" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="75" width="60" height="40" rx="8" fill="var(--l{{day1Level}})"/>
    <text x="105" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day1Label}}</text>
    <text x="105" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="150" width="60" height="40" rx="8" fill="var(--l{{day2Level}})"/>
    <text x="180" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day2Label}}</text>
    <text x="180" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="225" width="60" height="40" rx="8" fill="var(--l{{day3Level}})"/>
    <text x="255" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day3Label}}</text>
    <text x="255" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="300" width="60" height="40" rx="8" fill="var(--l{{day4Level}})"/>
    <text x="330" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day4Label}}</text>
    <text x="330" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="375" width="60" height="40" rx="8" fill="var(--l{{day5Level}})"/>
    <text x="405" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day5Label}}</text>
    <text x="405" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="450" width="60" height="40" rx="8" fill="var(--l{{day6Level}})"/>
    <text x="480" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day6Label}}</text>
    <text x="480" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="580" y="185" text-anchor="end" font-size="9" fill="#6c7086" opacity="0.8">{{lastUpdated}}</text>
</svg>`;
