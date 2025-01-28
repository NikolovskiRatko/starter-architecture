<script lang="ts" setup>
  import { computed, ref } from "vue";
  import {
    useNavigationMenu,
    useReorderNavigationMenuItem,
  } from "../composables";
  import MenuItem from "./MenuItem.vue";
  import { useBEMBuilder } from "@/helpers";

  import "./MenuItems.scss";

  interface MenuItemsProps {
    menuId: number;
  }

  const [block, element] = useBEMBuilder("menu-items");

  const { menuId } = defineProps<MenuItemsProps>();
  const id = computed<number>(() => Number(menuId));
  const { data } = useNavigationMenu(id);
  const { mutate: reorderMenuItem } = useReorderNavigationMenuItem();

  const draggingItem = ref<number | null>(null);
  const dragOverItem = ref<number | null>(null);

  const items = computed(() => data.value?.items ?? []);

  const dragoverHandler = (evt: DragEvent) => {
    evt.preventDefault();
  };

  const onDragStart = (event: DragEvent, itemId: number) => {
    draggingItem.value = itemId;
    if (event.dataTransfer) {
      event.dataTransfer.setData("itemID", String(itemId));
    }
  };

  const onDragEnd = () => {
    console.log(dragOverItem.value);
    console.log(draggingItem.value);
    if (
      dragOverItem.value &&
      draggingItem.value &&
      draggingItem.value !== dragOverItem.value
    ) {
      const newOrder = items.value.find(
        (item) => item.id === dragOverItem.value,
      );

      if (newOrder) {
        reorderMenuItem({
          menuId: Number(menuId),
          order: newOrder.order,
          item_id: draggingItem.value,
        });
      }
    }
    draggingItem.value = null;
    dragOverItem.value = null;
  };

  const onDragEnter = (itemId: number) => {
    dragOverItem.value = itemId;
  };

  const onDragLeave = () => {
    dragOverItem.value = null;
  };
</script>
<template>
  <div :class="block">
    <ul
      :class="element('list').value"
      @dragover="dragoverHandler"
      @dragend="onDragEnd"
    >
      <MenuItem
        v-for="item in items"
        v-bind:key="item.id"
        :item="item"
        @dragstart="onDragStart"
        @dragleave="onDragLeave"
        @dragenter="onDragEnter"
        :is-dragged="draggingItem === item.id"
        :has-draggable-over="
          dragOverItem === item.id && draggingItem !== item.id
        "
      />
    </ul>
    <p v-if="!items.length">There is no items assigned to this menu</p>
  </div>
</template>
