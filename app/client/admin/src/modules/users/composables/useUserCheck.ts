import useAuth from "../../../composables/useAuth";
import type { UserCheckBy } from "../types";
import { useUserPermissionsRoles } from "./api";

// TODO: Update the user to return string for 'role' so we don't expose all roles to regular user
// and we can avoid looping through roles array
export default function useUserCheck() {
  const { permissionsArray, user } = useAuth();
  const { data, isLoading } = useUserPermissionsRoles();

  const checkUser = (
    checkBy: UserCheckBy,
    checkFor: string | string[],
  ): boolean => {
    if (isLoading.value || !data.value) {
      return false;
    }

    if (checkBy === "roles" && typeof checkFor === "string") {
      const { role } = user;
      const checkForRoleObject = data.value.roles.find(
        (role) => role.name === checkFor,
      );

      return role === Number(checkForRoleObject?.id);
    }

    if (Array.isArray(checkFor)) {
      return permissionsArray.value.some((permission) =>
        checkFor.includes(permission),
      );
    }

    return permissionsArray.value.includes(checkFor);
  };

  return { checkUser };
}
