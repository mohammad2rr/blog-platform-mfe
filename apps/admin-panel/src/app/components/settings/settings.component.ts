import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface GeneralSettings {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  postsPerPage: number;
  allowComments: boolean;
  moderateComments: boolean;
  defaultPostStatus: 'draft' | 'published';
}

interface SocialSettings {
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  enableSocialSharing: boolean;
}

interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  smtpEncryption: 'none' | 'tls' | 'ssl';
  fromEmail: string;
  fromName: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0">Platform Settings</h4>
        <button class="btn btn-primary" (click)="saveAllSettings()">
          <i class="fas fa-save"></i> Save All Changes
        </button>
      </div>

      <div class="row">
        <!-- General Settings -->
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">General Settings</h5>
            </div>
            <div class="card-body">
              <form (ngSubmit)="saveGeneralSettings()">
                <div class="mb-3">
                  <label for="siteTitle" class="form-label">Site Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="siteTitle"
                    [(ngModel)]="generalSettings.siteTitle"
                    name="siteTitle"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="siteDescription" class="form-label"
                    >Site Description</label
                  >
                  <textarea
                    class="form-control"
                    id="siteDescription"
                    [(ngModel)]="generalSettings.siteDescription"
                    name="siteDescription"
                    rows="3"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="siteUrl" class="form-label">Site URL</label>
                  <input
                    type="url"
                    class="form-control"
                    id="siteUrl"
                    [(ngModel)]="generalSettings.siteUrl"
                    name="siteUrl"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="adminEmail" class="form-label">Admin Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="adminEmail"
                    [(ngModel)]="generalSettings.adminEmail"
                    name="adminEmail"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="postsPerPage" class="form-label"
                    >Posts Per Page</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="postsPerPage"
                    [(ngModel)]="generalSettings.postsPerPage"
                    name="postsPerPage"
                    min="1"
                    max="50"
                    required
                  />
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="allowComments"
                      [(ngModel)]="generalSettings.allowComments"
                      name="allowComments"
                    />
                    <label class="form-check-label" for="allowComments"
                      >Allow Comments</label
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="moderateComments"
                      [(ngModel)]="generalSettings.moderateComments"
                      name="moderateComments"
                    />
                    <label class="form-check-label" for="moderateComments"
                      >Moderate Comments</label
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <label for="defaultPostStatus" class="form-label"
                    >Default Post Status</label
                  >
                  <select
                    class="form-select"
                    id="defaultPostStatus"
                    [(ngModel)]="generalSettings.defaultPostStatus"
                    name="defaultPostStatus"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">
                  Save General Settings
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Social Settings -->
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Social Media Settings</h5>
            </div>
            <div class="card-body">
              <form (ngSubmit)="saveSocialSettings()">
                <div class="mb-3">
                  <div class="form-check mb-3">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="enableSocialSharing"
                      [(ngModel)]="socialSettings.enableSocialSharing"
                      name="enableSocialSharing"
                    />
                    <label class="form-check-label" for="enableSocialSharing"
                      >Enable Social Sharing</label
                    >
                  </div>
                </div>
                <div class="mb-3">
                  <label for="facebookUrl" class="form-label"
                    >Facebook URL</label
                  >
                  <input
                    type="url"
                    class="form-control"
                    id="facebookUrl"
                    [(ngModel)]="socialSettings.facebookUrl"
                    name="facebookUrl"
                  />
                </div>
                <div class="mb-3">
                  <label for="twitterUrl" class="form-label">Twitter URL</label>
                  <input
                    type="url"
                    class="form-control"
                    id="twitterUrl"
                    [(ngModel)]="socialSettings.twitterUrl"
                    name="twitterUrl"
                  />
                </div>
                <div class="mb-3">
                  <label for="instagramUrl" class="form-label"
                    >Instagram URL</label
                  >
                  <input
                    type="url"
                    class="form-control"
                    id="instagramUrl"
                    [(ngModel)]="socialSettings.instagramUrl"
                    name="instagramUrl"
                  />
                </div>
                <div class="mb-3">
                  <label for="linkedinUrl" class="form-label"
                    >LinkedIn URL</label
                  >
                  <input
                    type="url"
                    class="form-control"
                    id="linkedinUrl"
                    [(ngModel)]="socialSettings.linkedinUrl"
                    name="linkedinUrl"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Save Social Settings
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Email Settings -->
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Email Settings</h5>
            </div>
            <div class="card-body">
              <form (ngSubmit)="saveEmailSettings()">
                <div class="mb-3">
                  <label for="smtpHost" class="form-label">SMTP Host</label>
                  <input
                    type="text"
                    class="form-control"
                    id="smtpHost"
                    [(ngModel)]="emailSettings.smtpHost"
                    name="smtpHost"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="smtpPort" class="form-label">SMTP Port</label>
                  <input
                    type="number"
                    class="form-control"
                    id="smtpPort"
                    [(ngModel)]="emailSettings.smtpPort"
                    name="smtpPort"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="smtpUsername" class="form-label"
                    >SMTP Username</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="smtpUsername"
                    [(ngModel)]="emailSettings.smtpUsername"
                    name="smtpUsername"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="smtpPassword" class="form-label"
                    >SMTP Password</label
                  >
                  <input
                    type="password"
                    class="form-control"
                    id="smtpPassword"
                    [(ngModel)]="emailSettings.smtpPassword"
                    name="smtpPassword"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="smtpEncryption" class="form-label"
                    >SMTP Encryption</label
                  >
                  <select
                    class="form-select"
                    id="smtpEncryption"
                    [(ngModel)]="emailSettings.smtpEncryption"
                    name="smtpEncryption"
                    required
                  >
                    <option value="none">None</option>
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="fromEmail" class="form-label">From Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="fromEmail"
                    [(ngModel)]="emailSettings.fromEmail"
                    name="fromEmail"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="fromName" class="form-label">From Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="fromName"
                    [(ngModel)]="emailSettings.fromName"
                    name="fromName"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Save Email Settings
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
      .settings-container {
        padding: 1rem;
      }

      .card {
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      }

      .card-header {
        background-color: #f8f9fa;
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      }

      .form-label {
        font-weight: 500;
      }
    `,
  ],
})
export class SettingsComponent implements OnInit {
  generalSettings: GeneralSettings = {
    siteTitle: 'Blog Platform',
    siteDescription: 'A modern blog platform built with Angular',
    siteUrl: 'http://localhost:4200',
    adminEmail: 'admin@example.com',
    postsPerPage: 10,
    allowComments: true,
    moderateComments: true,
    defaultPostStatus: 'draft',
  };

  socialSettings: SocialSettings = {
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    enableSocialSharing: true,
  };

  emailSettings: EmailSettings = {
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    smtpEncryption: 'tls',
    fromEmail: 'noreply@example.com',
    fromName: 'Blog Platform',
  };

  ngOnInit() {
    // Load settings from API
    this.loadSettings();
  }

  loadSettings() {
    // Simulated API call to load settings
    // In a real application, this would make an HTTP request to your backend
    console.log('Loading settings...');
  }

  saveGeneralSettings() {
    // Simulated API call to save general settings
    console.log('Saving general settings:', this.generalSettings);
    // Show success message
    alert('General settings saved successfully!');
  }

  saveSocialSettings() {
    // Simulated API call to save social settings
    console.log('Saving social settings:', this.socialSettings);
    // Show success message
    alert('Social settings saved successfully!');
  }

  saveEmailSettings() {
    // Simulated API call to save email settings
    console.log('Saving email settings:', this.emailSettings);
    // Show success message
    alert('Email settings saved successfully!');
  }

  saveAllSettings() {
    this.saveGeneralSettings();
    this.saveSocialSettings();
    this.saveEmailSettings();
    // Show success message
    alert('All settings saved successfully!');
  }
}
