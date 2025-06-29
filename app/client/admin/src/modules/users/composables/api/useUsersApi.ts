import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { computed, type ComputedRef } from 'vue';
import { useToast } from 'vue-toastification';
import { USER_API_ENDPOINTS, USER_CACHE_KEY } from '../../constants';
import type { UserFormItem, GetUserResponse } from '../../types';

export const useUsersApi = (userId?: ComputedRef<number>) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { isLoading: isFetching, data: queryData } = useQuery({
    queryKey: [USER_CACHE_KEY, userId?.value],
    queryFn: async (): Promise<GetUserResponse> => {
      const { data } = await axios.get<GetUserResponse>(USER_API_ENDPOINTS.get(userId?.value ?? 0));
      return data;
    },
    enabled: !!userId?.value,
  });

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: async (newUserData: UserFormItem): Promise<GetUserResponse> => {
      const { data } = await axios.post<GetUserResponse>(USER_API_ENDPOINTS.create, newUserData);
      return data;
    },
    onSuccess: async () => {
      toast.success('User saved!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
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

  const data = computed(() => queryData.value);

  return {
    data,
    createUser,
    updateUser,
    isLoading: isFetching || isUpdating || isCreating || isUploadingAvatar,
  };
};
