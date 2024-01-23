import DefaultTheme from "vitepress/theme";
import DemoContainer from "../components/DemoContainer.vue";

import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("DemoContainer", DemoContainer);
  },
};
