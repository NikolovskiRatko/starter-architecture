import type { VueElement } from 'vue';

export interface AccordionContentProps {
  isLoading?: boolean;
}

export interface AccordionItem {
  id: string;
  label: string;
}

export type AddAccordionItem = (tab: AccordionItem) => void;
export type SetActiveAccordionItem = (id: string) => void;

export interface AccordionItemProps {
  label: string;
  id: string;
  icon?: VueElement;
}
