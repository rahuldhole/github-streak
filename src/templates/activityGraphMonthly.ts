export const activityGraphMonthly = `<!-- 
  =============================================================
  HOW TO USE (PURE CSS 30-DAY GRAPH WITH BOUNDARIES):
  1. On <svg>: Set 'css-var-max' to your highest value, or use {{maxCount}}
     for automatic dynamic scaling.
  2. On each dot: Set 'css-var-val: X;' (or {{dayXCount}}).
  3. Pure CSS clamp() strictly bounds dots between baseline (0px)
     and peak (90px), ensuring elements NEVER move out of the frame!
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
        transform: scale(1.3);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes pulseRing {
      0% {
        r: 4px;
        opacity: 0.8;
        stroke-width: 2px;
      }
      80%, 100% {
        r: 14px;
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
    .day-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10px; font-weight: 600; fill: #8fa0bc; }
    .header-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; font-weight: 700; fill: #00d26a; letter-spacing: 0.5px; }
    .header-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; fill: #8fa0bc; }
    .header-val { font-weight: 700; fill: #ffffff; }

    /* --- Node Animation and Interaction --- */
    .data-point {
      fill: #121820;
      stroke: #00d26a;
      stroke-width: 2;
      transform-box: fill-box;
      transform-origin: center;
      animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
      transition: transform 0.2s ease, stroke-width 0.2s ease, fill 0.2s ease;
      cursor: pointer;
    }

    .node-group:hover .data-point {
      transform: scale(1.6);
      stroke-width: 2.5px;
      fill: #00d26a;
    }

    .tooltip {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 9px;
      font-weight: 700;
      fill: #ffffff;
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
    }

    .node-group:hover .tooltip {
      opacity: 1;
    }

    /* Live pulse on current day */
    .live-pulse {
      fill: none;
      stroke: #00d26a;
      animation: pulseRing 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
      animation-delay: 1.4s;
    }

    /* Dynamic CSS-calculated vertical rise animation with strict boundaries */
    .dot-mover {
      transform: translateY(clamp(
        calc(-1 * var(--track-h)),
        calc(-1 * var(--val, 0) * (var(--track-h) / max(var(--max, 1), 1))),
        0px
      ));
      animation: riseUp var(--dur, 900ms) cubic-bezier(0.16, 1, 0.3, 1) both;
    }
  </style>

  <defs>
    <linearGradient id="activityGrad30" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#00d26a" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#00d26a" stop-opacity="0.0"/>
    </linearGradient>
    <filter id="glow30" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#00d26a" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Card Background -->
  <rect width="600" height="240" class="bg"/>

  <!-- Header -->
  <g transform="translate(30, 32)" class="header-group">
    <text class="header-title">📈 30-DAY ACTIVITY TREND</text>
    <text x="540" text-anchor="end" class="header-stat">
      Streak: <tspan class="header-val">{{currentStreak}}d</tspan>
      &#160;&#160;|&#160;&#160;
      Best: <tspan class="header-val">{{personalBest}}d</tspan>
      &#160;&#160;|&#160;&#160;
      Total: <tspan class="header-val">{{totalContribs}}</tspan>
    </text>
  </g>

  <!-- Horizontal Grid Lines and Y-Axis Reference -->
  <g transform="translate(40, 60)" class="grid-group">
    <line x1="0" y1="10" x2="525" y2="10" class="grid-line"/>
    <text x="-10" y="13" text-anchor="end" class="axis-label">High</text>

    <line x1="0" y1="55" x2="525" y2="55" class="grid-line"/>
    <text x="-10" y="58" text-anchor="end" class="axis-label">Med</text>

    <line x1="0" y1="100" x2="525" y2="100" stroke="#334155" stroke-width="1.2"/>
    <text x="-10" y="103" text-anchor="end" class="axis-label">0</text>
  </g>

  <!-- 30-Day Nodes with hover tooltips and dynamic {{dayXCount}} -->
  <!-- Week 1 (-30 to -24 days) -->
  <g class="node-group" transform="translate(55, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day0Count}}; --dur: 600ms;"><circle cx="0" cy="0" r="3.5" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day0Count}}</text></g></g></g>
  <g class="node-group" transform="translate(72, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day1Count}}; --dur: 620ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day1Count}}</text></g></g></g>
  <g class="node-group" transform="translate(90, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day2Count}}; --dur: 640ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day2Count}}</text></g></g></g>
  <g class="node-group" transform="translate(108, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day3Count}}; --dur: 660ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day3Count}}</text></g></g></g>
  <g class="node-group" transform="translate(125, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day4Count}}; --dur: 680ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day4Count}}</text></g></g></g>
  <g class="node-group" transform="translate(143, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day5Count}}; --dur: 700ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day5Count}}</text></g></g></g>
  <g class="node-group" transform="translate(160, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day6Count}}; --dur: 720ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day6Count}}</text></g></g></g>

  <!-- Week 2 (-23 to -17 days) -->
  <g class="node-group" transform="translate(178, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day7Count}}; --dur: 740ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day7Count}}</text></g></g></g>
  <g class="node-group" transform="translate(195, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day8Count}}; --dur: 760ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day8Count}}</text></g></g></g>
  <g class="node-group" transform="translate(213, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day9Count}}; --dur: 780ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day9Count}}</text></g></g></g>
  <g class="node-group" transform="translate(231, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day10Count}}; --dur: 800ms;"><circle cx="0" cy="0" r="3.5" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day10Count}}</text></g></g></g>
  <g class="node-group" transform="translate(248, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day11Count}}; --dur: 820ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day11Count}}</text></g></g></g>
  <g class="node-group" transform="translate(266, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day12Count}}; --dur: 840ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day12Count}}</text></g></g></g>
  <g class="node-group" transform="translate(283, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day13Count}}; --dur: 860ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day13Count}}</text></g></g></g>

  <!-- Week 3 (-16 to -10 days) -->
  <g class="node-group" transform="translate(301, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day14Count}}; --dur: 880ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day14Count}}</text></g></g></g>
  <g class="node-group" transform="translate(319, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day15Count}}; --dur: 900ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day15Count}}</text></g></g></g>
  <g class="node-group" transform="translate(336, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day16Count}}; --dur: 920ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day16Count}}</text></g></g></g>
  <g class="node-group" transform="translate(354, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day17Count}}; --dur: 940ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day17Count}}</text></g></g></g>
  <g class="node-group" transform="translate(372, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day18Count}}; --dur: 960ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day18Count}}</text></g></g></g>
  <g class="node-group" transform="translate(389, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day19Count}}; --dur: 980ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day19Count}}</text></g></g></g>
  <g class="node-group" transform="translate(407, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day20Count}}; --dur: 1000ms;"><circle cx="0" cy="0" r="3.5" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day20Count}}</text></g></g></g>

  <!-- Week 4 (-9 to -3 days) -->
  <g class="node-group" transform="translate(424, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day21Count}}; --dur: 1020ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day21Count}}</text></g></g></g>
  <g class="node-group" transform="translate(442, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day22Count}}; --dur: 1040ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day22Count}}</text></g></g></g>
  <g class="node-group" transform="translate(460, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day23Count}}; --dur: 1060ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day23Count}}</text></g></g></g>
  <g class="node-group" transform="translate(477, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day24Count}}; --dur: 1080ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day24Count}}</text></g></g></g>
  <g class="node-group" transform="translate(495, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day25Count}}; --dur: 1100ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day25Count}}</text></g></g></g>
  <g class="node-group" transform="translate(512, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day26Count}}; --dur: 1120ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day26Count}}</text></g></g></g>
  <g class="node-group" transform="translate(530, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day27Count}}; --dur: 1140ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day27Count}}</text></g></g></g>

  <!-- Week 5 / Latest (-2 to Today) -->
  <g class="node-group" transform="translate(545, 0)"><g transform="translate(0, 160)"><g class="dot-mover" style="--val: {{day28Count}}; --dur: 1160ms;"><circle cx="0" cy="0" r="3" class="data-point"/><text x="0" y="-12" text-anchor="middle" class="tooltip">{{day28Count}}</text></g></g></g>
  
  <!-- Active / Most Recent Day (Day 29) -->
  <g class="node-group" transform="translate(559, 0)">
    <g transform="translate(0, 160)">
      <g class="dot-mover" style="--val: {{day29Count}}; --dur: 1180ms;">
        <circle cx="0" cy="0" class="live-pulse"/>
        <circle cx="0" cy="0" r="4.5" class="data-point"/>
        <text x="0" y="-12" text-anchor="middle" class="tooltip" style="opacity: 1; fill: #00d26a;">{{day29Count}}</text>
      </g>
    </g>
  </g>

  <!-- Clean timeline markers along X-axis -->
  <g class="grid-group">
    <text x="55" y="185" text-anchor="middle" class="day-label">-30d</text>
    <text x="180" y="185" text-anchor="middle" class="day-label">-3w</text>
    <text x="305" y="185" text-anchor="middle" class="day-label">-2w</text>
    <text x="430" y="185" text-anchor="middle" class="day-label">-1w</text>
    <text x="559" y="185" text-anchor="middle" class="day-label" fill="#00d26a" font-weight="700">Today</text>
  </g>

  <!-- Footer Info -->
  <text x="570" y="222" text-anchor="end" class="axis-label header-group">{{lastUpdated}}</text>
</svg>`;
