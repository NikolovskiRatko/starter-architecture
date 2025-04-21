import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import axios from 'axios';
import { NAVIGATIONS_QUERY_KEY } from '../constants';
import type { NavigationsResponse } from '../types';

export const useNavigations = (): UseQueryReturnType<NavigationsResponse, unknown> => {
  return useQuery({
    queryKey: [NAVIGATIONS_QUERY_KEY],
    queryFn: async () => {
      const data = await axios.get('navigation/all');
      return data.data;
    },
    initialData: [],
  });
};
