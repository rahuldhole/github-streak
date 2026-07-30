/** @jsxImportSource hono/jsx */
import { html } from 'hono/html'
import pkg from '../../package.json' with { type: 'json' }
import aiTemplates from '../ai-templates.json' with { type: 'json' }

export function CustomizePage({ origin = '' }: { origin?: string }) {
  const version = pkg.version

  const baseTemplates = {
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
</svg>`,
    animatedGradient: `<svg width="600" height="200" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #1e1e2e88; --l1: #89b4fa; --l2: #cba6f7; --l3: #f38ba8; --l4: #fab387; --text-l0: #bac2de; --text-l1: #11111b; --text-l2: #11111b; --text-l3: #11111b; --text-l4: #11111b; }
    .label { font: bold 12px sans-serif; fill: #bac2de; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 28px sans-serif; fill: #ffffff; }
    .date { font: 11px sans-serif; fill: #a6adc8; }
    @keyframes gradientBG {
      0% { stop-color: #ff7eb3; }
      50% { stop-color: #ff758c; }
      100% { stop-color: #ff7eb3; }
    }
    @keyframes gradientBG2 {
      0% { stop-color: #8fd3f4; }
      50% { stop-color: #84fab0; }
      100% { stop-color: #8fd3f4; }
    }
    .anim-stop-1 { animation: gradientBG 4s ease infinite; }
    .anim-stop-2 { animation: gradientBG2 4s ease infinite; }
  </style>
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff7eb3" class="anim-stop-1" />
      <stop offset="100%" stop-color="#8fd3f4" class="anim-stop-2" />
    </linearGradient>
  </defs>
  <rect width="600" height="200" rx="20" fill="url(#bg-grad)"/>
  <rect x="2" y="2" width="596" height="196" rx="18" fill="#11111B" opacity="0.9"/>
  
  <g transform="translate(40, 50)">
    <text class="label">Current Streak</text>
    <text y="36" class="stat">{{currentStreak}}</text>
    <text y="58" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(240, 50)">
    <text class="label">Personal Best</text>
    <text y="36" class="stat">{{personalBest}}</text>
    <text y="58" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(440, 50)">
    <text class="label">Total Contribs</text>
    <text y="36" class="stat">{{totalContribs}}+</text>
    <text y="58" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(40, 130)">
    <rect x="0" width="60" height="40" rx="8" fill="var(--l{{day0Level}})"/>
    <text x="30" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day0Label}}</text>
    <text x="30" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="75" width="60" height="40" rx="8" fill="var(--l{{day1Level}})"/>
    <text x="105" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day1Label}}</text>
    <text x="105" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="150" width="60" height="40" rx="8" fill="var(--l{{day2Level}})"/>
    <text x="180" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day2Label}}</text>
    <text x="180" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="225" width="60" height="40" rx="8" fill="var(--l{{day3Level}})"/>
    <text x="255" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day3Label}}</text>
    <text x="255" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="300" width="60" height="40" rx="8" fill="var(--l{{day4Level}})"/>
    <text x="330" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day4Label}}</text>
    <text x="330" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="375" width="60" height="40" rx="8" fill="var(--l{{day5Level}})"/>
    <text x="405" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day5Label}}</text>
    <text x="405" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="450" width="60" height="40" rx="8" fill="var(--l{{day6Level}})"/>
    <text x="480" y="11" text-anchor="middle" dominant-baseline="central" font-size="9" fill="#a6adc8" opacity="0.9">{{day6Label}}</text>
    <text x="480" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="580" y="185" text-anchor="end" font-size="9" fill="#6c7086" opacity="0.8">{{lastUpdated}}</text>
</svg>`,
    compactMinimal: `<svg width="300" height="120" viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #ebedf0; --l1: #9be9a8; --l2: #40c463; --l3: #30a14e; --l4: #216e39; --text-l0: #24292e; --text-l1: #24292e; --text-l2: #ffffff; --text-l3: #ffffff; --text-l4: #ffffff; }
    .stat { font: bold 20px sans-serif; fill: #24292e; }
    .icon { font-size: 16px; }
  </style>
  <rect width="300" height="120" rx="8" fill="#ffffff" stroke="#e1e4e8"/>
  
  <g transform="translate(20, 30)">
    <text class="icon">🔥</text>
    <text x="25" y="4" class="stat">{{currentStreak}}</text>
  </g>
  <g transform="translate(115, 30)">
    <text class="icon">🏆</text>
    <text x="25" y="4" class="stat">{{personalBest}}</text>
  </g>
  <g transform="translate(210, 30)">
    <text class="icon">✨</text>
    <text x="25" y="4" class="stat">{{totalContribs}}</text>
  </g>
  
  <g transform="translate(20, 65)">
    <rect x="0" width="30" height="30" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="15" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="38" width="30" height="30" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="53" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="76" width="30" height="30" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="91" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="114" width="30" height="30" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="129" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="152" width="30" height="30" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="167" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="190" width="30" height="30" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="205" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="228" width="30" height="30" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="243" y="16" text-anchor="middle" dominant-baseline="central" font-size="10" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="290" y="115" text-anchor="end" font-size="7" fill="#aaaaaa">{{lastUpdated}}</text>
</svg>`,
    verticalCard: `<svg width="240" height="420" viewBox="0 0 240 420" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #161b22; --l1: #0e4429; --l2: #006d32; --l3: #26a641; --l4: #39d353; --text-l0: #c9d1d9; --text-l1: #ffffff; --text-l2: #ffffff; --text-l3: #000000; --text-l4: #000000; }
    .label { font: bold 11px sans-serif; fill: #8b949e; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 26px sans-serif; fill: #c9d1d9; }
    .date { font: 10px sans-serif; fill: #8b949e; }
  </style>
  <rect width="240" height="420" rx="16" fill="#0d1117" stroke="#30363d" stroke-width="2"/>
  
  <g transform="translate(25, 40)">
    <text class="label">Current Streak</text>
    <text y="32" class="stat">🔥 {{currentStreak}}</text>
    <text y="50" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(25, 120)">
    <text class="label">Personal Best</text>
    <text y="32" class="stat">🏆 {{personalBest}}</text>
    <text y="50" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(25, 200)">
    <text class="label">Total Contribs</text>
    <text y="32" class="stat">✨ {{totalContribs}}+</text>
    <text y="50" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(15, 280)">
    <rect x="0" y="0" width="26" height="80" rx="4" fill="var(--l{{day0Level}})"/>
    <text x="13" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day0Label}}</text>
    <text x="13" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="30" y="0" width="26" height="80" rx="4" fill="var(--l{{day1Level}})"/>
    <text x="43" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day1Label}}</text>
    <text x="43" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="60" y="0" width="26" height="80" rx="4" fill="var(--l{{day2Level}})"/>
    <text x="73" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day2Label}}</text>
    <text x="73" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="90" y="0" width="26" height="80" rx="4" fill="var(--l{{day3Level}})"/>
    <text x="103" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day3Label}}</text>
    <text x="103" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="120" y="0" width="26" height="80" rx="4" fill="var(--l{{day4Level}})"/>
    <text x="133" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day4Label}}</text>
    <text x="133" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="150" y="0" width="26" height="80" rx="4" fill="var(--l{{day5Level}})"/>
    <text x="163" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day5Label}}</text>
    <text x="163" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="180" y="0" width="26" height="80" rx="4" fill="var(--l{{day6Level}})"/>
    <text x="193" y="15" text-anchor="middle" font-size="9" fill="#8b949e">{{day6Label}}</text>
    <text x="193" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="215" y="400" text-anchor="end" font-size="8" fill="#8b949e" opacity="0.6">{{lastUpdated}}</text>
