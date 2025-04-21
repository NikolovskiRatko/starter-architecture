<script lang="ts" setup>
  import { computed } from 'vue';
  import { useNavigations } from '../composables';
  import type { Navigation } from '../types';
  import { useBEMBuilder } from '@/helpers';
  import './NavigationsForm.scss';

  interface NavigationsFormProps {
    modelValue: Navigation[];
  }

  const [block, element] = useBEMBuilder('navigations-form');

  const { isLoading, data: navigations } = useNavigations();
  const navigationsById = computed(() =>
    (navigations.value ?? []).reduce(
      (acc, navigation) => {
        acc[navigation.id] = navigation;
        return acc;
      },
      {} as Record<number, Navigation>
    )
  );

  const props = defineProps<NavigationsFormProps>();

  const emit = defineEmits(['update:modelValue']);

  const model = computed({
    get: () => props.modelValue.map(({ id }) => id),
    set: (newValue: number[]) => {
      emit(
        'update:modelValue',
        newValue.map((newId) => navigationsById.value[newId])
      );
      return true;
    },
  });
</script>
<template>
  <div :class="block">
    <ul :class="element('list').value" v-if="!isLoading">
      <li v-for="navigation in navigations" v-bind:key="navigation.slug">
        <label :class="element('label').value" :for="navigation.slug">
          <input type="checkbox" :id="navigation.slug" :value="navigation.id" v-model="model" />
          {{ navigation.title }}
          <small>{{ navigation.slug }}</small>
        </label>
      </li>
    </ul>
  </div>
</template>
