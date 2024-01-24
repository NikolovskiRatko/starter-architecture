import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
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
}

export default config;
