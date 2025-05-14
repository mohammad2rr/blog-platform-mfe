import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenubarModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    SidebarModule,
  ],
  template: `
    <div class="layout-wrapper">
      <!-- Header -->
      <header class="layout-header">
        <div class="header-left">
          <h1>My Blog</h1>
        </div>
        <div class="header-right">
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
            (click)="menu.toggle($event)"
          ></p-avatar>
          <p-menu #menu [popup]="true" [model]="userMenu"></p-menu>
        </div>
      </header>

      <!-- Main Content -->
      <div class="layout-main">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .layout-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .layout-header {
        background-color: var(--surface-card);
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .header-left h1 {
        margin: 0;
        font-size: 1.5rem;
        color: var(--primary-color);
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .layout-main {
        flex: 1;
        padding: 2rem;
        background-color: var(--surface-ground);
      }

      :host ::ng-deep {
        .p-avatar {
          cursor: pointer;
          background-color: var(--primary-color);
          color: var(--primary-color-text);
        }
      }
    `,
  ],
})
export class AppComponent {
  userMenu = [
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

  signOut() {
    // TODO: Implement sign out logic
    console.log('Signing out...');
  }
}
