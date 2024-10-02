import type { VueElement } from "vue";

interface TabbedContentTab {
  label: string;
  id: string;
  content: VueElement;
}

export type TabbedContentTabs = TabbedContentTab[];

export interface TabbedContentProps {
  tabs: TabbedContentTabs;
  isLoading?: boolean;
}
