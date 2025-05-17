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
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: var(--text-color);
        padding: 0.5rem 1rem 0.5rem 2.5rem;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
      }

      .search-box input:focus {
        background-color: rgba(255, 255, 255, 0.15);
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
      }

      .header-right {
        display: flex;
        gap: 1rem;
      }

      .hero-section {
        padding: 4rem 0;
        text-align: center;
        background: linear-gradient(
          to bottom,
          rgba(139, 92, 246, 0.1),
          transparent
        );
      }

      .hero-section h2 {
        font-size: 3rem;
        font-weight: 700;
        color: var(--text-color);
        margin-bottom: 1rem;
        background: var(--shiny-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-section p {
        font-size: 1.25rem;
        color: var(--text-color-secondary);
        max-width: 600px;
        margin: 0 auto 2rem;
      }

      .hero-button {
        background: var(--shiny-gradient);
        border: none;
        padding: 0.75rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
      }

      .hero-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
      }

      .public-main {
        flex: 1;
        padding: 2rem 0;
      }

      .features-section {
        padding: 4rem 0;
        background: linear-gradient(
          to top,
          rgba(139, 92, 246, 0.1),
          transparent
        );
      }

      .features-section h2 {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--text-color);
        margin-bottom: 3rem;
        background: var(--shiny-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
      }

      .feature-card {
        background-color: var(--surface-card);
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid var(--surface-border);
      }

      .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        border-color: var(--primary-color);
      }

      .feature-icon {
        font-size: 2.5rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
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
        padding: 4rem 0 0;
        border-top: 1px solid var(--surface-border);
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
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-color);
        margin-bottom: 1.5rem;
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
        transition: color 0.3s ease;
      }

      .footer-section ul li a:hover {
        color: var(--primary-color);
      }

      .social-links {
        display: flex;
        gap: 1rem;
      }

      .social-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        background-color: var(--surface-ground);
        border-radius: 50%;
        color: var(--text-color);
        text-decoration: none;
        transition: all 0.3s ease;
      }

      .social-icon:hover {
        background-color: var(--primary-color);
        transform: translateY(-2px);
      }

      .footer-bottom {
        margin-top: 3rem;
        padding: 1.5rem 0;
        text-align: center;
        border-top: 1px solid var(--surface-border);
      }

      .footer-bottom p {
        color: var(--text-color-secondary);
        margin: 0;
      }

      @media (max-width: 768px) {
        .header-content {
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }

        .header-center {
          margin: 1rem 0;
          max-width: 100%;
        }

        .header-right {
          width: 100%;
          justify-content: center;
        }

        .hero-section h2 {
          font-size: 2rem;
        }

        .hero-section p {
          font-size: 1rem;
        }

        .features-grid {
          grid-template-columns: 1fr;
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
