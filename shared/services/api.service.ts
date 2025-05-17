import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, retry, tap, shareReplay, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'http://localhost:3000/api';
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private cache = new Map<string, { data: any; timestamp: number }>();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    let errorCode = error.status;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message;
      errorCode = error.status;
    }

    // Handle specific error cases
    switch (error.status) {
      case 401:
        this.authService.logout();
        errorMessage = 'Your session has expired. Please login again.';
        break;
      case 403:
        errorMessage = 'You do not have permission to perform this action.';
        break;
      case 404:
        errorMessage = 'The requested resource was not found.';
        break;
      case 500:
        errorMessage =
          'An internal server error occurred. Please try again later.';
        break;
    }

    return throwError(() => ({
      message: errorMessage,
      code: errorCode,
      originalError: error,
    }));
  }

  private getCacheKey(endpoint: string, params?: any): string {
    return `${endpoint}${params ? JSON.stringify(params) : ''}`;
  }

  private getFromCache<T>(cacheKey: string): T | null {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    this.cache.delete(cacheKey);
    return null;
  }

  private setCache<T>(cacheKey: string, data: T): void {
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
  }

  private clearCache(): void {
    this.cache.clear();
  }

  // Generic GET request with caching
  get<T>(endpoint: string, params?: any): Observable<ApiResponse<T>> {
    const cacheKey = this.getCacheKey(endpoint, params);
    const cachedData = this.getFromCache<ApiResponse<T>>(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    this.loadingSubject.next(true);
    const httpParams = params
      ? new HttpParams({ fromObject: params })
      : undefined;

    return this.http
      .get<ApiResponse<T>>(`${this.API_URL}/${endpoint}`, {
        headers: this.getHeaders(),
        params: httpParams,
      })
      .pipe(
        retry(1),
        tap((response) => this.setCache(cacheKey, response)),
        catchError(this.handleError),
        tap(() => this.loadingSubject.next(false)),
        shareReplay(1),
      );
  }

  // Generic POST request
  post<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    this.loadingSubject.next(true);
    return this.http
      .post<ApiResponse<T>>(`${this.API_URL}/${endpoint}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(1),
        tap(() => this.clearCache()),
        catchError(this.handleError),
        tap(() => this.loadingSubject.next(false)),
        shareReplay(1),
      );
  }

  // Generic PUT request
  put<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    this.loadingSubject.next(true);
    return this.http
      .put<ApiResponse<T>>(`${this.API_URL}/${endpoint}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(1),
        tap(() => this.clearCache()),
        catchError(this.handleError),
        tap(() => this.loadingSubject.next(false)),
        shareReplay(1),
      );
  }

  // Generic DELETE request
  delete<T>(endpoint: string): Observable<ApiResponse<T>> {
    this.loadingSubject.next(true);
    return this.http
      .delete<ApiResponse<T>>(`${this.API_URL}/${endpoint}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        retry(1),
        tap(() => this.clearCache()),
        catchError(this.handleError),
        tap(() => this.loadingSubject.next(false)),
        shareReplay(1),
      );
  }

  // Upload file with progress tracking
  uploadFile<T>(
    endpoint: string,
    file: File,
    onProgress?: (progress: number) => void,
  ): Observable<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    this.loadingSubject.next(true);
    return this.http
      .post<ApiResponse<T>>(`${this.API_URL}/${endpoint}`, formData, {
        headers: new HttpHeaders({
          Authorization: this.authService.getToken()
            ? `Bearer ${this.authService.getToken()}`
            : '',
        }),
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event: any) => {
          if (event.type === 1 && onProgress) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
          }
          return event;
        }),
        catchError(this.handleError),
        tap(() => this.loadingSubject.next(false)),
        shareReplay(1),
      );
  }

  // Blog Posts with pagination
  getPosts(
    page: number = 1,
    limit: number = 10,
  ): Observable<PaginatedResponse<any>> {
    return this.get<PaginatedResponse<any>>('posts', { page, limit }).pipe(
      map((response) => response.data),
    );
  }

  getPost(id: number): Observable<ApiResponse<any>> {
    return this.get<ApiResponse<any>>(`posts/${id}`);
  }

  createPost(post: any): Observable<ApiResponse<any>> {
    return this.post<ApiResponse<any>>('posts', post);
  }

  updatePost(id: number, post: any): Observable<ApiResponse<any>> {
    return this.put<ApiResponse<any>>(`posts/${id}`, post);
  }

  deletePost(id: number): Observable<ApiResponse<any>> {
    return this.delete<ApiResponse<any>>(`posts/${id}`);
  }

  // Comments with pagination
  getComments(
    postId: number,
    page: number = 1,
    limit: number = 10,
  ): Observable<PaginatedResponse<any>> {
    return this.get<PaginatedResponse<any>>(`posts/${postId}/comments`, {
      page,
      limit,
    }).pipe(map((response) => response.data));
  }

  addComment(postId: number, comment: any): Observable<ApiResponse<any>> {
    return this.post<ApiResponse<any>>(`posts/${postId}/comments`, comment);
  }

  // User Profile
  getUserProfile(userId: number): Observable<ApiResponse<any>> {
    return this.get<ApiResponse<any>>(`users/${userId}`);
  }

  updateUserProfile(
    userId: number,
    profile: any,
  ): Observable<ApiResponse<any>> {
    return this.put<ApiResponse<any>>(`users/${userId}`, profile);
  }

  // Admin specific endpoints with pagination
  getAllUsers(
    page: number = 1,
    limit: number = 10,
  ): Observable<PaginatedResponse<any>> {
    return this.get<PaginatedResponse<any>>('admin/users', {
      page,
      limit,
    }).pipe(map((response) => response.data));
  }

  updateUserRole(userId: number, role: string): Observable<ApiResponse<any>> {
    return this.put<ApiResponse<any>>(`admin/users/${userId}/role`, { role });
  }

  deleteUser(userId: number): Observable<ApiResponse<any>> {
    return this.delete<ApiResponse<any>>(`admin/users/${userId}`);
  }
}
