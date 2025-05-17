import { Routes } from '@angular/router';
import { HOME_ROUTES } from './components/home/home.routes';
import { POST_DETAIL_ROUTES } from './components/post-detail/post-detail.routes';
import { CATEGORY_LIST_ROUTES } from './components/category-list/category-list.routes';
import { ABOUT_CONTACT_ROUTES } from './components/about-contact/about-contact.routes';

export const APP_ROUTES: Routes = [
  {
    path: '',
    children: HOME_ROUTES,
  },
  {
    path: 'post',
    children: POST_DETAIL_ROUTES,
  },
  {
    path: 'category',
    children: CATEGORY_LIST_ROUTES,
  },
  {
    path: 'about',
    children: ABOUT_CONTACT_ROUTES,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export const routes = APP_ROUTES;
