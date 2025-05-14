import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="app-header">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Blog Platform</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" routerLink="/" routerLinkActive="active"
                    >Home</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    routerLink="/admin"
                    routerLinkActive="active"
                    >Admin</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    routerLink="/user"
                    routerLinkActive="active"
                    >User</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main class="app-content">
        <router-outlet></router-outlet>
      </main>

      <footer class="app-footer">
        <div class="container">
          <p>&copy; 2024 Blog Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .app-header {
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .app-content {
        flex: 1;
        padding: 20px;
      }

      .app-footer {
        background-color: #f8f9fa;
        padding: 20px 0;
        margin-top: auto;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  async ngOnInit() {
    // Load remote modules
    try {
      const adminModule = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './AdminModule',
      });

      const userModule = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './UserModule',
      });

      const publicModule = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './PublicModule',
      });

      // Configure routes
      this.router.config = [
        { path: '', loadChildren: () => publicModule.PublicModule },
        { path: 'admin', loadChildren: () => adminModule.AdminModule },
        { path: 'user', loadChildren: () => userModule.UserModule },
        { path: '**', redirectTo: '' },
      ];
    } catch (error) {
      console.error('Error loading remote modules:', error);
    }
  }
}
