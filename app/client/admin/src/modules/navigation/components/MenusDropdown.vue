<script lang="ts" setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { useNavigationMenus } from "../composables";
  import { FormDropdown } from "@starter-core/dash-ui/src";

  const { t } = useI18n();
  const model = defineModel({
    type: String,
    required: true,
  });
  const { isLoading, data: menus } = useNavigationMenus();

  const options = computed(() => {
    if (isLoading.value || !menus.value) {
      return [];
    }

    return menus.value.map((menu) => {
      return {
        id: String(menu.id),
        name: menu.name,
      };
    });
  });
</script>
<template>
  <form-dropdown
    v-if="!isLoading"
    v-model="model"
    id="role"
    :options="options"
    :label="t('navigation.menu.plural')"
    is-inline
  />
</template>
