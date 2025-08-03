import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import axios from 'axios';
import { NAVIGATION_API_ENDPOINTS, NAVIGATIONS_QUERY_KEY } from '../constants';
import type { NavigationsRawResponse, NavigationsResponse } from '../types';

export const useNavigations = (): UseQueryReturnType<NavigationsResponse, unknown> => {
  return useQuery({
    queryKey: [NAVIGATIONS_QUERY_KEY],
    queryFn: async () => {
      const data = await axios.get<NavigationsRawResponse>(NAVIGATION_API_ENDPOINTS.all);
      return data.data.data;
    },
    placeholderData: [],
  });
};
