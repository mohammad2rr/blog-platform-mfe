import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AboutContactComponent } from './components/about-contact/about-contact.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'about',
    component: AboutContactComponent,
  },
  {
    path: 'contact',
    component: AboutContactComponent,
  },
];

export const routes = APP_ROUTES;
