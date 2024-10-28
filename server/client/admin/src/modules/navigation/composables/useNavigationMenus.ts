import {
  useQuery,
  useMutation,
  type UseQueryReturnType,
  type UseMutationReturnType, useQueryClient
} from "@tanstack/vue-query";
import axios from "axios";
import { useToast } from "vue-toastification";
import {
  NAVIGATION_MENU_API_ENDPOINTS,
  NAVIGATION_MENUS_QUERY_KEY,
} from "../constants";
import {
  NavigationMenuQuery,
  NavigationMenuResult,
  NavigationMenus,
} from "../types";

export const useNavigationMenus = (): UseQueryReturnType<
  NavigationMenus,
  unknown
> => {
  return useQuery({
    queryKey: [NAVIGATION_MENUS_QUERY_KEY],
    queryFn: async () => {
      const data = await axios.get(NAVIGATION_MENU_API_ENDPOINTS.getAll);
      return data.data;
    },
    initialData: [],
  });
};

export const useCreateNavigationMenu = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      navigationMenuData: NavigationMenuQuery,
    ): Promise<NavigationMenuResult> => {
      const response = await axios.post(
        NAVIGATION_MENU_API_ENDPOINTS.create,
        navigationMenuData,
      );
      return response.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [NAVIGATION_MENUS_QUERY_KEY],
      });
      toast.success("Navigation menu create!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
