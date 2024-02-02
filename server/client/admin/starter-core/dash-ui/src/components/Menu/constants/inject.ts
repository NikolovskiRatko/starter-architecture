import type { InjectionKey, Ref } from "vue";
import type { MenuTheme, MenuType } from "../types";

export const menuTypeKey = Symbol() as InjectionKey<
    MenuType
>;

export const menuThemeKey = Symbol() as InjectionKey<
    MenuTheme
>;

export const isMenuMinimizedKey = Symbol() as InjectionKey<
    Ref<Boolean>
>;
