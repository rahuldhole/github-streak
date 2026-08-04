# Privacy Policy for GitHub Streak Extension

**Last Updated:** August 4, 2026

This Privacy Policy describes how the **GitHub Streak Extension** ("the Extension", "we", "us", or "our") handles your information. 

Our core philosophy is simple: **we do not collect, store, or transmit your personal data.**

## 1. Information Collection and Use

The Extension is designed to operate entirely locally within your browser. It does not connect to any analytics services, external tracking services, or remote databases. 

- **Local Storage:** The Extension uses your browser's local `storage` API strictly to save your personal preferences (e.g., color mode overrides) locally on your device. This data never leaves your browser.
- **Web Requests:** The Extension intercepts and modifies the DOM on `*://github.com/*` exclusively for the purpose of injecting the GitHub Streak statistics widget and providing a manual cache purge button for README images. It only fetches the streak SVG image directly from the GitHub Streak Stats API.

## 2. Personal Data

We **do not** collect, transmit, distribute, or sell your personal data. Your GitHub data, browsing history, and personal information remain entirely private and on your device. 

## 3. Required Permissions

The Extension requires the following permissions to function:
- `activeTab`: Used to allow the extension to execute scripts when you actively click the extension button or interact with a specific GitHub tab.
- `storage`: Used to remember your local preferences across browser sessions.
- `scripting`: Used to inject the visual components (the streak stats and the cache refresh button) into the GitHub page.
- `*://github.com/*`: Used to authorize the extension to run only on GitHub domain pages, which is necessary to inject the widgets onto your profile.

## 4. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. Since the Extension does not collect personal contact information, we cannot notify you individually of changes. We encourage you to review this page periodically for any updates. Changes to this Privacy Policy are effective when they are posted on this page.

## 5. Contact Us

If you have any questions or suggestions about our Privacy Policy, please open an issue in the project's [GitHub Repository](https://github.com/rahuldhole/github-streak).
