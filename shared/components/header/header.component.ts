import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthService, User } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MenuModule,
    BadgeModule,
    OverlayPanelModule,
  ],
  template: `
    <header class="header">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" (click)="navigateTo('/')">
            <i class="pi pi-book"></i>
            Blog Platform
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link" (click)="navigateToPublic('/')">
                  <i class="pi pi-home"></i>
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" (click)="navigateToPublic('/blog')">
                  <i class="pi pi-book"></i>
                  Blog
                </a>
              </li>
              <li class="nav-item" *ngIf="isLoggedIn">
                <a class="nav-link" (click)="navigateToUser('/dashboard')">
                  <i class="pi pi-th-large"></i>
                  Dashboard
                </a>
              </li>
              <li class="nav-item" *ngIf="isAdmin">
                <a class="nav-link" (click)="navigateToAdmin('/dashboard')">
                  <i class="pi pi-shield"></i>
                  Admin
                </a>
              </li>
            </ul>

            <div class="d-flex align-items-center">
              <!-- Search Bar -->
              <div class="search-container me-3">
                <span class="p-input-icon-left">
                  <i class="pi pi-search"></i>
                  <input
                    pInputText
                    type="text"
                    [(ngModel)]="searchQuery"
                    (keyup.enter)="onSearch()"
                    placeholder="Search..."
                    class="search-input"
                  />
                </span>
              </div>

              <!-- Notifications -->
              <div class="notifications me-3" *ngIf="isLoggedIn">
                <button
                  pButton
                  type="button"
                  icon="pi pi-bell"
                  class="p-button-rounded p-button-text"
                  (click)="toggleNotifications($event)"
                  pBadge
                  [value]="unreadNotifications"
                  severity="danger"
                ></button>
                <p-overlayPanel
                  #notificationsPanel
                  [showCloseIcon]="true"
                  styleClass="notifications-panel"
                >
                  <div class="notifications-header">
                    <h6>Notifications</h6>
                    <button
                      pButton
                      type="button"
                      label="Mark all as read"
                      class="p-button-text p-button-sm"
                      (click)="markAllAsRead()"
                    ></button>
                  </div>
                  <div class="notifications-list">
                    <div
                      *ngFor="let notification of notifications"
                      class="notification-item"
                      [ngClass]="{ unread: !notification.read }"
                      (click)="markAsRead(notification)"
                    >
                      <i
                        [class]="'pi ' + getNotificationIcon(notification.type)"
                      ></i>
                      <div class="notification-content">
                        <h6>{{ notification.title }}</h6>
                        <p>{{ notification.message }}</p>
                        <small>{{
                          notification.timestamp | date: 'short'
                        }}</small>
                      </div>
                    </div>
                  </div>
                </p-overlayPanel>
              </div>

              <!-- User Menu -->
              <div class="user-menu" *ngIf="isLoggedIn">
                <button
                  pButton
                  type="button"
                  [label]="currentUser?.username || 'User'"
                  icon="pi pi-user"
                  class="p-button-text"
                  (click)="toggleUserMenu($event)"
                ></button>
                <p-menu
                  #userMenu
                  [popup]="true"
                  [model]="userMenuItems"
                ></p-menu>
              </div>

              <!-- Auth Buttons -->
              <div class="auth-buttons" *ngIf="!isLoggedIn">
                <button
                  pButton
                  type="button"
                  label="Login"
                  icon="pi pi-sign-in"
                  class="p-button-text me-2"
                  (click)="navigateTo('/login')"
                ></button>
                <button
                  pButton
                  type="button"
                  label="Register"
                  icon="pi pi-user-plus"
                  class="p-button-primary"
                  (click)="navigateTo('/register')"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [
    `
      .header {
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .navbar {
        padding: 0.5rem 0;
      }

      .navbar-brand {
        font-size: 1.5rem;
        font-weight: 600;
        color: #2c3e50;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .navbar-brand i {
        color: #3498db;
      }

      .nav-link {
        color: #2c3e50;
        font-weight: 500;
        padding: 0.5rem 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.2s ease;
      }

      .nav-link:hover {
        color: #3498db;
      }

      .nav-link i {
        font-size: 1rem;
      }

      .search-container {
        position: relative;
      }

      .search-input {
        width: 200px;
        border-radius: 20px;
        padding-left: 2.5rem;
        border: 1px solid #e0e0e0;
        transition: all 0.2s ease;
      }

      .search-input:focus {
        width: 300px;
        border-color: #3498db;
        box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
      }

      .notifications-panel {
        width: 350px;
        max-height: 400px;
        overflow-y: auto;
      }

      .notifications-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #e0e0e0;
      }

      .notifications-list {
        padding: 0.5rem;
      }

      .notification-item {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .notification-item:hover {
        background-color: #f8f9fa;
      }

      .notification-item.unread {
        background-color: #e3f2fd;
      }

      .notification-item i {
        font-size: 1.5rem;
        color: #3498db;
      }

      .notification-content {
        flex: 1;
      }

      .notification-content h6 {
        margin: 0;
        font-weight: 600;
      }

      .notification-content p {
        margin: 0.25rem 0;
        color: #666;
      }

      .notification-content small {
        color: #999;
      }

      .user-menu {
        position: relative;
      }

      .auth-buttons {
        display: flex;
        gap: 0.5rem;
      }

      @media (max-width: 991.98px) {
        .search-container {
          margin: 1rem 0;
        }

        .search-input {
          width: 100%;
        }

        .search-input:focus {
          width: 100%;
        }

        .notifications,
        .user-menu {
          margin: 1rem 0;
        }
      }
    `,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isAdmin = false;
  currentUser: User | null = null;
  searchQuery = '';
  notifications: Notification[] = [];
  unreadNotifications = 0;
  userMenuItems = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => this.navigateToUser('/profile'),
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      command: () => this.navigateToUser('/settings'),
    },
    {
      separator: true,
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.currentUser = user;
        this.isLoggedIn = !!user;
        this.isAdmin = user?.role === 'admin';
      });

    // Mock notifications
    this.notifications = [
      {
        id: 1,
        title: 'New Comment',
        message: 'Someone commented on your post',
        type: 'info',
        timestamp: new Date(),
        read: false,
      },
      {
        id: 2,
        title: 'Post Published',
        message: 'Your post has been published successfully',
        type: 'success',
        timestamp: new Date(Date.now() - 3600000),
        read: true,
      },
    ];
    this.updateUnreadCount();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateTo(path: string): void {
    this.navigationService.navigateTo(path);
  }

  navigateToAdmin(path: string): void {
    this.navigationService.navigateToAdmin(path);
  }

  navigateToUser(path: string): void {
    this.navigationService.navigateToUser(path);
  }

  navigateToPublic(path: string): void {
    this.navigationService.navigateToPublic(path);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.navigationService.navigateTo('/search', {
        queryParams: { q: this.searchQuery },
      });
    }
  }

  toggleNotifications(event: Event): void {
    // Implementation will be handled by p-overlayPanel
  }

  toggleUserMenu(event: Event): void {
    // Implementation will be handled by p-menu
  }

  markAsRead(notification: Notification): void {
    notification.read = true;
    this.updateUnreadCount();
  }

  markAllAsRead(): void {
    this.notifications.forEach((notification) => (notification.read = true));
    this.updateUnreadCount();
  }

  private updateUnreadCount(): void {
    this.unreadNotifications = this.notifications.filter(
      (notification) => !notification.read,
    ).length;
  }

  getNotificationIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      info: 'pi-info-circle',
      success: 'pi-check-circle',
      warning: 'pi-exclamation-triangle',
      error: 'pi-times-circle',
    };
    return iconMap[type] || 'pi-info-circle';
  }

  logout(): void {
    this.authService.logout();
  }
}
