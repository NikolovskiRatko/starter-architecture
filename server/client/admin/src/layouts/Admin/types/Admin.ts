import { InjectionKey } from "vue";

export interface LayoutConfig {
  hasFixedHeader?: boolean;
  hasSubHeader?: boolean;
  hasSubHeaderFixed?: boolean;
}

export const layoutConfigKey: InjectionKey<LayoutConfig> =
  Symbol("layoutConfigKey");
