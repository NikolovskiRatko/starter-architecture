import type { InjectionKey, ComputedRef } from "vue";

export const portletIsLoadingKey = Symbol() as InjectionKey<
  ComputedRef<boolean>
>;
export const portletThemeKey = Symbol() as InjectionKey<ComponentThemes>;