</svg>`,
    glassmorphism: `<svg width="450" height="200" viewBox="0 0 450 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: rgba(255,255,255,0.1); --l1: rgba(255,255,255,0.3); --l2: rgba(255,255,255,0.5); --l3: rgba(255,255,255,0.7); --l4: rgba(255,255,255,1); --text-l0: #ffffff; --text-l1: #ffffff; --text-l2: #000000; --text-l3: #000000; --text-l4: #000000; }
    .label { font: bold 10px sans-serif; fill: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 26px sans-serif; fill: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .date { font: 10px sans-serif; fill: rgba(255,255,255,0.6); }
    .glass-rect { fill: rgba(255, 255, 255, 0.1); stroke: rgba(255, 255, 255, 0.2); stroke-width: 1.5; backdrop-filter: blur(10px); }
  </style>
  <defs>
    <linearGradient id="bg-grad-glass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4158D0" />
      <stop offset="46%" stop-color="#C850C0" />
      <stop offset="100%" stop-color="#FFCC70" />
    </linearGradient>
  </defs>
  <rect width="450" height="200" rx="20" fill="url(#bg-grad-glass)"/>
  
  <rect x="15" y="15" width="420" height="170" rx="16" class="glass-rect"/>
  
  <g transform="translate(35, 50)">
    <text class="label">Current Streak</text>
    <text y="30" class="stat">{{currentStreak}}</text>
    <text y="48" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(175, 50)">
    <text class="label">Personal Best</text>
    <text y="30" class="stat">{{personalBest}}</text>
    <text y="48" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(315, 50)">
    <text class="label">Total Contribs</text>
    <text y="30" class="stat">{{totalContribs}}+</text>
    <text y="48" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(35, 120)">
    <rect x="0" width="48" height="45" rx="8" fill="var(--l{{day0Level}})"/>
    <text x="24" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day0Label}}</text>
    <text x="24" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="55" width="48" height="45" rx="8" fill="var(--l{{day1Level}})"/>
    <text x="79" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day1Label}}</text>
    <text x="79" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="110" width="48" height="45" rx="8" fill="var(--l{{day2Level}})"/>
    <text x="134" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day2Label}}</text>
    <text x="134" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="165" width="48" height="45" rx="8" fill="var(--l{{day3Level}})"/>
    <text x="189" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day3Label}}</text>
    <text x="189" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="220" width="48" height="45" rx="8" fill="var(--l{{day4Level}})"/>
    <text x="244" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day4Label}}</text>
    <text x="244" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="275" width="48" height="45" rx="8" fill="var(--l{{day5Level}})"/>
    <text x="299" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day5Label}}</text>
    <text x="299" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="330" width="48" height="45" rx="8" fill="var(--l{{day6Level}})"/>
    <text x="354" y="14" text-anchor="middle" font-size="10" fill="rgba(255,255,255,0.8)">{{day6Label}}</text>
    <text x="354" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  <text x="425" y="192" text-anchor="end" font-size="8" fill="rgba(255,255,255,0.4)">{{lastUpdated}}</text>
