export const activityBars = `<!-- 
  =============================================================
  HOW TO USE (PURE CSS BAR CHART):
  1. On <svg>: Set '--max' to your highest value (e.g. 30, 200, 1500).
  2. On each <g class="bar-col">: Set '--val: X;' ONCE.
     Both the bar height and the badge scale together automatically.
  3. Update the text number inside <text class="val-badge"> to match.
  =============================================================
-->

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240" style="--max: 30; --track-h: 100px;">
  <style>
    /* --- Base Styles --- */
    .bg { fill: #121820; stroke: #2d3748; stroke-width: 1.5; rx: 16px; }
    .header-group, .grid-group { animation: fadeInSoft 0.8s ease-out forwards; }
    .grid { stroke: #243044; stroke-width: 1; stroke-dasharray: 4,4; }
    .baseline { stroke: #334155; stroke-width: 1.5; }
    .axis-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10px; fill: #6b7c96; }
    .day-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; font-weight: 600; fill: #8fa0bc; }
    .header-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; font-weight: 700; fill: #00d26a; letter-spacing: 0.5px; }
    .header-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; fill: #8fa0bc; }
    .header-val { font-weight: 700; fill: #ffffff; }

    /* --- Animation --- */
    @keyframes fadeInSoft {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Pushes the bar up through the baseline clip-path to exact height */
    @keyframes riseUp {
      from { transform: translateY(0px); }
      to   { transform: translateY(calc(-1 * var(--val) * (var(--track-h) / var(--max)))); }
    }

    .bar-mover {
      animation: riseUp var(--dur, 850ms) cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .bar {
      fill: url(#barGrad);
      transition: fill 0.2s ease, opacity 0.2s ease;
    }

    .val-badge {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      font-weight: 800;
      fill: #ffffff;
      transition: fill 0.2s ease;
    }

    /* Staggered Timings across the 7 days */
    .d0 .bar-mover { animation-delay: 0.15s; }
    .d1 .bar-mover { animation-delay: 0.30s; }
    .d2 .bar-mover { animation-delay: 0.45s; }
    .d3 .bar-mover { animation-delay: 0.60s; }
    .d4 .bar-mover { animation-delay: 0.75s; }
    .d5 .bar-mover { animation-delay: 0.90s; }
    .d6 .bar-mover { animation-delay: 1.05s; }

    /* Hover Effects */
    .bar-col { cursor: pointer; }
    .bar-col:hover .bar {
      fill: #00d26a;
    }
    .bar-col:hover .val-badge {
      fill: #00d26a;
    }
    .bar-col:hover .day-label {
      fill: #00d26a;
    }
  </style>

  <defs>
    <!-- Working Gradient (Has real width on a rect, so it renders reliably) -->
    <linearGradient id="barGrad" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#00a854" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#00d26a" stop-opacity="1"/>
    </linearGradient>

    <!-- 
      Clipping Window:
      Cuts off everything below the baseline (Y=160), while allowing
      the bars and badges to show between Y=30 and Y=160.
    -->
    <clipPath id="chart-window">
      <rect x="0" y="30" width="600" height="130"/>
    </clipPath>
  </defs>

  <!-- Background Card -->
  <rect width="600" height="240" class="bg"/>

  <!-- Header -->
  <g transform="translate(30, 32)" class="header-group">
    <text class="header-title">📊 WEEKLY ACTIVITY BARS</text>
    <text x="540" text-anchor="end" class="header-stat">
      Streak: <tspan class="header-val">{{currentStreak}}d</tspan>
      &#160;&#160;|&#160;&#160;
      Best: <tspan class="header-val">{{personalBest}}d</tspan>
      &#160;&#160;|&#160;&#160;
      Total: <tspan class="header-val">{{totalContribs}}</tspan>
    </text>
  </g>

  <!-- Y-Axis References (Track Height = 100px: Y=160 floor to Y=60 peak) -->
  <g transform="translate(50, 0)" class="grid-group">
    <line x1="0" y1="60" x2="520" y2="60" class="grid"/>
    <text x="-12" y="63" text-anchor="end" class="axis-label">High</text>

    <line x1="0" y1="110" x2="520" y2="110" class="grid"/>
    <text x="-12" y="113" text-anchor="end" class="axis-label">Med</text>

    <line x1="0" y1="160" x2="520" y2="160" class="baseline"/>
    <text x="-12" y="163" text-anchor="end" class="axis-label">0</text>
  </g>

  <!-- ============================================================
       BARS LAYER (Clipped cleanly at Y=160 baseline)
       ============================================================ -->
  <g clip-path="url(#chart-window)">
    <!-- Day 0 -->
    <g class="bar-col d0" transform="translate(70, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day0Count}}; --dur: 800ms;">
          <rect x="-16" y="0" width="32" height="120" rx="6" class="bar"/>
          <text x="0" y="-10" text-anchor="middle" class="val-badge">{{day0Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 1 -->
    <g class="bar-col d1" transform="translate(150, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day1Count}}; --dur: 850ms;">
          <rect x="-16" y="0" width="32" height="120" rx="6" class="bar"/>
          <text x="0" y="-10" text-anchor="middle" class="val-badge">{{day1Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 2 -->
    <g class="bar-col d2" transform="translate(230, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day2Count}}; --dur: 900ms;">
          <rect x="-16" y="0" width="32" height="120" rx="6" class="bar"/>
          <text x="0" y="-10" text-anchor="middle" class="val-badge">{{day2Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 3 -->
    <g class="bar-col d3" transform="translate(310, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day3Count}}; --dur: 950ms;">
          <rect x="-16" y="0" width="32" height="120" rx="6" class="bar"/>
          <text x="0" y="-10" text-anchor="middle" class="val-badge">{{day3Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 4 -->
    <g class="bar-col d4" transform="translate(390, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day4Count}}; --dur: 1000ms;">
          <rect x="-16" y="0" width="32" height="120" rx="6" class="bar"/>
          <text x="0" y="-10" text-anchor="middle" class="val-badge">{{day4Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 5 -->
    <g class="bar-col d5" transform="translate(470, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day5Count}}; --dur: 1050ms;">
          <rect x="-16" y="0" width="32" height="120" rx="6" class="bar"/>
          <text x="0" y="-10" text-anchor="middle" class="val-badge">{{day5Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 6 (Most Recent Day) -->
    <g class="bar-col d6" transform="translate(550, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day6Count}}; --dur: 1100ms;">
          <rect x="-16" y="0" width="32" height="120" rx="6" class="bar"/>
          <text x="0" y="-10" text-anchor="middle" class="val-badge" fill="#00d26a">{{day6Count}}</text>
        </g>
      </g>
    </g>
  </g>

  <!-- ============================================================
       X-AXIS LABELS (Outside clip window so they are never hidden)
       ============================================================ -->
  <g transform="translate(70, 0)">
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day0Label}}</text>
  </g>
  <g transform="translate(150, 0)">
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day1Label}}</text>
  </g>
  <g transform="translate(230, 0)">
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day2Label}}</text>
  </g>
  <g transform="translate(310, 0)">
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day3Label}}</text>
  </g>
  <g transform="translate(390, 0)">
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day4Label}}</text>
  </g>
  <g transform="translate(470, 0)">
    <text x="0" y="185" text-anchor="middle" class="day-label">{{day5Label}}</text>
  </g>
  <g transform="translate(550, 0)">
    <text x="0" y="185" text-anchor="middle" class="day-label" fill="#00d26a" font-weight="700">{{day6Label}}</text>
  </g>

  <!-- Footer Info -->
  <text x="570" y="222" text-anchor="end" class="axis-label header-group">{{lastUpdated}}</text>
</svg>`;
