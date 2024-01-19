import { App } from "vue";
import MenuLink from "@/components/Admin/Menu/MenuLink/MenuLink.vue";
import SubMenu from "@/components/Admin/Menu/SubMenu/SubMenu.vue";

export default (app: App) => {
  app.component("MenuLink", MenuLink);
  app.component("SubMenu", SubMenu);
};
