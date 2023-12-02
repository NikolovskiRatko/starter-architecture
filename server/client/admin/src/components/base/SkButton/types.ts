import type { RouterLinkProps } from "vue-router";

type SkButtonType = "button" | "link" | "submit";
type SkButtonSize = "sm" | "lg";
type SkButtonState = "active" | "disabled";
type SkButtonTheme =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "link"
  | "dark"
  | "brand"
  | "light"
  | "default"
  | "clean";
type SkButtonThemeMod = "outline" | "hover" | "outline-hover";
type SkButtonFontSize = "sm" | "lg";
type SkButtonFontWeight = "bold" | "bolder" | "boldest" | "thin";
type SkButtonTextTransform = "uppercase" | "lowercase";
type SkButtonHeight = "tall" | "taller" | "tallest";
type SkButtonElevate = "elevate" | "elevate-air";

export interface SkButtonEmits {
  (
    e: "click",
    event: HTMLButtonElementClickEvent | HTMLAnchorElementClickEvent,
  ): void;
}

export interface SkButtonProps {
  type?: SkButtonType;
  theme?: SkButtonTheme;
  themeMod?: SkButtonThemeMod;
  size?: SkButtonSize;
  fontSize?: SkButtonFontSize;
  fontWeight?: SkButtonFontWeight;
  state?: SkButtonState;
  linkProps?: RouterLinkProps;
  textTransform?: SkButtonTextTransform;
  height?: SkButtonHeight;
  elevate?: SkButtonElevate;
  icon?: string;
  isWide?: boolean;
  isPill?: boolean;
}
