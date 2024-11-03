<script lang="ts" setup>
  import { computed } from "vue";
  import type { NavigationMenuItem } from "../types";
  import { useBEMBuilder } from "@/helpers";
  import "./MenuItem.scss";

  const [block, element] = useBEMBuilder("menu-item");

  const { item } = defineProps<{ item: NavigationMenuItem }>();

  const type = computed(() => (item.navigation_id ? "Internavl" : "External"));
</script>
<template>
  <li :class="block">
    <span>{{ item.label }}</span>
    <span>{{ type }}</span>
  </li>
</template>
