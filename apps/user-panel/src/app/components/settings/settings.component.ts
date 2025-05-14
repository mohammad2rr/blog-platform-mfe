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
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';

interface AccountSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  theme: 'light' | 'dark' | 'system';
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: number;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    InputSwitchModule,
    DividerModule,
    TabViewModule,
    PasswordModule,
    DropdownModule,
  ],
  providers: [MessageService],
  template: `
    <div class="settings-container">
      <p-toast></p-toast>

      <h2>Settings</h2>

      <p-tabView>
        <!-- Account Settings -->
        <p-tabPanel header="Account">
          <form [formGroup]="accountForm" (ngSubmit)="saveAccountSettings()">
            <div class="form-grid">
              <div class="form-field">
                <label for="language">Language</label>
                <p-dropdown
                  id="language"
                  [options]="languages"
                  formControlName="language"
                  placeholder="Select language"
                ></p-dropdown>
              </div>

              <div class="form-field">
                <label for="timezone">Timezone</label>
                <p-dropdown
                  id="timezone"
                  [options]="timezones"
                  formControlName="timezone"
                  placeholder="Select timezone"
                ></p-dropdown>
              </div>

              <div class="form-field">
                <label for="dateFormat">Date Format</label>
                <p-dropdown
                  id="dateFormat"
                  [options]="dateFormats"
                  formControlName="dateFormat"
                  placeholder="Select date format"
                ></p-dropdown>
              </div>

              <div class="form-field">
                <label for="theme">Theme</label>
                <p-dropdown
                  id="theme"
                  [options]="themes"
                  formControlName="theme"
                  placeholder="Select theme"
                ></p-dropdown>
              </div>
            </div>

            <div class="form-actions">
              <button
                pButton
                type="submit"
                label="Save Changes"
                icon="pi pi-check"
                class="p-button-primary"
                [disabled]="!accountForm.valid || !accountForm.dirty"
              ></button>
              <button
                pButton
                type="button"
                label="Reset"
                icon="pi pi-refresh"
                class="p-button-secondary"
                (click)="resetAccountForm()"
                [disabled]="!accountForm.dirty"
              ></button>
            </div>
          </form>
        </p-tabPanel>

        <!-- Security Settings -->
        <p-tabPanel header="Security">
          <form [formGroup]="securityForm" (ngSubmit)="saveSecuritySettings()">
            <div class="form-grid">
              <div class="form-field-checkbox">
                <p-inputSwitch
                  id="twoFactorEnabled"
                  formControlName="twoFactorEnabled"
                ></p-inputSwitch>
                <label for="twoFactorEnabled"
                  >Enable Two-Factor Authentication</label
                >
              </div>

              <div class="form-field-checkbox">
                <p-inputSwitch
                  id="loginNotifications"
                  formControlName="loginNotifications"
                ></p-inputSwitch>
                <label for="loginNotifications">Login Notifications</label>
              </div>

              <div class="form-field">
                <label for="sessionTimeout">Session Timeout (minutes)</label>
                <input
                  type="number"
                  pInputText
                  id="sessionTimeout"
                  formControlName="sessionTimeout"
                  min="5"
                  max="120"
                />
              </div>
            </div>

            <p-divider></p-divider>

            <h3>Change Password</h3>
            <div class="form-grid">
              <div class="form-field">
                <label for="currentPassword">Current Password</label>
                <p-password
                  id="currentPassword"
                  formControlName="currentPassword"
                  [toggleMask]="true"
                  [feedback]="false"
                ></p-password>
              </div>

              <div class="form-field">
                <label for="newPassword">New Password</label>
                <p-password
                  id="newPassword"
                  formControlName="newPassword"
                  [toggleMask]="true"
                ></p-password>
              </div>

              <div class="form-field">
                <label for="confirmPassword">Confirm New Password</label>
                <p-password
                  id="confirmPassword"
                  formControlName="confirmPassword"
                  [toggleMask]="true"
                  [feedback]="false"
                ></p-password>
              </div>
            </div>

            <div class="form-actions">
              <button
                pButton
                type="submit"
                label="Save Changes"
                icon="pi pi-check"
                class="p-button-primary"
                [disabled]="!securityForm.valid || !securityForm.dirty"
              ></button>
              <button
                pButton
                type="button"
                label="Reset"
                icon="pi pi-refresh"
                class="p-button-secondary"
                (click)="resetSecurityForm()"
                [disabled]="!securityForm.dirty"
              ></button>
            </div>
          </form>
        </p-tabPanel>

        <!-- Notification Settings -->
        <p-tabPanel header="Notifications">
          <form
            [formGroup]="notificationForm"
            (ngSubmit)="saveNotificationSettings()"
          >
            <div class="form-grid">
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
                  id="mentionNotifications"
                  formControlName="mentionNotifications"
                ></p-inputSwitch>
                <label for="mentionNotifications">Mention Notifications</label>
              </div>

              <div class="form-field-checkbox">
                <p-inputSwitch
                  id="newsletterSubscription"
                  formControlName="newsletterSubscription"
                ></p-inputSwitch>
                <label for="newsletterSubscription"
                  >Newsletter Subscription</label
                >
              </div>
            </div>

            <div class="form-actions">
              <button
                pButton
                type="submit"
                label="Save Changes"
                icon="pi pi-check"
                class="p-button-primary"
                [disabled]="!notificationForm.valid || !notificationForm.dirty"
              ></button>
              <button
                pButton
                type="button"
                label="Reset"
                icon="pi pi-refresh"
                class="p-button-secondary"
                (click)="resetNotificationForm()"
                [disabled]="!notificationForm.dirty"
              ></button>
            </div>
          </form>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styles: [
    `
      .settings-container {
        padding: 1rem;

        h2 {
          margin-bottom: 1.5rem;
        }

        h3 {
          margin: 1.5rem 0 1rem;
        }
      }

      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
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
        .p-tabview {
          .p-tabview-panels {
            padding: 1.5rem 0;
          }
        }
      }
    `,
  ],
})
export class SettingsComponent implements OnInit {
  accountForm: FormGroup;
  securityForm: FormGroup;
  notificationForm: FormGroup;

  languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
  ];

  timezones = [
    { label: 'UTC', value: 'UTC' },
    { label: 'EST (UTC-5)', value: 'America/New_York' },
    { label: 'PST (UTC-8)', value: 'America/Los_Angeles' },
    { label: 'GMT (UTC+0)', value: 'Europe/London' },
  ];

  dateFormats = [
    { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
    { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
  ];

  themes = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' },
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.accountForm = this.fb.group({
      language: ['en', Validators.required],
      timezone: ['UTC', Validators.required],
      dateFormat: ['MM/DD/YYYY', Validators.required],
      theme: ['light', Validators.required],
    });

    this.securityForm = this.fb.group({
      twoFactorEnabled: [false],
      loginNotifications: [true],
      sessionTimeout: [
        30,
        [Validators.required, Validators.min(5), Validators.max(120)],
      ],
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.notificationForm = this.fb.group({
      emailNotifications: [true],
      commentNotifications: [true],
      mentionNotifications: [true],
      newsletterSubscription: [false],
    });
  }

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    // TODO: Replace with actual API calls
    const mockAccountSettings: AccountSettings = {
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      theme: 'light',
    };

    const mockSecuritySettings: SecuritySettings = {
      twoFactorEnabled: false,
      loginNotifications: true,
      sessionTimeout: 30,
    };

    this.accountForm.patchValue(mockAccountSettings);
    this.securityForm.patchValue(mockSecuritySettings);
  }

  saveAccountSettings() {
    if (this.accountForm.valid) {
      // TODO: Replace with actual API call
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Account settings updated successfully',
      });
      this.accountForm.markAsPristine();
    }
  }

  saveSecuritySettings() {
    if (this.securityForm.valid) {
      // TODO: Replace with actual API call
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Security settings updated successfully',
      });
      this.securityForm.markAsPristine();
    }
  }

  saveNotificationSettings() {
    if (this.notificationForm.valid) {
      // TODO: Replace with actual API call
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Notification settings updated successfully',
      });
      this.notificationForm.markAsPristine();
    }
  }

  resetAccountForm() {
    this.loadSettings();
    this.accountForm.markAsPristine();
  }

  resetSecurityForm() {
    this.loadSettings();
    this.securityForm.markAsPristine();
  }

  resetNotificationForm() {
    this.loadSettings();
    this.notificationForm.markAsPristine();
  }
}
