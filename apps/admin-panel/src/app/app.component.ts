import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <div class="sidebar">
        <div class="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <nav class="sidebar-nav">
          <ul>
            <li>
              <a routerLink="/admin/dashboard" routerLinkActive="active">
                <i class="fas fa-tachometer-alt"></i> Dashboard
              </a>
            </li>
            <li>
              <a routerLink="/admin/posts" routerLinkActive="active">
                <i class="fas fa-file-alt"></i> Posts
              </a>
            </li>
            <li>
              <a routerLink="/admin/categories" routerLinkActive="active">
                <i class="fas fa-tags"></i> Categories
              </a>
            </li>
            <li>
              <a routerLink="/admin/users" routerLinkActive="active">
                <i class="fas fa-users"></i> Users
              </a>
            </li>
            <li>
              <a routerLink="/admin/comments" routerLinkActive="active">
                <i class="fas fa-comments"></i> Comments
              </a>
            </li>
            <li>
              <a routerLink="/admin/settings" routerLinkActive="active">
                <i class="fas fa-cog"></i> Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="main-content">
        <header class="admin-header">
          <div class="header-left">
            <button class="btn btn-link" (click)="toggleSidebar()">
              <i class="fas fa-bars"></i>
            </button>
            <h4>{{ currentPage }}</h4>
          </div>
          <div class="header-right">
            <div class="dropdown">
              <button
                class="btn btn-link dropdown-toggle"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
              >
                <img
                  src="assets/images/admin-avatar.jpg"
                  alt="Admin"
                  class="avatar"
                />
                <span>Admin User</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="fas fa-user"></i> Profile</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="fas fa-cog"></i> Settings</a
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="fas fa-sign-out-alt"></i> Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .admin-container {
        display: flex;
        min-height: 100vh;
      }

      .sidebar {
        width: 250px;
        background-color: #2c3e50;
        color: white;
        transition: all 0.3s ease;
      }

      .sidebar-header {
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .sidebar-nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .sidebar-nav a {
        display: flex;
        align-items: center;
        padding: 1rem 1.5rem;
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: all 0.3s ease;
      }

      .sidebar-nav a:hover,
      .sidebar-nav a.active {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
      }

      .sidebar-nav i {
        margin-right: 0.75rem;
        width: 20px;
        text-align: center;
      }

      .main-content {
        flex: 1;
        background-color: #f8f9fa;
      }

      .admin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .header-right {
        display: flex;
        align-items: center;
      }

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 0.5rem;
      }

      .content {
        padding: 2rem;
      }

      @media (max-width: 768px) {
        .sidebar {
          position: fixed;
          left: -250px;
          height: 100vh;
          z-index: 1000;
        }

        .sidebar.active {
          left: 0;
        }
      }
    `,
  ],
})
export class AppComponent {
  currentPage = 'Dashboard';

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
  }
}
