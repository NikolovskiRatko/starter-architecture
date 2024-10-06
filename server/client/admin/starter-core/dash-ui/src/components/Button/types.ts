import type { VueElement } from 'vue';
import { DashButtonTheme } from './contansts';

type DashButtonType = "button" | "submit";
type DashButtonSize = "sm" | "lg";
type DashButtonState = "active" | "disabled";
type DashButtonTheme = typeof DashButtonTheme[keyof typeof DashButtonTheme];
type DashButtonThemeMod = "outline" | "hover" | "outline-hover";
type DashButtonFontSize = "sm" | "lg";
type DashButtonFontWeight = "bold" | "bolder" | "boldest" | "thin";
type DashButtonTextTransform = "uppercase" | "lowercase";
type DashButtonHeight = "tall" | "taller" | "tallest";
type DashButtonElevate = "elevate" | "elevate-air";

export interface DashButtonProps {
  className?: string;
  type?: DashButtonType;
  theme?: DashButtonTheme;
  themeMod?: DashButtonThemeMod;
  size?: DashButtonSize;
  fontSize?: DashButtonFontSize;
  fontWeight?: DashButtonFontWeight;
  state?: DashButtonState;
  href?: string;
  textTransform?: DashButtonTextTransform;
  height?: DashButtonHeight;
  elevate?: DashButtonElevate;
  icon?: VueElement;
  isWide?: boolean;
  isPill?: boolean;
  isSquare?: boolean;
  isIcon?: boolean;
}
