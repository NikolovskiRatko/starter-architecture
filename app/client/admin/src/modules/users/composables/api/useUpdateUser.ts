import { useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { type ComputedRef } from 'vue';
import { useToast } from 'vue-toastification';
import { USER_API_ENDPOINTS, USER_CACHE_KEY } from '../../constants';
import type { UserFormItem, GetUserResponse } from '../../types';

export const useUpdateUser = (userId?: ComputedRef<number>) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: async (userFormData: UserFormItem): Promise<GetUserResponse> => {
            const { data } = await axios.patch<GetUserResponse>(USER_API_ENDPOINTS.patch(userId?.value ?? 0), userFormData);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [USER_CACHE_KEY, userId?.value] });
            toast.success('User updated!');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
