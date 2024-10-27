<script lang="ts" setup>
  import MenusDropdown from "./MenusDropdown.vue";
  import NavigationsForm from "./NavigationsForm.vue";
  import { useBEMBuilder } from "@/helpers";
  import "./MenuItemsTab.scss";

  const [block, element] = useBEMBuilder("menu-items-tab");
</script>
<template>
  <div :class="block">
    <div :class="element('navigations').value">
      <NavigationsForm />
    </div>
    <div :class="element('items').value">
      <MenusDropdown />
    </div>
  </div>
</template>
