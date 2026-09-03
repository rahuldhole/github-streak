export const auroraBorealis = `<svg width="500" height="220" viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #0f1729; --l1: #1a3a4a; --l2: #2a6a5a; --l3: #4aaa7a; --l4: #6aeaaa; --text-l0: #4a6a7a; --text-l1: #8ababa; --text-l2: #cceedd; --text-l3: #ffffff; --text-l4: #0f1729; }
    @keyframes auroraShift1 {
      0%   { stop-color: #00c9a7; stop-opacity: 0.4; }
      33%  { stop-color: #845ec2; stop-opacity: 0.6; }
      66%  { stop-color: #0081cf; stop-opacity: 0.5; }
      100% { stop-color: #00c9a7; stop-opacity: 0.4; }
    }
    @keyframes auroraShift2 {
      0%   { stop-color: #ff6f91; stop-opacity: 0.3; }
      33%  { stop-color: #00c9a7; stop-opacity: 0.5; }
      66%  { stop-color: #845ec2; stop-opacity: 0.4; }
      100% { stop-color: #ff6f91; stop-opacity: 0.3; }
    }
    @keyframes auroraShift3 {
      0%   { stop-color: #0081cf; stop-opacity: 0.2; }
      33%  { stop-color: #ff6f91; stop-opacity: 0.3; }
      66%  { stop-color: #00c9a7; stop-opacity: 0.4; }
      100% { stop-color: #0081cf; stop-opacity: 0.2; }
    }
    .aurora-1 { animation: auroraShift1 8s ease-in-out infinite; }
    .aurora-2 { animation: auroraShift2 8s ease-in-out infinite; }
    .aurora-3 { animation: auroraShift3 8s ease-in-out infinite; }
    .label { font: bold 11px sans-serif; fill: #6aeaaa; text-transform: uppercase; letter-spacing: 1.5px; }
    .stat { font: bold 26px sans-serif; fill: #e0f8f0; }
    .date { font: 10px sans-serif; fill: #4a6a7a; }
  </style>
  <defs>
    <linearGradient id="aurora-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" class="aurora-1" />
      <stop offset="50%" class="aurora-2" />
      <stop offset="100%" class="aurora-3" />
    </linearGradient>
  </defs>
  <rect width="500" height="220" rx="20" fill="#0a0f1e"/>
  <rect width="500" height="220" rx="20" fill="url(#aurora-bg)"/>
  <rect x="1" y="1" width="498" height="218" rx="19" fill="none" stroke="#2a4a5a" stroke-width="1"/>
  
  <g transform="translate(35, 45)">
    <text class="label">Current Streak</text>
    <text y="34" class="stat">🔥 {{currentStreak}}</text>
    <text y="54" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(200, 45)">
    <text class="label">Personal Best</text>
    <text y="34" class="stat">🏆 {{personalBest}}</text>
    <text y="54" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(370, 45)">
    <text class="label">Total</text>
    <text y="34" class="stat">✨ {{totalContribs}}+</text>
    <text y="54" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(35, 130)">
    <rect x="0" width="56" height="52" rx="10" fill="var(--l{{day0Level}})" opacity="0.9"/>
    <text x="28" y="16" text-anchor="middle" font-size="9" fill="#4a6a7a">{{day0Label}}</text>
    <text x="28" y="38" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="64" width="56" height="52" rx="10" fill="var(--l{{day1Level}})" opacity="0.9"/>
    <text x="92" y="16" text-anchor="middle" font-size="9" fill="#4a6a7a">{{day1Label}}</text>
    <text x="92" y="38" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="128" width="56" height="52" rx="10" fill="var(--l{{day2Level}})" opacity="0.9"/>
    <text x="156" y="16" text-anchor="middle" font-size="9" fill="#4a6a7a">{{day2Label}}</text>
    <text x="156" y="38" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="192" width="56" height="52" rx="10" fill="var(--l{{day3Level}})" opacity="0.9"/>
    <text x="220" y="16" text-anchor="middle" font-size="9" fill="#4a6a7a">{{day3Label}}</text>
    <text x="220" y="38" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="256" width="56" height="52" rx="10" fill="var(--l{{day4Level}})" opacity="0.9"/>
    <text x="284" y="16" text-anchor="middle" font-size="9" fill="#4a6a7a">{{day4Label}}</text>
    <text x="284" y="38" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="320" width="56" height="52" rx="10" fill="var(--l{{day5Level}})" opacity="0.9"/>
    <text x="348" y="16" text-anchor="middle" font-size="9" fill="#4a6a7a">{{day5Label}}</text>
    <text x="348" y="38" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="384" width="56" height="52" rx="10" fill="var(--l{{day6Level}})" opacity="0.9"/>
    <text x="412" y="16" text-anchor="middle" font-size="9" fill="#4a6a7a">{{day6Label}}</text>
    <text x="412" y="38" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="480" y="210" text-anchor="end" font-size="8" fill="#2a4a5a">{{lastUpdated}}</text>
</svg>`;
