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
            <h1><span class="gradient-text">Blog</span> Platform</h1>
          </div>
          <div class="header-center">
            <span class="p-input-icon-left search-box">
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

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <h2>Welcome to Our Blog Platform</h2>
          <p>
            Discover amazing stories, share your thoughts, and connect with
            writers worldwide.
          </p>
          <button
            pButton
            label="Start Reading"
            class="p-button-primary hero-button"
          ></button>
        </div>
      </section>

      <!-- Main Content -->
      <main class="public-main">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2>Why Choose Us</h2>
          <div class="features-grid">
            <div class="feature-card">
              <i class="pi pi-pencil feature-icon"></i>
              <h3>Easy Writing</h3>
              <p>Create and publish your content with our intuitive editor.</p>
            </div>
            <div class="feature-card">
              <i class="pi pi-users feature-icon"></i>
              <h3>Community</h3>
              <p>Connect with readers and writers from around the world.</p>
            </div>
            <div class="feature-card">
              <i class="pi pi-chart-line feature-icon"></i>
              <h3>Analytics</h3>
              <p>Track your content's performance with detailed insights.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="public-footer">
        <div class="footer-content">
          <div class="footer-section">
            <h3>About Us</h3>
            <p>
              Your trusted source for quality content and insights. Join our
              community of writers and readers today.
            </p>
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
              <a href="#" class="social-icon"><i class="pi pi-facebook"></i></a>
              <a href="#" class="social-icon"><i class="pi pi-twitter"></i></a>
              <a href="#" class="social-icon"
                ><i class="pi pi-instagram"></i
              ></a>
              <a href="#" class="social-icon"><i class="pi pi-linkedin"></i></a>
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
      :host {
        --primary-color: #8b5cf6;
        --secondary-color: #7c3aed;
        --accent-color: #a78bfa;
        --text-color: #f3f4f6;
        --text-color-secondary: #d1d5db;
        --surface-ground: #111827;
        --surface-card: #1f2937;
        --surface-border: #374151;
        --surface-hover: #374151;
        --gradient-start: #8b5cf6;
        --gradient-end: #ec4899;
        --shiny-gradient: linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6);
      }

      .public-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--surface-ground);
        background-image:
          radial-gradient(
            circle at 100% 0%,
            rgba(139, 92, 246, 0.1) 0%,
            transparent 50%
          ),
          radial-gradient(
            circle at 0% 100%,
            rgba(236, 72, 153, 0.1) 0%,
            transparent 50%
          );
      }

      .public-header {
        background-color: rgba(31, 41, 55, 0.8);
        backdrop-filter: blur(10px);
        padding: 1rem 0;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        position: sticky;
        top: 0;
        z-index: 1000;
        border-bottom: 1px solid rgba(139, 92, 246, 0.2);
      }

      .header-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-left h1 {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-color);
        letter-spacing: -0.5px;
      }

      .gradient-text {
        background: var(--shiny-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shine 3s linear infinite;
      }

      @keyframes shine {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      .header-center {
        flex: 1;
        max-width: 400px;
        margin: 0 2rem;
      }

      .search-box {
        width: 100%;
      }

      .search-box input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        border-radius: 12px;
        border: 2px solid var(--surface-border);
        background-color: rgba(31, 41, 55, 0.8);
        color: var(--text-color);
        transition: all 0.3s ease;
      }

      .search-box input:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2);
      }

      .header-right {
        display: flex;
        gap: 1rem;
      }

      .hero-section {
        background: var(--shiny-gradient);
        background-size: 200% 200%;
        animation: gradient 15s ease infinite;
        color: white;
        padding: 6rem 0;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      .hero-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          45deg,
          rgba(0, 0, 0, 0.3) 0%,
          rgba(0, 0, 0, 0) 100%
        );
      }

      .hero-section .container {
        position: relative;
        z-index: 1;
      }

      .hero-section h2 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        line-height: 1.2;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .hero-section p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.9;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      }

      .hero-button {
        padding: 1rem 2rem;
        font-size: 1.1rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.9) !important;
        color: var(--primary-color) !important;
        border: none !important;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .hero-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        background: white !important;
      }

      .public-main {
        flex: 1;
        padding: 4rem 0;
        background-color: var(--surface-ground);
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      .features-section {
        background-color: var(--surface-card);
        padding: 6rem 0;
        position: relative;
        overflow: hidden;
      }

      .features-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--shiny-gradient);
      }

      .features-section h2 {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--text-color);
        margin-bottom: 3rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .feature-card {
        background: rgba(31, 41, 55, 0.8);
        padding: 2rem;
        border-radius: 16px;
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid var(--surface-border);
        backdrop-filter: blur(10px);
      }

      .feature-card:hover {
        transform: translateY(-5px);
        border-color: var(--accent-color);
        box-shadow: 0 8px 16px rgba(139, 92, 246, 0.2);
      }

      .feature-icon {
        font-size: 2.5rem;
        background: var(--shiny-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 1.5rem;
      }

      .feature-card h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-color);
        margin-bottom: 1rem;
      }

      .feature-card p {
        color: var(--text-color-secondary);
        line-height: 1.6;
      }

      .public-footer {
        background-color: var(--surface-card);
        padding: 4rem 0 1rem;
        margin-top: auto;
        border-top: 1px solid var(--surface-border);
        position: relative;
      }

      .public-footer::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--shiny-gradient);
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 3rem;
      }

      .footer-section h3 {
        color: var(--text-color);
        margin-bottom: 1.25rem;
        font-size: 1.25rem;
        font-weight: 600;
      }

      .footer-section p {
        color: var(--text-color-secondary);
        line-height: 1.6;
      }

      .footer-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .footer-section ul li {
        margin-bottom: 0.75rem;
      }

      .footer-section ul li a {
        color: var(--text-color-secondary);
        text-decoration: none;
        transition: all 0.2s ease;
        display: inline-block;
      }

      .footer-section ul li a:hover {
        color: var(--accent-color);
        transform: translateX(5px);
      }

      .social-links {
        display: flex;
        gap: 1.25rem;
      }

      .social-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(31, 41, 55, 0.8);
        color: var(--text-color-secondary);
        transition: all 0.3s ease;
        border: 1px solid var(--surface-border);
      }

      .social-icon:hover {
        background: var(--shiny-gradient);
        color: white;
        transform: translateY(-3px);
        border: none;
      }

      .social-icon i {
        font-size: 1.25rem;
      }

      .footer-bottom {
        max-width: 1200px;
        margin: 3rem auto 0;
        padding: 1.5rem;
        text-align: center;
        border-top: 1px solid var(--surface-border);
        color: var(--text-color-secondary);
      }

      @media (max-width: 768px) {
        .header-content {
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        }

        .header-center {
          margin: 1rem 0;
          width: 100%;
        }

        .hero-section {
          padding: 4rem 0;
        }

        .hero-section h2 {
          font-size: 2rem;
        }

        .features-section {
          padding: 4rem 0;
        }

        .features-section h2 {
          font-size: 2rem;
        }

        .footer-content {
          grid-template-columns: 1fr;
          text-align: center;
          gap: 2rem;
        }

        .social-links {
          justify-content: center;
        }

        .footer-section ul li a:hover {
          transform: none;
        }
      }

      :host ::ng-deep {
        .p-button.p-button-primary {
          background: var(--shiny-gradient);
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
          border: none;
        }

        .p-button.p-button-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .p-button.p-button-outlined {
          color: var(--accent-color);
          border: 2px solid var(--accent-color);
          background: transparent;
        }

        .p-button.p-button-outlined:hover {
          background: rgba(139, 92, 246, 0.1);
          transform: translateY(-2px);
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'Public Panel';
}
