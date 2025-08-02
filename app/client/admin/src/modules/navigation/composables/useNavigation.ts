import { useQuery, useQueryClient, useMutation, type UseQueryReturnType } from '@tanstack/vue-query';
import axios, { type AxiosError } from 'axios';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { NAVIGATION_API_ENDPOINTS, NAVIGATION_QUERY_KEY, NAVIGATIONS_QUERY_KEY } from '../constants';
import type { Navigation, NavigationQuery } from '../types';
import { tanstackGenericOnErrorHandler } from '@/helpers';

export const useNavigation = (navigationId: ComputedRef<number>): UseQueryReturnType<Navigation, AxiosError> => {
  return useQuery({
    queryKey: computed(() => [NAVIGATION_QUERY_KEY, navigationId]),
    queryFn: async () => {
      const data = await axios.get(NAVIGATION_API_ENDPOINTS.get(navigationId.value));
      return data.data;
    },
    placeholderData: () => [],
    enabled: computed(() => !!navigationId.value),
  });
};

export const useNavigationCreate = () => {
  const toast = useToast();
  const { t } = useI18n();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (navigationData: NavigationQuery): Promise<Navigation> => {
      const response = await axios.post(NAVIGATION_API_ENDPOINTS.create, navigationData);

      return response.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [NAVIGATIONS_QUERY_KEY],
      });
      toast.success('Navigation menu created!');
    },
    onError: (error) => tanstackGenericOnErrorHandler(error, t),
  });
};
