<script setup lang="ts">
  import { onMounted, inject } from "vue";
  import { useRootStore } from "@/store/root";
  import { useRouter, useRoute } from "vue-router";

  const { setActiveClasses } = useRootStore();
  const router = useRouter();
  const route = useRoute();

  const labelStart = inject("label_start");

  onMounted(() => {
    //Taken from old forms Needs to be rethought
    // TODO: EventBus is deprecated , find alternative
    // EventBus.$on('stepSave', data => {
    //   // Trigger current form save should be somewhere in here
    //   router.push({ name: data.route })
    // });

    setActiveClasses({
      main: route.meta ? (route.meta.main as string) : "/",
      sub: route.name as string,
      title: labelStart + ".title",
    });
  });
</script>

<template>
  <form
    autocomplete="off"
    enctype="multipart/form-data"
    class="container-fluid"
    @submit.prevent="$emit('beforeSubmit')"
    @keydown="$emit('keyDownFunction', $event)"
  >
    <!-- TODO This probably is not in the correct place in the html  -->
    <div class="row" :class="messageClass">
      {{ message }}
    </div>

    <slot />
  </form>
</template>
