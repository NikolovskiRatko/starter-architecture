import MenuLink from "@/components/Admin/Menu/MenuLink/MenuLink.vue";
import SubMenu from "@/components/Admin/Menu/SubMenu/SubMenu.vue";
import { PortletBody } from "@starter-core/dash-ui/src";

export default (app) => {
  app.component("MenuLink", MenuLink);
  app.component("SubMenu", SubMenu);
  app.component("PortletBody", PortletBody);
};
