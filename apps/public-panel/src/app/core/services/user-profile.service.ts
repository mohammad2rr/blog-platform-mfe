import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'api/user'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/profile`);
  }

  updateProfile(profile: Partial<Author>): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/profile`, profile);
  }

  changePassword(
    currentPassword: string,
    newPassword: string,
  ): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/change-password`,
      { currentPassword, newPassword },
    );
  }
}
