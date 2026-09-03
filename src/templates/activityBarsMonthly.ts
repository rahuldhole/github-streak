export const activityBarsMonthly = `<!-- 
  =============================================================
  HOW TO USE (PURE CSS 30-DAY BAR CHART WITH CONTINUITY ILLUSION):
  1. On <svg>: Set 'css-var-max' to your highest value, or use {{maxCount}}
     for automatic dynamic scaling.
  2. On each <g class="bar-col">: Set 'css-var-val: X;' (or {{dayXCount}}).
     Both the bar height and the badge scale together automatically.
  3. Pure CSS clamp() strictly bounds bars and badges between baseline
     and peak, so they never fly outside the widget or clip-path window!
  4. Luminous horizontal crest caps and panoramic userSpaceOnUse gradients
     bridge adjacent bars to produce a seamless wave continuity effect.
  5. Transparent background allows seamless embedding on any profile.
  =============================================================
-->

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240" style="--max: {{maxCount}}; --track-h: 100px;">
  <style>
    /* --- Base Styles --- */
    .bg { fill: transparent; stroke: #2d3748; stroke-width: 1.5; rx: 16px; }
    .header-group, .grid-group { animation: fadeInSoft 0.8s ease-out forwards; }
    .grid { stroke: #243044; stroke-width: 1; stroke-dasharray: 4,4; }
    .baseline { stroke: #334155; stroke-width: 1.5; }
    .axis-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10px; fill: #6b7c96; }
    .day-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10px; font-weight: 600; fill: #8fa0bc; }
    .header-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; font-weight: 700; fill: #00d26a; letter-spacing: 0.5px; }
    .header-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; fill: #8fa0bc; }
    .header-val { font-weight: 700; fill: #ffffff; }

    /* --- Animation --- */
    @keyframes fadeInSoft {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* 
      Boundaries Formula:
      Guarantees bars and badges NEVER fly outside the widget bounds or clip window,
      even if commits are 200+, 1000s, or 0.
      - Lower boundary (floor):  0px (Y=160 baseline)
      - Upper boundary (ceiling): calc(-1 * var(--track-h)) (Y=60 peak / High grid line)
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

    .bar-mover {
      transform: translateY(clamp(
        calc(-1 * var(--track-h)),
        calc(-1 * var(--val, 0) * (var(--track-h) / max(var(--max, 1), 1))),
        0px
      ));
      animation: riseUp var(--dur, 800ms) cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-delay: var(--delay, 0ms);
    }

    /* Panoramic gradient across the entire chart creates unified wave texture */
    .bar {
      fill: url(#barGradMonthly);
      opacity: 0.85;
      transition: fill 0.2s ease, opacity 0.2s ease, filter 0.2s ease;
    }

    /* 
      Continuity Ridge:
      16px wide crest on a 17.4px pitch leaves only ~1.4px between tops.
      A 3px blur drop-shadow bridges across the gap with overlapping light,
      creating the optical illusion of an unbroken continuous contour line!
    */
    .bar-crest {
      fill: url(#crestGradMonthly);
      filter: drop-shadow(0 -1px 3px rgba(0, 230, 118, 0.75));
      transition: filter 0.2s ease, fill 0.2s ease;
    }

    .val-badge {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 9px;
      font-weight: 800;
      fill: #ffffff;
      opacity: 0;
      transition: opacity 0.2s ease, fill 0.2s ease;
      pointer-events: none;
    }

    /* Hover Effects */
    .bar-col { cursor: pointer; }
    .bar-col:hover .bar {
      opacity: 1;
      filter: brightness(1.25) drop-shadow(0 0 6px rgba(0, 230, 118, 0.5));
    }
    .bar-col:hover .bar-crest {
      fill: #ffffff;
      filter: drop-shadow(0 0 6px rgba(0, 255, 136, 1));
    }
    .bar-col:hover .val-badge {
      opacity: 1;
      fill: #00e676;
    }

    /* Active / Today badge and highlight */
    .d29 .val-badge {
      opacity: 1;
      fill: #00e676;
    }
    .d29 .bar-crest {
      filter: drop-shadow(0 0 5px rgba(0, 255, 136, 0.95));
    }
  </style>

  <defs>
    <!-- Continuous panoramic gradient across all 30 days (User-Space Coordinates) -->
    <linearGradient id="barGradMonthly" x1="55" y1="160" x2="560" y2="60" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00a854" stop-opacity="0.45"/>
      <stop offset="40%" stop-color="#00c853" stop-opacity="0.65"/>
      <stop offset="75%" stop-color="#00e676" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#00ff88" stop-opacity="1"/>
    </linearGradient>

    <!-- Panoramic top crest gradient linking the tops into a single visual ribbon -->
    <linearGradient id="crestGradMonthly" x1="55" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00e676"/>
      <stop offset="50%" stop-color="#00ff88"/>
      <stop offset="100%" stop-color="#69f0ae"/>
    </linearGradient>

    <!-- 
      Clipping Window:
      Cuts off everything below the baseline (Y=160), while allowing
      the bars, crests, and badges to show between Y=30 and Y=160.
    -->
    <clipPath id="chart-window-monthly">
      <rect x="0" y="30" width="600" height="130"/>
    </clipPath>
  </defs>

  <!-- Background Card (Transparent) -->
  <rect width="600" height="240" class="bg"/>

  <!-- Header -->
  <g transform="translate(30, 32)" class="header-group">
    <text class="header-title">📊 30-DAY ACTIVITY BARS</text>
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
  <g clip-path="url(#chart-window-monthly)">
    <!-- Day 0 -->
    <g class="bar-col d0" transform="translate(55, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day0Count}}; --delay: 150ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day0Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 1 -->
    <g class="bar-col d1" transform="translate(72, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day1Count}}; --delay: 175ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day1Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 2 -->
    <g class="bar-col d2" transform="translate(90, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day2Count}}; --delay: 200ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day2Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 3 -->
    <g class="bar-col d3" transform="translate(107, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day3Count}}; --delay: 225ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day3Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 4 -->
    <g class="bar-col d4" transform="translate(125, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day4Count}}; --delay: 250ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day4Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 5 -->
    <g class="bar-col d5" transform="translate(142, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day5Count}}; --delay: 275ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day5Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 6 -->
    <g class="bar-col d6" transform="translate(159, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day6Count}}; --delay: 300ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day6Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 7 -->
    <g class="bar-col d7" transform="translate(177, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day7Count}}; --delay: 325ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day7Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 8 -->
    <g class="bar-col d8" transform="translate(194, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day8Count}}; --delay: 350ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day8Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 9 -->
    <g class="bar-col d9" transform="translate(211, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day9Count}}; --delay: 375ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day9Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 10 -->
    <g class="bar-col d10" transform="translate(229, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day10Count}}; --delay: 400ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day10Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 11 -->
    <g class="bar-col d11" transform="translate(246, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day11Count}}; --delay: 425ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day11Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 12 -->
    <g class="bar-col d12" transform="translate(264, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day12Count}}; --delay: 450ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day12Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 13 -->
    <g class="bar-col d13" transform="translate(281, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day13Count}}; --delay: 475ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day13Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 14 -->
    <g class="bar-col d14" transform="translate(298, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day14Count}}; --delay: 500ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day14Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 15 -->
    <g class="bar-col d15" transform="translate(316, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day15Count}}; --delay: 525ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day15Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 16 -->
    <g class="bar-col d16" transform="translate(333, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day16Count}}; --delay: 550ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day16Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 17 -->
    <g class="bar-col d17" transform="translate(350, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day17Count}}; --delay: 575ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day17Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 18 -->
    <g class="bar-col d18" transform="translate(368, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day18Count}}; --delay: 600ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day18Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 19 -->
    <g class="bar-col d19" transform="translate(385, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day19Count}}; --delay: 625ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day19Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 20 -->
    <g class="bar-col d20" transform="translate(403, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day20Count}}; --delay: 650ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day20Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 21 -->
    <g class="bar-col d21" transform="translate(420, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day21Count}}; --delay: 675ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day21Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 22 -->
    <g class="bar-col d22" transform="translate(437, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day22Count}}; --delay: 700ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day22Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 23 -->
    <g class="bar-col d23" transform="translate(455, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day23Count}}; --delay: 725ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day23Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 24 -->
    <g class="bar-col d24" transform="translate(472, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day24Count}}; --delay: 750ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day24Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 25 -->
    <g class="bar-col d25" transform="translate(489, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day25Count}}; --delay: 775ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day25Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 26 -->
    <g class="bar-col d26" transform="translate(507, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day26Count}}; --delay: 800ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day26Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 27 -->
    <g class="bar-col d27" transform="translate(524, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day27Count}}; --delay: 825ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day27Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 28 -->
    <g class="bar-col d28" transform="translate(542, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day28Count}}; --delay: 850ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day28Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 29 (Today / Most Recent) -->
    <g class="bar-col d29" transform="translate(559, 0)">
      <g transform="translate(0, 160)">
        <g class="bar-mover" style="--val: {{day29Count}}; --delay: 875ms;">
          <rect x="-6" y="0" width="12" height="120" rx="2" class="bar"/>
          <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" class="bar-crest"/>
          <text x="0" y="-8" text-anchor="middle" class="val-badge">{{day29Count}}</text>
        </g>
      </g>
    </g>
  </g>

  <!-- ============================================================
       X-AXIS LABELS (Clean timeline markers)
       ============================================================ -->
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
