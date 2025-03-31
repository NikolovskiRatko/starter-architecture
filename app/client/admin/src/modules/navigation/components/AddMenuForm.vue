<script lang="ts" setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useCreateNavigationMenu } from "../composables";
  import { DashButton, FormInput } from "@starter-core/dash-ui/src";

  const { t } = useI18n();
  const { mutate: createMenu } = useCreateNavigationMenu();
  const name = ref<string>("");
  const description = ref<string>("");

  const submitHandler = () => {
    createMenu({
      name: name.value,
      description: description.value,
    });
  };
</script>
<template>
  <form @submit.prevent="submitHandler">
    <FormInput
      id="name"
      v-model="name"
      :label="t('navigation.menu.name')"
      name="Name"
    />
    <FormInput
      id="description"
      v-model="description"
      :label="t('navigation.menu.description')"
      name="Description"
    />
    <DashButton type="submit"> {{ t("navigation.menu.add") }} </DashButton>
  </form>
</template>
