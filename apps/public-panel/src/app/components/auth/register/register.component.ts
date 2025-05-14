import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="register-container">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="card shadow-sm">
              <div class="card-body p-5">
                <h2 class="text-center mb-4">Create Account</h2>
                <p class="text-center text-muted mb-4">
                  Join our community of writers and readers
                </p>

                <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="firstName" class="form-label"
                        >First Name</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        formControlName="firstName"
                        [class.is-invalid]="isFieldInvalid('firstName')"
                        placeholder="Enter your first name"
                      />
                      <div
                        class="invalid-feedback"
                        *ngIf="isFieldInvalid('firstName')"
                      >
                        First name is required
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <label for="lastName" class="form-label">Last Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        formControlName="lastName"
                        [class.is-invalid]="isFieldInvalid('lastName')"
                        placeholder="Enter your last name"
                      />
                      <div
                        class="invalid-feedback"
                        *ngIf="isFieldInvalid('lastName')"
                      >
                        Last name is required
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      formControlName="email"
                      [class.is-invalid]="isFieldInvalid('email')"
                      placeholder="Enter your email"
                    />
                    <div
                      class="invalid-feedback"
                      *ngIf="isFieldInvalid('email')"
                    >
                      Please enter a valid email address
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      formControlName="password"
                      [class.is-invalid]="isFieldInvalid('password')"
                      placeholder="Create a password"
                    />
                    <div
                      class="invalid-feedback"
                      *ngIf="isFieldInvalid('password')"
                    >
                      Password must be at least 6 characters long
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="confirmPassword" class="form-label"
                      >Confirm Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="confirmPassword"
                      formControlName="confirmPassword"
                      [class.is-invalid]="isFieldInvalid('confirmPassword')"
                      placeholder="Confirm your password"
                    />
                    <div
                      class="invalid-feedback"
                      *ngIf="isFieldInvalid('confirmPassword')"
                    >
                      Passwords do not match
                    </div>
                  </div>

                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="terms"
                      formControlName="terms"
                      [class.is-invalid]="isFieldInvalid('terms')"
                    />
                    <label class="form-check-label" for="terms">
                      I agree to the
                      <a href="#" class="text-decoration-none"
                        >Terms of Service</a
                      >
                      and
                      <a href="#" class="text-decoration-none"
                        >Privacy Policy</a
                      >
                    </label>
                    <div
                      class="invalid-feedback"
                      *ngIf="isFieldInvalid('terms')"
                    >
                      You must agree to the terms and conditions
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary w-100 mb-3"
                    [disabled]="registerForm.invalid"
                  >
                    Create Account
                  </button>

                  <div class="text-center">
                    <p class="mb-0">
                      Already have an account?
                      <a routerLink="/login" class="text-decoration-none"
                        >Sign in</a
                      >
                    </p>
                  </div>
                </form>

                <hr class="my-4" />

                <div class="text-center">
                  <p class="mb-3">Or sign up with</p>
                  <div class="d-flex justify-content-center gap-3">
                    <button class="btn btn-outline-primary">
                      <i class="fab fa-google"></i> Google
                    </button>
                    <button class="btn btn-outline-primary">
                      <i class="fab fa-facebook"></i> Facebook
                    </button>
                  </div>
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
      .register-container {
        background-color: #f8f9fa;
        min-height: calc(100vh - 200px);
        display: flex;
        align-items: center;
      }
      .card {
        border: none;
        border-radius: 10px;
      }
      .form-control {
        padding: 0.75rem 1rem;
      }
      .btn {
        padding: 0.75rem 1rem;
      }
      .btn-outline-primary {
        border-width: 2px;
      }
    `,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        terms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm.value);
      // Implement registration logic here
    }
  }
}
