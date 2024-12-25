import { useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import axios from "axios";
import { UserRole } from "../types";

export const useUserRoles = (): UseQueryReturnType<UserRole[], unknown> => {
  return useQuery({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const data = await axios.get("user/roles/get");
      return data.data;
    },
    initialData: [],
  });
};
