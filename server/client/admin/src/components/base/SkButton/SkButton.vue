<script setup lang="ts">
  import { computed, toRefs } from "vue";
  import { SkLink } from "../index";
  import type { SkButtonProps, SkButtonEmits } from "./types";
  import { briefcaseIcon } from "@/data/navMenu";
  import "./SkButton.scss";

  const emit = defineEmits<SkButtonEmits>();

  const props = withDefaults(defineProps<SkButtonProps>(), {
    type: "button",
    theme: "primary",
    isWide: false,
    isPill: false,
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
    linkProps,
    themeMod,
    elevate,
    icon,
    isWide,
    isPill,
  } = toRefs(props);

  const className = computed(() => {
    const classes = ["btn"];

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

    return classes.join(" ");
  });

  const buttonType = computed(() =>
    type.value === "submit" ? "submit" : undefined,
  );
</script>
<template>
  <SkLink v-if="type === 'link'" :class="className" v-bind="linkProps">
    <span v-if="!!icon" v-html="briefcaseIcon" />
    <slot />
  </SkLink>
  <button
    v-else
    :type="buttonType"
    :class="className"
    @click="(event) => emit('click', event)"
  >
    <span v-if="!!icon" v-html="briefcaseIcon" />
    <slot />
  </button>
</template>
