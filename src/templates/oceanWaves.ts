export const oceanWaves = `<svg width="520" height="210" viewBox="0 0 520 210" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #0a1628; --l1: #0d3b66; --l2: #1a6baa; --l3: #3a9ed8; --l4: #7dd3fc; --text-l0: #3a5a7a; --text-l1: #7abadd; --text-l2: #b0e0ff; --text-l3: #ffffff; --text-l4: #0a1628; }
    @keyframes wave1 {
      0%, 100% { d: path("M0,180 C80,170 160,195 260,180 C360,165 440,190 520,175 L520,210 L0,210 Z"); }
      50% { d: path("M0,185 C80,195 160,170 260,185 C360,190 440,175 520,185 L520,210 L0,210 Z"); }
    }
    @keyframes wave2 {
      0%, 100% { d: path("M0,190 C100,182 200,198 300,188 C400,178 480,195 520,188 L520,210 L0,210 Z"); }
      50% { d: path("M0,192 C100,198 200,182 300,192 C400,198 480,185 520,192 L520,210 L0,210 Z"); }
    }
    .wave-1 { animation: wave1 6s ease-in-out infinite; fill: #1a4a6a; opacity: 0.5; }
    .wave-2 { animation: wave2 4s ease-in-out infinite; fill: #0d3b66; opacity: 0.3; }
    .label { font: bold 11px sans-serif; fill: #7dd3fc; text-transform: uppercase; letter-spacing: 1.5px; }
    .stat { font: bold 28px sans-serif; fill: #e0f4ff; }
    .date { font: 10px sans-serif; fill: #3a5a7a; }
  </style>
  <defs>
    <linearGradient id="ocean-sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#0d3b66"/>
    </linearGradient>
  </defs>
  <rect width="520" height="210" rx="20" fill="url(#ocean-sky)"/>
  <path class="wave-2" d="M0,190 C100,182 200,198 300,188 C400,178 480,195 520,188 L520,210 L0,210 Z" rx="20"/>
  <path class="wave-1" d="M0,180 C80,170 160,195 260,180 C360,165 440,190 520,175 L520,210 L0,210 Z" rx="20"/>
  <rect x="1" y="1" width="518" height="208" rx="19" fill="none" stroke="#1a4a6a" stroke-width="1"/>
  
  <g transform="translate(35, 40)">
    <text class="label">Current Streak</text>
    <text y="34" class="stat">🌊 {{currentStreak}}</text>
    <text y="54" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(210, 40)">
    <text class="label">Personal Best</text>
    <text y="34" class="stat">⚡ {{personalBest}}</text>
    <text y="54" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(390, 40)">
    <text class="label">Total</text>
    <text y="34" class="stat">{{totalContribs}}+</text>
    <text y="54" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(35, 115)">
    <rect x="0" width="58" height="44" rx="10" fill="var(--l{{day0Level}})" opacity="0.85"/>
    <text x="29" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day0Label}}</text>
    <text x="29" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="66" width="58" height="44" rx="10" fill="var(--l{{day1Level}})" opacity="0.85"/>
    <text x="95" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day1Label}}</text>
    <text x="95" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="132" width="58" height="44" rx="10" fill="var(--l{{day2Level}})" opacity="0.85"/>
    <text x="161" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day2Label}}</text>
    <text x="161" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="198" width="58" height="44" rx="10" fill="var(--l{{day3Level}})" opacity="0.85"/>
    <text x="227" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day3Label}}</text>
    <text x="227" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="264" width="58" height="44" rx="10" fill="var(--l{{day4Level}})" opacity="0.85"/>
    <text x="293" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day4Label}}</text>
    <text x="293" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="330" width="58" height="44" rx="10" fill="var(--l{{day5Level}})" opacity="0.85"/>
    <text x="359" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day5Label}}</text>
    <text x="359" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="396" width="58" height="44" rx="10" fill="var(--l{{day6Level}})" opacity="0.85"/>
    <text x="425" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day6Label}}</text>
    <text x="425" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="500" y="200" text-anchor="end" font-size="8" fill="#1a4a6a">{{lastUpdated}}</text>
</svg>`;
