import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "axios";
import { computed } from "vue";
import { useToast } from "vue-toastification";
import { USER_API_ENDPOINTS, MY_PROFILE_CACHE_KEY } from "../constants";
import {
  UserMyProfileForm,
  GetUserResponse,
  UpdatePasswordForm,
} from "../types";
import { useUploadAvatar } from "./useUploadAvatar";
import { useAuth } from "@/composables";

export const useMyProfile = () => {
  const queryClient = useQueryClient();
  const { refreshUserData } = useAuth();
  const toast = useToast();

  const { isLoading: isFetching, data: queryData } = useQuery({
    queryKey: [MY_PROFILE_CACHE_KEY],
    queryFn: async (): Promise<GetUserResponse> => {
      const data = await axios.get(USER_API_ENDPOINTS.myProfileGet);
      return data.data;
    },
  });

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: async (data: UserMyProfileForm): Promise<GetUserResponse> => {
      const response = await axios.patch(
        USER_API_ENDPOINTS.myProfileUpdate,
        data,
      );
      return response.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [MY_PROFILE_CACHE_KEY] });
      toast.success("Your profile has been updated!");
      refreshUserData();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: updatePassword, isPending: isUpdatingPassword } =
    useMutation({
      mutationFn: async (data: UpdatePasswordForm): Promise<void> => {
        const response = await axios.patch(
          USER_API_ENDPOINTS.myPasswordUpdate,
          data,
        );
        return response.data;
      },
      onSuccess: async () => {
        toast.success("Your password has been updated!");
      },
    });

  const { uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar({
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [MY_PROFILE_CACHE_KEY] });
      refreshUserData();
      toast.success("Image has been updated!");
    },
  });

  const data = computed(() => queryData.value);

  return {
    data,
    updateUser,
    uploadAvatar,
    updatePassword,
    isLoading:
      isFetching || isUpdating || isUploadingAvatar || isUpdatingPassword,
  };
};
