import { useMutation } from '@tanstack/vue-query';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { USER_API_ENDPOINTS } from '../../constants';
import type { GetUserResponse, CreateUserQuery } from '../../types';

export const useCreateUser = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: async (newUserData: CreateUserQuery): Promise<GetUserResponse> => {
      const { data } = await axios.post<GetUserResponse>(USER_API_ENDPOINTS.create, newUserData);
      return data;
    },
    onSuccess: async () => {
      toast.success('User created successfully.!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
