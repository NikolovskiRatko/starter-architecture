import type { RouterLinkProps } from "vue-router";
import type { DashButtonProps } from "../Button/types";

export interface DashLinkProps extends DashButtonProps {
  to: string | RouterLinkProps;
}
