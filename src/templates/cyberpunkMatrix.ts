export const cyberpunkMatrix = `<svg width="460" height="190" viewBox="0 0 460 190" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #0a0a0a; --l1: #002200; --l2: #004400; --l3: #008800; --l4: #00ff41; --text-l0: #003300; --text-l1: #00aa00; --text-l2: #00dd00; --text-l3: #00ff41; --text-l4: #000000; }
    @keyframes scanline {
      0% { transform: translateY(-190px); }
      100% { transform: translateY(190px); }
    }
    @keyframes flicker {
      0%, 100% { opacity: 1; }
      92% { opacity: 1; }
      93% { opacity: 0.3; }
      94% { opacity: 1; }
      96% { opacity: 0.8; }
      97% { opacity: 1; }
    }
    @keyframes cursorBlink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .screen { animation: flicker 5s linear infinite; }
    .label { font: bold 10px monospace; fill: #00aa00; text-transform: uppercase; letter-spacing: 2px; }
    .stat { font: bold 24px monospace; fill: #00ff41; }
    .date { font: 9px monospace; fill: #005500; }
    .cursor { animation: cursorBlink 1s steps(1) infinite; }
    .scanline-bar { animation: scanline 4s linear infinite; }
  </style>
  <rect width="460" height="190" rx="8" fill="#0a0a0a"/>
  <rect x="1" y="1" width="458" height="188" rx="7" fill="none" stroke="#00ff41" stroke-width="1" opacity="0.3"/>
  
  <rect x="0" y="0" width="460" height="4" fill="#00ff41" opacity="0.05" class="scanline-bar"/>
  
  <g class="screen">
    <g transform="translate(25, 35)">
      <text class="label">$ streak.current</text>
      <text y="28" class="stat">{{currentStreak}}<tspan class="cursor" font-size="24">_</tspan></text>
      <text y="46" class="date">{{currentStreakDate}}</text>
    </g>
    <g transform="translate(185, 35)">
      <text class="label">$ streak.best</text>
      <text y="28" class="stat">{{personalBest}}</text>
      <text y="46" class="date">{{personalBestDate}}</text>
    </g>
    <g transform="translate(335, 35)">
      <text class="label">$ total</text>
      <text y="28" class="stat">{{totalContribs}}</text>
      <text y="46" class="date">{{totalContribsDate}}</text>
    </g>
    
    <g transform="translate(25, 110)">
      <rect x="0" width="50" height="46" rx="2" fill="var(--l{{day0Level}})" stroke="#003300" stroke-width="1"/>
      <text x="25" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day0Label}}</text>
      <text x="25" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
      
      <rect x="58" width="50" height="46" rx="2" fill="var(--l{{day1Level}})" stroke="#003300" stroke-width="1"/>
      <text x="83" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day1Label}}</text>
      <text x="83" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
      
      <rect x="116" width="50" height="46" rx="2" fill="var(--l{{day2Level}})" stroke="#003300" stroke-width="1"/>
      <text x="141" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day2Label}}</text>
      <text x="141" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
      
      <rect x="174" width="50" height="46" rx="2" fill="var(--l{{day3Level}})" stroke="#003300" stroke-width="1"/>
      <text x="199" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day3Label}}</text>
      <text x="199" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
      
      <rect x="232" width="50" height="46" rx="2" fill="var(--l{{day4Level}})" stroke="#003300" stroke-width="1"/>
      <text x="257" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day4Label}}</text>
      <text x="257" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
      
      <rect x="290" width="50" height="46" rx="2" fill="var(--l{{day5Level}})" stroke="#003300" stroke-width="1"/>
      <text x="315" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day5Label}}</text>
      <text x="315" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
      
      <rect x="348" width="50" height="46" rx="2" fill="var(--l{{day6Level}})" stroke="#003300" stroke-width="1"/>
      <text x="373" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day6Label}}</text>
      <text x="373" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
    </g>
  </g>
  
  <text x="440" y="182" text-anchor="end" font-size="7" font-family="monospace" fill="#003300">{{lastUpdated}}</text>
</svg>`;
