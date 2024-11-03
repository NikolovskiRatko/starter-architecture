<script lang="ts" setup>
  import { useCreateNavigationMenu } from "../composables";

  const { mutate: createMenu } = useCreateNavigationMenu();
  const name = defineModel("name", { required: true, type: String });
  const description = defineModel("description", { type: String });

  const submitHandler = () => {
    createMenu({
      name: name.value,
      description: description.value,
    });
  };
</script>
<template>
  <form @submit.prevent="submitHandler">
    <input type="text" id="name" name="name" v-model="name" />
    <input
      type="text"
      id="description"
      name="description"
      v-model="description"
    />
    <button type="submit">Add</button>
  </form>
</template>