</svg>`,
    neonPulse: `<svg width="480" height="200" viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #0a0a1a; --l1: #1a0a3a; --l2: #3a1a6a; --l3: #6a2aaa; --l4: #aa3aff; --text-l0: #666688; --text-l1: #aa88ff; --text-l2: #ddbbff; --text-l3: #ffffff; --text-l4: #ffffff; }
    @keyframes neonGlow {
      0%, 100% { filter: drop-shadow(0 0 4px #aa3aff) drop-shadow(0 0 8px #6a2aaa); }
      50% { filter: drop-shadow(0 0 8px #aa3aff) drop-shadow(0 0 20px #6a2aaa) drop-shadow(0 0 30px #3a1a6a); }
    }
    @keyframes textPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    @keyframes borderPulse {
      0%, 100% { stroke-opacity: 0.6; }
      50% { stroke-opacity: 1; }
    }
    .card { animation: neonGlow 3s ease-in-out infinite; }
    .label { font: bold 10px sans-serif; fill: #aa88ff; text-transform: uppercase; letter-spacing: 2px; animation: textPulse 3s ease-in-out infinite; }
    .stat { font: bold 28px sans-serif; fill: #ffffff; }
    .date { font: 10px sans-serif; fill: #666688; }
    .neon-border { stroke: #aa3aff; stroke-width: 2; animation: borderPulse 3s ease-in-out infinite; }
    .day-tile { rx: 6; }
  </style>
  <rect width="480" height="200" rx="16" fill="#0a0a1a" class="card"/>
  <rect x="1" y="1" width="478" height="198" rx="15" fill="none" class="neon-border"/>
  
  <line x1="160" y1="20" x2="160" y2="90" stroke="#aa3aff" stroke-width="1" opacity="0.3"/>
  <line x1="320" y1="20" x2="320" y2="90" stroke="#aa3aff" stroke-width="1" opacity="0.3"/>
  
  <g transform="translate(30, 40)">
    <text class="label">Current Streak</text>
    <text y="32" class="stat">{{currentStreak}}</text>
    <text y="52" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(190, 40)">
    <text class="label">Personal Best</text>
    <text y="32" class="stat">{{personalBest}}</text>
    <text y="52" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(350, 40)">
    <text class="label">Total</text>
    <text y="32" class="stat">{{totalContribs}}+</text>
    <text y="52" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(30, 120)">
    <rect x="0" width="52" height="48" class="day-tile" fill="var(--l{{day0Level}})"/>
    <text x="26" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day0Label}}</text>
    <text x="26" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="60" width="52" height="48" class="day-tile" fill="var(--l{{day1Level}})"/>
    <text x="86" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day1Label}}</text>
    <text x="86" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="120" width="52" height="48" class="day-tile" fill="var(--l{{day2Level}})"/>
    <text x="146" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day2Label}}</text>
    <text x="146" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="180" width="52" height="48" class="day-tile" fill="var(--l{{day3Level}})"/>
    <text x="206" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day3Label}}</text>
    <text x="206" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="240" width="52" height="48" class="day-tile" fill="var(--l{{day4Level}})"/>
    <text x="266" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day4Label}}</text>
    <text x="266" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="300" width="52" height="48" class="day-tile" fill="var(--l{{day5Level}})"/>
    <text x="326" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day5Label}}</text>
    <text x="326" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="360" width="52" height="48" class="day-tile" fill="var(--l{{day6Level}})"/>
    <text x="386" y="14" text-anchor="middle" font-size="9" fill="#666688">{{day6Label}}</text>
    <text x="386" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="460" y="190" text-anchor="end" font-size="8" fill="#444466">{{lastUpdated}}</text>
</svg>`,
    auroraBorealis: `<svg width="500" height="220" viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</svg>`,
    cyberpunkMatrix: `<svg width="460" height="190" viewBox="0 0 460 190" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #0a0a0a; --l1: #002200; --l2: #004400; --l3: #008800; --l4: #00ff41; --text-l0: #003300; --text-l1: #00aa00; --text-l2: #00dd00; --text-l3: #00ff41; --text-l4: #000000; }
    @keyframes scanline {
      0% { transform: translateY(-190px); }
      100% { transform: translateY(190px); }
    }
    @keyframes flicker {
      0%, 100% { opacity: 1; }
      92% { opacity: 1; }
      93% { opacity: 0.3; }
      94% { opacity: 1; }
      96% { opacity: 0.8; }
      97% { opacity: 1; }
    }
    @keyframes cursorBlink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .screen { animation: flicker 5s linear infinite; }
    .label { font: bold 10px monospace; fill: #00aa00; text-transform: uppercase; letter-spacing: 2px; }
    .stat { font: bold 24px monospace; fill: #00ff41; }
    .date { font: 9px monospace; fill: #005500; }
    .cursor { animation: cursorBlink 1s steps(1) infinite; }
    .scanline-bar { animation: scanline 4s linear infinite; }
  </style>
  <rect width="460" height="190" rx="8" fill="#0a0a0a"/>
  <rect x="1" y="1" width="458" height="188" rx="7" fill="none" stroke="#00ff41" stroke-width="1" opacity="0.3"/>
  
  <rect x="0" y="0" width="460" height="4" fill="#00ff41" opacity="0.05" class="scanline-bar"/>
  
  <g class="screen">
    <g transform="translate(25, 35)">
      <text class="label">$ streak.current</text>
      <text y="28" class="stat">{{currentStreak}}<tspan class="cursor" font-size="24">_</tspan></text>
      <text y="46" class="date">{{currentStreakDate}}</text>
    </g>
    <g transform="translate(185, 35)">
      <text class="label">$ streak.best</text>
      <text y="28" class="stat">{{personalBest}}</text>
      <text y="46" class="date">{{personalBestDate}}</text>
    </g>
    <g transform="translate(335, 35)">
      <text class="label">$ total</text>
      <text y="28" class="stat">{{totalContribs}}</text>
      <text y="46" class="date">{{totalContribsDate}}</text>
    </g>
    
    <g transform="translate(25, 110)">
      <rect x="0" width="50" height="46" rx="2" fill="var(--l{{day0Level}})" stroke="#003300" stroke-width="1"/>
      <text x="25" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day0Label}}</text>
      <text x="25" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
      
      <rect x="58" width="50" height="46" rx="2" fill="var(--l{{day1Level}})" stroke="#003300" stroke-width="1"/>
      <text x="83" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day1Label}}</text>
      <text x="83" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
      
      <rect x="116" width="50" height="46" rx="2" fill="var(--l{{day2Level}})" stroke="#003300" stroke-width="1"/>
      <text x="141" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day2Label}}</text>
      <text x="141" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
      
      <rect x="174" width="50" height="46" rx="2" fill="var(--l{{day3Level}})" stroke="#003300" stroke-width="1"/>
      <text x="199" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day3Label}}</text>
      <text x="199" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
      
      <rect x="232" width="50" height="46" rx="2" fill="var(--l{{day4Level}})" stroke="#003300" stroke-width="1"/>
      <text x="257" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day4Label}}</text>
      <text x="257" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
      
      <rect x="290" width="50" height="46" rx="2" fill="var(--l{{day5Level}})" stroke="#003300" stroke-width="1"/>
      <text x="315" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day5Label}}</text>
      <text x="315" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
      
      <rect x="348" width="50" height="46" rx="2" fill="var(--l{{day6Level}})" stroke="#003300" stroke-width="1"/>
      <text x="373" y="14" text-anchor="middle" font-size="8" font-family="monospace" fill="#005500">{{day6Label}}</text>
      <text x="373" y="34" text-anchor="middle" font-size="12" font-weight="bold" font-family="monospace" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
    </g>
  </g>
  
  <text x="440" y="182" text-anchor="end" font-size="7" font-family="monospace" fill="#003300">{{lastUpdated}}</text>
