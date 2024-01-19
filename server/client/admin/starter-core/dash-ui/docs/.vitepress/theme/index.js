import DefaultTheme from "vitepress/theme";
import DemoContainer from "../components/DemoContainer.vue";
import DashUI from "dash-ui";

import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(DashUI);
    app.component("DemoContainer", DemoContainer);
  },
};
