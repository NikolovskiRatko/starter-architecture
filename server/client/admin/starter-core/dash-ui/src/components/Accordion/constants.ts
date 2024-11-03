import type { InjectionKey, Ref } from "vue";
import type { AddAccordionItem, SetActiveAccordionItem } from "./types";

export const AddAccordionKey: InjectionKey<AddAccordionItem> = Symbol("addAccordionItem");
export const SetActiveAccordionKey: InjectionKey<SetActiveAccordionItem> = Symbol("setActiveAccordionItem");
export const ActiveAccordionIdKey: InjectionKey<Ref<string>> = Symbol("activeAccordionId");
