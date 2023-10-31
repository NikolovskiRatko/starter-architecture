import { createApp } from 'vue'

// Import the encompassing App component
import App from './App.vue'

// Import global Axios instance
import http from '@/services/http'

// Import the Vue Router instance
import router from '@/router'

// Import the Vue Auth instance
import auth from '@/services/auth'

// Here we import the Pinia state management library
import { createPinia } from 'pinia';

// Import typings
import { AxiosKey, AuthKey } from '@/types/symbols'

// Finally create the Vue instance passing the defined routes, store and App component
const app = createApp(App)

app.provide(AxiosKey, http)
app.provide(AuthKey, auth)

// Create an instance of Pinia and install it to the app
const pinia = createPinia();
app.use(pinia);

app.use(router)
app.mount("#app")