import type { UserFormItem } from "@/types/userformitem";
import { createFile } from "@/utils/edgeFileUpload";

const user: UserFormItem = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
  roles: [],
  role: 1,
  isDisabled: 0,
  uploadFIle: createFile("image/jpg"),
  source: "backend",
};

export { user };
