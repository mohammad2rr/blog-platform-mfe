import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'my-posts',
    component: MyPostsComponent,
  },
  {
    path: 'comments',
    component: CommentsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
    path: 'settings',
    loadComponent: () =>
      import('./components/settings/settings.component').then(
        (m) => m.SettingsComponent,
      ),
  },
];
