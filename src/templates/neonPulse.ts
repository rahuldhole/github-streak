export const neonPulse = `<svg width="480" height="200" viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #0a0a1a; --l1: #1a0a3a; --l2: #3a1a6a; --l3: #6a2aaa; --l4: #aa3aff; --text-l0: #666688; --text-l1: #aa88ff; --text-l2: #ddbbff; --text-l3: #ffffff; --text-l4: #ffffff; }
    @keyframes neonGlow {
      0%, 100% { filter: drop-shadow(0 0 4px #aa3aff) drop-shadow(0 0 8px #6a2aaa); }
      50% { filter: drop-shadow(0 0 8px #aa3aff) drop-shadow(0 0 20px #6a2aaa) drop-shadow(0 0 30px #3a1a6a); }
    }
    @keyframes textPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    @keyframes borderPulse {
      0%, 100% { stroke-opacity: 0.6; }
      50% { stroke-opacity: 1; }
    }
    .card { animation: neonGlow 3s ease-in-out infinite; }
    .label { font: bold 10px sans-serif; fill: #aa88ff; text-transform: uppercase; letter-spacing: 2px; animation: textPulse 3s ease-in-out infinite; }
    .stat { font: bold 28px sans-serif; fill: #ffffff; }
    .date { font: 10px sans-serif; fill: #666688; }
    .neon-border { stroke: #aa3aff; stroke-width: 2; animation: borderPulse 3s ease-in-out infinite; }
    .day-tile { rx: 6; }
  </style>
  <rect width="480" height="200" rx="16" fill="#0a0a1a" class="card"/>
  <rect x="1" y="1" width="478" height="198" rx="15" fill="none" class="neon-border"/>
  
  <line x1="160" y1="20" x2="160" y2="90" stroke="#aa3aff" stroke-width="1" opacity="0.3"/>
  <line x1="320" y1="20" x2="320" y2="90" stroke="#aa3aff" stroke-width="1" opacity="0.3"/>
  
  <g transform="translate(30, 40)">
    <text class="label">Current Streak</text>
    <text y="32" class="stat">{{currentStreak}}</text>
    <text y="52" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(190, 40)">
    <text class="label">Personal Best</text>
    <text y="32" class="stat">{{personalBest}}</text>
    <text y="52" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(350, 40)">
    <text class="label">Total</text>
    <text y="32" class="stat">{{totalContribs}}+</text>
    <text y="52" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(30, 120)">
    <rect x="0" width="52" height="48" class="day-tile" fill="var(--l{{day0Level}})"/>
    <text x="26" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day0Label}}</text>
    <text x="26" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="60" width="52" height="48" class="day-tile" fill="var(--l{{day1Level}})"/>
    <text x="86" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day1Label}}</text>
    <text x="86" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="120" width="52" height="48" class="day-tile" fill="var(--l{{day2Level}})"/>
    <text x="146" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day2Label}}</text>
    <text x="146" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="180" width="52" height="48" class="day-tile" fill="var(--l{{day3Level}})"/>
    <text x="206" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day3Label}}</text>
    <text x="206" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="240" width="52" height="48" class="day-tile" fill="var(--l{{day4Level}})"/>
    <text x="266" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day4Label}}</text>
    <text x="266" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="300" width="52" height="48" class="day-tile" fill="var(--l{{day5Level}})"/>
    <text x="326" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day5Label}}</text>
    <text x="326" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="360" width="52" height="48" class="day-tile" fill="var(--l{{day6Level}})"/>
    <text x="386" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day6Label}}</text>
    <text x="386" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="460" y="190" text-anchor="end" font-size="8" fill="#444466">{{lastUpdated}}</text>
</svg>`;
