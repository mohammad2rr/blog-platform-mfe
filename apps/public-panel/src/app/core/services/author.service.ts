import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'api/authors'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/${id}`);
  }

  getAuthorBySlug(slug: string): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/slug/${slug}`);
  }

  getPostsByAuthor(
    authorId: number,
    page: number = 1,
    limit: number = 10,
  ): Observable<{ posts: Post[]; total: number }> {
    return this.http.get<{ posts: Post[]; total: number }>(
      `${this.apiUrl}/${authorId}/posts?page=${page}&limit=${limit}`,
    );
  }
}
