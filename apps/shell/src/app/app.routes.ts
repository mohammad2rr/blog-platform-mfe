import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Home',
      }).then((m) => m.HomeComponent),
  },
  {
    path: 'blog',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './BlogList',
      }).then((m) => m.BlogListComponent),
  },
  {
    path: 'blog/:id',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './BlogPost',
      }).then((m) => m.BlogPostComponent),
  },
  {
    path: 'admin',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './AdminDashboard',
      }).then((m) => m.AdminDashboardComponent),
  },
  {
    path: 'profile',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './UserProfile',
      }).then((m) => m.UserProfileComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
