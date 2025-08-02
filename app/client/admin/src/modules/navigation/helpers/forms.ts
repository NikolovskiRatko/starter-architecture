import type { FormDropdownOption } from '@starter-core/dash-ui/dist/components/Form/types';
import { computed, type Ref } from 'vue';
import type { Navigation } from '../types';

export const useNavigationDropdownOptions = (
  navigations: Ref<Navigation[] | undefined>,
  disabledOptions?: Ref<number[] | undefined>
) => {
  return computed<FormDropdownOption[]>(() => {
    const disabled = disabledOptions?.value ?? [];

    const mappedOptions: FormDropdownOption[] = [
      {
        id: '0',
        name: 'None',
      },
      ...(navigations.value ?? []).map((navigation) => ({
        id: String(navigation.id),
        name: navigation.title,
        isDisabled: disabled.includes(navigation.id),
      })),
    ];

    return mappedOptions;
  });
};
