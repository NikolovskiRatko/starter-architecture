import { mergeWith } from "lodash";
import { defineStore } from "pinia";
import type { RootState, SetActiveClassesPayload } from "./types/root";
import { CLOSED_SIDEBAR_NAVIGATIONS } from "@/constants/store/root";
import { bodyClasses } from "@/helpers";

export const useRootStore = defineStore("root", {
  state: (): RootState => ({
    appName: "",
    backUrl: "",
    csrfToken: "",
    activeClasses: {},
    homePath: "TESTING PURPOSES ONLY",
    frontActiveClass: {},
    bodyClasses: {
      modalOpen: false,
      navMenuOpen: false,
      navSearchActive: false,
      isBodyOverflowing: false,
      scrollBarWidth: 0,
    },
    sidebarState: {
      minimized: false,
      minimizeHover: false,
    },
  }),
  actions: {
    setBackUrl(payload) {
      this.backUrl = payload;
    },
    setActiveClasses(payload: SetActiveClassesPayload) {
      this.activeClasses = payload;
    },
    setBodyClasses(payload) {
      const newClasses = mergeWith({}, this.bodyClasses, payload, (a, b) =>
        b === null ? a : undefined,
      );
      this.bodyClasses = newClasses;
      bodyClasses(newClasses);
    },
    setFrontActiveClass(payload) {
      this.frontActiveClass = payload;
    },
    setSidebarState(payload) {
      this.bodyClasses.sidebarState = payload;
    },
  },
  getters: {
    isSidebarMinimized: (state): boolean => {
      return (
        CLOSED_SIDEBAR_NAVIGATIONS.includes(state.frontActiveClass) ||
        state.sidebarState.minimized
      );
    },
  },
});
