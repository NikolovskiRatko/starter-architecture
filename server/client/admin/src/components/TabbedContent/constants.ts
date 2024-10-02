import type { InjectionKey } from "vue";
import { AddTab } from "./types";

export const AddTabKey: InjectionKey<AddTab> = Symbol("addTab");