</svg>`,
    oceanWaves: `<svg width="520" height="210" viewBox="0 0 520 210" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #0a1628; --l1: #0d3b66; --l2: #1a6baa; --l3: #3a9ed8; --l4: #7dd3fc; --text-l0: #3a5a7a; --text-l1: #7abadd; --text-l2: #b0e0ff; --text-l3: #ffffff; --text-l4: #0a1628; }
    @keyframes wave1 {
      0%, 100% { d: path("M0,180 C80,170 160,195 260,180 C360,165 440,190 520,175 L520,210 L0,210 Z"); }
      50% { d: path("M0,185 C80,195 160,170 260,185 C360,190 440,175 520,185 L520,210 L0,210 Z"); }
    }
    @keyframes wave2 {
      0%, 100% { d: path("M0,190 C100,182 200,198 300,188 C400,178 480,195 520,188 L520,210 L0,210 Z"); }
      50% { d: path("M0,192 C100,198 200,182 300,192 C400,198 480,185 520,192 L520,210 L0,210 Z"); }
    }
    .wave-1 { animation: wave1 6s ease-in-out infinite; fill: #1a4a6a; opacity: 0.5; }
    .wave-2 { animation: wave2 4s ease-in-out infinite; fill: #0d3b66; opacity: 0.3; }
    .label { font: bold 11px sans-serif; fill: #7dd3fc; text-transform: uppercase; letter-spacing: 1.5px; }
    .stat { font: bold 28px sans-serif; fill: #e0f4ff; }
    .date { font: 10px sans-serif; fill: #3a5a7a; }
  </style>
  <defs>
    <linearGradient id="ocean-sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#0d3b66"/>
    </linearGradient>
  </defs>
  <rect width="520" height="210" rx="20" fill="url(#ocean-sky)"/>
  <path class="wave-2" d="M0,190 C100,182 200,198 300,188 C400,178 480,195 520,188 L520,210 L0,210 Z" rx="20"/>
  <path class="wave-1" d="M0,180 C80,170 160,195 260,180 C360,165 440,190 520,175 L520,210 L0,210 Z" rx="20"/>
  <rect x="1" y="1" width="518" height="208" rx="19" fill="none" stroke="#1a4a6a" stroke-width="1"/>
  
  <g transform="translate(35, 40)">
    <text class="label">Current Streak</text>
    <text y="34" class="stat">🌊 {{currentStreak}}</text>
    <text y="54" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(210, 40)">
    <text class="label">Personal Best</text>
    <text y="34" class="stat">⚡ {{personalBest}}</text>
    <text y="54" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(390, 40)">
    <text class="label">Total</text>
    <text y="34" class="stat">{{totalContribs}}+</text>
    <text y="54" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(35, 115)">
    <rect x="0" width="58" height="44" rx="10" fill="var(--l{{day0Level}})" opacity="0.85"/>
    <text x="29" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day0Label}}</text>
    <text x="29" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="66" width="58" height="44" rx="10" fill="var(--l{{day1Level}})" opacity="0.85"/>
    <text x="95" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day1Label}}</text>
    <text x="95" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="132" width="58" height="44" rx="10" fill="var(--l{{day2Level}})" opacity="0.85"/>
    <text x="161" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day2Label}}</text>
    <text x="161" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="198" width="58" height="44" rx="10" fill="var(--l{{day3Level}})" opacity="0.85"/>
    <text x="227" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day3Label}}</text>
    <text x="227" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="264" width="58" height="44" rx="10" fill="var(--l{{day4Level}})" opacity="0.85"/>
    <text x="293" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day4Label}}</text>
    <text x="293" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="330" width="58" height="44" rx="10" fill="var(--l{{day5Level}})" opacity="0.85"/>
    <text x="359" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day5Label}}</text>
    <text x="359" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="396" width="58" height="44" rx="10" fill="var(--l{{day6Level}})" opacity="0.85"/>
    <text x="425" y="14" text-anchor="middle" font-size="9" fill="#3a5a7a">{{day6Label}}</text>
    <text x="425" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="500" y="200" text-anchor="end" font-size="8" fill="#1a4a6a">{{lastUpdated}}</text>
