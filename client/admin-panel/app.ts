// Here we import some global JS instances
import Vue, { createApp } from 'vue';

// Import the encompassing App component
import App from './App.vue';

// Finally create the Vue instance passing the defined routes, store and App component
createApp(App)
  .mount('#app');
