import { resolve } from 'path'
import { createCommonJS } from 'mlly'
import type { DynamicNavigationRoutes } from "~/types";
const { __dirname } = createCommonJS(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
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
      'xxl': 1536
    },
  },

  vite: {
    server: {
      hmr: {
        host: '0.0.0.0',
        clientPort: 3030,
        protocol: 'ws',
      }
    }
  },

  alias: {
    'pages-dynamic': resolve(__dirname, './pages-dynamic'),
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://starter.test/api',
    },
  },

  hooks: {
    async 'pages:extend'(pages) {
      try {
        const response = await fetch('http://starter.test/api/nuxt/navigation-routes');

        if (!response.ok) {
          throw new Error(`Failed to fetch dynamic routes: ${response.statusText}`);
        }

        const dynamicRoutes: DynamicNavigationRoutes = await response.json();

        dynamicRoutes.forEach((route) => {
          const existingRoute = pages.find((page) => page.path === route.path);
          const contentType = route.content_type?.toLowerCase();

          if (existingRoute) {
            existingRoute.meta = {
              dynamic: true,
              slug: route.slug
            };
          } else {
            pages.push({
              name: `dynamic-${route.slug}`,
              path: route.path,
              file: contentType
                ? `pages-dynamic/${contentType}.vue`
                : 'pages-dynamic/generic.vue',
              meta: {
                dynamic: true,
                type: contentType,
                id: 1
              },
            });
          }
        });
      } catch (error) {
        console.error('Failed to fetch dynamic routes:', error);
      }
    },
  },

  compatibilityDate: '2024-10-14'
})