</svg>`,
    fireEmber: `<svg width="440" height="200" viewBox="0 0 440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #1a0a00; --l1: #3a1500; --l2: #7a2a00; --l3: #cc4400; --l4: #ff6a00; --text-l0: #553300; --text-l1: #cc7700; --text-l2: #ffaa00; --text-l3: #ffffff; --text-l4: #ffffff; }
    @keyframes emberFloat1 {
      0%, 100% { transform: translateY(0px); opacity: 0.6; }
      50% { transform: translateY(-8px); opacity: 1; }
    }
    @keyframes emberFloat2 {
      0%, 100% { transform: translateY(0px); opacity: 0.4; }
      50% { transform: translateY(-12px); opacity: 0.8; }
    }
    @keyframes emberFloat3 {
      0%, 100% { transform: translateY(0px); opacity: 0.5; }
      50% { transform: translateY(-6px); opacity: 0.9; }
    }
    @keyframes fireGlow {
      0%, 100% { stop-color: #1a0500; }
      50% { stop-color: #2a1000; }
    }
    .ember1 { animation: emberFloat1 3s ease-in-out infinite; }
    .ember2 { animation: emberFloat2 4s ease-in-out infinite 0.5s; }
    .ember3 { animation: emberFloat3 3.5s ease-in-out infinite 1s; }
    .label { font: bold 11px sans-serif; fill: #ff8c00; text-transform: uppercase; letter-spacing: 1px; }
    .stat { font: bold 26px sans-serif; fill: #ffe0b0; }
    .date { font: 10px sans-serif; fill: #664400; }
  </style>
  <defs>
    <radialGradient id="fire-glow" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#3a1500" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#0a0200" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="440" height="200" rx="16" fill="#0a0200"/>
  <rect width="440" height="200" rx="16" fill="url(#fire-glow)"/>
  <rect x="1" y="1" width="438" height="198" rx="15" fill="none" stroke="#3a1500" stroke-width="1.5"/>
  
  <circle cx="80" cy="180" r="2" fill="#ff6a00" class="ember1"/>
  <circle cx="200" cy="185" r="1.5" fill="#ffaa00" class="ember2"/>
  <circle cx="320" cy="178" r="1.8" fill="#ff8800" class="ember3"/>
  <circle cx="140" cy="175" r="1" fill="#ff4400" class="ember2"/>
  <circle cx="380" cy="182" r="1.2" fill="#ffcc00" class="ember1"/>
  
  <g transform="translate(30, 40)">
    <text class="label">🔥 Current Streak</text>
    <text y="34" class="stat">{{currentStreak}}</text>
    <text y="54" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(180, 40)">
    <text class="label">🏆 Personal Best</text>
    <text y="34" class="stat">{{personalBest}}</text>
    <text y="54" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(330, 40)">
    <text class="label">Total</text>
    <text y="34" class="stat">{{totalContribs}}+</text>
    <text y="54" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(30, 120)">
    <rect x="0" width="50" height="44" rx="8" fill="var(--l{{day0Level}})"/>
    <text x="25" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day0Label}}</text>
    <text x="25" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="58" width="50" height="44" rx="8" fill="var(--l{{day1Level}})"/>
    <text x="83" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day1Label}}</text>
    <text x="83" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="116" width="50" height="44" rx="8" fill="var(--l{{day2Level}})"/>
    <text x="141" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day2Label}}</text>
    <text x="141" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="174" width="50" height="44" rx="8" fill="var(--l{{day3Level}})"/>
    <text x="199" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day3Label}}</text>
    <text x="199" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="232" width="50" height="44" rx="8" fill="var(--l{{day4Level}})"/>
    <text x="257" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day4Label}}</text>
    <text x="257" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="290" width="50" height="44" rx="8" fill="var(--l{{day5Level}})"/>
    <text x="315" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day5Label}}</text>
    <text x="315" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="348" width="50" height="44" rx="8" fill="var(--l{{day6Level}})"/>
    <text x="373" y="14" text-anchor="middle" font-size="9" fill="#664400">{{day6Label}}</text>
    <text x="373" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="420" y="192" text-anchor="end" font-size="8" fill="#442200">{{lastUpdated}}</text>
</svg>`,
    midnightCity: `<svg width="550" height="240" viewBox="0 0 550 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root { --l0: #0f0f1a; --l1: #1a1a3a; --l2: #3a3a6a; --l3: #6a6aaa; --l4: #aaaaff; --text-l0: #3a3a5a; --text-l1: #7a7aaa; --text-l2: #bbbbee; --text-l3: #ffffff; --text-l4: #0f0f1a; }
    @keyframes starTwinkle1 {
      0%, 100% { opacity: 0.3; r: 1; }
      50% { opacity: 1; r: 1.5; }
    }
    @keyframes starTwinkle2 {
      0%, 100% { opacity: 0.5; r: 0.8; }
      50% { opacity: 0.9; r: 1.2; }
    }
    @keyframes starTwinkle3 {
      0%, 100% { opacity: 0.2; r: 1.2; }
      50% { opacity: 0.8; r: 1.8; }
    }
    @keyframes buildingGlow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
    .star1 { animation: starTwinkle1 3s ease-in-out infinite; }
    .star2 { animation: starTwinkle2 4s ease-in-out infinite 1s; }
    .star3 { animation: starTwinkle3 5s ease-in-out infinite 2s; }
    .bldg-win { animation: buildingGlow 2s ease-in-out infinite; }
    .label { font: bold 11px sans-serif; fill: #8888cc; text-transform: uppercase; letter-spacing: 1.5px; }
    .stat { font: bold 30px sans-serif; fill: #ddddff; }
    .date { font: 10px sans-serif; fill: #4a4a6a; }
  </style>
  <defs>
    <linearGradient id="night-sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#05051a"/>
      <stop offset="60%" stop-color="#0f0f2a"/>
      <stop offset="100%" stop-color="#1a1a3a"/>
    </linearGradient>
  </defs>
  <rect width="550" height="240" rx="20" fill="url(#night-sky)"/>
  
  <circle cx="50" cy="25" r="1" fill="#ffffff" class="star1"/>
  <circle cx="120" cy="15" r="0.8" fill="#aaaaff" class="star2"/>
  <circle cx="200" cy="30" r="1.2" fill="#ffffff" class="star3"/>
  <circle cx="280" cy="12" r="0.8" fill="#ccccff" class="star1"/>
  <circle cx="350" cy="22" r="1" fill="#ffffff" class="star2"/>
  <circle cx="420" cy="18" r="0.6" fill="#aaaaff" class="star3"/>
  <circle cx="480" cy="28" r="1.2" fill="#ffffff" class="star1"/>
  <circle cx="160" cy="10" r="0.5" fill="#ddddff" class="star3"/>
  <circle cx="510" cy="14" r="0.7" fill="#ccccff" class="star2"/>
  
  <rect x="30" y="195" width="18" height="45" rx="2" fill="#1a1a2a"/>
  <rect x="36" y="202" width="4" height="4" rx="1" fill="#ffcc44" class="bldg-win" opacity="0.6"/>
  <rect x="36" y="210" width="4" height="4" rx="1" fill="#ffcc44" opacity="0.3"/>
  <rect x="60" y="180" width="22" height="60" rx="2" fill="#15152a"/>
  <rect x="66" y="186" width="4" height="4" rx="1" fill="#88aaff" class="bldg-win" opacity="0.5"/>
  <rect x="72" y="186" width="4" height="4" rx="1" fill="#ffcc44" opacity="0.3"/>
  <rect x="66" y="196" width="4" height="4" rx="1" fill="#ffcc44" class="bldg-win" opacity="0.4"/>
  <rect x="460" y="188" width="20" height="52" rx="2" fill="#1a1a2a"/>
  <rect x="466" y="194" width="4" height="4" rx="1" fill="#ffcc44" class="bldg-win" opacity="0.5"/>
  <rect x="490" y="200" width="16" height="40" rx="2" fill="#15152a"/>
  <rect x="496" y="206" width="4" height="4" rx="1" fill="#88aaff" class="bldg-win" opacity="0.4"/>
  
  <rect x="1" y="1" width="548" height="238" rx="19" fill="none" stroke="#2a2a4a" stroke-width="1"/>
  
  <g transform="translate(100, 45)">
    <text class="label">Current Streak</text>
    <text y="38" class="stat">🌙 {{currentStreak}}</text>
    <text y="58" class="date">{{currentStreakDate}}</text>
  </g>
  <g transform="translate(260, 45)">
    <text class="label">Personal Best</text>
    <text y="38" class="stat">⭐ {{personalBest}}</text>
    <text y="58" class="date">{{personalBestDate}}</text>
  </g>
  <g transform="translate(420, 45)">
    <text class="label">Total</text>
    <text y="38" class="stat">{{totalContribs}}+</text>
    <text y="58" class="date">{{totalContribsDate}}</text>
  </g>
  
  <g transform="translate(100, 130)">
    <rect x="0" width="44" height="44" rx="22" fill="var(--l{{day0Level}})"/>
    <text x="22" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day0Label}}</text>
    <text x="22" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day0Level}})">{{day0Count}}</text>
    
    <rect x="52" width="44" height="44" rx="22" fill="var(--l{{day1Level}})"/>
    <text x="74" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day1Label}}</text>
    <text x="74" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day1Level}})">{{day1Count}}</text>
    
    <rect x="104" width="44" height="44" rx="22" fill="var(--l{{day2Level}})"/>
    <text x="126" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day2Label}}</text>
    <text x="126" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day2Level}})">{{day2Count}}</text>
    
    <rect x="156" width="44" height="44" rx="22" fill="var(--l{{day3Level}})"/>
    <text x="178" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day3Label}}</text>
    <text x="178" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day3Level}})">{{day3Count}}</text>
    
    <rect x="208" width="44" height="44" rx="22" fill="var(--l{{day4Level}})"/>
    <text x="230" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day4Label}}</text>
    <text x="230" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day4Level}})">{{day4Count}}</text>
    
    <rect x="260" width="44" height="44" rx="22" fill="var(--l{{day5Level}})"/>
    <text x="282" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day5Label}}</text>
    <text x="282" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day5Level}})">{{day5Count}}</text>
    
    <rect x="312" width="44" height="44" rx="22" fill="var(--l{{day6Level}})"/>
    <text x="334" y="15" text-anchor="middle" font-size="8" fill="#4a4a6a">{{day6Label}}</text>
    <text x="334" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="var(--text-l{{day6Level}})">{{day6Count}}</text>
  </g>
  
  <text x="530" y="230" text-anchor="end" font-size="8" fill="#2a2a4a">{{lastUpdated}}</text>
