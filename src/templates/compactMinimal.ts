export const compactMinimal = `<svg width="300" height="120" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #ebedf0; --l1: #9be9a8; --l2: #40c463; --l3: #30a14e; --l4: #216e39; --text-l0: #24292e; --text-l1: #24292e; --text-l2: #ffffff; --text-l3: #ffffff; --text-l4: #ffffff; }
    .stat { font: bold 20px sans-serif; fill: #24292e; }
    .icon { font-size: 16px; }
  </style>
  <rect width="300" height="120" rx="8" fill="#ffffff" stroke="#e1e4e8"/>
  
  <g transform="translate(20, 30)">
    <text class="icon">🔥</text>
    <text x="25" y="4" class="stat">{{currentStreak}}</text>
  </g>
  <g transform="translate(115, 30)">
    <text class="icon">🏆</text>
    <text x="25" y="4" class="stat">{{personalBest}}</text>
  </g>
  <g transform="translate(210, 30)">
    <text class="icon">✨</text>
    <text x="25" y="4" class="stat">{{totalContribs}}</text>
  </g>
  
  <g transform="translate(20, 65)">
    <rect x="0" width="30" height="30" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="15" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="38" width="30" height="30" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="53" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="76" width="30" height="30" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="91" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="114" width="30" height="30" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="129" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="152" width="30" height="30" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="167" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="190" width="30" height="30" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="205" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="228" width="30" height="30" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="243" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="290" y="115" text-anchor="end" font-size="7" fill="#aaaaaa">{{lastUpdated}}</text>
</svg>`;
