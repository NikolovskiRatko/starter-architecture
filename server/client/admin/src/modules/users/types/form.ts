export interface UserFormItem {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: number;
  roles?: any;
  isDisabled?: number;
  uploadFIle: File | null;
  password?: string;
  passwordConfirmation?: string;
  source: string;
}

interface UserRole {
  guardName: string;
  id: number;
  name: string;
}
