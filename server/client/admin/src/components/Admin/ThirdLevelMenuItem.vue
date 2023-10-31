<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const props = defineProps(['subsubitem']);
  const router = useRouter();

  const isActiveClass = (input) => {
    const { link } = input;
    const curPath = router.currentRoute.name;
    return link === curPath;
  }
</script>

<template>
  <li
    class="kt-menu__item "
    :class="{
      'kt-menu__item--active' : isActiveClass(subsubitem),
    }"
    aria-haspopup="true"
  >
    <router-link
      :to="{ name: subsubitem.link, params: {type: subsubitem.type} }"
      class="kt-menu__link"
    >
      <i class="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i>
      <span class="kt-menu__link-text">{{ $t(subsubitem.label) }}</span>
    </router-link>
  </li>
</template>
