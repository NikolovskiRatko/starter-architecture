import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { computed } from 'vue';
import { useToast } from 'vue-toastification';
import { USER_API_ENDPOINTS } from '../constants';
import type { UserFormItem, GetUserResponse } from '../types';
import { useUploadAvatar } from './useUploadAvatar';

const USER_CACHE_KEY = 'user';

export const useUsersForm = (userId?: number) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar({
    userId,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [USER_CACHE_KEY, userId] });
      toast.success('Image has been updated!');
    },
  });

  const { isLoading: isFetching, data: queryData } = useQuery({
    queryKey: [USER_CACHE_KEY, userId],
    queryFn: async (): Promise<GetUserResponse> => {
      const { data } = await axios.get<GetUserResponse>(USER_API_ENDPOINTS.get(userId ?? 0));
      return data;
    },
    enabled: !!userId,
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
      const { data } = await axios.patch<GetUserResponse>(USER_API_ENDPOINTS.patch(userId ?? 0), userFormData);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [USER_CACHE_KEY, userId] });
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
    uploadAvatar,
    isLoading: isFetching || isUpdating || isCreating || isUploadingAvatar,
  };
};
