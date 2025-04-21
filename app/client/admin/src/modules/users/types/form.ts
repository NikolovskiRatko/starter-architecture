export interface UserFormItem {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: number;
  is_disabled?: boolean;
  password?: string;
  password_confirmation?: string;
}

export type UserMyProfileForm = Pick<UserFormItem, 'first_name' | 'last_name' | 'email'>;

export interface UpdatePasswordForm {
  current_password: string;
  password: string;
  password_confirmation: string;
}
