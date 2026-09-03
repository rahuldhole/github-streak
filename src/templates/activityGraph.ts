export interface DayActivity {
  label: string; // e.g., 'Mon', 'Tue', or '09/02'
  count: number; // contribution count
}

export interface ActivityGraphData {
  currentStreak: number;
  personalBest: number;
  totalContribs: number;
  lastUpdated?: string;
  days: DayActivity[]; // Expected length: 7 days
}

export function renderActivityGraph(data: ActivityGraphData): string {
  const {
    currentStreak = 0,
    personalBest = 0,
    totalContribs = 0,
    lastUpdated = 'Updated today',
    days = []
  } = data;

  // Chart layout constraints
  const startX = 70;
  const stepX = 80;
  const baseY = 160;   // 0-level line
  const peakY = 70;    // High line
  const maxH = baseY - peakY; // 90px vertical range

  // Auto-scale normalization
  const counts = days.map((d) => d.count);
  const maxCount = Math.max(...counts, 1); // Avoid division by zero

  // Compute exact coordinates
  const points = days.slice(0, 7).map((d, i) => {
    const ratio = d.count / maxCount;
    // Map proportionally: 0 is at baseY (160), max is at peakY (70)
    const y = d.count === 0 ? baseY : Math.round(baseY - ratio * maxH);
    return {
      x: startX + i * stepX,
      y,
      count: d.count,
      label: d.label
    };
  });

  // Generate cubic Bézier smooth curve path
  let curveD = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    curveD += ` C ${midX},${p0.y} ${midX},${p1.y} ${p1.x},${p1.y}`;
  }

  // Create closed area under curve for the gradient
  const lastPoint = points[points.length - 1];
  const areaD = `${curveD} L ${lastPoint.x},${baseY} L ${points[0].x},${baseY} Z`;

  // Dynamic nodes with staggered animation delays
  const nodesSvg = points
    .map((p, i) => {
      const isLast = i === points.length - 1;
      const delay = (0.2 + i * 0.15).toFixed(2);
      return `
    <g transform="translate(${p.x}, 0)" class="node-group d${i}">
      ${isLast ? `<circle cx="0" cy="${p.y}" class="live-pulse"/>` : ''}
      <circle cx="0" cy="${p.y}" r="5" class="data-point" style="animation-delay: ${delay}s;"/>
      <text x="0" y="${p.y - 12}" text-anchor="middle" class="point-badge" style="animation-delay: ${delay}s;">${p.count}</text>
      <text x="0" y="185" text-anchor="middle" class="day-label">${p.label}</text>
    </g>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240" width="600" height="240">
  <style>
    @keyframes drawLine {
      from { stroke-dashoffset: 900; }
      to { stroke-dashoffset: 0; }
    }
    @keyframes fadeInArea {
      0%, 30% { opacity: 0; }
      100% { opacity: 0.85; }
    }
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0); }
      70% { opacity: 1; transform: scale(1.3); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes badgeRise {
      0% { opacity: 0; transform: translateY(5px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseRing {
      0% { r: 5px; opacity: 0.8; stroke-width: 2px; }
      80%, 100% { r: 15px; opacity: 0; stroke-width: 0.5px; }
    }
    @keyframes fadeInSoft {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .bg { fill: #121820; stroke: #2d3748; stroke-width: 1.5; rx: 16px; }
    .header-group, .grid-group { animation: fadeInSoft 0.8s ease-out forwards; }
    .grid-line { stroke: #243044; stroke-width: 1; stroke-dasharray: 4,4; }
    .axis-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 10px; fill: #6b7c96; }
    .day-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; font-weight: 600; fill: #8fa0bc; }
    .header-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 14px; font-weight: 700; fill: #00d26a; letter-spacing: 0.5px; }
    .header-stat { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; fill: #8fa0bc; }
    .header-val { font-weight: 700; fill: #ffffff; }

    .graph-line {
      fill: none;
      stroke: #00d26a;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 900;
      stroke-dashoffset: 900;
      animation: drawLine 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    .area-fill {
      fill: url(#activityGrad);
      opacity: 0;
      animation: fadeInArea 1.6s ease-out forwards;
    }
    .data-point {
      fill: #121820;
      stroke: #00d26a;
      stroke-width: 2.5;
      transform-box: fill-box;
      transform-origin: center;
      animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
    }
    .point-badge {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      font-weight: bold;
      fill: #ffffff;
      animation: badgeRise 0.4s ease-out backwards;
    }
    .live-pulse {
      fill: none;
      stroke: #00d26a;
      animation: pulseRing 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
      animation-delay: 1.3s;
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

  <!-- Background -->
  <rect width="600" height="240" class="bg"/>

  <!-- Header -->
  <g transform="translate(30, 32)" class="header-group">
    <text class="header-title">📈 ACTIVITY GRAPH</text>
    <text x="540" text-anchor="end" class="header-stat">
      Streak: <tspan class="header-val">${currentStreak}d</tspan>
      &#160;&#160;|&#160;&#160;
      Best: <tspan class="header-val">${personalBest}d</tspan>
      &#160;&#160;|&#160;&#160;
      Total: <tspan class="header-val">${totalContribs}</tspan>
    </text>
  </g>

  <!-- Grid & Dynamic Y-Labels -->
  <g transform="translate(50, 60)" class="grid-group">
    <line x1="0" y1="10" x2="520" y2="10" class="grid-line"/>
    <text x="-12" y="13" text-anchor="end" class="axis-label">${maxCount}</text>

    <line x1="0" y1="55" x2="520" y2="55" class="grid-line"/>
    <text x="-12" y="58" text-anchor="end" class="axis-label">${Math.round(maxCount / 2)}</text>

    <line x1="0" y1="100" x2="520" y2="100" stroke="#334155" stroke-width="1.2"/>
    <text x="-12" y="103" text-anchor="end" class="axis-label">0</text>
  </g>

  <!-- Area Fill -->
  <path class="area-fill" d="${areaD}"/>

  <!-- Curve Line -->
  <path class="graph-line" filter="url(#glow)" d="${curveD}"/>

  <!-- Data Nodes -->
  ${nodesSvg}

  <!-- Footer -->
  <text x="570" y="222" text-anchor="end" class="axis-label header-group">${lastUpdated}</text>
</svg>`;
}

// Sample SVG template string for backwards compatibility with static template registry
export const activityGraph: string = renderActivityGraph({
  currentStreak: 7,
  personalBest: 42,
  totalContribs: 328,
  lastUpdated: 'Updated today',
  days: [
    { label: 'Mon', count: 4 },
    { label: 'Tue', count: 12 },
    { label: 'Wed', count: 7 },
    { label: 'Thu', count: 18 },
    { label: 'Fri', count: 9 },
    { label: 'Sat', count: 2 },
    { label: 'Sun', count: 14 }
  ]
});
