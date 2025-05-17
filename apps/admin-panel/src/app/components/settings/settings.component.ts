import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DividerModule } from 'primeng/divider';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  postsPerPage: number;
  allowComments: boolean;
  moderateComments: boolean;
  defaultLanguage: string;
  timezone: string;
}

interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  smtpSecure: boolean;
  fromEmail: string;
  fromName: string;
}

interface SocialSettings {
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  enableSocialSharing: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ToastModule,
    TabViewModule,
    DropdownModule,
    InputSwitchModule,
    DividerModule,
  ],
  providers: [MessageService],
  template: `
    <div class="settings">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Settings</h2>
        <button class="btn btn-primary" (click)="saveSettings()">
          <i class="fas fa-save me-2"></i>Save Changes
        </button>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="card-title mb-0">General Settings</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label for="siteName" class="form-label">Site Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="siteName"
                  [(ngModel)]="settings.siteName"
                />
              </div>
              <div class="mb-3">
                <label for="siteDescription" class="form-label"
                  >Site Description</label
                >
                <textarea
                  class="form-control"
                  id="siteDescription"
                  rows="3"
                  [(ngModel)]="settings.siteDescription"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="siteUrl" class="form-label">Site URL</label>
                <input
                  type="url"
                  class="form-control"
                  id="siteUrl"
                  [(ngModel)]="settings.siteUrl"
                />
              </div>
              <div class="mb-3">
                <label for="adminEmail" class="form-label">Admin Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="adminEmail"
                  [(ngModel)]="settings.adminEmail"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="card-title mb-0">Content Settings</h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label for="postsPerPage" class="form-label"
                  >Posts Per Page</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="postsPerPage"
                  [(ngModel)]="settings.postsPerPage"
                />
              </div>
              <div class="mb-3">
                <label for="defaultLanguage" class="form-label"
                  >Default Language</label
                >
                <select
                  class="form-select"
                  id="defaultLanguage"
                  [(ngModel)]="settings.defaultLanguage"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="allowComments"
                    [(ngModel)]="settings.allowComments"
                  />
                  <label class="form-check-label" for="allowComments"
                    >Allow Comments</label
                  >
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="moderateComments"
                    [(ngModel)]="settings.moderateComments"
                  />
                  <label class="form-check-label" for="moderateComments"
                    >Moderate Comments</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .settings {
        padding: 1rem;
      }
      .card {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
      .card-header {
        background-color: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
      }
      .form-label {
        font-weight: 500;
      }
    `,
  ],
})
export class SettingsComponent implements OnInit {
  settings: SiteSettings = {
    siteName: '',
    siteDescription: '',
    siteUrl: '',
    adminEmail: '',
    postsPerPage: 10,
    allowComments: true,
    moderateComments: false,
    defaultLanguage: 'en',
    timezone: 'UTC',
  };

  emailSettings: EmailSettings = {
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    smtpSecure: true,
    fromEmail: '',
    fromName: '',
  };

  socialSettings: SocialSettings = {
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    enableSocialSharing: true,
  };

  languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
  ];

  timezones = [
    { label: 'UTC', value: 'UTC' },
    { label: 'EST (UTC-5)', value: 'America/New_York' },
    { label: 'CST (UTC-6)', value: 'America/Chicago' },
    { label: 'PST (UTC-8)', value: 'America/Los_Angeles' },
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    // TODO: Fetch settings from API
    this.settings = {
      siteName: 'My Blog',
      siteDescription: 'A modern blog platform built with Angular',
      siteUrl: 'https://myblog.com',
      adminEmail: 'admin@myblog.com',
      postsPerPage: 10,
      allowComments: true,
      moderateComments: false,
      defaultLanguage: 'en',
      timezone: 'UTC',
    };

    this.emailSettings = {
      smtpHost: 'smtp.example.com',
      smtpPort: 587,
      smtpUsername: 'user@example.com',
      smtpPassword: '',
      smtpSecure: true,
      fromEmail: 'noreply@myblog.com',
      fromName: 'My Blog',
    };

    this.socialSettings = {
      facebookUrl: 'https://facebook.com/myblog',
      twitterUrl: 'https://twitter.com/myblog',
      instagramUrl: 'https://instagram.com/myblog',
      linkedinUrl: 'https://linkedin.com/company/myblog',
      enableSocialSharing: true,
    };
  }

  saveSettings() {
    // TODO: Implement save settings functionality
    console.log('Save settings:', this.settings);
  }
}
