<script setup lang="ts">
  import { ref } from "vue";
  import { useBEMBuilder } from "../../helpers";

  import "./BadgeComponent.scss";

  interface BadgeComponentProps {
    fontWeight?: 'bold' | 'bolder' | 'boldest';
    size?: 'md' | 'lg' | 'xl';
    isRounded?: boolean;
    isPill?: boolean;
    isInline?: boolean;
    theme?: string;
  }

  const {
    fontWeight,
    size,
    isPill,
    isRounded,
    isInline,
    theme
  } = defineProps<BadgeComponentProps>();

  const [block] = useBEMBuilder(
    "kt-badge",
    ref({
      [`${fontWeight}`]: !!fontWeight,
      [`${size}`]: !!size,
      [`${theme}`]: !!theme,
      inline: isInline,
      pill: isPill,
      rounded: isRounded
    }),
  );
</script>

<template>
  <span :class="block">
    <slot />
  </span>
</template>
