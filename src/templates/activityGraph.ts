export const activityGraph = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
  <style>
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
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
    .graph-line { fill: none; stroke: #00d26a; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1000; animation: growLine 1.5s ease-out forwards; }
    .area-fill { fill: url(#activityGrad); opacity: 0.85; }
    .data-point { fill: #121820; stroke: #00d26a; stroke-width: 2.5; transition: transform 0.2s; }
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
    <!-- Max line -->
    <line x1="0" y1="10" x2="520" y2="10" class="grid-line"/>
    <text x="-12" y="13" text-anchor="end" class="axis-label">High</text>

    <!-- Mid line -->
    <line x1="0" y1="55" x2="520" y2="55" class="grid-line"/>
    <text x="-12" y="58" text-anchor="end" class="axis-label">Med</text>

    <!-- Baseline 0 -->
    <line x1="0" y1="100" x2="520" y2="100" stroke="#334155" stroke-width="1.2"/>
    <text x="-12" y="103" text-anchor="end" class="axis-label">0</text>
  </g>

  <!-- Dynamic Area Fill -->
  <path class="area-fill" d="
    M 65,calc(160px - var(--day0Level, 0) * 22.5px)
    C 107,calc(160px - var(--day0Level, 0) * 22.5px) 107,calc(160px - var(--day1Level, 0) * 22.5px) 150,calc(160px - var(--day1Level, 0) * 22.5px)
    C 192,calc(160px - var(--day1Level, 0) * 22.5px) 192,calc(160px - var(--day2Level, 0) * 22.5px) 235,calc(160px - var(--day2Level, 0) * 22.5px)
    C 277,calc(160px - var(--day2Level, 0) * 22.5px) 277,calc(160px - var(--day3Level, 0) * 22.5px) 320,calc(160px - var(--day3Level, 0) * 22.5px)
    C 362,calc(160px - var(--day3Level, 0) * 22.5px) 362,calc(160px - var(--day4Level, 0) * 22.5px) 405,calc(160px - var(--day4Level, 0) * 22.5px)
    C 447,calc(160px - var(--day4Level, 0) * 22.5px) 447,calc(160px - var(--day5Level, 0) * 22.5px) 490,calc(160px - var(--day5Level, 0) * 22.5px)
    C 532,calc(160px - var(--day5Level, 0) * 22.5px) 532,calc(160px - var(--day6Level, 0) * 22.5px) 555,calc(160px - var(--day6Level, 0) * 22.5px)
    L 555,160
    L 65,160
    Z
  "/>

  <!-- Curved Activity Graph Line -->
  <path class="graph-line" filter="url(#glow)" d="
    M 65,calc(160px - var(--day0Level, 0) * 22.5px)
    C 107,calc(160px - var(--day0Level, 0) * 22.5px) 107,calc(160px - var(--day1Level, 0) * 22.5px) 150,calc(160px - var(--day1Level, 0) * 22.5px)
    C 192,calc(160px - var(--day1Level, 0) * 22.5px) 192,calc(160px - var(--day2Level, 0) * 22.5px) 235,calc(160px - var(--day2Level, 0) * 22.5px)
    C 277,calc(160px - var(--day2Level, 0) * 22.5px) 277,calc(160px - var(--day3Level, 0) * 22.5px) 320,calc(160px - var(--day3Level, 0) * 22.5px)
    C 362,calc(160px - var(--day3Level, 0) * 22.5px) 362,calc(160px - var(--day4Level, 0) * 22.5px) 405,calc(160px - var(--day4Level, 0) * 22.5px)
    C 447,calc(160px - var(--day4Level, 0) * 22.5px) 447,calc(160px - var(--day5Level, 0) * 22.5px) 490,calc(160px - var(--day5Level, 0) * 22.5px)
    C 532,calc(160px - var(--day5Level, 0) * 22.5px) 532,calc(160px - var(--day6Level, 0) * 22.5px) 555,calc(160px - var(--day6Level, 0) * 22.5px)
  "/>

  <!-- Data Nodes (Day 0 to Day 6) -->
  <!-- Day 0 -->
  <g transform="translate(65, 0)">
    <circle cx="0" cy="calc(160px - var(--day0Level, 0) * 22.5px)" r="5" class="data-point"/>
    <text x="0" y="calc(146px - var(--day0Level, 0) * 22.5px)" text-anchor="middle" class="point-badge">{{day0Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day0Label}}</text>
  </g>

  <!-- Day 1 -->
  <g transform="translate(150, 0)">
    <circle cx="0" cy="calc(160px - var(--day1Level, 0) * 22.5px)" r="5" class="data-point"/>
    <text x="0" y="calc(146px - var(--day1Level, 0) * 22.5px)" text-anchor="middle" class="point-badge">{{day1Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day1Label}}</text>
  </g>

  <!-- Day 2 -->
  <g transform="translate(235, 0)">
    <circle cx="0" cy="calc(160px - var(--day2Level, 0) * 22.5px)" r="5" class="data-point"/>
    <text x="0" y="calc(146px - var(--day2Level, 0) * 22.5px)" text-anchor="middle" class="point-badge">{{day2Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day2Label}}</text>
  </g>

  <!-- Day 3 -->
  <g transform="translate(320, 0)">
    <circle cx="0" cy="calc(160px - var(--day3Level, 0) * 22.5px)" r="5" class="data-point"/>
    <text x="0" y="calc(146px - var(--day3Level, 0) * 22.5px)" text-anchor="middle" class="point-badge">{{day3Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day3Label}}</text>
  </g>

  <!-- Day 4 -->
  <g transform="translate(405, 0)">
    <circle cx="0" cy="calc(160px - var(--day4Level, 0) * 22.5px)" r="5" class="data-point"/>
    <text x="0" y="calc(146px - var(--day4Level, 0) * 22.5px)" text-anchor="middle" class="point-badge">{{day4Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day4Label}}</text>
  </g>

  <!-- Day 5 -->
  <g transform="translate(490, 0)">
    <circle cx="0" cy="calc(160px - var(--day5Level, 0) * 22.5px)" r="5" class="data-point"/>
    <text x="0" y="calc(146px - var(--day5Level, 0) * 22.5px)" text-anchor="middle" class="point-badge">{{day5Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day5Label}}</text>
  </g>

  <!-- Day 6 -->
  <g transform="translate(555, 0)">
    <circle cx="0" cy="calc(160px - var(--day6Level, 0) * 22.5px)" r="5" class="data-point"/>
    <text x="0" y="calc(146px - var(--day6Level, 0) * 22.5px)" text-anchor="middle" class="point-badge">{{day6Count}}</text>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day6Label}}</text>
  </g>

  <!-- Footer Date / Info -->
  <text x="570" y="222" text-anchor="end" class="axis-label" fill="#4a5568">{{lastUpdated}}</text>
</svg>`;
