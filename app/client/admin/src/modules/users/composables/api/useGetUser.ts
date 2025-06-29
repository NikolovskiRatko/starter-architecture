import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { type ComputedRef } from 'vue';
import { USER_API_ENDPOINTS, USER_CACHE_KEY } from '../../constants';
import type { GetUserResponse } from '../../types';

export const useGetUser = (userId?: ComputedRef<number>) => {
    return useQuery({
        queryKey: [USER_CACHE_KEY, userId?.value],
        queryFn: async (): Promise<GetUserResponse> => {
            const { data } = await axios.get<GetUserResponse>(USER_API_ENDPOINTS.get(userId?.value ?? 0));
            return data;
        },
        enabled: !!userId?.value,
    });
};
