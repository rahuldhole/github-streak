/** @jsxImportSource hono/jsx */
import { html } from 'hono/html'
import pkg from '../../package.json' with { type: 'json' }

export function CustomizePage({ origin = '' }: { origin?: string }) {
  const version = pkg.version

  const templates = {
    default: `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #1e293b14; --l1: #0e4429ff; --l2: #006d32ff; --l3: #26a641ff; --l4: #39d353ff; --text-l0: #c9d1d9; --text-l1: #ffffff; --text-l2: #ffffff; --text-l3: #000000; --text-l4: #000000; }\n        .label { font: bold 10px sans-serif; fill: #8b949e; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px sans-serif; fill: #c9d1d9; }
    .date { font: 10px sans-serif; fill: #8b949e; }
    .day { font: 9px sans-serif; fill: #ffffff; }
    .count { font: bold 11px sans-serif; fill: #ffffff; }
  </style>
  <rect width="420" height="180" rx="20" fill="#0d1117"/>
  <rect x="0.5" y="0.5" width="419" height="179" rx="19.5" stroke="#30363d"/>
  
  <g transform="translate(25, 40)">
    <text class="label">Current Streak</text>
    <text y="28" class="stat">🔥 {{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label">Personal Best</text>
    <text y="28" class="stat">🏆 {{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label">Total Contribs</text>
    <text y="28" class="stat">✨ {{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(25, 110)">
    <!-- Day 0 -->
    <g transform="translate(0, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day0Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day0Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    </g>
    <!-- Day 1 -->
    <g transform="translate(54, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day1Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day1Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    </g>
    <!-- Day 2 -->
    <g transform="translate(108, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day2Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day2Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    </g>
    <!-- Day 3 -->
    <g transform="translate(162, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day3Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day3Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    </g>
    <!-- Day 4 -->
    <g transform="translate(216, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day4Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day4Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    </g>
    <!-- Day 5 -->
    <g transform="translate(270, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day5Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day5Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    </g>
    <!-- Day 6 -->
    <g transform="translate(324, 0)">
      <rect width="46" height="40" rx="6" fill="var(--l{{day6Level}})"/>
      <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" opacity="0.8" fill="#8b949e">{{day6Label}}</text>
      <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
    </g>
  </g>
  
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#8b949e" opacity="0.6">{{lastUpdated}}</text>
</svg>`,
    catppuccin: `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #313244; --l1: #89b4fa; --l2: #cba6f7; --l3: #f38ba8; --l4: #fab387; --text-l0: #bac2de; --text-l1: #11111b; --text-l2: #11111b; --text-l3: #11111b; --text-l4: #11111b; }\n        .label { font: bold 10px monospace; fill: #bac2de; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px monospace; fill: #cba6f7; }
    .date { font: 10px monospace; fill: #a6adc8; }
  </style>
  <rect width="420" height="180" rx="12" fill="#1e1e2e" stroke="#313244" stroke-width="2"/>
  
  <g transform="translate(25, 40)">
    <text class="label" fill="#f38ba8">CURRENT STREAK</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label" fill="#f9e2af">PERSONAL BEST</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label" fill="#89b4fa">TOTAL CONTRIBS</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="54" width="46" height="40" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="108" width="46" height="40" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="162" width="46" height="40" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="216" width="46" height="40" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="270" width="46" height="40" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="324" width="46" height="40" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#a6adc8" opacity="0.9">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" font-family="monospace" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="395" y="170" text-anchor="end" font-size="8" font-family="monospace" fill="#6c7086" opacity="0.8">{{lastUpdated}}</text>
</svg>`,
    nord: `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #3b4252; --l1: #5e81ac; --l2: #81a1c1; --l3: #88c0d0; --l4: #8fbcbb; --text-l0: #d8dee9; --text-l1: #eceff4; --text-l2: #2e3440; --text-l3: #2e3440; --text-l4: #2e3440; }\n        .label { font: bold 10px sans-serif; fill: #d8dee9; text-transform: uppercase; letter-spacing: 1.5px; }
    .stat { font: bold 24px sans-serif; fill: #8fbcbb; }
    .date { font: 10px sans-serif; fill: #4c566a; }
  </style>
  <rect width="420" height="180" rx="16" fill="#2e3440" stroke="#3b4252" stroke-width="2"/>
  
  <g transform="translate(25, 40)">
    <text class="label">CURRENT STREAK</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label">PERSONAL BEST</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label">TOTAL CONTRIBS</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="8" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="54" width="46" height="40" rx="8" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="108" width="46" height="40" rx="8" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="162" width="46" height="40" rx="8" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="216" width="46" height="40" rx="8" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="270" width="46" height="40" rx="8" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="324" width="46" height="40" rx="8" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#4c566a" opacity="0.9">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#4c566a" opacity="0.8">{{lastUpdated}}</text>
</svg>`,
    dracula: `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #44475a; --l1: #6272a4; --l2: #8be9fd; --l3: #ff79c6; --l4: #50fa7b; --text-l0: #f8f8f2; --text-l1: #f8f8f2; --text-l2: #282a36; --text-l3: #282a36; --text-l4: #282a36; }\n        .label { font: bold 10px sans-serif; fill: #6272a4; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px sans-serif; fill: #bd93f9; }
    .date { font: 10px sans-serif; fill: #6272a4; }
  </style>
  <rect width="420" height="180" rx="10" fill="#282a36" stroke="#44475a" stroke-width="2"/>
  <g transform="translate(25, 40)">
    <text class="label" fill="#ff79c6">Current Streak</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label" fill="#50fa7b">Personal Best</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label" fill="#8be9fd">Total Contribs</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#6272a4">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    <rect x="54" width="46" height="40" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#6272a4">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    <rect x="108" width="46" height="40" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#6272a4">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    <rect x="162" width="46" height="40" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#6272a4">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    <rect x="216" width="46" height="40" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#6272a4">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    <rect x="270" width="46" height="40" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#6272a4">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    <rect x="324" width="46" height="40" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#6272a4">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#6272a4" opacity="0.8">{{lastUpdated}}</text>
</svg>`,
    monokai: `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #3e3d32; --l1: #66d9ef; --l2: #a6e22e; --l3: #fd971f; --l4: #f92672; --text-l0: #f8f8f2; --text-l1: #272822; --text-l2: #272822; --text-l3: #272822; --text-l4: #f8f8f2; }\n        .label { font: bold 10px sans-serif; fill: #75715e; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px sans-serif; fill: #f8f8f2; }
    .date { font: 10px sans-serif; fill: #75715e; }
  </style>
  <rect width="420" height="180" rx="10" fill="#272822" stroke="#3e3d32" stroke-width="2"/>
  <g transform="translate(25, 40)">
    <text class="label" fill="#f92672">Current Streak</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label" fill="#a6e22e">Personal Best</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label" fill="#fd971f">Total Contribs</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#75715e">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    <rect x="54" width="46" height="40" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#75715e">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    <rect x="108" width="46" height="40" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#75715e">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    <rect x="162" width="46" height="40" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#75715e">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    <rect x="216" width="46" height="40" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#75715e">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    <rect x="270" width="46" height="40" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#75715e">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    <rect x="324" width="46" height="40" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#75715e">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#75715e">{{lastUpdated}}</text>
</svg>`,
    synthwave: `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #34294f; --l1: #614a87; --l2: #ea00d9; --l3: #f92aad; --l4: #36f9f6; --text-l0: #f4eee4; --text-l1: #f4eee4; --text-l2: #ffffff; --text-l3: #ffffff; --text-l4: #2b213a; }\n        .label { font: bold 10px sans-serif; fill: #614a87; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px sans-serif; fill: #f92aad; text-shadow: 0 0 5px #f92aad; }
    .date { font: 10px sans-serif; fill: #614a87; }
  </style>
  <rect width="420" height="180" rx="10" fill="#2b213a" stroke="#34294f" stroke-width="2"/>
  <g transform="translate(25, 40)">
    <text class="label" fill="#36f9f6">Current Streak</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label" fill="#f4eee4">Personal Best</text>
    <text y="28" class="stat" fill="#36f9f6" style="text-shadow: 0 0 5px #36f9f6">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label" fill="#f92aad">Total Contribs</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#614a87">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    <rect x="54" width="46" height="40" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#614a87">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    <rect x="108" width="46" height="40" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#614a87">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    <rect x="162" width="46" height="40" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#614a87">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    <rect x="216" width="46" height="40" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#614a87">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    <rect x="270" width="46" height="40" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#614a87">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    <rect x="324" width="46" height="40" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#614a87">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#614a87">{{lastUpdated}}</text>
</svg>`,
    solarizedDark: `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #073642; --l1: #268bd2; --l2: #2aa198; --l3: #b58900; --l4: #cb4b16; --text-l0: #93a1a1; --text-l1: #002b36; --text-l2: #002b36; --text-l3: #002b36; --text-l4: #002b36; }\n        .label { font: bold 10px sans-serif; fill: #586e75; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px sans-serif; fill: #839496; }
    .date { font: 10px sans-serif; fill: #586e75; }
  </style>
  <rect width="420" height="180" rx="10" fill="#002b36" stroke="#073642" stroke-width="2"/>
  <g transform="translate(25, 40)">
    <text class="label" fill="#cb4b16">Current Streak</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label" fill="#859900">Personal Best</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label" fill="#268bd2">Total Contribs</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#586e75">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    <rect x="54" width="46" height="40" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#586e75">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    <rect x="108" width="46" height="40" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#586e75">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    <rect x="162" width="46" height="40" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#586e75">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    <rect x="216" width="46" height="40" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#586e75">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    <rect x="270" width="46" height="40" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#586e75">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    <rect x="324" width="46" height="40" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#586e75">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#586e75">{{lastUpdated}}</text>
</svg>`,
    solarizedLight: `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #eee8d5; --l1: #268bd2; --l2: #2aa198; --l3: #b58900; --l4: #cb4b16; --text-l0: #586e75; --text-l1: #fdf6e3; --text-l2: #fdf6e3; --text-l3: #fdf6e3; --text-l4: #fdf6e3; }\n        .label { font: bold 10px sans-serif; fill: #93a1a1; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px sans-serif; fill: #657b83; }
    .date { font: 10px sans-serif; fill: #93a1a1; }
  </style>
  <rect width="420" height="180" rx="10" fill="#fdf6e3" stroke="#eee8d5" stroke-width="2"/>
  <g transform="translate(25, 40)">
    <text class="label" fill="#cb4b16">Current Streak</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label" fill="#859900">Personal Best</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label" fill="#268bd2">Total Contribs</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#93a1a1">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    <rect x="54" width="46" height="40" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#93a1a1">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    <rect x="108" width="46" height="40" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#93a1a1">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    <rect x="162" width="46" height="40" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#93a1a1">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    <rect x="216" width="46" height="40" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#93a1a1">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    <rect x="270" width="46" height="40" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#93a1a1">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    <rect x="324" width="46" height="40" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#93a1a1">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#93a1a1">{{lastUpdated}}</text>
</svg>`,
    onedark: `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #3e4451; --l1: #56b6c2; --l2: #61afef; --l3: #98c379; --l4: #e06c75; --text-l0: #abb2bf; --text-l1: #282c34; --text-l2: #282c34; --text-l3: #282c34; --text-l4: #282c34; }\n        .label { font: bold 10px sans-serif; fill: #5c6370; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px sans-serif; fill: #abb2bf; }
    .date { font: 10px sans-serif; fill: #5c6370; }
  </style>
  <rect width="420" height="180" rx="10" fill="#282c34" stroke="#abb2bf" stroke-width="2"/>
  <g transform="translate(25, 40)">
    <text class="label" fill="#e06c75">Current Streak</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label" fill="#98c379">Personal Best</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label" fill="#61afef">Total Contribs</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#5c6370">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    <rect x="54" width="46" height="40" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#5c6370">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    <rect x="108" width="46" height="40" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#5c6370">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    <rect x="162" width="46" height="40" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#5c6370">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    <rect x="216" width="46" height="40" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#5c6370">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    <rect x="270" width="46" height="40" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#5c6370">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    <rect x="324" width="46" height="40" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#5c6370">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#5c6370">{{lastUpdated}}</text>
</svg>`,
    gruvbox: `<svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #3c3836; --l1: #458588; --l2: #d79921; --l3: #b8bb26; --l4: #fb4934; --text-l0: #ebdbb2; --text-l1: #282828; --text-l2: #282828; --text-l3: #282828; --text-l4: #282828; }\n        .label { font: bold 10px sans-serif; fill: #a89984; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 22px sans-serif; fill: #ebdbb2; }
    .date { font: 10px sans-serif; fill: #a89984; }
  </style>
  <rect width="420" height="180" rx="10" fill="#282828" stroke="#3c3836" stroke-width="2"/>
  <g transform="translate(25, 40)">
    <text class="label" fill="#fb4934">Current Streak</text>
    <text y="28" class="stat">{{currentStreak}}</text>
    <text y="45" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(160, 40)">
    <text class="label" fill="#b8bb26">Personal Best</text>
    <text y="28" class="stat">{{personalBest}}</text>
    <text y="45" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(290, 40)">
    <text class="label" fill="#83a598">Total Contribs</text>
    <text y="28" class="stat">{{totalContribs}}+</text>
    <text y="45" class="date">{{totalContribsDate}}</text>
  </g>
  <g transform="translate(25, 110)">
    <rect x="0" width="46" height="40" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="23" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day0Label}}</text>
    <text x="23" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    <rect x="54" width="46" height="40" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="77" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day1Label}}</text>
    <text x="77" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    <rect x="108" width="46" height="40" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="131" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day2Label}}</text>
    <text x="131" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    <rect x="162" width="46" height="40" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="185" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day3Label}}</text>
    <text x="185" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    <rect x="216" width="46" height="40" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="239" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day4Label}}</text>
    <text x="239" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    <rect x="270" width="46" height="40" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="293" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day5Label}}</text>
    <text x="293" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    <rect x="324" width="46" height="40" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="347" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a89984">{{day6Label}}</text>
    <text x="347" y="30" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="395" y="170" text-anchor="end" font-size="8" fill="#a89984">{{lastUpdated}}</text>
</svg>`
  }

  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>GitHub Streak | Customize Template</title>
          <style>
            {html`
            :root { --bg: #ffffff; --text: #1a1a1a; --muted: #666666; --border: #e1e4e8; --accent: #2c974b; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; }
            .main { display: flex; flex: 1; overflow: hidden; }
            .editor-panel { width: 50%; display: flex; flex-direction: column; border-right: 1px solid var(--border); }
            .preview-panel { width: 50%; display: flex; flex-direction: column; background: #f6f8fa; overflow-y: auto; }
            .sandbox-area { padding: 2rem; display: flex; flex-direction: column; align-items: center; width: 100%; box-sizing: border-box; }
            .bottom-area { background: #ffffff; border-top: 1px solid var(--border); padding: 2rem; width: 100%; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; flex: 1; }
            textarea { flex: 1; width: 100%; padding: 1rem; border: none; outline: none; resize: none; font-family: monospace; font-size: 0.85rem; box-sizing: border-box; background: #fafbfc; color: #24292e; }
            .controls { padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
            .preview-img { max-width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 20px; }
            .url-box { margin-top: 2rem; width: 100%; max-width: 600px; }
            .url-box input, .code-block { width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; box-sizing: border-box; font-family: monospace; font-size: 0.8rem; margin-top: 0.5rem; margin-bottom: 1rem; background: #fafbfc; color: #24292e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .copy-btn { padding: 0.25rem 0.5rem; background: var(--border); border: none; border-radius: 4px; font-size: 0.75rem; cursor: pointer; color: var(--text); }
            .copy-btn:hover { background: #e2e8f0; }
            button { padding: 0.5rem 1rem; background: var(--text); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.8rem; }
            button:hover { background: #333; }
            .theme-select { padding: 0.4rem; border: 1px solid var(--border); border-radius: 4px; font-size: 0.8rem; }
            .hide-mobile { display: inline; }
            .show-mobile { display: none; }
            @media (max-width: 768px) {
              .main { flex-direction: column; }
              .editor-panel, .preview-panel { width: 100%; height: 50%; }
              .hide-mobile { display: none !important; }
              .show-mobile { display: inline-block !important; }
              .controls { padding: 0.5rem; }
            }
            .CodeMirror { flex: 1; height: 100%; font-family: monospace; font-size: 14px; }
            `}
          </style>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/material-ocean.min.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/xml/xml.min.js"></script>
        </head>
        <body>
          <div class="main">
            <div class="editor-panel">
              <div class="controls">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <a href="/" title="Back to Home" style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  </a>
                  <h1 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🔥 <span class="hide-mobile">GitHub Streak</span> <span class="hide-mobile" style={{ color: 'var(--muted)', fontWeight: 400 }}>/ Customize</span>
                  </h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <select id="template-select" class="theme-select" onchange="loadTemplate()">
                  <option value="default">Default</option>
                  <option value="catppuccin">Catppuccin</option>
                  <option value="nord">Nord</option>
                  <option value="dracula">Dracula</option>
                  <option value="monokai">Monokai</option>
                  <option value="synthwave">Synthwave</option>
                  <option value="solarizedDark">Solarized Dark</option>
                  <option value="solarizedLight">Solarized Light</option>
                  <option value="onedark">One Dark</option>
                  <option value="gruvbox">Gruvbox</option>
                </select>
                <input type="text" id="preview-user" placeholder="GitHub Username (for preview)" oninput="debounceUpdate()" style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.8rem', flex: '1', minWidth: '150px' }} />
                </div>
              </div>
              <textarea id="editor" style={{ display: 'none' }}>{templates.default}</textarea>
            </div>
            <div class="preview-panel">
              <div class="sandbox-area">
                <iframe id="preview" style={{ border: 'none', width: '100%', height: '500px', minHeight: '300px', background: 'transparent', resize: 'vertical', display: 'block' }} sandbox="allow-scripts allow-same-origin"></iframe>
              </div>
              
              <div class="bottom-area">
                <div style={{ marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--muted)', alignSelf: 'flex-start', width: '100%', maxWidth: '600px' }}>
                  <p>Available variables:</p>
                  <ul style={{ margin: '0.5rem 0', paddingLeft: '1rem' }}>
                    <li><code>{"{{currentStreak}}"}</code>, <code>{"{{currentStreakDate}}"}</code></li>
                    <li><code>{"{{personalBest}}"}</code>, <code>{"{{personalBestDate}}"}</code></li>
                    <li><code>{"{{totalContribs}}"}</code>, <code>{"{{totalContribsDate}}"}</code></li>
                    <li><code>{"{{heatStrip}}"}</code> - Default generated activity squares</li>
                    <li><code>{"{{lastUpdated}}"}</code> - Render date label</li>
                    <li><code>{"{{day0Count}}"}</code>, <code>{"{{day0Color}}"}</code>, <code>{"{{day0TextColor}}"}</code> (0 to 6)</li>
                  </ul>
                </div>
                
                <div class="url-box" style={{ marginTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Your Custom URL</label>
                    <button class="copy-btn" onclick="copyCode('custom-url', this, true)">Copy</button>
                  </div>
                  <input type="text" id="custom-url" readonly onclick="this.select()" style={{ marginBottom: '1.5rem' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Markdown</label>
                    <button class="copy-btn" onclick="copyCode('md-code', this, true)">Copy</button>
                  </div>
                  <input type="text" class="code-block" id="md-code" readonly onclick="this.select()" />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>HTML</label>
                    <button class="copy-btn" onclick="copyCode('html-code', this, true)">Copy</button>
                  </div>
                  <input type="text" class="code-block" id="html-code" readonly onclick="this.select()" />
                </div>
              </div>
            </div>
          </div>

          <script dangerouslySetInnerHTML={{ __html: `window.PREDEFINED_TEMPLATES = ${JSON.stringify(templates)};` }}></script>
          {html`
          <script>
            let debounceTimer;
            let editorInstance;
            
            document.addEventListener('DOMContentLoaded', () => {
              const textArea = document.getElementById('editor');
              editorInstance = CodeMirror.fromTextArea(textArea, {
                mode: "xml",
                theme: "material-ocean",
                lineNumbers: true,
                lineWrapping: true
              });
              
              editorInstance.on('change', () => {
                debounceUpdate();
              });
              
              updatePreview();
            });

            function debounceUpdate() {
              clearTimeout(debounceTimer);
              debounceTimer = setTimeout(updatePreview, 800);
            }

            function loadTemplate() {
              const val = document.getElementById('template-select').value;
              const tpl = window.PREDEFINED_TEMPLATES[val];
              if (tpl && editorInstance) {
                editorInstance.setValue(tpl);
              }
            }

            async function updatePreview() {
              const code = editorInstance ? editorInstance.getValue() : document.getElementById('editor').value;
              
              try {
                const res = await fetch('/api/compress', {
                  method: 'POST',
                  headers: { 'Content-Type': 'text/plain' },
                  body: code
                });
                
                if (!res.ok) throw new Error('Failed to compress');
                
                const { compressed } = await res.json();
                
                const baseUrl = window.location.origin;
                const username = document.getElementById('preview-user').value.trim();
                const finalUrl = username ? (baseUrl + '/v1/?user=' + encodeURIComponent(username) + '&custom=' + compressed) : (baseUrl + '/v1/sample.svg?custom=' + compressed);
                const renderedUrl = baseUrl + '/v1/?user=' + (username || 'YOUR_USERNAME') + '&custom=' + compressed;
                
                // Fetch the SVG and render it safely inside the sandboxed iframe
                const svgResponse = await fetch(finalUrl);
                if (svgResponse.ok) {
                  const svgContent = await svgResponse.text();
                  const htmlDoc = \`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          body {
                            display: flex;
                            margin: 0;
                            min-height: 100vh;
                            background: transparent;
                          }
                          .container {
                            margin: auto;
                            padding: 20px;
                          }
                          svg {
                            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                            border-radius: 20px;
                            display: block;
                            max-width: 100%;
                            height: auto;
                          }
                        </style>
                      </head>
                      <body>
                        <div class="container">\${svgContent}</div>
                      </body>
                    </html>
                  \`;
                  document.getElementById('preview').srcdoc = htmlDoc;
                } else {
                  document.getElementById('preview').srcdoc = \`<html style="color:red;font-family:sans-serif;text-align:center;padding:2rem;">Failed to load preview</html>\`;
                }

                document.getElementById('custom-url').value = renderedUrl;
                document.getElementById('md-code').value = \`![GitHub Streak](\${renderedUrl})\`;
                document.getElementById('html-code').value = \`<img src="\${renderedUrl}" alt="GitHub Streak" />\`;
                
              } catch (e) {
                console.error(e);
              }
            }


            function copyCode(id, btn, isInput = false) {
              const el = document.getElementById(id);
              const text = isInput ? el.value : el.textContent;
              navigator.clipboard.writeText(text);
              const oldText = btn.textContent;
              btn.textContent = 'Copied!';
              setTimeout(() => btn.textContent = oldText, 2000);
            }
          </script>
          `}
        </body>
      </html>
    </>
  )
}
