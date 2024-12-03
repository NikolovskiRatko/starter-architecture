export default defineNuxtPlugin(async (nuxtApp) => {
    let config = null;

    try {
      const response = await $fetch(
        'http://starter.test/api/nuxt/menu/top-menu'
      );
      config = response.data;
    } catch (error) {
      console.error('Failed to fetch configuration', error);
    }

    nuxtApp.payload.data['topMenu'] = config;
  });