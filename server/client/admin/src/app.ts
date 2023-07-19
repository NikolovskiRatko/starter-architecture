// Here we import some global JS instances
// require('./bootstrap');

import Vue, { createApp } from 'vue';

// Import the encompassing App component
import App from './App.vue';

// Import the Vue Router instance
import createRouter from './pages/routes';

const router = createRouter();

// Finally create the Vue instance passing the defined routes, store and App component
const app = createApp(App);

app.use(router);
app.mount("#app");