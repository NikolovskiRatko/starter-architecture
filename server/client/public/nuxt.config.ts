// https://nuxt.com/docs/api/configuration/nuxt-config

import testRoutes from './routes/testRoutes';

export default defineNuxtConfig({
  devtools: { 
    enabled: true
  },
  css: [
    "~/assets/main.scss",
    "~/node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  modules: [
    '@nuxt/image',
  ],
  image: {
    dir: 'public/images',
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      // Merge your custom routes with the existing routes
      routes.push(...testRoutes);
    },
  },
})
