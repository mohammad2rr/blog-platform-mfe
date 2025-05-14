import { Routes } from '@angular/router';
import { PostsComponent } from './posts.component';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./post-form/post-form.component').then(
        (m) => m.PostFormComponent,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./post-form/post-form.component').then(
        (m) => m.PostFormComponent,
      ),
  },
];
