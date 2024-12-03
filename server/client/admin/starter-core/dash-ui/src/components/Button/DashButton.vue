<script setup lang="ts">
  import { computed } from "vue";
  import type { DashButtonProps } from "./types";
  import "./DashButton.scss";

  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();

  const {
    type = "button",
    size,
    fontSize,
    fontWeight,
    textTransform,
    theme = "primary",
    state,
    height,
    href,
    themeMod,
    elevate,
    icon,
    className,
    isWide = false,
    isPill = false,
    isSquare = false,
    isIcon = false,
    isClean = false
  } = defineProps<DashButtonProps>();

  const buttonClass = computed(() => {
    const classes = ["btn"];

    if (className) {
      classes.push(className);
    }

    classes.push(themeMod ? `btn-${themeMod}-${theme}` : `btn-${theme}`);

    if (size) {
      classes.push(`btn-${size}`);
    }

    if (state) {
      classes.push(state);
    }

    if (elevate) {
      classes.push("btn-elevate");
      if (elevate === "elevate-air") {
        classes.push("btn-elevate-air");
      }
    }

    if (isWide) {
      classes.push("btn-wide");
    }

    if (fontSize) {
      classes.push(`btn-font-${fontSize}`);
    }

    if (fontWeight) {
      classes.push(`btn-font-${fontWeight}`);
    }

    if (textTransform) {
      classes.push(`btn-${textTransform}`);
    }

    if (height) {
      classes.push(`btn-${height}`);
    }

    if (isPill) {
      classes.push("btn-pill");
    }

    if (isSquare) {
      classes.push("btn-square");
    }

    if (isIcon) {
      classes.push("btn-icon");
    }

    if (isClean) {
      classes.push("btn-clean");
    }

    return classes.join(" ");
  });

  const buttonType = computed(() => (type === "submit" ? "submit" : "button"));
</script>
<template>
  <a
    v-if="!!href"
    :href="href"
    :class="buttonClass"
    @click="(event) => emit('click', event)"
  >
    <component :is="icon"></component>
    <slot />
  </a>
  <button
    v-else
    :type="buttonType"
    :class="buttonClass"
    @click="(event) => emit('click', event)"
  >
    <component :is="icon"></component>
    <slot />
  </button>
</template>
