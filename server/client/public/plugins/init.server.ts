export default defineNuxtPlugin(async (nuxtApp) => {
    let topMenu = null;

    try {
        topMenu = await $fetch(
    'http://starter.test/api/nuxt/menu/top-menu'
        );

    } catch (error) {
      console.error('Failed to fetch configuration', error);
    }

    nuxtApp.payload.data = {
        ...nuxtApp.payload.data,
        menus: { topMenu },
    };
  });
