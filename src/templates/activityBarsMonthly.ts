export const activityBarsMonthly = `<!-- 
  =============================================================
  HOW TO USE (PURE CSS 30-DAY RESPONSIVE BAR CHART WITH CONTINUITY ILLUSION):
  1. On <svg>: Set 'css-var-max' to your highest value, or use {{maxCount}}
     for automatic dynamic scaling.
  2. On each <g class="bar-col">: Set 'css-var-val: X;' (or {{dayXCount}}).
     Both the bar height and the badge scale together automatically.
  3. Pure CSS clamp() strictly bounds bars and badges between baseline
     and peak, so they never fly outside the widget or clip-path window!
  4. Luminous horizontal crest caps and panoramic userSpaceOnUse gradients
     bridge adjacent bars to produce a seamless wave continuity effect.
  5. Transparent outer envelope with dark glassmorphic card ensures
     100% text legibility and high contrast on both light and dark profiles.
  =============================================================
-->

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 280" width="100%" height="auto" style="--max: {{maxCount}}; --track-h: 155px; width: 100%; height: auto; max-width: 840px; display: block;">
  <style>
    /* --- Base Styles --- */
    .bg { fill: transparent; }
    .card-surface {
      fill: rgba(13, 17, 23, 0.88);
      stroke: rgba(255, 255, 255, 0.15);
      stroke-width: 1.5;
    }
    .header-group, .grid-group { animation: fadeInSoft 0.8s ease-out forwards; }
    .grid { stroke: #212836; stroke-width: 1; stroke-dasharray: 4,4; }
    .baseline { stroke: #334155; stroke-width: 1.5; }
    .axis-label {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      fill: #64748b;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .day-label {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      font-weight: 600;
      fill: #94a3b8;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .header-title {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 700;
      fill: #00e676;
      letter-spacing: 0.5px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .header-stat {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 11px;
      fill: #94a3b8;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    }
    .header-val {
      font-weight: 700;
      fill: #ffffff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
    }

    /* --- Animation --- */
    @keyframes fadeInSoft {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* 
      Boundaries Formula:
      Guarantees bars and badges NEVER fly outside the widget bounds or clip window,
      even if commits are 200+, 1000s, or 0.
      - Lower boundary (floor):  0px (Y=210 baseline)
      - Upper boundary (ceiling): calc(-1 * var(--track-h)) (Y=55 peak / High grid line)
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
      transition: fill 0.2s ease, opacity 0.2s ease, filter 0.2s ease;
    }

    /* 
      Continuity Ridge:
      22px wide crest on a 25px pitch leaves only 3px between tops.
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
      font-weight: 700;
      fill: #ffffff;
      opacity: 0;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
      transition: opacity 0.2s ease, fill 0.2s ease;
      pointer-events: none;
    }

    /* Hover Effects */
    .bar-col { cursor: pointer; }
    .bar-col:hover .bar {
      filter: brightness(1.25) drop-shadow(0 0 8px rgba(0, 230, 118, 0.6));
    }
    .bar-col:hover .bar-crest {
      fill: #ffffff;
      filter: drop-shadow(0 0 8px rgba(0, 255, 136, 1));
    }
    .bar-col:hover .val-badge {
      opacity: 1;
      fill: #00ff88;
    }

    /* Active / Today badge and highlight */
    .d29 .val-badge {
      opacity: 1;
      fill: #00ff88;
      font-weight: 800;
    }
    .d29 .bar-crest {
      filter: drop-shadow(0 0 6px rgba(0, 255, 136, 1));
    }
  </style>

  <defs>
    <!-- Continuous panoramic gradient across all 30 days (User-Space Coordinates) -->
    <linearGradient id="barGradMonthly" x1="70" y1="210" x2="795" y2="55" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#008a44" stop-opacity="0.9"/>
      <stop offset="35%" stop-color="#00b050" stop-opacity="0.95"/>
      <stop offset="70%" stop-color="#00e676" stop-opacity="1"/>
      <stop offset="100%" stop-color="#00ff88" stop-opacity="1"/>
    </linearGradient>

    <!-- Panoramic top crest gradient linking the tops into a single visual ribbon -->
    <linearGradient id="crestGradMonthly" x1="70" y1="0" x2="795" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00e676"/>
      <stop offset="50%" stop-color="#00ff88"/>
      <stop offset="100%" stop-color="#69f0ae"/>
    </linearGradient>

    <!-- 
      Clipping Window:
      Cuts off everything below the baseline (Y=210), while allowing
      the bars, crests, and badges to show between Y=30 and Y=210.
    -->
    <clipPath id="chart-window-monthly">
      <rect x="0" y="30" width="840" height="180"/>
    </clipPath>
  </defs>

  <!-- Background Envelope (Transparent) -->
  <rect width="840" height="280" class="bg"/>

  <!-- Card Surface (Dark Translucent Glass for 100% Contrast & Legibility) -->
  <rect x="1" y="1" width="838" height="278" rx="16" class="card-surface"/>

  <!-- Header -->
  <g transform="translate(35, 30)" class="header-group">
    <text class="header-title">📊 30-DAY ACTIVITY BARS</text>
    <text x="770" text-anchor="end" class="header-stat">
      Streak: <tspan class="header-val">{{currentStreak}}d</tspan>
      &#160;&#160;|&#160;&#160;
      Best: <tspan class="header-val">{{personalBest}}d</tspan>
      &#160;&#160;|&#160;&#160;
      Total: <tspan class="header-val">{{totalContribs}}</tspan>
    </text>
  </g>

  <!-- Y-Axis References (Track Height = 155px: Y=210 floor to Y=55 peak) -->
  <g transform="translate(60, 0)" class="grid-group">
    <line x1="0" y1="55" x2="745" y2="55" class="grid"/>
    <text x="-12" y="58" text-anchor="end" class="axis-label">High</text>

    <line x1="0" y1="132" x2="745" y2="132" class="grid"/>
    <text x="-12" y="135" text-anchor="end" class="axis-label">Med</text>

    <line x1="0" y1="210" x2="745" y2="210" class="baseline"/>
    <text x="-12" y="213" text-anchor="end" class="axis-label">0</text>
  </g>

  <!-- ============================================================
       BARS LAYER (Clipped cleanly at Y=210 baseline)
       ============================================================ -->
  <g clip-path="url(#chart-window-monthly)">
    <!-- Day 0 -->
    <g class="bar-col d0" transform="translate(70, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day0Count}}; --delay: 150ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day0Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 1 -->
    <g class="bar-col d1" transform="translate(95, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day1Count}}; --delay: 175ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day1Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 2 -->
    <g class="bar-col d2" transform="translate(120, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day2Count}}; --delay: 200ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day2Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 3 -->
    <g class="bar-col d3" transform="translate(145, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day3Count}}; --delay: 225ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day3Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 4 -->
    <g class="bar-col d4" transform="translate(170, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day4Count}}; --delay: 250ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day4Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 5 -->
    <g class="bar-col d5" transform="translate(195, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day5Count}}; --delay: 275ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day5Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 6 -->
    <g class="bar-col d6" transform="translate(220, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day6Count}}; --delay: 300ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day6Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 7 -->
    <g class="bar-col d7" transform="translate(245, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day7Count}}; --delay: 325ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day7Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 8 -->
    <g class="bar-col d8" transform="translate(270, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day8Count}}; --delay: 350ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day8Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 9 -->
    <g class="bar-col d9" transform="translate(295, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day9Count}}; --delay: 375ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day9Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 10 -->
    <g class="bar-col d10" transform="translate(320, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day10Count}}; --delay: 400ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day10Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 11 -->
    <g class="bar-col d11" transform="translate(345, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day11Count}}; --delay: 425ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day11Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 12 -->
    <g class="bar-col d12" transform="translate(370, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day12Count}}; --delay: 450ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day12Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 13 -->
    <g class="bar-col d13" transform="translate(395, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day13Count}}; --delay: 475ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day13Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 14 -->
    <g class="bar-col d14" transform="translate(420, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day14Count}}; --delay: 500ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day14Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 15 -->
    <g class="bar-col d15" transform="translate(445, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day15Count}}; --delay: 525ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day15Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 16 -->
    <g class="bar-col d16" transform="translate(470, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day16Count}}; --delay: 550ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day16Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 17 -->
    <g class="bar-col d17" transform="translate(495, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day17Count}}; --delay: 575ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day17Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 18 -->
    <g class="bar-col d18" transform="translate(520, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day18Count}}; --delay: 600ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day18Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 19 -->
    <g class="bar-col d19" transform="translate(545, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day19Count}}; --delay: 625ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day19Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 20 -->
    <g class="bar-col d20" transform="translate(570, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day20Count}}; --delay: 650ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day20Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 21 -->
    <g class="bar-col d21" transform="translate(595, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day21Count}}; --delay: 675ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day21Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 22 -->
    <g class="bar-col d22" transform="translate(620, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day22Count}}; --delay: 700ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day22Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 23 -->
    <g class="bar-col d23" transform="translate(645, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day23Count}}; --delay: 725ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day23Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 24 -->
    <g class="bar-col d24" transform="translate(670, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day24Count}}; --delay: 750ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day24Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 25 -->
    <g class="bar-col d25" transform="translate(695, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day25Count}}; --delay: 775ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day25Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 26 -->
    <g class="bar-col d26" transform="translate(720, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day26Count}}; --delay: 800ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day26Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 27 -->
    <g class="bar-col d27" transform="translate(745, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day27Count}}; --delay: 825ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day27Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 28 -->
    <g class="bar-col d28" transform="translate(770, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day28Count}}; --delay: 850ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day28Count}}</text>
        </g>
      </g>
    </g>

    <!-- Day 29 (Today / Most Recent) -->
    <g class="bar-col d29" transform="translate(795, 0)">
      <g transform="translate(0, 210)">
        <g class="bar-mover" style="--val: {{day29Count}}; --delay: 875ms;">
          <rect x="-9" y="0" width="18" height="180" rx="3" class="bar"/>
          <rect x="-11" y="-2" width="22" height="4" rx="2" class="bar-crest"/>
          <text x="0" y="-9" text-anchor="middle" class="val-badge">{{day29Count}}</text>
        </g>
      </g>
    </g>
  </g>

  <!-- ============================================================
       X-AXIS LABELS (Clean timeline markers)
       ============================================================ -->
  <g class="grid-group">
    <text x="70" y="235" text-anchor="middle" class="day-label">-30d</text>
    <text x="245" y="235" text-anchor="middle" class="day-label">-3w</text>
    <text x="420" y="235" text-anchor="middle" class="day-label">-2w</text>
    <text x="595" y="235" text-anchor="middle" class="day-label">-1w</text>
    <text x="795" y="235" text-anchor="middle" class="day-label" fill="#00e676" font-weight="700">Today</text>
  </g>

  <!-- Footer Info -->
  <text x="805" y="262" text-anchor="end" class="axis-label header-group">{{lastUpdated}}</text>
</svg>`;
