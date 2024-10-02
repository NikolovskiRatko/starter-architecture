import type { InjectionKey, Ref } from "vue";
import { AddTab } from "./types";

export const AddTabKey: InjectionKey<AddTab> = Symbol("addTab");
export const ActiveTabIdKey: InjectionKey<Ref<string>> = Symbol("activeTabId");
