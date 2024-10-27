<script lang="ts" setup>
  import { useNavigationMenus } from "../composables";

  const { isLoading, data: menus } = useNavigationMenus();
</script>
<template>
  <div>
    <ul v-if="!isLoading">
      <li v-for="menu in menus" v-bind:key="menu.id">
        {{ menu.name }}
      </li>
    </ul>
  </div>
</template>
