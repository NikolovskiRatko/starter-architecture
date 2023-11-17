import { createFile } from '@/utils/edgeFileUpload';
import { cloneDeep } from 'lodash';

const user: UserFormItem = {
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: '',
  roles: [],
  role: '',
  is_disabled: 0,
  uploaded_file: createFile('image/jpg'),
  source: 'backend',
};


export {
  user,
};
