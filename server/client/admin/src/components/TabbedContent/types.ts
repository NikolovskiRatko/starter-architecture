import type { VueElement } from "vue";

interface TabbedContentTab {
  label: string;
  id: string;
  content: VueElement;
}

export interface TabbedContentProps {
  tabs: TabbedContentTab[];
  isLoading?: boolean;
}
