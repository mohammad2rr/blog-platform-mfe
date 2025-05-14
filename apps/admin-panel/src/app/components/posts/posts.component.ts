import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'pending';
  date: string;
  views: number;
  comments: number;
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="posts-container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0">Manage Posts</h4>
        <button class="btn btn-primary" routerLink="new">
          <i class="fas fa-plus"></i> New Post
        </button>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-4">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search posts..."
                  [(ngModel)]="searchQuery"
                  (input)="filterPosts()"
                />
                <button class="btn btn-outline-secondary" type="button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div class="col-md-3">
              <select
                class="form-select"
                [(ngModel)]="selectedCategory"
                (change)="filterPosts()"
              >
                <option value="">All Categories</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div class="col-md-3">
              <select
                class="form-select"
                [(ngModel)]="selectedStatus"
                (change)="filterPosts()"
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Views</th>
                  <th>Comments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let post of filteredPosts">
                  <td>{{ post.title }}</td>
                  <td>{{ post.author }}</td>
                  <td>
                    <span class="badge bg-secondary">{{ post.category }}</span>
                  </td>
                  <td>
                    <span
                      class="badge"
                      [ngClass]="{
                        'bg-success': post.status === 'published',
                        'bg-warning': post.status === 'pending',
                        'bg-secondary': post.status === 'draft',
                      }"
                    >
                      {{ post.status }}
                    </span>
                  </td>
                  <td>{{ post.date }}</td>
                  <td>{{ post.views }}</td>
                  <td>{{ post.comments }}</td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-sm btn-outline-primary"
                        [routerLink]="['edit', post.id]"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        (click)="deletePost(post.id)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <nav aria-label="Posts pagination" class="mt-4">
            <ul class="pagination justify-content-center">
              <li class="page-item" [class.disabled]="currentPage === 1">
                <a
                  class="page-link"
                  href="#"
                  (click)="changePage(currentPage - 1)"
                  >Previous</a
                >
              </li>
              <li
                class="page-item"
                *ngFor="let page of [].constructor(totalPages); let i = index"
                [class.active]="currentPage === i + 1"
              >
                <a class="page-link" href="#" (click)="changePage(i + 1)">{{
                  i + 1
                }}</a>
              </li>
              <li
                class="page-item"
                [class.disabled]="currentPage === totalPages"
              >
                <a
                  class="page-link"
                  href="#"
                  (click)="changePage(currentPage + 1)"
                  >Next</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .posts-container {
        padding: 1rem;
      }

      .table th {
        font-weight: 600;
        background-color: #f8f9fa;
      }

      .btn-group .btn {
        padding: 0.25rem 0.5rem;
      }

      .badge {
        font-weight: 500;
        padding: 0.5em 0.75em;
      }
    `,
  ],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  currentPage: number = 1;
  postsPerPage: number = 10;
  totalPages: number = 1;

  ngOnInit() {
    // Simulated API call to get posts
    this.posts = [
      {
        id: 1,
        title: 'Getting Started with Angular',
        author: 'John Doe',
        category: 'technology',
        status: 'published',
        date: '2024-03-15',
        views: 1234,
        comments: 45,
      },
      {
        id: 2,
        title: 'Micro Frontends Best Practices',
        author: 'Jane Smith',
        category: 'technology',
        status: 'published',
        date: '2024-03-14',
        views: 987,
        comments: 32,
      },
      {
        id: 3,
        title: 'Modern Web Development',
        author: 'Mike Johnson',
        category: 'technology',
        status: 'draft',
        date: '2024-03-13',
        views: 0,
        comments: 0,
      },
    ];
    this.filterPosts();
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesCategory =
        !this.selectedCategory || post.category === this.selectedCategory;
      const matchesStatus =
        !this.selectedStatus || post.status === this.selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
    this.totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    this.currentPage = 1;
    this.updateDisplayedPosts();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedPosts();
    }
  }

  private updateDisplayedPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.filteredPosts = this.filteredPosts.slice(
      startIndex,
      startIndex + this.postsPerPage,
    );
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      // Implement delete logic here
      console.log('Deleting post:', id);
    }
  }
}
