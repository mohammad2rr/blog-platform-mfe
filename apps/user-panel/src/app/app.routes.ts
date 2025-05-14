import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'posts',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/posts/posts-list/posts-list.component').then(
            (m) => m.PostsListComponent,
          ),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./components/posts/post-editor/post-editor.component').then(
            (m) => m.PostEditorComponent,
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./components/posts/post-editor/post-editor.component').then(
            (m) => m.PostEditorComponent,
          ),
      },
    ],
  },
  {
    path: 'drafts',
    loadComponent: () =>
      import('./components/drafts/drafts.component').then(
        (m) => m.DraftsComponent,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./components/settings/settings.component').then(
        (m) => m.SettingsComponent,
      ),
  },
];
