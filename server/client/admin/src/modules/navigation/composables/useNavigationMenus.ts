import {
  useQuery,
  useMutation,
  type UseQueryReturnType,
  useQueryClient,
} from "@tanstack/vue-query";
import axios from "axios";
import { computed } from "vue";
import type { Ref } from "vue";
import { useToast } from "vue-toastification";
import {
  NAVIGATION_MENU_API_ENDPOINTS,
  NAVIGATION_MENU_QUERY_KEY,
  NAVIGATION_MENUS_QUERY_KEY,
} from "../constants";
import {
  NavigationMenu,
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

export const useNavigationMenu = (
  menuId: Ref<number | undefined>,
): UseQueryReturnType<NavigationMenu, unknown> => {
  const isEnabled = computed(() => !!menuId.value);
  return useQuery({
    queryKey: [NAVIGATION_MENU_QUERY_KEY, menuId] as const,
    queryFn: async () => {
      const data = await axios.get(
        NAVIGATION_MENU_API_ENDPOINTS.get(menuId.value ?? 0),
      );
      return data.data;
    },
    initialData: [],
    enabled: isEnabled,
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