</svg>`,
    tripleColumnPulse: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 195" width="500" height="195">
  <style>
    @keyframes currstreak {
      0% { font-size: 3px; opacity: 0.2; }
      80% { font-size: 34px; opacity: 1; }
      100% { font-size: 28px; opacity: 1; }
    }
    @keyframes fadein {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    .text-title { font-family: system-ui, sans-serif; font-weight: 400; font-size: 14px; fill: #A6ACCD; opacity: 0; animation: fadein 0.5s linear forwards 0.7s; }
    .text-stat { font-family: system-ui, sans-serif; font-weight: 700; font-size: 28px; fill: #FFFFFF; opacity: 0; animation: fadein 0.5s linear forwards 0.6s; }
    .text-date { font-family: system-ui, sans-serif; font-weight: 400; font-size: 12px; fill: #717CB4; opacity: 0; animation: fadein 0.5s linear forwards 0.8s; }
    .streak-stat { font-family: system-ui, sans-serif; font-weight: 700; font-size: 28px; fill: #F7768E; animation: currstreak 0.6s linear forwards; }
    .streak-title { font-family: system-ui, sans-serif; font-weight: 700; font-size: 14px; fill: #F7768E; opacity: 0; animation: fadein 0.5s linear forwards 0.9s; }
  </style>
  <defs>
    <clipPath id="outer_rect">
      <rect width="500" height="195" rx="16"/>
    </clipPath>
    <mask id="ring_mask">
      <rect width="500" height="195" fill="white"/>
      <ellipse cx="250" cy="32" rx="13" ry="18" fill="black"/>
    </mask>
    <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ffcc00" />
      <stop offset="40%" stop-color="#ff6600" />
      <stop offset="100%" stop-color="#cc0000" />
    </linearGradient>
  </defs>
  
  <g clip-path="url(#outer_rect)">
    <rect width="500" height="195" rx="16" fill="#1A1B26"/>
    
    <line x1="166" y1="30" x2="166" y2="165" stroke="#292E42" stroke-width="2" stroke-linecap="round"/>
    <line x1="334" y1="30" x2="334" y2="165" stroke="#292E42" stroke-width="2" stroke-linecap="round"/>
    
    <g transform="translate(83, 48)">
      <text x="0" y="32" text-anchor="middle" class="text-stat">{{totalContribs}}</text>
    </g>
    <g transform="translate(83, 84)">
      <text x="0" y="32" text-anchor="middle" class="text-title">Total Contributions</text>
    </g>
    <g transform="translate(83, 114)">
      <text x="0" y="32" text-anchor="middle" class="text-date">{{totalContribsDate}}</text>
    </g>

    <g transform="translate(250, 108)">
      <text x="0" y="32" text-anchor="middle" class="streak-title">Current Streak</text>
    </g>
    <g transform="translate(250, 145)">
      <text x="0" y="21" text-anchor="middle" class="text-date" style="animation-delay: 0.9s;">{{currentStreakDate}}</text>
    </g>
    <g mask="url(#ring_mask)">
      <circle cx="250" cy="71" r="40" fill="none" stroke="#73DACA" stroke-width="4" style="opacity: 0; animation: fadein 0.5s linear forwards 0.4s"/>
    </g>
    <g transform="translate(250, 19.5)" style="opacity: 0; animation: fadein 0.5s linear forwards 0.6s">
      <path d="M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z" fill="url(#fireGrad)"/>
    </g>
    <g transform="translate(250, 48)">
      <text x="0" y="32" text-anchor="middle" class="streak-stat">{{currentStreak}}</text>
    </g>

    <g transform="translate(416, 48)">
      <text x="0" y="32" text-anchor="middle" class="text-stat" style="animation-delay: 1.2s;">{{personalBest}}</text>
    </g>
    <g transform="translate(416, 84)">
      <text x="0" y="32" text-anchor="middle" class="text-title" style="animation-delay: 1.3s;">Personal Best</text>
    </g>
    <g transform="translate(416, 114)">
      <text x="0" y="32" text-anchor="middle" class="text-date" style="animation-delay: 1.4s;">{{personalBestDate}}</text>
    </g>
  </g>
  <text x="490" y="185" text-anchor="end" font-family="system-ui, sans-serif" font-size="10" fill="#414868">{{lastUpdated}}</text>
</svg>`
  }

  const templates = { ...baseTemplates, ...(aiTemplates as Record<string, string>) }

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
            .tactile-btn { transition: transform 0.1s; }
            .tactile-btn:active { transform: scale(0.85); }
            @keyframes spin { 100% { transform: rotate(360deg); } }
            .spin-anim { animation: spin 0.5s ease-in-out; }
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1' }}>
                    <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true" fill="currentColor">
                      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                    </svg>
                    <input type="text" id="preview-user" placeholder="GitHub Username (for preview)" oninput="debounceUpdate()" style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.8rem', flex: '1', minWidth: '150px' }} />
                  </div>
                  <select id="template-select" class="theme-select" onchange="loadTemplate()">
                  <optgroup label="Standard Themes">
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
                  </optgroup>
                  <optgroup label="Advanced Themes">
                    <option value="animatedGradient">✨ Animated Gradient</option>
                    <option value="compactMinimal">📦 Compact Minimal</option>
                    <option value="verticalCard">📐 Vertical Card</option>
                    <option value="glassmorphism">💎 Glassmorphism</option>
                    <option value="neonPulse">💜 Neon Pulse</option>
                    <option value="auroraBorealis">🌌 Aurora Borealis</option>
                    <option value="cyberpunkMatrix">🖥️ Cyberpunk Matrix</option>
                    <option value="oceanWaves">🌊 Ocean Waves</option>
                    <option value="fireEmber">🔥 Fire Ember</option>
                    <option value="midnightCity">🌙 Midnight City</option>
                    <option value="tripleColumnPulse">📊 Triple Column Pulse</option>
                  </optgroup>
                  {Object.keys(aiTemplates).length > 0 && (
                    <optgroup label="AI Generated">
                      {Object.keys(aiTemplates).map((key) => (
                        <option value={key}>🤖 {key}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
                </div>
              </div>
              <textarea id="editor" style={{ display: 'none' }}>{templates.default}</textarea>
            </div>
            <div class="preview-panel">
              <div style={{ margin: '1.5rem 2rem 0 2rem', background: '#e1e4e8', padding: '0.5rem', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '6px', padding: '0 8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                </div>
                <button onclick="triggerReload(this)" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '0 0.2rem', color: '#586069', display: 'flex', alignItems: 'center' }} title="Reload Preview">↻</button>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input type="text" id="custom-url" placeholder="Paste your generated URL here..." oninput="handleUrlPaste(event)" onclick="this.select()" style={{ width: '100%', padding: '0.4rem 2rem 0.4rem 0.8rem', border: '1px solid #d1d5da', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '0.75rem', background: '#ffffff', color: '#24292e', outline: 'none' }} />
                  <button class="tactile-btn" onclick="clearCustomUrl()" style={{ position: 'absolute', right: '4px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#959da5', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Clear">✖</button>
                </div>
                <button class="copy-btn tactile-btn" onclick="copyIcon(this)" style={{ background: '#ffffff', border: '1px solid #d1d5da', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, fontSize: '0.9rem' }} title="Copy URL">📋</button>
              </div>
              <div class="sandbox-area" style={{ paddingTop: '1rem', borderLeft: '1px solid #e1e4e8', borderRight: '1px solid #e1e4e8', borderBottom: '1px solid #e1e4e8', margin: '0 2rem 1.5rem 2rem', borderRadius: '0 0 8px 8px', backgroundColor: '#ffffff', width: 'auto' }}>
                <iframe id="preview" style={{ border: 'none', width: '100%', height: '500px', minHeight: '300px', background: 'transparent', resize: 'vertical', display: 'block' }} sandbox="allow-scripts allow-same-origin"></iframe>
              </div>
              
              <div class="bottom-area">
                <div class="url-box" style={{ width: '100%', maxWidth: '800px', background: '#f6f8fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '1.5rem' }}>Embed Options</h2>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Markdown Snippet</label>
                    <button class="copy-btn tactile-btn" onclick="copyCode('md-code', this, true)">Copy</button>
                  </div>
                  <input type="text" class="code-block" id="md-code" readonly onclick="this.select()" style={{ marginBottom: '1.5rem', background: '#ffffff', width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '0.8rem', color: '#24292e' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>HTML Snippet</label>
                    <button class="copy-btn tactile-btn" onclick="copyCode('html-code', this, true)">Copy</button>
                  </div>
                  <input type="text" class="code-block" id="html-code" readonly onclick="this.select()" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '0.8rem', background: '#ffffff', color: '#24292e' }} />
                </div>

                <div style={{ width: '100%', maxWidth: '800px', textAlign: 'left' }}>
                  <h2 style={{ fontSize: '1.2rem', marginTop: 0 }}>Usage Guide</h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.5' }}>
                    This editor allows you to fully customize your GitHub Streak SVG by modifying the raw markup. 
                    The backend processes your template and dynamically substitutes placeholders with your live GitHub data.
                  </p>
                  
                  <h3 style={{ fontSize: '1rem', marginTop: '1.5rem' }}>Available Variables</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
                    <div style={{ background: '#f6f8fa', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                      <strong>Statistics</strong>
                      <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                        <li><code>{"{{currentStreak}}"}</code> - Current streak length</li>
                        <li><code>{"{{currentStreakDate}}"}</code> - Current streak date range</li>
                        <li><code>{"{{personalBest}}"}</code> - Longest streak length</li>
                        <li><code>{"{{personalBestDate}}"}</code> - Longest streak date range</li>
                        <li><code>{"{{totalContribs}}"}</code> - Total lifetime contributions</li>
                        <li><code>{"{{totalContribsDate}}"}</code> - Total contribution date range</li>
                      </ul>
                    </div>
                    <div style={{ background: '#f6f8fa', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
                      <strong>Visuals & Dates</strong>
                      <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                        <li><code>{"{{heatStrip}}"}</code> - Renders default 7-day activity boxes</li>
                        <li><code>{"{{lastUpdated}}"}</code> - Date the SVG was generated</li>
                        <li><code>{"{{dayXCount}}"}</code> - Contrib count for day X (0-6)</li>
                        <li><code>{"{{dayXLevel}}"}</code> - Heat level for day X (0-4)</li>
                        <li><code>{"{{dayXLabel}}"}</code> - Day of week label (e.g. Mon)</li>
                      </ul>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1rem', marginTop: '1.5rem' }}>How to Embed</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.5' }}>
                    Once you're happy with your design, copy the <strong>Markdown</strong> or <strong>HTML</strong> snippet from above and paste it into your <code>README.md</code>. 
                    Alternatively, keep your <strong>Custom URL</strong> safe. Whenever you paste that URL back into the browser bar above, it will instantly load your custom SVG back into the editor!
                  </p>

                  <div id="mcp" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1.4rem' }}>🤖</span>
                      <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>Connect via Model Context Protocol (MCP)</h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.5', margin: '0 0 1.25rem 0' }}>
                      Connect your AI assistant (Claude Desktop, Cursor, VS Code, Windsurf, Roo Code, etc.) directly to GitHub Streak to generate and iterate on custom SVG templates using natural language.
                    </p>

                    <div style={{ background: '#f6f8fa', borderRadius: '8px', border: '1px solid var(--border)', padding: '1.25rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--text)' }}>MCP Server URL (SSE)</strong>
                        <button class="copy-btn tactile-btn" onclick="copyCode('mcp-url', this, true)" style={{ position: 'static' }}>Copy URL</button>
                      </div>
                      <input type="text" class="code-block" id="mcp-url" value={origin ? `${origin}/mcp` : '/mcp'} readonly onclick="this.select()" style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--border)', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '0.85rem', background: '#ffffff', color: '#24292e' }} />
                    </div>

                    <div style={{ background: '#f6f8fa', borderRadius: '8px', border: '1px solid var(--border)', padding: '1.25rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <strong style={{ fontSize: '0.85rem', color: 'var(--text)' }}>Configuration (Claude Desktop / Cursor / Continue)</strong>
                        <button class="copy-btn tactile-btn" onclick="copyCode('mcp-json-code', this, false)" style={{ position: 'static' }}>Copy JSON</button>
                      </div>
                      <pre id="mcp-json-code" style={{ margin: 0, padding: '0.75rem', background: '#ffffff', borderRadius: '6px', border: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.8rem', color: '#24292e', overflowX: 'auto' }}>{`{
  "mcpServers": {
    "github-streak": {
      "url": "${origin || 'http://localhost:8888'}/mcp"
    }
  }
}`}</pre>
                    </div>

                    <div style={{ background: '#f6f8fa', borderRadius: '8px', border: '1px solid var(--border)', padding: '1.25rem' }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>Provided MCP Tools</strong>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <li><code>get_template_guide</code> — Returns template variables, theme keys, and design guidelines for AI prompts.</li>
                        <li><code>generate_widget_url</code> — Accepts a custom SVG template string and returns a live, compressed widget URL with interactive preview.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <script dangerouslySetInnerHTML={{ __html: `window.PREDEFINED_TEMPLATES = ${JSON.stringify(templates)}; window.APP_VERSION = "${version}";` }}></script>
          {html`
          <script>
            let debounceTimer;
            let editorInstance;
            
            document.addEventListener('DOMContentLoaded', () => {
              const mcpUrlInput = document.getElementById('mcp-url');
              if (mcpUrlInput && (!mcpUrlInput.value || mcpUrlInput.value.startsWith('/'))) {
                mcpUrlInput.value = window.location.origin + '/mcp';
              }
              const mcpJsonCode = document.getElementById('mcp-json-code');
              if (mcpJsonCode && mcpJsonCode.textContent.includes('http://localhost:8888')) {
                mcpJsonCode.textContent = mcpJsonCode.textContent.replace('http://localhost:8888', window.location.origin);
              }

              if (window.location.hash === '#mcp') {
                const mcpEl = document.getElementById('mcp');
                if (mcpEl) {
                  setTimeout(() => mcpEl.scrollIntoView({ behavior: 'smooth' }), 150);
                }
              }

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
                const finalUrl = (username && username !== 'YOUR_USERNAME') ? (baseUrl + '/v1/?user=' + encodeURIComponent(username) + '&custom=' + compressed + '&v=' + window.APP_VERSION) : (baseUrl + '/v1/sample.svg?custom=' + compressed + '&v=' + window.APP_VERSION);
                const renderedUrl = baseUrl + '/v1/?user=' + (username || 'YOUR_USERNAME') + '&custom=' + compressed + '&v=' + window.APP_VERSION;
                
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

            function clearCustomUrl() {
              document.getElementById('custom-url').value = '';
            }

            function triggerReload(btn) {
              btn.classList.remove('spin-anim');
              void btn.offsetWidth;
              btn.classList.add('spin-anim');
              updatePreview();
            }

            function copyIcon(btn) {
              const el = document.getElementById('custom-url');
              navigator.clipboard.writeText(el.value);
              btn.textContent = '✅';
              setTimeout(() => btn.textContent = '📋', 1500);
            }

            async function handleUrlPaste(e) {
              const urlStr = e.target.value.trim();
              if (!urlStr) return;
              try {
                const url = new URL(urlStr);
                const customParam = url.searchParams.get('custom');
                if (customParam) {
                  const res = await fetch('/api/decompress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain' },
                    body: customParam
                  });
                  if (res.ok) {
                    const data = await res.json();
                    if (data.decompressed && editorInstance) {
                      editorInstance.setValue(data.decompressed);
                    }
                  }
                }
                const userParam = url.searchParams.get('user');
                if (userParam) {
                  document.getElementById('preview-user').value = userParam;
                }
              } catch (err) {
                // Not a valid URL, ignore
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
