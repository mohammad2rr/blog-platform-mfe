import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="admin-container">
      <aside class="admin-sidebar">
        <div class="sidebar-header">
          <h3>User panel</h3>
        </div>
        <nav class="sidebar-nav">
          <ul>
            <li>
              <a routerLink="dashboard" routerLinkActive="active">
                <i class="pi pi-home"></i>
                Dashboard
              </a>
            </li>
            <li>
              <a routerLink="posts" routerLinkActive="active">
                <i class="pi pi-file"></i>
                My Posts
              </a>
            </li>
            <li>
              <a routerLink="drafts" routerLinkActive="active">
                <i class="pi pi-pencil"></i>
                Drafts
              </a>
            </li>
            <li>
              <a routerLink="settings" routerLinkActive="active">
                <i class="pi pi-cog"></i>
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="admin-content">
        <header class="admin-header">
          <div class="header-search">
            <input type="text" placeholder="Search..." class="form-control" />
          </div>
          <div class="header-actions">
            <button class="btn btn-outline-primary">
              <i class="pi pi-bell"></i>
            </button>
            <button class="btn btn-outline-primary">
              <i class="pi pi-user"></i>
            </button>
          </div>
        </header>

        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .admin-container {
        display: flex;
        min-height: 100vh;
      }

      .admin-sidebar {
        width: 250px;
        background-color: #2c3e50;
        color: white;
        padding: 1rem;
      }

      .sidebar-header {
        padding: 1rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 1rem;
      }

      .sidebar-nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .sidebar-nav li {
        margin-bottom: 0.5rem;
      }

      .sidebar-nav a {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.3s;
      }

      .sidebar-nav a:hover,
      .sidebar-nav a.active {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .sidebar-nav i {
        margin-right: 0.75rem;
      }

      .admin-content {
        flex: 1;
        background-color: #f8f9fa;
      }

      .admin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header-search {
        width: 300px;
      }

      .header-actions {
        display: flex;
        gap: 0.5rem;
      }

      .content-wrapper {
        padding: 1.5rem;
      }
    `,
  ],
})
export class AppComponent {
  title = 'user-panel';
}
