<script setup>
  import Icon from "../components/Icon.vue";
  import { FormInput, FormInputRadio, FormDropdown } from "../../../../src/index.ts";
</script>

<template>
  <FormInput
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
    :model-value="0"
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
    :options="[
      { id: 0, name: 'Administrator'},
      { id: 1, name: 'Moderator'},
      { id: 2, name: 'Editor'}
    ]"
    is-inline
  />
</template>

<style scoped></style>
