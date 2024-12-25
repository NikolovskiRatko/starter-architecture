import DefaultTheme from "vitepress/theme";
import DemoContainer from "../components/DemoContainer.vue";
import DemoGrid from "../components/DemoGrid.vue";

import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("DemoContainer", DemoContainer);
    app.component("DemoGrid", DemoGrid);
  },
};
