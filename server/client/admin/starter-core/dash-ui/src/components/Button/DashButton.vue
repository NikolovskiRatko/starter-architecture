<script setup lang="ts">
  import { computed, toRefs } from "vue";
  import type { DashButtonProps } from "./types";
  import "./DashButton.scss";

  const emit = defineEmits<{
    click: [event: MouseEvent]
  }>();

  const props = withDefaults(defineProps<DashButtonProps>(), {
    type: "button",
    theme: "primary",
    isWide: false,
    isPill: false,
    isSquare: false
  });

  const {
    type,
    size,
    fontSize,
    fontWeight,
    textTransform,
    theme,
    state,
    height,
    href,
    themeMod,
    elevate,
    icon,
    isWide,
    isPill,
    isSquare
  } = toRefs(props);

  const buttonClass = computed(() => {
    const classes = ["btn"];

    if (props.className) {
      classes.push(props.className)
    }

    classes.push(
      themeMod?.value
        ? `btn-${themeMod.value}-${theme.value}`
        : `btn-${theme.value}`,
    );

    if (size?.value) {
      classes.push(`btn-${size.value}`);
    }

    if (state?.value) {
      classes.push(state.value);
    }

    if (elevate?.value) {
      classes.push("btn-elevate");
      if (elevate.value === "elevate-air") {
        classes.push("btn-elevate-air");
      }
    }

    if (isWide.value) {
      classes.push("btn-wide");
    }

    if (fontSize?.value) {
      classes.push(`btn-font-${fontSize.value}`);
    }

    if (fontWeight?.value) {
      classes.push(`btn-font-${fontWeight.value}`);
    }

    if (textTransform?.value) {
      classes.push(`btn-${textTransform.value}`);
    }

    if (height?.value) {
      classes.push(`btn-${height.value}`);
    }

    if (isPill.value) {
      classes.push("btn-pill");
    }

    if (isSquare.value) {
      classes.push("btn-square")
    }

    return classes.join(" ");
  });

  const buttonType = computed(() =>
    type.value === "submit" ? "submit" : undefined,
  );
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
