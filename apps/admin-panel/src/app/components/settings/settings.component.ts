import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
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
    InputTextarea,
    ButtonModule,
    ToastModule,
    TabViewModule,
    DropdownModule,
    InputSwitchModule,
    DividerModule,
  ],
  providers: [MessageService],
  template: `
    <div class="settings-container">
      <h2>Platform Settings</h2>

      <p-toast></p-toast>

      <p-tabView>
        <!-- General Settings -->
        <p-tabPanel header="General">
          <div class="card">
            <h3>Site Information</h3>
            <div class="field">
              <label for="siteName">Site Name</label>
              <input
                type="text"
                pInputText
                id="siteName"
                [(ngModel)]="siteSettings.siteName"
              />
            </div>
            <div class="field">
              <label for="siteDescription">Site Description</label>
              <textarea
                pInputTextarea
                id="siteDescription"
                [(ngModel)]="siteSettings.siteDescription"
                rows="3"
              ></textarea>
            </div>
            <div class="field">
              <label for="siteUrl">Site URL</label>
              <input
                type="text"
                pInputText
                id="siteUrl"
                [(ngModel)]="siteSettings.siteUrl"
              />
            </div>
            <div class="field">
              <label for="adminEmail">Admin Email</label>
              <input
                type="email"
                pInputText
                id="adminEmail"
                [(ngModel)]="siteSettings.adminEmail"
              />
            </div>

            <p-divider></p-divider>

            <h3>Content Settings</h3>
            <div class="field">
              <label for="postsPerPage">Posts Per Page</label>
              <input
                type="number"
                pInputText
                id="postsPerPage"
                [(ngModel)]="siteSettings.postsPerPage"
              />
            </div>
            <div class="field-checkbox">
              <p-inputSwitch
                [(ngModel)]="siteSettings.allowComments"
                id="allowComments"
              ></p-inputSwitch>
              <label for="allowComments">Allow Comments</label>
            </div>
            <div class="field-checkbox">
              <p-inputSwitch
                [(ngModel)]="siteSettings.moderateComments"
                id="moderateComments"
              ></p-inputSwitch>
              <label for="moderateComments">Moderate Comments</label>
            </div>

            <p-divider></p-divider>

            <h3>Regional Settings</h3>
            <div class="field">
              <label for="defaultLanguage">Default Language</label>
              <p-dropdown
                id="defaultLanguage"
                [options]="languages"
                [(ngModel)]="siteSettings.defaultLanguage"
              ></p-dropdown>
            </div>
            <div class="field">
              <label for="timezone">Timezone</label>
              <p-dropdown
                id="timezone"
                [options]="timezones"
                [(ngModel)]="siteSettings.timezone"
              ></p-dropdown>
            </div>
          </div>
        </p-tabPanel>

        <!-- Email Settings -->
        <p-tabPanel header="Email">
          <div class="card">
            <h3>SMTP Configuration</h3>
            <div class="field">
              <label for="smtpHost">SMTP Host</label>
              <input
                type="text"
                pInputText
                id="smtpHost"
                [(ngModel)]="emailSettings.smtpHost"
              />
            </div>
            <div class="field">
              <label for="smtpPort">SMTP Port</label>
              <input
                type="number"
                pInputText
                id="smtpPort"
                [(ngModel)]="emailSettings.smtpPort"
              />
            </div>
            <div class="field">
              <label for="smtpUsername">SMTP Username</label>
              <input
                type="text"
                pInputText
                id="smtpUsername"
                [(ngModel)]="emailSettings.smtpUsername"
              />
            </div>
            <div class="field">
              <label for="smtpPassword">SMTP Password</label>
              <input
                type="password"
                pInputText
                id="smtpPassword"
                [(ngModel)]="emailSettings.smtpPassword"
              />
            </div>
            <div class="field-checkbox">
              <p-inputSwitch
                [(ngModel)]="emailSettings.smtpSecure"
                id="smtpSecure"
              ></p-inputSwitch>
              <label for="smtpSecure">Use Secure Connection (SSL/TLS)</label>
            </div>

            <p-divider></p-divider>

            <h3>Email Settings</h3>
            <div class="field">
              <label for="fromEmail">From Email</label>
              <input
                type="email"
                pInputText
                id="fromEmail"
                [(ngModel)]="emailSettings.fromEmail"
              />
            </div>
            <div class="field">
              <label for="fromName">From Name</label>
              <input
                type="text"
                pInputText
                id="fromName"
                [(ngModel)]="emailSettings.fromName"
              />
            </div>
          </div>
        </p-tabPanel>

        <!-- Social Media Settings -->
        <p-tabPanel header="Social Media">
          <div class="card">
            <h3>Social Media Links</h3>
            <div class="field">
              <label for="facebookUrl">Facebook URL</label>
              <input
                type="text"
                pInputText
                id="facebookUrl"
                [(ngModel)]="socialSettings.facebookUrl"
              />
            </div>
            <div class="field">
              <label for="twitterUrl">Twitter URL</label>
              <input
                type="text"
                pInputText
                id="twitterUrl"
                [(ngModel)]="socialSettings.twitterUrl"
              />
            </div>
            <div class="field">
              <label for="instagramUrl">Instagram URL</label>
              <input
                type="text"
                pInputText
                id="instagramUrl"
                [(ngModel)]="socialSettings.instagramUrl"
              />
            </div>
            <div class="field">
              <label for="linkedinUrl">LinkedIn URL</label>
              <input
                type="text"
                pInputText
                id="linkedinUrl"
                [(ngModel)]="socialSettings.linkedinUrl"
              />
            </div>

            <p-divider></p-divider>

            <h3>Sharing Settings</h3>
            <div class="field-checkbox">
              <p-inputSwitch
                [(ngModel)]="socialSettings.enableSocialSharing"
                id="enableSocialSharing"
              ></p-inputSwitch>
              <label for="enableSocialSharing"
                >Enable Social Sharing Buttons</label
              >
            </div>
          </div>
        </p-tabPanel>
      </p-tabView>

      <div class="settings-actions">
        <button
          pButton
          label="Save Changes"
          icon="pi pi-save"
          (click)="saveSettings()"
        ></button>
        <button
          pButton
          label="Reset to Defaults"
          icon="pi pi-refresh"
          class="p-button-secondary"
          (click)="resetSettings()"
        ></button>
      </div>
    </div>
  `,
  styles: [
    `
      .settings-container {
        padding: 1rem;
      }

      .card {
        margin-bottom: 1rem;
      }

      .field {
        margin-bottom: 1rem;
      }

      .field label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      .field-checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 1.5rem 0 1rem;
        color: var(--text-color);
      }

      .settings-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }

      :host ::ng-deep .p-tabview-panels {
        padding: 1rem 0;
      }
    `,
  ],
})
export class SettingsComponent implements OnInit {
  siteSettings: SiteSettings = {
    siteName: '',
    siteDescription: '',
    siteUrl: '',
    adminEmail: '',
    postsPerPage: 10,
    allowComments: true,
    moderateComments: true,
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
    // TODO: Replace with actual API call
    this.siteSettings = {
      siteName: 'My Blog',
      siteDescription: 'A modern blog platform built with Angular',
      siteUrl: 'https://myblog.com',
      adminEmail: 'admin@myblog.com',
      postsPerPage: 10,
      allowComments: true,
      moderateComments: true,
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
    // TODO: Replace with actual API call
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Settings saved successfully',
    });
  }

  resetSettings() {
    if (
      confirm('Are you sure you want to reset all settings to default values?')
    ) {
      this.loadSettings();
      this.messageService.add({
        severity: 'info',
        summary: 'Settings Reset',
        detail: 'All settings have been reset to default values',
      });
    }
  }
}
