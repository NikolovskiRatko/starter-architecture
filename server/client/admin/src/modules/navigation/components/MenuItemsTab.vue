<script lang="ts" setup>
  import { ref } from "vue";
  import MenuItems from "./MenuItems.vue";
  import MenuItemsNavigationForms from "./MenuItemsNavigationForms.vue";
  import MenusDropdown from "./MenusDropdown.vue";
  import { useBEMBuilder } from "@/helpers";
  import "./MenuItemsTab.scss";

  const selectedMenu = ref<string>("");
  const [block, element] = useBEMBuilder("menu-items-tab");
</script>
<template>
  <div :class="block">
    <div :class="element('navigations').value">
      <MenuItemsNavigationForms :menu-id="Number(selectedMenu)" />
    </div>
    <div :class="element('items').value">
      <MenusDropdown v-model="selectedMenu" />
      <MenuItems :menu-id="selectedMenu" />
    </div>
  </div>
</template>
