import type { USER_PERMISSIONS, USER_ROLES } from "@/modules/users/constants";

export type Permission =
  (typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS];

export type UserRoleId = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface UserRole {
  guard_name: string;
  id: UserRoleId;
  name: string;
}
