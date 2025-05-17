import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap, switchMap, map, retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  lastLogin?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'current_user';
  private readonly TOKEN_REFRESH_INTERVAL = 4 * 60 * 1000; // 4 minutes

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenRefreshTimer: any;

  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadStoredUser();
    this.setupTokenRefresh();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  private setupTokenRefresh(): void {
    if (this.isAuthenticated()) {
      this.scheduleTokenRefresh();
    }
  }

  private scheduleTokenRefresh(): void {
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }

    const token = this.getToken();
    if (token) {
      const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
      if (expirationDate) {
        const timeUntilExpiry = expirationDate.getTime() - Date.now();
        const refreshTime = Math.max(
          0,
          timeUntilExpiry - this.TOKEN_REFRESH_INTERVAL,
        );

        this.tokenRefreshTimer = setTimeout(() => {
          this.refreshToken().subscribe({
            error: () => this.logout(),
          });
        }, refreshTime);
      }
    }
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
    this.scheduleTokenRefresh();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/login`, { email, password })
      .pipe(
        tap((response) => this.handleAuthResponse(response)),
        catchError(this.handleAuthError),
      );
  }

  register(
    username: string,
    email: string,
    password: string,
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/register`, {
        username,
        email,
        password,
      })
      .pipe(
        tap((response) => this.handleAuthResponse(response)),
        catchError(this.handleAuthError),
      );
  }

  private refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<RefreshTokenResponse>(`${this.API_URL}/auth/refresh`, {
        refreshToken,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
          this.scheduleTokenRefresh();
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        }),
      );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred during authentication';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid credentials';
          break;
        case 403:
          errorMessage = 'Account is locked or disabled';
          break;
        case 409:
          errorMessage = 'Email already exists';
          break;
        case 422:
          errorMessage = 'Invalid input data';
          break;
        default:
          errorMessage = 'Server error occurred';
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  logout(): void {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if (refreshToken) {
      this.http
        .post(`${this.API_URL}/auth/logout`, { refreshToken })
        .subscribe({
          error: () => console.error('Error during logout'),
          complete: () => this.clearAuthData(),
        });
    } else {
      this.clearAuthData();
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token && this.jwtHelper.isTokenExpired(token)) {
      this.refreshToken().subscribe({
        error: () => this.logout(),
      });
      return null;
    }
    return token;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUserProfile(updates: Partial<User>): Observable<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('No user logged in'));
    }

    return this.http
      .put<User>(`${this.API_URL}/users/${currentUser.id}`, updates)
      .pipe(
        tap((updatedUser) => {
          this.currentUserSubject.next(updatedUser);
          localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
        }),
      );
  }

  changePassword(
    currentPassword: string,
    newPassword: string,
  ): Observable<void> {
    return this.http
      .post<void>(`${this.API_URL}/auth/change-password`, {
        currentPassword,
        newPassword,
      })
      .pipe(
        tap(() => {
          // Optionally force re-login after password change
          this.logout();
        }),
      );
  }

  requestPasswordReset(email: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/auth/forgot-password`, {
      email,
    });
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/auth/reset-password`, {
      token,
      newPassword,
    });
  }
}
