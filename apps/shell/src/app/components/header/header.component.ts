import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <nav class="nav-container">
        <div class="nav-left">
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Home</a
          >
          <a routerLink="/blog" routerLinkActive="active">Blog</a>
        </div>
        <div class="nav-right">
          <a routerLink="/user" routerLinkActive="active">Profile</a>
          <a routerLink="/admin" routerLinkActive="active">Admin</a>
        </div>
      </nav>
    </header>
  `,
  styles: [
    `
      .header {
        background-color: var(--surface-card);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .nav-left,
      .nav-right {
        display: flex;
        gap: 1.5rem;
        align-items: center;
      }

      a {
        text-decoration: none;
        color: var(--text-color);
        font-weight: 500;
        transition: color 0.2s;
        padding: 0.5rem 1rem;
        border-radius: 4px;
      }

      a:hover {
        color: var(--primary-color);
        background-color: var(--surface-hover);
      }

      a.active {
        color: var(--primary-color);
        background-color: var(--surface-hover);
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  ngOnInit() {}
}
