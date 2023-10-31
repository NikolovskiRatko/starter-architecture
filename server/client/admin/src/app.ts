import { createApp } from 'vue'
// Pinia is a state management library
import { createPinia } from 'pinia'
// Import plugins attached to global Vue instance
import { axios, auth, globalComponents } from './plugins'
import router from './router'

// Import the encompassing App component
import App from './App.vue'

const pinia = createPinia()
// Finally create the Vue instance passing the defined routes, store and App component
const app = createApp(App)

app.use(pinia);
app.use(router);
app.use(axios);
app.use(auth);
app.use(globalComponents)

import { AuthKey, AxiosKey } from '@/types/symbols'

app.provide(AuthKey, app.config.globalProperties.auth)
app.provide(AxiosKey, app.config.globalProperties.axios)

app.mount("#app")