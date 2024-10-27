import { useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import axios from "axios";
import { NAVIGATION_MENUS_QUERY_KEY } from "../constants";
import { NavigationMenus } from "../types";

export const useNavigationMenus = (): UseQueryReturnType<
  NavigationMenus,
  unknown
> => {
  return useQuery({
    queryKey: [NAVIGATION_MENUS_QUERY_KEY],
    queryFn: async () => {
      const data = await axios.get("navigation-menu/all");
      return data.data;
    },
    initialData: [],
  });
};
