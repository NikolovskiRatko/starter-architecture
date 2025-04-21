<script lang="ts" setup>
  import { IconClose } from '@starter-core/icons';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useDeleteNavigationMenuItem } from '../composables';
  import type { NavigationMenuItem } from '../types';
  import { useBEMBuilder } from '@/helpers';
  import { DashButton } from '@starter-core/dash-ui/src';

  import './MenuItem.scss';

  type EmitsType = {
    (e: 'dragstart', event: DragEvent, itemId: number): void;
    (e: 'dragleave'): void;
    (e: 'dragenter', itemId: number): void;
  };

  type MenuItemProps = {
    item: NavigationMenuItem;
    isDragged?: boolean;
    hasDraggableOver?: boolean;
  };

  const emit = defineEmits<EmitsType>();
  const { item, isDragged, hasDraggableOver } = defineProps<MenuItemProps>();

  const baseModifiers = computed(() => ({
    'is-dragged': isDragged,
    'has-draggable-over': hasDraggableOver,
  }));
  const [block, element] = useBEMBuilder('menu-item', baseModifiers);
  const { t } = useI18n();
  const { mutate: deleteMenuItem } = useDeleteNavigationMenuItem();

  const type = computed(() => (item.navigation_id ? 'Internal' : 'External'));

  const deleteHandler = () => {
    if (window.confirm(t('navigation.menu.item.delete-confirm'))) {
      deleteMenuItem(item.id);
    }
  };

  const onDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
    }
    emit('dragstart', event, item.id);
  };

  const onDragEnter = (itemId: number) => {
    emit('dragenter', itemId);
  };

  const onDragLeave = () => {
    emit('dragleave');
  };
</script>
<template>
  <li :class="block" draggable="true" @dragstart="onDragStart" @dragenter="onDragEnter(item.id)" @dragleave="onDragLeave">
    <div
      :class="
        element(
          'label',
          computed(() => ({
            'has-draggable-over': hasDraggableOver,
          }))
        ).value
      "
    >
      <span>{{ item.label }}</span>
      <span>{{ type }}</span>
    </div>
    <DashButton :icon="IconClose" :loading="false" @click="deleteHandler" theme="danger" size="sm" is-icon />
  </li>
</template>
