import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
import i18n from '~/locales';

import '@unocss/reset/normalize.css';
import '@unocss/reset/tailwind.css';

import 'virtual:uno.css';

const app = createApp(App);
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);
app.use(i18n);
app.use(router);
app.use(pinia);
app.mount('#app');
