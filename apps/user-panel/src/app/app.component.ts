import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MenubarModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    SidebarModule,
    InputTextModule,
    BadgeModule,
  ],
  template: `
    <div class="layout-wrapper">
      <!-- Header -->
      <header class="layout-header">
        <div class="header-content">
          <div class="header-left">
            <button
              pButton
              icon="pi pi-bars"
              class="p-button-text p-button-rounded mr-2"
              (click)="sidebarVisible = true"
            ></button>
            <h1>My Blog</h1>
          </div>
          <div class="header-center">
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <input
                type="text"
                pInputText
                placeholder="Search your posts..."
              />
            </span>
          </div>
          <div class="header-right">
            <button
              pButton
              icon="pi pi-bell"
              class="p-button-text p-button-rounded p-button-outlined mr-2"
              (click)="notificationsMenu.toggle($event)"
            >
              <span pBadge value="3" severity="danger"></span>
            </button>
            <button
              pButton
              icon="pi pi-plus"
              label="New Post"
              class="p-button-primary mr-2"
              routerLink="/posts/new"
            ></button>
            <p-avatar
              icon="pi pi-user"
              styleClass="mr-2"
              (click)="userMenu.toggle($event)"
            ></p-avatar>
            <p-menu #userMenu [popup]="true" [model]="userMenuItems"></p-menu>
            <p-menu
              #notificationsMenu
              [popup]="true"
              [model]="notificationItems"
            ></p-menu>
          </div>
        </div>
      </header>

      <!-- Sidebar -->
      <p-sidebar
        [(visible)]="sidebarVisible"
        [baseZIndex]="10000"
        [showCloseIcon]="true"
      >
        <div class="sidebar-content">
          <div class="user-info">
            <p-avatar
              icon="pi pi-user"
              size="large"
              styleClass="mr-2"
            ></p-avatar>
            <div class="user-details">
              <h3>John Doe</h3>
              <span class="user-role">Blog Author</span>
            </div>
          </div>
          <nav class="sidebar-nav">
            <ul>
              <li>
                <a routerLink="/dashboard" class="nav-item">
                  <i class="pi pi-home"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a routerLink="/posts" class="nav-item">
                  <i class="pi pi-file"></i>
                  <span>My Posts</span>
                </a>
              </li>
              <li>
                <a routerLink="/drafts" class="nav-item">
                  <i class="pi pi-pencil"></i>
                  <span>Drafts</span>
                </a>
              </li>
              <li>
                <a routerLink="/analytics" class="nav-item">
                  <i class="pi pi-chart-bar"></i>
                  <span>Analytics</span>
                </a>
              </li>
              <li>
                <a routerLink="/settings" class="nav-item">
                  <i class="pi pi-cog"></i>
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </p-sidebar>

      <!-- Main Content -->
      <main class="layout-main">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      .layout-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--surface-ground);
      }

      .layout-header {
        background-color: var(--surface-card);
        padding: 1rem 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .header-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-left {
        display: flex;
        align-items: center;
      }

      .header-left h1 {
        margin: 0;
        font-size: 1.5rem;
        color: var(--primary-color);
      }

      .header-center {
        flex: 1;
        max-width: 400px;
        margin: 0 2rem;
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .layout-main {
        flex: 1;
        padding: 2rem 0;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      .sidebar-content {
        padding: 1rem;
      }

      .user-info {
        display: flex;
        align-items: center;
        padding: 1rem;
        margin-bottom: 2rem;
        border-bottom: 1px solid var(--surface-border);
      }

      .user-details {
        margin-left: 1rem;
      }

      .user-details h3 {
        margin: 0;
        color: var(--text-color);
      }

      .user-role {
        color: var(--text-color-secondary);
        font-size: 0.875rem;
      }

      .sidebar-nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .nav-item {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        color: var(--text-color);
        text-decoration: none;
        border-radius: var(--border-radius);
        transition: background-color 0.2s;
      }

      .nav-item:hover {
        background-color: var(--surface-hover);
      }

      .nav-item i {
        margin-right: 0.75rem;
        font-size: 1.25rem;
      }

      :host ::ng-deep {
        .p-avatar {
          cursor: pointer;
          background-color: var(--primary-color);
          color: var(--primary-color-text);
        }

        .p-sidebar {
          width: 280px;
        }

        .p-sidebar .p-sidebar-header {
          padding: 1rem;
        }
      }

      @media (max-width: 768px) {
        .header-content {
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header-center {
          order: 3;
          margin: 1rem 0 0;
          width: 100%;
        }

        .header-right {
          margin-left: auto;
        }
      }
    `,
  ],
})
export class AppComponent {
  sidebarVisible = false;

  userMenuItems = [
    {
      label: 'My Profile',
      icon: 'pi pi-user',
      routerLink: '/profile',
    },
    {
      label: 'My Posts',
      icon: 'pi pi-file',
      routerLink: '/posts',
    },
    {
      label: 'Drafts',
      icon: 'pi pi-pencil',
      routerLink: '/drafts',
    },
    {
      separator: true,
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/settings',
    },
    {
      separator: true,
    },
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: () => this.signOut(),
    },
  ];

  notificationItems = [
    {
      label: 'New comment on "Getting Started with Angular"',
      icon: 'pi pi-comment',
      command: () => this.viewNotification(),
    },
    {
      label: 'Your post was featured',
      icon: 'pi pi-star',
      command: () => this.viewNotification(),
    },
    {
      label: 'New follower: Jane Smith',
      icon: 'pi pi-user-plus',
      command: () => this.viewNotification(),
    },
  ];

  signOut() {
    // TODO: Implement sign out logic
    console.log('Signing out...');
  }

  viewNotification() {
    // TODO: Implement notification view logic
    console.log('Viewing notification...');
  }
}
