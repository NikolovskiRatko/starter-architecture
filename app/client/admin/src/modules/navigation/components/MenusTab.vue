<script lang="ts" setup>
  import { ref } from "vue";
  import { useNavigationMenus } from "../composables";
  import AddMenuForm from "./AddMenuForm.vue";
  import { useBEMBuilder } from "@/helpers";
  import "./MenusTab.scss";

  const { isLoading, data: menus } = useNavigationMenus();
  const [block, element] = useBEMBuilder("menus-tab");
</script>
<template>
  <div :class="block">
    <AddMenuForm />
    <ul v-if="!isLoading" :class="element('list').value">
      <li :class="element('list-item').value" v-for="menu in menus" v-bind:key="menu.id">
        <span
          :class="
            element(
              'list-item-element',
              ref({
                name: true,
              }),
            ).value
          "
          >{{ menu.name }}</span
        >
        <span
          :class="
            element(
              'list-item-element',
              ref({
                description: true,
              }),
            ).value
          "
          >{{ menu.description }}</span
        >
      </li>
    </ul>
  </div>
</template>
