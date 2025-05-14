import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-dark text-light py-4 mt-auto">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>About Us</h5>
            <p>
              A modern blog platform built with micro-frontends architecture.
            </p>
          </div>
          <div class="col-md-4">
            <h5>Quick Links</h5>
            <ul class="list-unstyled">
              <li><a class="text-light" href="/">Home</a></li>
              <li><a class="text-light" href="/blog">Blog</a></li>
              <li><a class="text-light" href="/contact">Contact</a></li>
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
          <p class="mb-0">&copy; 2024 Blog Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        margin-top: auto;
      }
      .social-links a {
        font-size: 1.5rem;
        text-decoration: none;
      }
      .social-links a:hover {
        opacity: 0.8;
      }
    `,
  ],
})
export class FooterComponent {}
