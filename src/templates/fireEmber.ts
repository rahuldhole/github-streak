export const fireEmber = `<svg width="440" height="200" viewBox="0 0 440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #1a0a00; --l1: #3a1500; --l2: #7a2a00; --l3: #cc4400; --l4: #ff6a00; --text-l0: #553300; --text-l1: #cc7700; --text-l2: #ffaa00; --text-l3: #ffffff; --text-l4: #ffffff; }
    @keyframes emberFloat1 {
      0%, 100% { transform: translateY(0px); opacity: 0.6; }
      50% { transform: translateY(-8px); opacity: 1; }
    }
    @keyframes emberFloat2 {
      0%, 100% { transform: translateY(0px); opacity: 0.4; }
      50% { transform: translateY(-12px); opacity: 0.8; }
    }
    @keyframes emberFloat3 {
      0%, 100% { transform: translateY(0px); opacity: 0.5; }
      50% { transform: translateY(-6px); opacity: 0.9; }
    }
    @keyframes fireGlow {
      0%, 100% { stop-color: #1a0500; }
      50% { stop-color: #2a1000; }
    }
    .ember1 { animation: emberFloat1 3s ease-in-out infinite; }
    .ember2 { animation: emberFloat2 4s ease-in-out infinite 0.5s; }
    .ember3 { animation: emberFloat3 3.5s ease-in-out infinite 1s; }
    .label { font: bold 11px sans-serif; fill: #ff8c00; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 26px sans-serif; fill: #ffe0b0; }
    .date { font: 10px sans-serif; fill: #664400; }
  </style>
  <defs>
    <radialGradient id="fire-glow" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#3a1500" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#0a0200" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="440" height="200" rx="16" fill="#0a0200"/>
  <rect width="440" height="200" rx="16" fill="url(#fire-glow)"/>
  <rect x="1" y="1" width="438" height="198" rx="15" fill="none" stroke="#3a1500" stroke-width="1.5"/>
  
  <circle cx="80" cy="180" r="2" fill="#ff6a00" class="ember1"/>
  <circle cx="200" cy="185" r="1.5" fill="#ffaa00" class="ember2"/>
  <circle cx="320" cy="178" r="1.8" fill="#ff8800" class="ember3"/>
  <circle cx="140" cy="175" r="1" fill="#ff4400" class="ember2"/>
  <circle cx="380" cy="182" r="1.2" fill="#ffcc00" class="ember1"/>
  
  <g transform="translate(30, 40)">
    <text class="label">🔥 Current Streak</text>
    <text y="34" class="stat">{{currentStreak}}</text>
    <text y="54" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(180, 40)">
    <text class="label">🏆 Personal Best</text>
    <text y="34" class="stat">{{personalBest}}</text>
    <text y="54" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(330, 40)">
    <text class="label">Total</text>
    <text y="34" class="stat">{{totalContribs}}+</text>
    <text y="54" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(30, 120)">
    <rect x="0" width="50" height="44" rx="8" fill="var(--l{{day0Level}})"/>
    <text x="25" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day0Label}}</text>
    <text x="25" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="58" width="50" height="44" rx="8" fill="var(--l{{day1Level}})"/>
    <text x="83" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day1Label}}</text>
    <text x="83" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="116" width="50" height="44" rx="8" fill="var(--l{{day2Level}})"/>
    <text x="141" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day2Label}}</text>
    <text x="141" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="174" width="50" height="44" rx="8" fill="var(--l{{day3Level}})"/>
    <text x="199" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day3Label}}</text>
    <text x="199" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="232" width="50" height="44" rx="8" fill="var(--l{{day4Level}})"/>
    <text x="257" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day4Label}}</text>
    <text x="257" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="290" width="50" height="44" rx="8" fill="var(--l{{day5Level}})"/>
    <text x="315" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day5Label}}</text>
    <text x="315" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="348" width="50" height="44" rx="8" fill="var(--l{{day6Level}})"/>
    <text x="373" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day6Label}}</text>
    <text x="373" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="420" y="192" text-anchor="end" font-size="8" fill="#442200">{{lastUpdated}}</text>
</svg>`;
