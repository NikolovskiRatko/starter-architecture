export interface RouteData {
  path: string;
  name: string;
  translationKey: string;
}

export type ModulesRoutesData<T> = Record<T, RouteData>
