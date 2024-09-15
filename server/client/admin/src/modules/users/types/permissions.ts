import type { USER_PERMISSIONS, USER_ROLES } from "@/modules/users/constants";

export type Permission =
  (typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS];
export type PermissionArray = Permission[];

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
