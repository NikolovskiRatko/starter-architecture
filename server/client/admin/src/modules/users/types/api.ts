import type { Permission, UserRoleId } from "./permissions";

export interface GetUserResponse {
  avatar_url: string | null;
  avatar_thumbnail: string | null;
  email: string;
  first_name: string;
  id: number;
  is_disabled: boolean;
  last_name: string;
  permissions_array: Permission[];
  role: UserRoleId;
  updated_at: string;
}
