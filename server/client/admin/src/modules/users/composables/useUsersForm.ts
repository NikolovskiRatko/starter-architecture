import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import type { UserFormItem } from "../types";
import { get, post, patch } from "@/services/HTTP";

const USER_CACHE_KEY = "user";

export const useUsersForm = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const route = useRoute();

  const id = String(route.params.userId);
  const isEditPage = computed(() => route.name == "edit.user");
  const url = computed(() =>
    isEditPage.value ? `/user/${id}` : "/user/create",
  );

  const { isLoading: isFetching, data } = useQuery({
    queryKey: [USER_CACHE_KEY, id],
    queryFn: async (): Promise<UserFormItem> => {
      const data = await get(`/user/${id}`);
      return data.data;
    },
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (newUserData: UserFormItem) =>
      isEditPage.value
        ? patch(url.value, newUserData)
        : post(url.value, newUserData),
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
