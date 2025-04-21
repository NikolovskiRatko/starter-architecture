<script setup lang="ts">
  import { ref } from 'vue';
  import { useBEMBuilder } from '@/helpers';
  import './SkSection.scss';

  interface SkSectionProps {
    title?: string;
    size?: 'small' | 'medium' | 'large';
  }

  const { title } = defineProps<SkSectionProps>();

  const [block, element] = useBEMBuilder('kt-section');
</script>
<template>
  <div :class="block">
    <div class="kt-section__body">
      <h3
        v-if="title"
        :class="
          element(
            'title',
            ref({
              [`${size}`]: !!size,
            })
          ).value
        "
      >
        {{ title }}
      </h3>
      <slot />
    </div>
  </div>
</template>
