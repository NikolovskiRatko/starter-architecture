export interface RouteData {
  path: string;
  name: string;
  translationKey: string;
  authRoles: string[] | boolean;
}

export type ModulesRoutesData<T> = Record<T, RouteData>;
