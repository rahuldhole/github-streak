# GitHub Streak Browser Extension

A cross-browser extension for [GitHub Streak](https://github-readme-streak-stats.herokuapp.com/) that native integrates streak stats into GitHub profiles and adds a manual purge button to bypass Camo cache for READMEs.

## Features

- **Profile Injector**: Automatically displays the GitHub Streak SVG widget onto GitHub user profile pages. It dynamically adjusts to the user's GitHub color mode (light/dark).
- **Camo Purger**: Detects GitHub Streak Camo URLs within READMEs and injects a "Refresh" button. This allows bypassing GitHub's aggressive Camo caching by sending a `PURGE` request directly from the browser.

## Tech Stack

- [WXT](https://wxt.dev) - Next-gen Web Extension Framework
- React & TypeScript
- Bun

## Quick Start

You can manage this extension using the `task` CLI from either this directory or the project root.

### Installation

Install all required dependencies:

```bash
task install
```

### Development

Run the extension in development mode with hot-module reloading:

```bash
task dev
```

### Building & Publishing

You can build and zip the extension for all major browsers:

- **Chrome / Brave / Vivaldi**: `task build` and `task zip`
- **Firefox**: `task build:firefox` and `task zip:firefox`
- **Safari**: `task build:safari` and `task zip:safari`
- **Microsoft Edge**: `task build:edge` and `task zip:edge`
- **Opera**: `task build:opera` and `task zip:opera`

The compiled output will be available in the `.output` directory.
