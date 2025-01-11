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
  NAVIGATION_MENU_ITEM_API_ENDPOINTS,
  NAVIGATION_MENU_QUERY_KEY,
  NAVIGATION_MENUS_QUERY_KEY,
} from "../constants";
import {
  NavigationMenu,
  NavigationMenuQuery,
  NavigationMenuResult,
  NavigationMenus,
  NavigationMenuItemQuery,
  NavigationMenuItem,
  NavigationDeleteResult,
  ReorderNavigationItemQuery,
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
      toast.success("Navigation menu created!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCreateNavigationMenuItem = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      navigationMenuItemData: NavigationMenuItemQuery,
    ): Promise<NavigationMenuItem> => {
      const response = await axios.post(
        NAVIGATION_MENU_ITEM_API_ENDPOINTS.create,
        navigationMenuItemData,
      );

      return response.data;
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries({
        queryKey: [NAVIGATION_MENU_QUERY_KEY, response.menu_id],
      });
      toast.success("Navigation menu item created!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteNavigationMenuItem = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (menuItemId: number): Promise<NavigationDeleteResult> => {
      const response = await axios.delete(
        NAVIGATION_MENU_ITEM_API_ENDPOINTS.delete(menuItemId),
      );
      return response.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [NAVIGATION_MENU_QUERY_KEY],
      });
      toast.success("Navigation menu item deleted!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useReorderNavigationMenuItem = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({
      menuId,
      ...query
    }: ReorderNavigationItemQuery): Promise<{ success: boolean }> => {
      const response = await axios.patch(
        NAVIGATION_MENU_ITEM_API_ENDPOINTS.reorder(menuId),
        query,
      );
      return response.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [NAVIGATION_MENU_QUERY_KEY],
      });
      toast.success("Navigation menu item deleted!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
