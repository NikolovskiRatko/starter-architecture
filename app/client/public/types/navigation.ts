export interface DynamicNavigationRoute {
  title: string;
  slug: string;
  path: string;
  content_type: string | null;
  content: unknown;
}

export type DynamicNavigationRoutes = DynamicNavigationRoute[];
