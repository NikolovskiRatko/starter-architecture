import { IconUser, IconShielduser } from "@starter-core/icons";
import { USER_ROUTES_DATA } from "./routes";

export const MY_PROFILE_WIDGET_LINKS = [
  {
    label: "Personal Information",
    Icon: IconUser,
    routeName: USER_ROUTES_DATA.myProfilePersonalInfo.name,
  },
  {
    label: "Change Password",
    Icon: IconShielduser,
    routeName: USER_ROUTES_DATA.myProfileChangePassword.name,
  },
];
