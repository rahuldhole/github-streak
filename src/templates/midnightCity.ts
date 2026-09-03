export const midnightCity = `<svg width="550" height="240" viewBox="0 0 550 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #0f0f1a; --l1: #1a1a3a; --l2: #3a3a6a; --l3: #6a6aaa; --l4: #aaaaff; --text-l0: #3a3a5a; --text-l1: #7a7aaa; --text-l2: #bbbbee; --text-l3: #ffffff; --text-l4: #0f0f1a; }
    @keyframes starTwinkle1 {
      0%, 100% { opacity: 0.3; r: 1; }
      50% { opacity: 1; r: 1.5; }
    }
    @keyframes starTwinkle2 {
      0%, 100% { opacity: 0.5; r: 0.8; }
      50% { opacity: 0.9; r: 1.2; }
    }
    @keyframes starTwinkle3 {
      0%, 100% { opacity: 0.2; r: 1.2; }
      50% { opacity: 0.8; r: 1.8; }
    }
    @keyframes buildingGlow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
    .star1 { animation: starTwinkle1 3s ease-in-out infinite; }
    .star2 { animation: starTwinkle2 4s ease-in-out infinite 1s; }
    .star3 { animation: starTwinkle3 5s ease-in-out infinite 2s; }
    .bldg-win { animation: buildingGlow 2s ease-in-out infinite; }
    .label { font: bold 11px sans-serif; fill: #8888cc; text-transform: uppercase; letter-spacing: 1.5px; }
    .stat { font: bold 30px sans-serif; fill: #ddddff; }
    .date { font: 10px sans-serif; fill: #4a4a6a; }
  </style>
  <defs>
    <linearGradient id="night-sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#05051a"/>
      <stop offset="60%" stop-color="#0f0f2a"/>
      <stop offset="100%" stop-color="#1a1a3a"/>
    </linearGradient>
  </defs>
  <rect width="550" height="240" rx="20" fill="url(#night-sky)"/>
  
  <circle cx="50" cy="25" r="1" fill="#ffffff" class="star1"/>
  <circle cx="120" cy="15" r="0.8" fill="#aaaaff" class="star2"/>
  <circle cx="200" cy="30" r="1.2" fill="#ffffff" class="star3"/>
  <circle cx="280" cy="12" r="0.8" fill="#ccccff" class="star1"/>
  <circle cx="350" cy="22" r="1" fill="#ffffff" class="star2"/>
  <circle cx="420" cy="18" r="0.6" fill="#aaaaff" class="star3"/>
  <circle cx="480" cy="28" r="1.2" fill="#ffffff" class="star1"/>
  <circle cx="160" cy="10" r="0.5" fill="#ddddff" class="star3"/>
  <circle cx="510" cy="14" r="0.7" fill="#ccccff" class="star2"/>
  
  <rect x="30" y="195" width="18" height="45" rx="2" fill="#1a1a2a"/>
  <rect x="36" y="202" width="4" height="4" rx="1" fill="#ffcc44" class="bldg-win" opacity="0.6"/>
  <rect x="36" y="210" width="4" height="4" rx="1" fill="#ffcc44" opacity="0.3"/>
  <rect x="60" y="180" width="22" height="60" rx="2" fill="#15152a"/>
  <rect x="66" y="186" width="4" height="4" rx="1" fill="#88aaff" class="bldg-win" opacity="0.5"/>
  <rect x="72" y="186" width="4" height="4" rx="1" fill="#ffcc44" opacity="0.3"/>
  <rect x="66" y="196" width="4" height="4" rx="1" fill="#ffcc44" class="bldg-win" opacity="0.4"/>
  <rect x="460" y="188" width="20" height="52" rx="2" fill="#1a1a2a"/>
  <rect x="466" y="194" width="4" height="4" rx="1" fill="#ffcc44" class="bldg-win" opacity="0.5"/>
  <rect x="490" y="200" width="16" height="40" rx="2" fill="#15152a"/>
  <rect x="496" y="206" width="4" height="4" rx="1" fill="#88aaff" class="bldg-win" opacity="0.4"/>
  
  <rect x="1" y="1" width="548" height="238" rx="19" fill="none" stroke="#2a2a4a" stroke-width="1"/>
  
  <g transform="translate(100, 45)">
    <text class="label">Current Streak</text>
    <text y="38" class="stat">🌙 {{currentStreak}}</text>
    <text y="58" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(260, 45)">
    <text class="label">Personal Best</text>
    <text y="38" class="stat">⭐ {{personalBest}}</text>
    <text y="58" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(420, 45)">
    <text class="label">Total</text>
    <text y="38" class="stat">{{totalContribs}}+</text>
    <text y="58" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(100, 130)">
    <rect x="0" width="44" height="44" rx="22" fill="var(--l{{day0Level}})"/>
    <text x="22" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day0Label}}</text>
    <text x="22" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="52" width="44" height="44" rx="22" fill="var(--l{{day1Level}})"/>
    <text x="74" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day1Label}}</text>
    <text x="74" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="104" width="44" height="44" rx="22" fill="var(--l{{day2Level}})"/>
    <text x="126" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day2Label}}</text>
    <text x="126" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="156" width="44" height="44" rx="22" fill="var(--l{{day3Level}})"/>
    <text x="178" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day3Label}}</text>
    <text x="178" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="208" width="44" height="44" rx="22" fill="var(--l{{day4Level}})"/>
    <text x="230" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day4Label}}</text>
    <text x="230" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="260" width="44" height="44" rx="22" fill="var(--l{{day5Level}})"/>
    <text x="282" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day5Label}}</text>
    <text x="282" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="312" width="44" height="44" rx="22" fill="var(--l{{day6Level}})"/>
    <text x="334" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day6Label}}</text>
    <text x="334" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="530" y="230" text-anchor="end" font-size="8" fill="#2a2a4a">{{lastUpdated}}</text>
</svg>`;
