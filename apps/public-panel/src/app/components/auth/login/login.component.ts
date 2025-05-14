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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card shadow-sm">
              <div class="card-body p-5">
                <h2 class="text-center mb-4">Welcome Back</h2>
                <p class="text-center text-muted mb-4">
                  Please sign in to continue
                </p>

                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
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
                      placeholder="Enter your password"
                    />
                    <div
                      class="invalid-feedback"
                      *ngIf="isFieldInvalid('password')"
                    >
                      Password is required
                    </div>
                  </div>

                  <div class="mb-3 form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="remember"
                      formControlName="remember"
                    />
                    <label class="form-check-label" for="remember"
                      >Remember me</label
                    >
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary w-100 mb-3"
                    [disabled]="loginForm.invalid"
                  >
                    Sign In
                  </button>

                  <div class="text-center">
                    <a
                      routerLink="/forgot-password"
                      class="text-decoration-none"
                      >Forgot password?</a
                    >
                  </div>
                </form>

                <hr class="my-4" />

                <div class="text-center">
                  <p class="mb-3">Or sign in with</p>
                  <div class="d-flex justify-content-center gap-3">
                    <button class="btn btn-outline-primary">
                      <i class="fab fa-google"></i> Google
                    </button>
                    <button class="btn btn-outline-primary">
                      <i class="fab fa-facebook"></i> Facebook
                    </button>
                  </div>
                </div>

                <div class="text-center mt-4">
                  <p class="mb-0">
                    Don't have an account?
                    <a routerLink="/register" class="text-decoration-none"
                      >Sign up</a
                    >
                  </p>
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
      .login-container {
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
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Implement login logic here
    }
  }
}
