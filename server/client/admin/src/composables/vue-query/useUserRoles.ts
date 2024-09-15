import axios from "axios";
import { useQuery } from "@tanstack/vue-query";

export const useUserRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const data = await axios.get("user/roles/get");
      return data.data;
    },
  });
};
