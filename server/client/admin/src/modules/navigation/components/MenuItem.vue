<script lang="ts" setup>
  import { IconClose } from "@starter-core/icons";
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { useDeleteNavigationMenuItem } from "../composables";
  import type { NavigationMenuItem } from "../types";
  import { useBEMBuilder } from "@/helpers";
  import { DashButton } from "@starter-core/dash-ui/src";

  import "./MenuItem.scss";

  const { t } = useI18n();
  const [block, element] = useBEMBuilder("menu-item");
  const { mutate: deleteMenuItem } = useDeleteNavigationMenuItem();

  const { item } = defineProps<{ item: NavigationMenuItem }>();

  const type = computed(() => (item.navigation_id ? "Internal" : "External"));

  const deleteHandler = () => {
    if (window.confirm(t("navigation.menu.item.delete-confirm"))) {
      deleteMenuItem(item.id);
    }
  };
</script>
<template>
  <li :class="block">
    <div :class="element('label').value">
      <span>{{ item.label }}</span>
      <span>{{ type }}</span>
    </div>
    <DashButton
      :icon="IconClose"
      :loading="false"
      @click="deleteHandler"
      theme="danger"
      size="sm"
      is-icon
    />
  </li>
</template>
