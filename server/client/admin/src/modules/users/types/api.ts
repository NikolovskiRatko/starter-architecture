import type { PermissionArray, UserRole } from "./permissions";

export interface GetUserResponse {
  activation_code: string | null;
  created_at: string;
  deleted_at: string;
  email: string;
  email_verified_at: string;
  first_name: string;
  id: number;
  is_disabled: boolean;
  last_name: string;
  permissions: PermissionArray[];
  permissions_array: PermissionArray[];
  role: UserRole;
  updated_at: string;
}
