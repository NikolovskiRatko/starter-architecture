<script lang="ts" setup>
  import { computed } from "vue";
  import { useNavigationMenu } from "../composables";

  interface MenuItemsProps {
    menuId: Ref<string>;
  }

  const { menuId } = defineProps<MenuItemsProps>();
  const id = computed<number>(() => Number(menuId));
  const { data } = useNavigationMenu(id);

  const items = computed(() => data.value?.items ?? []);
</script>
<template>
  <div>
    <ul>
      <li v-for="item in items" v-bind:key="item.id">
        {{ item.label }}
      </li>
    </ul>
    <p v-if="!items.length">There is no items assigned to this menu</p>
  </div>
</template>
