import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VueStorage from 'vue-ls';
import rewrite from './utils/rewrite';

const app = createApp(App);

const WebStorage = VueStorage.useStorage({
  namespace: 'pro__',
  name: 'ls',
  storage: 'local',
});
window.webStorage = rewrite(WebStorage.ls);
app.use(createPinia());
app.use(router);
app.mount('#app');
