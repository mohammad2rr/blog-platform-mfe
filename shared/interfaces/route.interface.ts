export interface Route {
  path: string;
  component: any;
  children?: Route[];
  canActivate?: any[];
  data?: {
    title?: string;
    roles?: string[];
  };
}
