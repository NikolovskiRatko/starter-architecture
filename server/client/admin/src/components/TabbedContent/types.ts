export interface TabbedContentProps {
  isLoading?: boolean;
}

export interface TabbedContentTab {
  id: string;
  label: string;
}

export type AddTab = (tab: TabbedContentTab) => void;

export interface TabbedContentTabProps {
  label: string;
  id: string;
}
