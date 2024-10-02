<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { TabbedContent } from "../../../components";
  import type { TabbedContentTabs } from "../../../components";
  import { UserForm } from "../components";

  const { t } = useI18n();

  const tabs: TabbedContentTabs = [
    {
      label: t("users.basic.information"),
      id: "user-id",
      content: UserForm,
    },
  ];
</script>
<template>
  <TabbedContent :tabs="tabs" />
</template>
