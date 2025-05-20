import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'publicPanel@http://localhost:4203/remoteEntry.js',
        exposedModule: './PublicModule',
      }).then((m) => m.PublicModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'publicPanel@http://localhost:4203/remoteEntry.js',
        exposedModule: './PublicModule',
      }).then((m) => m.PublicModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'adminPanel@http://localhost:4201/remoteEntry.js',
        exposedModule: './AdminModule',
      }).then((m) => m.AdminModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'userPanel@http://localhost:4202/remoteEntry.js',
        exposedModule: './UserModule',
      }).then((m) => m.UserModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
