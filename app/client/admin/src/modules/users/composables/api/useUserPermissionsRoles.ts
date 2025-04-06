import { useQuery, type UseQueryReturnType } from "@tanstack/vue-query";
import axios from "axios";
import { UserRole, UserPermission } from "../../types";

interface UserPermissionsRolesResult {
  roles: UserRole[];
  permissions: UserPermission[];
}

export const useUserPermissionsRoles = (): UseQueryReturnType<
  UserPermissionsRolesResult,
  unknown
> => {
  return useQuery({
    queryKey: ["user-permissions-roles"],
    queryFn: async () => {
      const data = await axios.get("user/permissions-roles");
      return data.data;
    },
    initialData: [],
  });
};
