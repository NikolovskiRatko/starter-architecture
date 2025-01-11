<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import {
    TabbedContent,
    TabbedContentTab,
    PageWrapper,
    PAGE_WRAPPER_SLOTS,
    SubheaderTitle,
  } from "../../../components";
  import { MenuItemsTab, MenusTab } from "../components";

  const { t } = useI18n();
  const menusLabel = t("navigation.menu.plural");
  const menusItems = t("navigation.menu.items");
</script>
<template>
  <PageWrapper>
    <template #[PAGE_WRAPPER_SLOTS.subheaderMain]>
      <SubheaderTitle title="Menus" description="Manage navigation menus" />
    </template>
    <TabbedContent>
      <TabbedContentTab :label="menusLabel" id="menus">
        <MenusTab />
      </TabbedContentTab>
      <TabbedContentTab :label="menusItems" id="menu-items">
        <MenuItemsTab />
      </TabbedContentTab>
    </TabbedContent>
  </PageWrapper>
</template>
