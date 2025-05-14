import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'http://localhost:3000/api';

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
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Generic GET request
  get<T>(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.API_URL}/${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Generic POST request
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .post<T>(`${this.API_URL}/${endpoint}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Generic PUT request
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .put<T>(`${this.API_URL}/${endpoint}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  // Generic DELETE request
  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.API_URL}/${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Upload file
  uploadFile<T>(endpoint: string, file: File): Observable<T> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<T>(`${this.API_URL}/${endpoint}`, formData, {
        headers: new HttpHeaders({
          Authorization: this.authService.getToken()
            ? `Bearer ${this.authService.getToken()}`
            : '',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Blog Posts
  getPosts(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.API_URL}/posts?page=${page}&limit=${limit}`, {
      headers: this.getHeaders(),
    });
  }

  getPost(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/posts/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.API_URL}/posts`, post, {
      headers: this.getHeaders(),
    });
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put(`${this.API_URL}/posts/${id}`, post, {
      headers: this.getHeaders(),
    });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/posts/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Comments
  getComments(postId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/posts/${postId}/comments`, {
      headers: this.getHeaders(),
    });
  }

  addComment(postId: number, comment: any): Observable<any> {
    return this.http.post(`${this.API_URL}/posts/${postId}/comments`, comment, {
      headers: this.getHeaders(),
    });
  }

  // User Profile
  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/users/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  updateUserProfile(userId: number, profile: any): Observable<any> {
    return this.http.put(`${this.API_URL}/users/${userId}`, profile, {
      headers: this.getHeaders(),
    });
  }

  // Admin specific endpoints
  getAllUsers(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(
      `${this.API_URL}/admin/users?page=${page}&limit=${limit}`,
      {
        headers: this.getHeaders(),
      },
    );
  }

  updateUserRole(userId: number, role: string): Observable<any> {
    return this.http.put(
      `${this.API_URL}/admin/users/${userId}/role`,
      { role },
      {
        headers: this.getHeaders(),
      },
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/users/${userId}`, {
      headers: this.getHeaders(),
    });
  }
}
