import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  publicDir: '../public',
  manifest: {
    permissions: ['activeTab', 'storage', 'scripting'],
    host_permissions: ['*://github.com/*'],
    icons: {
      "16": "assets/icons/fire-16.png",
      "32": "assets/icons/fire-32.png",
      "48": "assets/icons/fire-48.png",
      "128": "assets/icons/fire-128.png"
    },
    browser_specific_settings: {
      gecko: {
        id: "github-streak@example.com",
        data_collection_permissions: {
          required: ["none"]
        }
      },
      gecko_android: {
        strict_min_version: "121.0"
      }
    }
  },
});
