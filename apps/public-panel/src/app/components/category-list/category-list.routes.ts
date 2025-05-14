import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list.component';

export const CATEGORY_LIST_ROUTES: Routes = [
  {
    path: ':slug',
    component: CategoryListComponent,
  },
];
