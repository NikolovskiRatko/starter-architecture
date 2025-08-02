import type { FormDropdownOption } from '@starter-core/dash-ui/dist/components/Form/types';
import { computed, type Ref } from 'vue';
import type { Navigation } from '../types';

export const useNavigationDropdownOptions = (navigations: Ref<Navigation[] | undefined>, disabledOptions?: number[]) => {
  return computed<FormDropdownOption[]>(() => {
    return (navigations.value ?? []).map((navigation) => ({
      id: String(navigation.id),
      name: navigation.title,
      isDisabled: disabledOptions?.includes(navigation.id),
    }));
  });
};
