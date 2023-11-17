declare interface UserFormItem {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  roles?: any;
  is_disabled?: number;
  uploaded_file: File|null;
  password?: string;
  password_confirmation?: string;
  source: string;
}
