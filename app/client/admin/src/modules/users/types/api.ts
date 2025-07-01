import type { Permission, UserRoleId } from './permissions';
import type { PaginationObject } from '@starter-core/dash-ui/src/components';

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

export interface UsersTableResponse {
  data: GetUserResponse[];
  pagination: PaginationObject;
}

export type AuthUser = Omit<GetUserResponse, 'updated_at'>;

export interface CreateUserQuery {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
