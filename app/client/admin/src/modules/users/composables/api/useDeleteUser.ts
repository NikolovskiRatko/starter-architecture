import { useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { USER_API_ENDPOINTS, USERS_TABLE_QUERY_KEY } from '../../constants';
import { useAppErrors } from '@/composables';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { handleAPIError } = useAppErrors();

  return useMutation({
    mutationFn: async (userId: number): Promise<void> => {
      await axios.delete(USER_API_ENDPOINTS.delete(userId));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [USERS_TABLE_QUERY_KEY] });
      toast.success('User deleted.');
    },
    onError: (error) => {
      handleAPIError(error);
    },
  });
};
