import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES,
      ),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./components/posts/posts.routes').then((m) => m.POSTS_ROUTES),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./components/categories/categories.routes').then(
        (m) => m.CATEGORIES_ROUTES,
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./components/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: 'comments',
    loadChildren: () =>
      import('./components/comments/comments.routes').then(
        (m) => m.COMMENTS_ROUTES,
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./components/settings/settings.routes').then(
        (m) => m.SETTINGS_ROUTES,
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
