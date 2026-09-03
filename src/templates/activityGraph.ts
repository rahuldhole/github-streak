export const activityGraph = `<!-- 
  =============================================================
  HOW TO USE (PURE CSS GRAPH WITH BOUNDARIES):
  1. On <svg>: Set 'css-var-max' to your highest value, or use {{maxCount}}
     for automatic dynamic scaling.
  2. On each dot: Set 'css-var-val: X;' to your raw value (or {{dayXCount}}).
  3. Update the text label inside <text> to match your value.
  Pure CSS clamp() guarantees dots NEVER move out of the widget frame!
  =============================================================
-->

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240" style="--max: {{maxCount}}; --track-h: 90px;">
  <style>
    /* 
      Boundaries Formula:
      Guarantees dots NEVER fly outside the widget bounds (0px to -track-h),
      even if commits are 200+, 1000s, or 0.
      - Lower boundary (floor):  0px (Y=160 baseline)
      - Upper boundary (ceiling): calc(-1 * var(--track-h)) (Y=70 peak / High grid line)
      - Zero-safe: max(var(--max, 1), 1) avoids division by zero
    */
    @keyframes riseUp {
      from { 
        transform: translateY(0px); 
      }
      to { 
        transform: translateY(clamp(
          calc(-1 * var(--track-h)),
          calc(-1 * var(--val, 0) * (var(--track-h) / max(var(--max, 1), 1))),
          0px
        )); 
      }
    }

    @keyframes popIn {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      70% {
        opacity: 1;
        transform: scale(1.35);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes badgeRise {
      0% {
        opacity: 0;
        transform: translateY(6px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulseRing {
      0% {
        r: 5px;
        opacity: 0.8;
        stroke-width: 2px;
      }
      80%, 100% {
        r: 15px;
        opacity: 0;
        stroke-width: 0.5px;
      }
    }

    @keyframes fadeInSoft {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* --- Base Styles --- */
    .bg { fill: #121820; stroke: #2d3748; stroke-width: 1.5; rx: 16px; }
    .header-group, .grid-group { animation: fadeInSoft 0.8s ease-out forwards; }
    .grid-line { stroke: #243044; stroke-width: 1; stroke-dasharray: 4,4; }
    .axis-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10px; fill: #6b7c96; }
    .day-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; font-weight: 600; fill: #8fa0bc; }
    .header-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; font-weight: 700; fill: #00d26a; letter-spacing: 0.5px; }
    .header-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; fill: #8fa0bc; }
    .header-val { font-weight: 700; fill: #ffffff; }

    /* --- Node Animation and Interaction --- */
    .data-point {
      fill: #121820;
      stroke: #00d26a;
      stroke-width: 2.5;
      transform-box: fill-box;
      transform-origin: center;
      animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
      transition: transform 0.2s ease, stroke-width 0.2s ease, fill 0.2s ease;
      cursor: pointer;
    }

    .point-badge {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      font-weight: bold;
      fill: #ffffff;
      animation: badgeRise 0.4s ease-out backwards;
      transition: fill 0.2s ease;
      cursor: pointer;
    }

    /* Staggered Timings across the 7 days */
    .d0 .data-point, .d0 .point-badge { animation-delay: 0.20s; }
    .d1 .data-point, .d1 .point-badge { animation-delay: 0.35s; }
    .d2 .data-point, .d2 .point-badge { animation-delay: 0.50s; }
    .d3 .data-point, .d3 .point-badge { animation-delay: 0.65s; }
    .d4 .data-point, .d4 .point-badge { animation-delay: 0.80s; }
    .d5 .data-point, .d5 .point-badge { animation-delay: 0.95s; }
    .d6 .data-point, .d6 .point-badge { animation-delay: 1.10s; }

    /* Dynamic CSS-calculated vertical rise animation with strict boundaries */
    .dot-mover {
      transform: translateY(clamp(
        calc(-1 * var(--track-h)),
        calc(-1 * var(--val, 0) * (var(--track-h) / max(var(--max, 1), 1))),
        0px
      ));
      animation: riseUp var(--dur, 900ms) cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .d0 .dot-mover { animation-delay: 0.15s; }
    .d1 .dot-mover { animation-delay: 0.30s; }
    .d2 .dot-mover { animation-delay: 0.45s; }
    .d3 .dot-mover { animation-delay: 0.60s; }
    .d4 .dot-mover { animation-delay: 0.75s; }
    .d5 .dot-mover { animation-delay: 0.90s; }
    .d6 .dot-mover { animation-delay: 1.05s; }

    /* Live pulse marker on the most recent day (Day 6) */
    .live-pulse {
      fill: none;
      stroke: #00d26a;
      animation: pulseRing 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
      animation-delay: 1.3s;
    }

    /* Hover States */
    .node-group:hover .data-point {
      transform: scale(1.4);
      stroke-width: 3.5px;
      fill: #00d26a;
    }
    .node-group:hover .point-badge {
      fill: #00d26a;
    }
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

  <!-- Header -->
  <g transform="translate(30, 32)" class="header-group">
    <text class="header-title">📈 ACTIVITY GRAPH</text>
    <text x="540" text-anchor="end" class="header-stat">
      Streak: <tspan class="header-val">{{currentStreak}}d</tspan>
      &#160;&#160;|&#160;&#160;
      Best: <tspan class="header-val">{{personalBest}}d</tspan>
      &#160;&#160;|&#160;&#160;
      Total: <tspan class="header-val">{{totalContribs}}</tspan>
    </text>
  </g>

  <!-- Horizontal Grid Lines and Y-Axis Reference -->
  <g transform="translate(50, 60)" class="grid-group">
    <line x1="0" y1="10" x2="520" y2="10" class="grid-line"/>
    <text x="-12" y="13" text-anchor="end" class="axis-label">High</text>

    <line x1="0" y1="55" x2="520" y2="55" class="grid-line"/>
    <text x="-12" y="58" text-anchor="end" class="axis-label">Med</text>

    <line x1="0" y1="100" x2="520" y2="100" stroke="#334155" stroke-width="1.2"/>
    <text x="-12" y="103" text-anchor="end" class="axis-label">0</text>
  </g>

  <!-- Data Nodes (Day 0 to Day 6) -->
  <!-- Day 0 -->
  <g transform="translate(70, 0)" class="node-group d0">
    <g transform="translate(0, 160)">
      <g class="dot-mover" style="--val: {{day0Count}}; --dur: 800ms;">
        <circle cx="0" cy="0" r="5" class="data-point"/>
        <text x="0" y="-14" text-anchor="middle" class="point-badge">{{day0Count}}</text>
      </g>
    </g>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day0Label}}</text>
  </g>

  <!-- Day 1 -->
  <g transform="translate(150, 0)" class="node-group d1">
    <g transform="translate(0, 160)">
      <g class="dot-mover" style="--val: {{day1Count}}; --dur: 850ms;">
        <circle cx="0" cy="0" r="5" class="data-point"/>
        <text x="0" y="-14" text-anchor="middle" class="point-badge">{{day1Count}}</text>
      </g>
    </g>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day1Label}}</text>
  </g>

  <!-- Day 2 -->
  <g transform="translate(230, 0)" class="node-group d2">
    <g transform="translate(0, 160)">
      <g class="dot-mover" style="--val: {{day2Count}}; --dur: 900ms;">
        <circle cx="0" cy="0" r="5" class="data-point"/>
        <text x="0" y="-14" text-anchor="middle" class="point-badge">{{day2Count}}</text>
      </g>
    </g>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day2Label}}</text>
  </g>

  <!-- Day 3 -->
  <g transform="translate(310, 0)" class="node-group d3">
    <g transform="translate(0, 160)">
      <g class="dot-mover" style="--val: {{day3Count}}; --dur: 950ms;">
        <circle cx="0" cy="0" r="5" class="data-point"/>
        <text x="0" y="-14" text-anchor="middle" class="point-badge">{{day3Count}}</text>
      </g>
    </g>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day3Label}}</text>
  </g>

  <!-- Day 4 -->
  <g transform="translate(390, 0)" class="node-group d4">
    <g transform="translate(0, 160)">
      <g class="dot-mover" style="--val: {{day4Count}}; --dur: 1000ms;">
        <circle cx="0" cy="0" r="5" class="data-point"/>
        <text x="0" y="-14" text-anchor="middle" class="point-badge">{{day4Count}}</text>
      </g>
    </g>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day4Label}}</text>
  </g>

  <!-- Day 5 -->
  <g transform="translate(470, 0)" class="node-group d5">
    <g transform="translate(0, 160)">
      <g class="dot-mover" style="--val: {{day5Count}}; --dur: 1050ms;">
        <circle cx="0" cy="0" r="5" class="data-point"/>
        <text x="0" y="-14" text-anchor="middle" class="point-badge">{{day5Count}}</text>
      </g>
    </g>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day5Label}}</text>
  </g>

  <!-- Day 6 (Active / Most Recent Day) -->
  <g transform="translate(550, 0)" class="node-group d6">
    <g transform="translate(0, 160)">
      <g class="dot-mover" style="--val: {{day6Count}}; --dur: 1100ms;">
        <!-- Pulse radar ring behind node -->
        <circle cx="0" cy="0" class="live-pulse"/>
        <circle cx="0" cy="0" r="5" class="data-point"/>
        <text x="0" y="-14" text-anchor="middle" class="point-badge">{{day6Count}}</text>
      </g>
    </g>
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day6Label}}</text>
  </g>

  <!-- Footer Info -->
  <text x="570" y="222" text-anchor="end" class="axis-label header-group">{{lastUpdated}}</text>
</svg>`;
