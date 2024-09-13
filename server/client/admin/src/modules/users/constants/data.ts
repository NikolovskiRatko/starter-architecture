import type { UserFormItem } from "../types";
import { createFile } from "@/helpers";

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
