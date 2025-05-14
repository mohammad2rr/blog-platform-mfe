import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer mt-auto py-3 bg-dark text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>About Us</h5>
            <p>A modern blog platform built with Angular micro frontends.</p>
          </div>
          <div class="col-md-4">
            <h5>Quick Links</h5>
            <ul class="list-unstyled">
              <li><a href="/" class="text-light">Home</a></li>
              <li><a href="/blog" class="text-light">Blog</a></li>
              <li><a href="/contact" class="text-light">Contact</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h5>Connect With Us</h5>
            <div class="social-links">
              <a href="#" class="text-light me-2"
                ><i class="fab fa-facebook"></i
              ></a>
              <a href="#" class="text-light me-2"
                ><i class="fab fa-twitter"></i
              ></a>
              <a href="#" class="text-light me-2"
                ><i class="fab fa-linkedin"></i
              ></a>
              <a href="#" class="text-light"><i class="fab fa-github"></i></a>
            </div>
          </div>
        </div>
        <hr class="mt-4" />
        <div class="text-center">
          <p class="mb-0">
            &copy; {{ currentYear }} Blog Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        margin-top: 3rem;
      }
      .social-links a {
        font-size: 1.5rem;
        transition: color 0.3s ease;
      }
      .social-links a:hover {
        color: #007bff !important;
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
