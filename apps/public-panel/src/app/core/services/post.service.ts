import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Comment } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'api/posts'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getPosts(
    page: number = 1,
    limit: number = 10,
  ): Observable<{ posts: Post[]; total: number }> {
    return this.http.get<{ posts: Post[]; total: number }>(
      `${this.apiUrl}?page=${page}&limit=${limit}`,
    );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  getPostBySlug(slug: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/slug/${slug}`);
  }

  getPostsByCategory(
    categorySlug: string,
    page: number = 1,
    limit: number = 10,
  ): Observable<{ posts: Post[]; total: number }> {
    return this.http.get<{ posts: Post[]; total: number }>(
      `${this.apiUrl}/category/${categorySlug}?page=${page}&limit=${limit}`,
    );
  }

  getPostsByTag(
    tagSlug: string,
    page: number = 1,
    limit: number = 10,
  ): Observable<{ posts: Post[]; total: number }> {
    return this.http.get<{ posts: Post[]; total: number }>(
      `${this.apiUrl}/tag/${tagSlug}?page=${page}&limit=${limit}`,
    );
  }

  searchPosts(
    query: string,
    page: number = 1,
    limit: number = 10,
  ): Observable<{ posts: Post[]; total: number }> {
    return this.http.get<{ posts: Post[]; total: number }>(
      `${this.apiUrl}/search?q=${query}&page=${page}&limit=${limit}`,
    );
  }

  getPopularPosts(limit: number = 5): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/popular?limit=${limit}`);
  }

  getRelatedPosts(postId: number, limit: number = 3): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.apiUrl}/${postId}/related?limit=${limit}`,
    );
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}/comments`);
  }

  addComment(
    postId: number,
    comment: Omit<Comment, 'id' | 'createdAt'>,
  ): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.apiUrl}/${postId}/comments`,
      comment,
    );
  }

  addReply(
    postId: number,
    parentId: number,
    comment: Omit<Comment, 'id' | 'createdAt'>,
  ): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.apiUrl}/${postId}/comments/${parentId}/replies`,
      comment,
    );
  }
}
