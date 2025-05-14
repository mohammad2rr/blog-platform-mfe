import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  website: string;
  socialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
  };
  preferences: {
    emailNotifications: boolean;
    commentNotifications: boolean;
    newsletterSubscription: boolean;
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile">
      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body text-center">
              <img
                [src]="profile.avatar"
                alt="Profile"
                class="rounded-circle mb-3"
                style="width: 150px; height: 150px; object-fit: cover;"
              />
              <h4>{{ profile.name }}</h4>
              <p class="text-muted">{{ profile.email }}</p>
              <div class="d-flex justify-content-center gap-2">
                <a
                  [href]="profile.socialLinks.twitter"
                  target="_blank"
                  class="btn btn-outline-primary"
                >
                  <i class="fab fa-twitter"></i>
                </a>
                <a
                  [href]="profile.socialLinks.github"
                  target="_blank"
                  class="btn btn-outline-dark"
                >
                  <i class="fab fa-github"></i>
                </a>
                <a
                  [href]="profile.socialLinks.linkedin"
                  target="_blank"
                  class="btn btn-outline-primary"
                >
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title mb-4">Profile Information</h5>
              <form (ngSubmit)="saveProfile()">
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="profile.name"
                    name="name"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    [(ngModel)]="profile.email"
                    name="email"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Bio</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    [(ngModel)]="profile.bio"
                    name="bio"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Website</label>
                  <input
                    type="url"
                    class="form-control"
                    [(ngModel)]="profile.website"
                    name="website"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Notification Preferences</h5>
              <form (ngSubmit)="savePreferences()">
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="emailNotifications"
                    [(ngModel)]="profile.preferences.emailNotifications"
                    name="emailNotifications"
                  />
                  <label class="form-check-label" for="emailNotifications"
                    >Email Notifications</label
                  >
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="commentNotifications"
                    [(ngModel)]="profile.preferences.commentNotifications"
                    name="commentNotifications"
                  />
                  <label class="form-check-label" for="commentNotifications"
                    >Comment Notifications</label
                  >
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="newsletterSubscription"
                    [(ngModel)]="profile.preferences.newsletterSubscription"
                    name="newsletterSubscription"
                  />
                  <label class="form-check-label" for="newsletterSubscription"
                    >Newsletter Subscription</label
                  >
                </div>
                <button type="submit" class="btn btn-primary">
                  Save Preferences
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .profile {
        padding: 1rem;
      }
      .card {
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      }
      .form-check-input:checked {
        background-color: #0d6efd;
        border-color: #0d6efd;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  profile: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software developer passionate about web technologies and user experience.',
    avatar: 'https://via.placeholder.com/150',
    website: 'https://johndoe.com',
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
    preferences: {
      emailNotifications: true,
      commentNotifications: true,
      newsletterSubscription: false,
    },
  };

  ngOnInit() {
    // TODO: Fetch profile data from API
  }

  saveProfile() {
    // TODO: Implement profile save functionality
    console.log('Saving profile:', this.profile);
  }

  savePreferences() {
    // TODO: Implement preferences save functionality
    console.log('Saving preferences:', this.profile.preferences);
  }
}
