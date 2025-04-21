import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Toast, { POSITION } from 'vue-toastification';
import App from './App.vue';
import { axios, auth } from './plugins';
import { i18n } from './plugins/i18n';
import router from './router';
import 'vue-toastification/dist/index.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(i18n);
app.use(axios);
app.use(auth);
app.use(VueQueryPlugin);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
});

app.mount('#app');
