import { useToast } from "vue-toastification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { get, post } from "@/services/HTTP";
import type { UserFormItem } from "@/types/userformitem";

const USER_CACHE_KEY = "user";

interface UseUserFormProps {
  id: string;
  getUrl: string;
  postUrl: string;
}

export const useUsersForm = ({ id, getUrl, postUrl }: UseUserFormProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { isLoading: isFetching, data } = useQuery({
    queryKey: [USER_CACHE_KEY, id],
    queryFn: async (): Promise<UserFormItem> => {
      const data = await get(getUrl);
      return data.data;
    },
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (newUserData: UserFormItem) => post(postUrl, newUserData),
    onSuccess: async (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [USER_CACHE_KEY, id] });
        toast.success("User saved!");
      } else {
        throw new Error(data.error?.message ?? "Error happened!");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    data,
    saveUser: mutate,
    isLoading: isFetching || isSaving,
  };
};
