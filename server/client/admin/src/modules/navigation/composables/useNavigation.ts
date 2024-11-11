import {
  useQuery,
  useQueryClient,
  useMutation,
  type UseQueryReturnType,
} from "@tanstack/vue-query";
import axios, { AxiosError } from "axios";
import { ComputedRef } from "vue";
import { useToast } from "vue-toastification";
import {
  NAVIGATION_API_ENDPOINTS,
  NAVIGATION_QUERY_KEY,
  NAVIGATIONS_QUERY_KEY,
} from "../constants";
import { Navigation, NavigationQuery } from "../types";

export const useNavigation = (
  navigationId: ComputedRef<number>,
): UseQueryReturnType<Navigation, AxiosError> => {
  return useQuery({
    queryKey: [NAVIGATION_QUERY_KEY, navigationId],
    queryFn: async () => {
      const data = await axios.get(
        NAVIGATION_API_ENDPOINTS.get(navigationId.value),
      );
      return data.data;
    },
    initialData: [],
    enabled: !!navigationId.value,
  });
};

export const useNavigationCreate = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      navigationData: NavigationQuery,
    ): Promise<Navigation> => {
      const response = await axios.post(
        NAVIGATION_API_ENDPOINTS.create,
        navigationData,
      );

      return response.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [NAVIGATIONS_QUERY_KEY],
      });
      toast.success("Navigation menu created!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
