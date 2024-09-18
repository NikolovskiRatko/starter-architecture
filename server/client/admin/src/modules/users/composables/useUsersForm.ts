import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import type { UserFormItem } from "../types";

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

  const { isLoading: isFetching, data: queryData } = useQuery({
    queryKey: [USER_CACHE_KEY, id],
    queryFn: async (): Promise<UserFormItem> => {
      const data = await axios.get(`/user/${id}`);
      return data.data;
    },
  });

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (newUserData: UserFormItem) =>
      isEditPage.value
        ? axios.patch(url.value, newUserData)
        : axios.post(url.value, newUserData),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: [USER_CACHE_KEY, id] });
      toast.success("User saved!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const data = computed(() => queryData.value);

  return {
    data,
    saveUser: mutate,
    isLoading: isFetching || isSaving,
  };
};
