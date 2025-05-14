import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

@Component({
  selector: 'app-about-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="about-contact-container">
      <!-- About Section -->
      <section class="about-section mb-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <h1 class="display-4 mb-4">About Our Blog</h1>
              <p class="lead mb-4">
                Welcome to our tech blog, where we share insights, tutorials, and
                stories about software development, design, and technology.
              </p>
              <p class="mb-4">
                Our mission is to help developers and tech enthusiasts stay
                up-to-date with the latest trends and best practices in the
                industry. We believe in sharing knowledge and fostering a
                community of learners.
              </p>
              <div class="stats d-flex gap-4">
                <div class="stat-item">
                  <h3 class="mb-0">{{ totalPosts }}</h3>
                  <small class="text-muted">Articles</small>
                </div>
                <div class="stat-item">
                  <h3 class="mb-0">{{ totalAuthors }}</h3>
                  <small class="text-muted">Authors</small>
                </div>
                <div class="stat-item">
                  <h3 class="mb-0">{{ totalReaders }}</h3>
                  <small class="text-muted">Readers</small>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <img
                src="assets/images/about-hero.jpg"
                alt="About Us"
                class="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="team-section mb-5 py-5 bg-light">
        <div class="container">
          <h2 class="text-center mb-5">Meet Our Team</h2>
          <div class="row">
            <div
              *ngFor="let member of teamMembers"
              class="col-md-4 mb-4"
            >
              <div class="card h-100">
                <img
                  [src]="member.image"
                  class="card-img-top"
                  [alt]="member.name"
                />
                <div class="card-body text-center">
                  <h5 class="card-title mb-1">{{ member.name }}</h5>
                  <p class="text-muted mb-3">{{ member.role }}</p>
                  <p class="card-text">{{ member.bio }}</p>
                  <div class="social-links">
                    <a
                      *ngIf="member.social.twitter"
                      [href]="member.social.twitter"
                      target="_blank"
                      class="btn btn-outline-primary btn-sm me-2"
                    >
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      *ngIf="member.social.linkedin"
                      [href]="member.social.linkedin"
                      target="_blank"
                      class="btn btn-outline-primary btn-sm me-2"
                    >
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      *ngIf="member.social.github"
                      [href]="member.social.github"
                      target="_blank"
                      class="btn btn-outline-primary btn-sm"
                    >
                      <i class="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <h2 class="mb-4">Get in Touch</h2>
              <p class="mb-4">
                Have questions, suggestions, or want to collaborate? We'd love to
                hear from you! Fill out the form and we'll get back to you as
                soon as possible.
              </p>
              <div class="contact-info">
                <div class="d-flex align-items-center mb-3">
                  <i class="fas fa-envelope me-3 text-primary"></i>
                  <span>contact@blog.com</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <i class="fas fa-phone me-3 text-primary"></i>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div class="d-flex align-items-center">
                  <i class="fas fa-map-marker-alt me-3 text-primary"></i>
                  <span>123 Tech Street, Silicon Valley, CA 94043</span>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card">
                <div class="card-body">
                  <form (ngSubmit)="submitContactForm()">
                    <div class="mb-3">
                      <label for="name" class="form-label">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        [(ngModel)]="contactForm.name"
                        name="name"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        [(ngModel)]="contactForm.email"
                        name="email"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="subject" class="form-label">Subject</label>
                      <input
                        type="text"
                        class="form-control"
                        id="subject"
                        [(ngModel)]="contactForm.subject"
                        name="subject"
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="message" class="form-label">Message</label>
                      <textarea
                        class="form-control"
                        id="message"
                        rows="5"
                        [(ngModel)]="contactForm.message"
                        name="message"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .about-contact-container {
        padding: 2rem 0;
      }

      .about-section {
        padding: 4rem 0;
      }

      .stat-item {
        text-align: center;
      }

      .stat-item h3 {
        color: #0d6efd;
        font-weight: bold;
      }

      .card {
        border: none;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        transition: transform 0.2s;
      }

      .card:hover {
        transform: translateY(-5px);
      }

      .card-img-top {
        height: 250px;
        object-fit: cover;
      }

      .social-links {
        margin-top: 1rem;
      }

      .contact-info {
        margin-top: 2rem;
      }

      .contact-info i {
        font-size: 1.25rem;
      }
    `,
  ],
})
export class AboutContactComponent {
  totalPosts: number = 150;
  totalAuthors: number = 12;
  totalReaders: number = 50000;

  teamMembers: TeamMember[] = [
    {
      name: 'John Doe',
      role: 'Lead Developer',
      bio: 'Full-stack developer with 10+ years of experience in web development.',
      image: 'assets/images/team/john-doe.jpg',
      social: {
        twitter: 'https://twitter.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
      },
    },
    {
      name: 'Jane Smith',
      role: 'Content Writer',
      bio: 'Technical writer and developer advocate passionate about sharing knowledge.',
      image: 'assets/images/team/jane-smith.jpg',
      social: {
        twitter: 'https://twitter.com/janesmith',
        linkedin: 'https://linkedin.com/in/janesmith',
      },
    },
    {
      name: 'Mike Johnson',
      role: 'UI/UX Designer',
      bio: 'Creative designer focused on creating beautiful and user-friendly interfaces.',
      image: 'assets/images/team/mike-johnson.jpg',
      social: {
        twitter: 'https://twitter.com/mikejohnson',
        github: 'https://github.com/mikejohnson',
      },
    },
  ];

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  submitContactForm() {
    // Simulated API call to submit contact form
    console.log('Contact form submitted:', this.contactForm);
    // Reset form
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }
}
