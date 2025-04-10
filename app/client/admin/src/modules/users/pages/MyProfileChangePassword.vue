<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { ChangePasswordForm } from "../components";
  import {
    PortletComponent,
    PortletBody,
    PortletHead,
    PortletHeadLabel,
  } from "@starter-core/dash-ui/src";

  const { t } = useI18n();
  const changePasswordLabel = t("users.password.change");
</script>
<template>
  <PortletComponent>
    <PortletHead>
      <PortletHeadLabel>
        {{ changePasswordLabel }}
      </PortletHeadLabel>
    </PortletHead>
    <PortletBody size="small">
      <ChangePasswordForm />
    </PortletBody>
  </PortletComponent>
</template>
