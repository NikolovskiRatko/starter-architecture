export interface UserFormItem {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: number;
  roles?: any;
  is_disabled?: number;
  upload_file: File | null;
  password?: string;
  password_confirmation?: string;
  source: string;
}
