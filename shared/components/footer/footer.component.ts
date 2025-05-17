import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h5>About Us</h5>
            <p>
              A modern blog platform built with micro-frontends architecture,
              providing a seamless experience for content creators and readers.
            </p>
          </div>

          <div class="footer-section">
            <h5>Quick Links</h5>
            <ul class="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h5>Newsletter</h5>
            <p>
              Subscribe to our newsletter for updates and exclusive content.
            </p>
            <div class="newsletter-form">
              <input
                pInputText
                type="email"
                placeholder="Enter your email"
                [(ngModel)]="email"
                class="newsletter-input"
              />
              <button
                pButton
                type="button"
                label="Subscribe"
                icon="pi pi-send"
                (click)="subscribeNewsletter()"
                [disabled]="!email"
              ></button>
            </div>
          </div>

          <div class="footer-section">
            <h5>Connect With Us</h5>
            <div class="social-links">
              <a href="#" class="social-link" title="Facebook">
                <i class="pi pi-facebook"></i>
              </a>
              <a href="#" class="social-link" title="Twitter">
                <i class="pi pi-twitter"></i>
              </a>
              <a href="#" class="social-link" title="LinkedIn">
                <i class="pi pi-linkedin"></i>
              </a>
              <a href="#" class="social-link" title="GitHub">
                <i class="pi pi-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Blog Platform. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
    <p-toast></p-toast>
  `,
  styles: [
    `
      .footer {
        background-color: var(--surface-ground);
        color: var(--text-color);
        padding: 3rem 0 1rem;
        margin-top: auto;
      }

      .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .footer-section {
        h5 {
          color: var(--primary-color);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        p {
          color: var(--text-color-secondary);
          line-height: 1.6;
        }
      }

      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: 0.5rem;

          a {
            color: var(--text-color-secondary);
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
              color: var(--primary-color);
            }
          }
        }
      }

      .newsletter-form {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;

        .newsletter-input {
          flex: 1;
        }
      }

      .social-links {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;

        .social-link {
          color: var(--text-color-secondary);
          font-size: 1.5rem;
          transition: all 0.2s;

          &:hover {
            color: var(--primary-color);
            transform: translateY(-2px);
          }
        }
      }

      .footer-bottom {
        border-top: 1px solid var(--surface-border);
        padding-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;

        p {
          color: var(--text-color-secondary);
          margin: 0;
        }

        .footer-bottom-links {
          display: flex;
          gap: 1rem;

          a {
            color: var(--text-color-secondary);
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
              color: var(--primary-color);
            }
          }
        }
      }

      @media (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr;
        }

        .footer-bottom {
          flex-direction: column;
          text-align: center;
        }
      }
    `,
  ],
})
export class FooterComponent {
  email: string = '';
  currentYear: number = new Date().getFullYear();

  constructor(private messageService: MessageService) {}

  subscribeNewsletter() {
    // TODO: Implement newsletter subscription
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Thank you for subscribing to our newsletter!',
    });
    this.email = '';
  }
}
