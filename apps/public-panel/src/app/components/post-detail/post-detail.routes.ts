import { Routes } from '@angular/router';
import { PostDetailComponent } from './post-detail.component';

export const POST_DETAIL_ROUTES: Routes = [
  {
    path: ':id',
    component: PostDetailComponent,
  },
];
