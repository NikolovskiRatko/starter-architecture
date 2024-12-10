<script lang="ts" setup>
import { computed } from "vue";
const nuxtApp = useNuxtApp();

const links = computed(() => {
  const { topMenu } = nuxtApp.payload.data.menus ?? {};
  if (!topMenu?.items) {
    return null;
  }

  return topMenu.items.map((navigationItem) => {
    const { label, navigation, external_url } = navigationItem;
    return {
      label,
      to: external_url ?? navigation?.path ?? "",
    };
  });
});

import "./Header.css";
</script>
<template>
  <nav>
    <div class="wrapper">
      <div class="logo"><NuxtImg src="/logo_white.png" /></div>
      <input type="radio" name="slider" id="menu-btn" />
      <input type="radio" name="slider" id="close-btn" />
      <ul v-if="links" class="nav-links">
        <li v-for="link in links">
          <nuxt-link :to="link.to">{{ link.label }}</nuxt-link>
        </li>
      </ul>
      <label for="menu-btn" class="btn menu-btn"
        ><i class="fas fa-bars"></i
      ></label>
    </div>
  </nav>
</template>
