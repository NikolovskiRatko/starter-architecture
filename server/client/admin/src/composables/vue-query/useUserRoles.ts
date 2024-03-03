import { useQuery } from "@tanstack/vue-query";
import { get } from "@/services/HTTP";

export const useUserRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const data = await get("user/roles/get");
      return data.data;
    },
  });
};
