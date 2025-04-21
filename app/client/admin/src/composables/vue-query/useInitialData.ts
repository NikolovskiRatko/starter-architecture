import type { QueryFunction, UseQueryReturnType } from '@tanstack/vue-query';
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import type { NavMenuData } from '@/types';

interface InitialData {
  mainMenu: NavMenuData;
  navMenu: any;
}

export const getInitialData: QueryFunction<InitialData> = async () => {
  const { data } = await axios.get('vue');
  return data;
};

export const useInitialData = (): UseQueryReturnType<InitialData, Error> => {
  return useQuery({
    queryKey: ['initial-data'],
    queryFn: getInitialData,
  });
};
