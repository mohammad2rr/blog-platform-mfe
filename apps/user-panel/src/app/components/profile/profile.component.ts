import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  website: string;
  location: string;
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
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputTextarea,
    ButtonModule,
    ToastModule,
    AvatarModule,
    FileUploadModule,
    DividerModule,
    InputSwitchModule,
  ],
  providers: [MessageService],
  template: `
    <div class="profile-container">
      <p-toast></p-toast>

      <div class="profile-header">
        <div class="avatar-section">
          <p-avatar
            [image]="profile.avatarUrl"
            size="xlarge"
            shape="circle"
            styleClass="mr-2"
          ></p-avatar>
          <p-fileUpload
            mode="basic"
            name="avatar"
            accept="image/*"
            [maxFileSize]="1000000"
            chooseLabel="Change Avatar"
            (onUpload)="onAvatarUpload($event)"
            styleClass="p-button-text"
          ></p-fileUpload>
        </div>
        <div class="header-info">
          <h2>{{ profile.fullName }}</h2>
          <p class="username">@{{ profile.username }}</p>
        </div>
      </div>

      <div class="profile-content">
        <form [formGroup]="profileForm" (ngSubmit)="saveProfile()">
          <div class="form-grid">
            <!-- Personal Information -->
            <p-card header="Personal Information">
              <div class="form-field">
                <label for="fullName">Full Name</label>
                <input
                  type="text"
                  pInputText
                  id="fullName"
                  formControlName="fullName"
                  placeholder="Enter your full name"
                />
              </div>

              <div class="form-field">
                <label for="email">Email</label>
                <input
                  type="email"
                  pInputText
                  id="email"
                  formControlName="email"
                  placeholder="Enter your email"
                />
              </div>

              <div class="form-field">
                <label for="bio">Bio</label>
                <textarea
                  pInputTextarea
                  id="bio"
                  formControlName="bio"
                  [rows]="4"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>

              <div class="form-field">
                <label for="location">Location</label>
                <input
                  type="text"
                  pInputText
                  id="location"
                  formControlName="location"
                  placeholder="Enter your location"
                />
              </div>

              <div class="form-field">
                <label for="website">Website</label>
                <input
                  type="url"
                  pInputText
                  id="website"
                  formControlName="website"
                  placeholder="Enter your website URL"
                />
              </div>
            </p-card>

            <!-- Social Links -->
            <p-card header="Social Links">
              <div class="form-field">
                <label for="twitter">Twitter</label>
                <input
                  type="text"
                  pInputText
                  id="twitter"
                  formControlName="twitter"
                  placeholder="Enter your Twitter handle"
                />
              </div>

              <div class="form-field">
                <label for="github">GitHub</label>
                <input
                  type="text"
                  pInputText
                  id="github"
                  formControlName="github"
                  placeholder="Enter your GitHub username"
                />
              </div>

              <div class="form-field">
                <label for="linkedin">LinkedIn</label>
                <input
                  type="text"
                  pInputText
                  id="linkedin"
                  formControlName="linkedin"
                  placeholder="Enter your LinkedIn profile URL"
                />
              </div>
            </p-card>

            <!-- Preferences -->
            <p-card header="Preferences">
              <div class="form-field-checkbox">
                <p-inputSwitch
                  id="emailNotifications"
                  formControlName="emailNotifications"
                ></p-inputSwitch>
                <label for="emailNotifications">Email Notifications</label>
              </div>

              <div class="form-field-checkbox">
                <p-inputSwitch
                  id="commentNotifications"
                  formControlName="commentNotifications"
                ></p-inputSwitch>
                <label for="commentNotifications">Comment Notifications</label>
              </div>

              <div class="form-field-checkbox">
                <p-inputSwitch
                  id="newsletterSubscription"
                  formControlName="newsletterSubscription"
                ></p-inputSwitch>
                <label for="newsletterSubscription">Newsletter Subscription</label>
              </div>
            </p-card>
          </div>

          <div class="form-actions">
            <button
              pButton
              type="submit"
              label="Save Changes"
              icon="pi pi-check"
              class="p-button-primary"
              [disabled]="!profileForm.valid || !profileForm.dirty"
            ></button>
            <button
              pButton
              type="button"
              label="Reset"
              icon="pi pi-refresh"
              class="p-button-secondary"
              (click)="resetForm()"
              [disabled]="!profileForm.dirty"
            ></button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .profile-container {
        padding: 1rem;
      }

      .profile-header {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: var(--surface-card);
        border-radius: 6px;
      }

      .avatar-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .header-info {
        h2 {
          margin: 0;
          color: var(--text-color);
        }

        .username {
          margin: 0.5rem 0 0;
          color: var(--text-color-secondary);
        }
      }

      .profile-content {
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
      }

      .form-field {
        margin-bottom: 1rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
      }

      .form-field-checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;

        label {
          margin: 0;
        }
      }

      .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
      }

      :host ::ng-deep {
        .p-card {
          .p-card-content {
            padding-top: 0;
          }
        }
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  profile: UserProfile = {
    id: 1,
    username: 'johndoe',
    email: 'john.doe@example.com',
    fullName: 'John Doe',
    bio: 'Software developer and tech enthusiast',
    avatarUrl: 'assets/images/avatar.jpg',
    website: 'https://johndoe.com',
    location: 'San Francisco, CA',
    socialLinks: {
      twitter: '@johndoe',
      github: 'johndoe',
      linkedin: 'linkedin.com/in/johndoe',
    },
    preferences: {
      emailNotifications: true,
      commentNotifications: true,
      newsletterSubscription: false,
    },
  };

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      location: [''],
      website: [''],
      twitter: [''],
      github: [''],
      linkedin: [''],
      emailNotifications: [true],
      commentNotifications: [true],
      newsletterSubscription: [false],
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    // TODO: Replace with actual API call
    this.profileForm.patchValue({
      fullName: this.profile.fullName,
      email: this.profile.email,
      bio: this.profile.bio,
      location: this.profile.location,
      website: this.profile.website,
      twitter: this.profile.socialLinks.twitter,
      github: this.profile.socialLinks.github,
      linkedin: this.profile.socialLinks.linkedin,
      emailNotifications: this.profile.preferences.emailNotifications,
      commentNotifications: this.profile.preferences.commentNotifications,
      newsletterSubscription: this.profile.preferences.newsletterSubscription,
    });
  }

  saveProfile() {
    if (this.profileForm.valid) {
      // TODO: Replace with actual API call
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Profile updated successfully',
      });
      this.profileForm.markAsPristine();
    }
  }

  resetForm() {
    this.loadProfile();
    this.profileForm.markAsPristine();
  }

  onAvatarUpload(event: any) {
    // TODO: Implement avatar upload functionality
    this.messageService.add({
      severity: 'info',
      summary: 'Avatar Upload',
      detail: 'Avatar upload functionality coming soon',
    });
  }
}
