import type { WebStorage } from 'vue-ls';

declare global {
  interface Window {
    webStorage: WebStorage;
  }
}
