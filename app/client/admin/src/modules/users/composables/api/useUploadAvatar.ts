import { type QueryKey, useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import type { ComputedRef } from 'vue';
import { useToast } from 'vue-toastification';
import { MY_PROFILE_CACHE_KEY, USER_API_ENDPOINTS, USER_CACHE_KEY } from '../../constants';
import type { GetUserResponse } from '../../types';

interface UseUploadAvatarProps {
  userId?: ComputedRef<number>;
  onSuccess?: () => void;
}

export const useUploadAvatar = ({ userId, onSuccess }: UseUploadAvatarProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useMutation({
    mutationFn: async (file: File): Promise<GetUserResponse> => {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.post(USER_API_ENDPOINTS.uploadAvatar(userId?.value ?? 0), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      const queryKey: QueryKey = userId?.value ? [USER_CACHE_KEY, userId?.value] : [MY_PROFILE_CACHE_KEY];
      queryClient.invalidateQueries({ queryKey });
      onSuccess?.();
      toast.success('Image has been updated!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    uploadAvatar,
    isLoading: isUploadingAvatar,
  };
};
