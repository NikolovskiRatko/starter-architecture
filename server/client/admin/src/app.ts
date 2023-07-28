import { createApp } from 'vue'

// Import the encompassing App component
import App from './App.vue'

// Import global Axios instance
import http from '@/services/http'

// Import the Vue Router instance
import router from './router'

// Import the Vue Auth instance
import auth from '@/services/auth'

// Import typings
import { AxiosKey, RouterKey, AuthKey  } from '@/types/symbols'

// Finally create the Vue instance passing the defined routes, store and App component
const app = createApp(App)

app.provide(AxiosKey, http)
app.provide(RouterKey, router)
app.provide(AuthKey, auth)


app.use(router)
app.mount("#app")