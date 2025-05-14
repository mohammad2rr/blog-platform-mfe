import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag, Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private apiUrl = 'api/tags'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }

  getTag(slug: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}/${slug}`);
  }

  getPopularTags(limit: number = 10): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/popular?limit=${limit}`);
  }

  getPostsByTag(
    tagSlug: string,
    page: number = 1,
    limit: number = 10,
  ): Observable<{ posts: Post[]; total: number }> {
    return this.http.get<{ posts: Post[]; total: number }>(
      `${this.apiUrl}/${tagSlug}/posts?page=${page}&limit=${limit}`,
    );
  }
}
