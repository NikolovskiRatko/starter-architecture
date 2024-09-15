import { isTouchDevice } from "@/helpers";
import type { BodyClasses } from "@/store/types/root";

export const bodyClasses = (classObj: BodyClasses) => {
  const body = document.getElementsByTagName("body")[0];
  const { modalOpen, navMenuOpen, navSearchActive } = classObj;
  const bodyClasses: string[] = [
    isTouchDevice() ? "touch-device" : "no-touch-device",
    ...(modalOpen ? ["modal-open"] : []),
    ...(navMenuOpen ? ["nav-menu-open"] : []),
    ...(navSearchActive ? ["nav-search-active"] : []),
  ];

  body.className = "";
  body.classList.add(...bodyClasses);
};
