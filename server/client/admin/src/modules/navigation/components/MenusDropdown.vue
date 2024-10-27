<script lang="ts" setup>
  import { FormDropdown } from "@starter-core/dash-ui/src";
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { useNavigationMenus } from "../composables";

  const { t } = useI18n();
  const { isLoading, data: menus } = useNavigationMenus();

  const options = computed(() => {
    if (isLoading.value || !menus.value) {
      return [];
    }

    return menus.value.map((menu) => {
      return {
        id: menu.id,
        name: menu.name,
      };
    });
  });
</script>
<template>
  <form-dropdown
    v-if="!isLoading"
    id="role"
    :options="options"
    :label="t('navigation.menu.plural')"
    is-inline
  />
</template>
