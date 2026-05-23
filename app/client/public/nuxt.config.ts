// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  css: ['~/assets/main.scss', '~/node_modules/bootstrap/dist/css/bootstrap.min.css'],

  modules: ['@nuxt/image', '@pinia/nuxt'],

  image: {
    dir: 'public/images',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Server-side configuration that flows to the client via useRuntimeConfig().
  // `apiBase` is consumed by composables/useApi.ts to talk to the Laravel API.
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://starter.test/api',
      sanctumBase: process.env.NUXT_PUBLIC_SANCTUM_BASE || 'http://starter.test',
    },
  },

  vite: {
    server: {
      hmr: {
        host: '0.0.0.0',
        clientPort: 3030,
        protocol: 'ws',
      },
    },
  },

  compatibilityDate: '2024-10-14',
});
