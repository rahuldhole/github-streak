export const activityGraph = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
  <style>
    @keyframes growLine {
      from { stroke-dashoffset: 1000; }
      to { stroke-dashoffset: 0; }
    }
    .bg { fill: #121820; stroke: #2d3748; stroke-width: 1.5; rx: 16px; }
    .grid-line { stroke: #243044; stroke-width: 1; stroke-dasharray: 4,4; }
    .axis-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10px; fill: #6b7c96; }
    .day-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; font-weight: 600; fill: #8fa0bc; }
    .header-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; font-weight: 700; fill: #00d26a; letter-spacing: 0.5px; }
    .header-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; fill: #8fa0bc; }
    .header-val { font-weight: 700; fill: #ffffff; }
    .graph-line { fill: none; stroke: #00d26a; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: growLine 1.5s ease-out forwards; }
    .area-fill { fill: url(#activityGrad); opacity: 0.85; }
    .data-point { fill: #121820; stroke: #00d26a; stroke-width: 2.5; }
    .point-badge { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10px; font-weight: bold; fill: #ffffff; }
  </style>

  <defs>
    <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#00d26a" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#00d26a" stop-opacity="0.0"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#00d26a" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Card Background -->
  <rect width="600" height="240" class="bg"/>

  <!-- Header: Title & Quick Stats -->
  <g transform="translate(30, 32)">
    <text class="header-title">📈 ACTIVITY GRAPH</text>
    <text x="540" text-anchor="end" class="header-stat">
      Streak: <tspan class="header-val">{{currentStreak}}d</tspan>
      &#160;&#160;|&#160;&#160;
      Best: <tspan class="header-val">{{personalBest}}d</tspan>
      &#160;&#160;|&#160;&#160;
      Total: <tspan class="header-val">{{totalContribs}}</tspan>
    </text>
  </g>

  <!-- Horizontal Grid Lines & Y-Axis Reference -->
  <g transform="translate(50, 60)">
    <!-- Max line (y = 70) -->
    <line x1="0" y1="10" x2="520" y2="10" class="grid-line"/>
    <text x="-12" y="13" text-anchor="end" class="axis-label">High</text>

    <!-- Mid line (y = 115) -->
    <line x1="0" y1="55" x2="520" y2="55" class="grid-line"/>
    <text x="-12" y="58" text-anchor="end" class="axis-label">Med</text>

    <!-- Baseline 0 (y = 160) -->
    <line x1="0" y1="100" x2="520" y2="100" stroke="#334155" stroke-width="1.2"/>
    <text x="-12" y="103" text-anchor="end" class="axis-label">0</text>
  </g>

  <!-- Dynamic Area Fill -->
  <path class="area-fill" d="
    M 70,126
    C 110,126 110,93 150,93
    C 190,93 190,115 230,115
    C 270,115 270,70 310,70
    C 350,70 350,88 390,88
    C 430,88 430,120 470,120
    C 510,120 510,138 550,138
    L 550,160
    L 70,160
    Z
  "/>

  <!-- Curved Activity Graph Line -->
  <path class="graph-line" filter="url(#glow)" d="
    M 70,126
    C 110,126 110,93 150,93
    C 190,93 190,115 230,115
    C 270,115 270,70 310,70
    C 350,70 350,88 390,88
    C 430,88 430,120 470,120
    C 510,120 510,138 550,138
  "/>

  <!-- Data Nodes (Day 0 to Day 6, evenly spaced at 80px steps) -->
  <!-- Day 0 -->
  <g transform="translate(70, 0)">
    <circle cx="0" cy="126" r="5" class="data-point"/>
    <text x="0" y="112" text-anchor="middle" class="point-badge">{{day0Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day0Label}}</text>
  </g>

  <!-- Day 1 -->
  <g transform="translate(150, 0)">
    <circle cx="0" cy="93" r="5" class="data-point"/>
    <text x="0" y="79" text-anchor="middle" class="point-badge">{{day1Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day1Label}}</text>
  </g>

  <!-- Day 2 -->
  <g transform="translate(230, 0)">
    <circle cx="0" cy="115" r="5" class="data-point"/>
    <text x="0" y="101" text-anchor="middle" class="point-badge">{{day2Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day2Label}}</text>
  </g>

  <!-- Day 3 -->
  <g transform="translate(310, 0)">
    <circle cx="0" cy="70" r="5" class="data-point"/>
    <text x="0" y="56" text-anchor="middle" class="point-badge">{{day3Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day3Label}}</text>
  </g>

  <!-- Day 4 -->
  <g transform="translate(390, 0)">
    <circle cx="0" cy="88" r="5" class="data-point"/>
    <text x="0" y="74" text-anchor="middle" class="point-badge">{{day4Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day4Label}}</text>
  </g>

  <!-- Day 5 -->
  <g transform="translate(470, 0)">
    <circle cx="0" cy="120" r="5" class="data-point"/>
    <text x="0" y="106" text-anchor="middle" class="point-badge">{{day5Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day5Label}}</text>
  </g>

  <!-- Day 6 -->
  <g transform="translate(550, 0)">
    <circle cx="0" cy="138" r="5" class="data-point"/>
    <text x="0" y="124" text-anchor="middle" class="point-badge">{{day6Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day6Label}}</text>
  </g>

  <!-- Footer Info -->
  <text x="570" y="222" text-anchor="end" class="axis-label">{{lastUpdated}}</text>
</svg>`;
