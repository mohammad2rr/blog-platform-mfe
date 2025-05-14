import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'api/categories'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategory(slug: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${slug}`);
  }

  getPopularCategories(limit: number = 5): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/popular?limit=${limit}`);
  }

  getRelatedCategories(
    categoryId: number,
    limit: number = 3,
  ): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.apiUrl}/${categoryId}/related?limit=${limit}`,
    );
  }
}
