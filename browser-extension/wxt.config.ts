import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  publicDir: '../public',
  manifest: {
    permissions: ['activeTab', 'storage', 'scripting'],
    host_permissions: ['*://github.com/*'],
    icons: {
      "16": "assets/icons/fire.png",
      "32": "assets/icons/fire.png",
      "48": "assets/icons/fire.png",
      "128": "assets/icons/fire.png"
    },
    browser_specific_settings: {
      gecko: {
        id: "github-streak@example.com",
        data_collection_permissions: {
          required: ["none"]
        }
      }
    }
  },
});
