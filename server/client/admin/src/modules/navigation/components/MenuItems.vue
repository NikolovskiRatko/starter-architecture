<script lang="ts" setup>
  import { computed } from "vue";
  import { useNavigationMenu } from "../composables";
  import MenuItem from "./MenuItem.vue";
  import { useBEMBuilder } from "@/helpers";
  import "./MenuItems.scss";

  interface MenuItemsProps {
    menuId: string;
  }

  const [block, element] = useBEMBuilder("menu-items");

  const { menuId } = defineProps<MenuItemsProps>();
  const id = computed<number>(() => Number(menuId));
  const { data } = useNavigationMenu(id);

  const items = computed(() => data.value?.items ?? []);
</script>
<template>
  <div :class="block">
    <ul :class="element('list').value">
      <MenuItem v-for="item in items" v-bind:key="item.id" :item="item" />
    </ul>
    <p v-if="!items.length">There is no items assigned to this menu</p>
  </div>
</template>
