<script setup>
  import { ref } from "vue";
  import Icon from "../components/Icon.vue";
  import {
    FormInput,
    FormInputRadio,
    FormDropdown,
    FormSwitch,
  } from "../../../../src/index.ts";

  const switchValue = ref(false);
  const dropdownValue = ref(1);
  const radioValue = ref(0);
</script>

<template>
  <FormInput
    id="form-input"
    label="Form input"
    helper-text="This is fucking helper text"
    isInline
  >
    <template v-slot:prependContent>
      <Icon />
    </template>
  </FormInput>
  <FormInputRadio
    id="user-status"
    label="User status"
    v-model="radioValue"
    :options="[
      { id: 0, name: 'Enabled' },
      { id: 1, name: 'Disabled' },
    ]"
    helper-text="This is fucking helper text"
    is-inline
  />
  <FormDropdown
    id="role"
    label="User role"
    v-model="dropdownValue"
    :options="[
      { id: 0, name: 'Administrator' },
      { id: 1, name: 'Moderator' },
      { id: 2, name: 'Editor' },
    ]"
    is-inline
  />
  <form-switch
    id="switch"
    theme="primary"
    label="Switch"
    v-model="switchValue"
    helper-text="Some helper text"
  />
</template>

<style scoped></style>
