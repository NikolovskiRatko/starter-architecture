import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

/**
 * Permission / role / context helper composable.
 *
 * Use for component-level UI gating:
 *   const { hasPermission, hasContext } = useCan();
 *   <button v-if="hasPermission('admin.users.delete')">…
 */
export function useCan() {
  const store = useAuthStore();
  const { permissionsArray, contexts } = storeToRefs(store);

  const hasPermission = (permission: string): boolean => permissionsArray.value.includes(permission);

  const hasAnyPermission = (permissions: string[]): boolean => permissions.some((p) => permissionsArray.value.includes(p));

  const hasAllPermissions = (permissions: string[]): boolean => permissions.every((p) => permissionsArray.value.includes(p));

  const hasRole = (roleId: number): boolean => store.roleId === roleId;

  const hasContext = (context: 'admin' | 'public'): boolean => Boolean(contexts.value?.[context]);

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasContext,
  };
}

export default useCan;
