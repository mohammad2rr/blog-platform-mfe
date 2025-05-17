import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-public-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
  ],
  template: `
    <div class="public-container">
      <!-- Header -->
      <header class="public-header">
        <div class="header-content">
          <div class="header-left">
            <h1>Blog Platform</h1>
          </div>
          <div class="header-center">
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <input type="text" pInputText placeholder="Search posts..." />
            </span>
          </div>
          <div class="header-right">
            <button
              pButton
              label="Sign In"
              class="p-button-outlined mr-2"
              routerLink="/auth/login"
            ></button>
            <button
              pButton
              label="Sign Up"
              class="p-button-primary"
              routerLink="/auth/register"
            ></button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="public-main">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- Footer -->
      <footer class="public-footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>About Us</h3>
            <p>Your trusted source for quality content and insights.</p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Connect With Us</h3>
            <div class="social-links">
              <i class="pi pi-facebook"></i>
              <i class="pi pi-twitter"></i>
              <i class="pi pi-instagram"></i>
              <i class="pi pi-linkedin"></i>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Blog Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .public-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--surface-ground);
      }

      .public-header {
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
        gap: 1rem;
      }

      .public-main {
        flex: 1;
        padding: 2rem 0;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      .public-footer {
        background-color: var(--surface-card);
        padding: 3rem 0 1rem;
        margin-top: auto;
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
      }

      .footer-section h3 {
        color: var(--text-color);
        margin-bottom: 1rem;
      }

      .footer-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .footer-section ul li {
        margin-bottom: 0.5rem;
      }

      .footer-section ul li a {
        color: var(--text-color-secondary);
        text-decoration: none;
        transition: color 0.2s;
      }

      .footer-section ul li a:hover {
        color: var(--primary-color);
      }

      .social-links {
        display: flex;
        gap: 1rem;
      }

      .social-links i {
        font-size: 1.5rem;
        color: var(--text-color-secondary);
        cursor: pointer;
        transition: color 0.2s;
      }

      .social-links i:hover {
        color: var(--primary-color);
      }

      .footer-bottom {
        max-width: 1200px;
        margin: 2rem auto 0;
        padding: 1rem;
        text-align: center;
        border-top: 1px solid var(--surface-border);
        color: var(--text-color-secondary);
      }

      @media (max-width: 768px) {
        .header-content {
          flex-direction: column;
          gap: 1rem;
        }

        .header-center {
          margin: 1rem 0;
          width: 100%;
        }

        .footer-content {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .social-links {
          justify-content: center;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'Public Panel';
}
