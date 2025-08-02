import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import axios from 'axios';
import { NAVIGATION_API_ENDPOINTS, NAVIGATIONS_QUERY_KEY } from '../constants';
import type { NavigationRawResponse, NavigationsResponse } from '../types';

export const useNavigations = (): UseQueryReturnType<NavigationsResponse, unknown> => {
  return useQuery({
    queryKey: [NAVIGATIONS_QUERY_KEY],
    queryFn: async () => {
      const data = await axios.get<NavigationRawResponse>(NAVIGATION_API_ENDPOINTS.all);
      return data.data.data;
    },
    placeholderData: [],
  });
};
