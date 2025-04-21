import type { USER_PERMISSIONS, USER_ROLES, USER_CHECK_BY } from '../constants/permissions';

export type Permission = (typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS];

export type UserRoleId = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface UserRole {
  guard_name: string;
  id: UserRoleId;
  name: string;
}

export type UserPermission = Omit<UserRole, 'id'> & {
  id: number;
};

export type UserCheckBy = (typeof USER_CHECK_BY)[keyof typeof USER_CHECK_BY];
