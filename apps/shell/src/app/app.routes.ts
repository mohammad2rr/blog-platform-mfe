import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './Home',
      }).then((m) => m.Home),
  },
  {
    path: 'admin',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './AdminDashboard',
      }).then((m) => m.AdminDashboard),
  },
  {
    path: 'user',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './UserProfile',
      }).then((m) => m.UserProfile),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
