import type { UserCheckBy } from '../types';
import { useCan } from '@/composables/useCan';
import { useAuthStore } from '@/stores/auth';

/**
 * Backward-compatible permission/role check for component templates.
 *
 * Previous behaviour fetched a role catalog via /user/permissions-roles to
 * resolve a role name → id and compare; that round-trip is removed. Role
 * comparisons now match against the authoritative role id held in the
 * auth store, populated at login. Permission comparisons run against the
 * locally-cached permissions_array — no async dependency.
 */
export default function useUserCheck() {
  const { hasAnyPermission, hasPermission } = useCan();
  const store = useAuthStore();

  const checkUser = (checkBy: UserCheckBy, checkFor: string | string[]): boolean => {
    if (checkBy === 'roles' && typeof checkFor === 'string') {
      // Legacy callers pass a role NAME for `roles` mode. The store keeps
      // the role id only; resolve by name via the well-known seed mapping.
      const ROLE_NAME_TO_ID: Record<string, number> = {
        admin: 1,
        editor: 2,
        collaborator: 3,
      };
      const targetId = ROLE_NAME_TO_ID[checkFor];
      return targetId !== undefined && store.roleId === targetId;
    }

    if (Array.isArray(checkFor)) {
      return hasAnyPermission(checkFor);
    }

    return hasPermission(checkFor);
  };

  return { checkUser };
}
