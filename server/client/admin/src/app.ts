import { createApp } from "vue";
// Pinia is a state management library
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import Toast, { POSITION } from "vue-toastification";
// Import plugins attached to global Vue instance
import { axios, auth } from "./plugins";
import { i18n } from "./plugins/i18n";
import router from "./router";
import "vue-toastification/dist/index.css";

// Import the encompassing App component
import App from "./App.vue";

const pinia = createPinia();
// Finally create the Vue instance passing the defined routes, store and App component
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

app.mount("#app");
