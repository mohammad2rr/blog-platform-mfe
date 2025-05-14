import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  featuredImage: string;
  createdAt: string;
  readTime: number;
  commentsCount: number;
}

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="category-list-container">
      <!-- Category Header -->
      <div class="category-header text-center py-5 mb-5">
        <h1 class="display-4 mb-3">{{ categoryName }}</h1>
        <p class="lead mb-4">
          {{ categoryDescription }}
        </p>
        <div class="search-box mx-auto">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search in this category..."
              [(ngModel)]="searchQuery"
              (input)="filterPosts()"
            />
            <button class="btn btn-primary" type="button">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="row">
        <!-- Posts List -->
        <div class="col-lg-8">
          <!-- Posts Grid -->
          <div class="row">
            <div *ngFor="let post of filteredPosts" class="col-md-6 mb-4">
              <div class="card h-100">
                <img
                  [src]="post.featuredImage"
                  class="card-img-top"
                  [alt]="post.title"
                />
                <div class="card-body">
                  <div
                    class="d-flex justify-content-between align-items-center mb-2"
                  >
                    <span class="badge bg-primary">{{ post.category }}</span>
                    <small class="text-muted"
                      >{{ post.readTime }} min read</small
                    >
                  </div>
                  <h5 class="card-title">
                    <a
                      [routerLink]="['/post', post.id]"
                      class="text-decoration-none text-dark"
                      >{{ post.title }}</a
                    >
                  </h5>
                  <p class="card-text">{{ post.excerpt }}</p>
                </div>
                <div class="card-footer bg-transparent">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <small class="text-muted">By {{ post.author }}</small>
                    <small class="text-muted">
                      <i class="fas fa-comments"></i> {{ post.commentsCount }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <nav *ngIf="totalPages > 1" class="mt-4">
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
                *ngFor="let page of [].constructor(totalPages); let i = index"
                class="page-item"
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

        <!-- Sidebar -->
        <div class="col-lg-4">
          <!-- Category Info -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">About {{ categoryName }}</h5>
            </div>
            <div class="card-body">
              <p>{{ categoryDescription }}</p>
              <div class="category-stats">
                <div class="stat-item">
                  <i class="fas fa-file-alt"></i>
                  <span>{{ totalPosts }} Posts</span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-comments"></i>
                  <span>{{ totalComments }} Comments</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Popular Posts in Category -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Popular in {{ categoryName }}</h5>
            </div>
            <div class="card-body">
              <div *ngFor="let post of popularPosts" class="popular-post mb-3">
                <div class="d-flex">
                  <img
                    [src]="post.featuredImage"
                    class="popular-post-image"
                    [alt]="post.title"
                  />
                  <div class="ms-3">
                    <h6 class="mb-1">
                      <a
                        [routerLink]="['/post', post.id]"
                        class="text-decoration-none text-dark"
                        >{{ post.title }}</a
                      >
                    </h6>
                    <small class="text-muted">{{ post.createdAt }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Categories -->
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Related Categories</h5>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <a
                  *ngFor="let category of relatedCategories"
                  [routerLink]="['/category', category.slug]"
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                >
                  {{ category.name }}
                  <span class="badge bg-primary rounded-pill">{{
                    category.postCount
                  }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .category-list-container {
        padding: 2rem 0;
      }

      .category-header {
        background-color: #f8f9fa;
        border-radius: 0.5rem;
        padding: 3rem 1rem;
      }

      .search-box {
        max-width: 500px;
      }

      .card {
        transition: transform 0.2s;
        border: none;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      }

      .card:hover {
        transform: translateY(-5px);
      }

      .card-img-top {
        height: 200px;
        object-fit: cover;
      }

      .popular-post-image {
        width: 80px;
        height: 60px;
        object-fit: cover;
        border-radius: 0.25rem;
      }

      .category-stats {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #6c757d;
      }

      .stat-item i {
        font-size: 1.25rem;
      }
    `,
  ],
})
export class CategoryListComponent implements OnInit {
  categoryName: string = '';
  categoryDescription: string = '';
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  popularPosts: Post[] = [];
  relatedCategories: { name: string; slug: string; postCount: number }[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  postsPerPage: number = 6;
  totalPages: number = 1;
  totalPosts: number = 0;
  totalComments: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get category slug from route params
    this.route.params.subscribe((params) => {
      const categorySlug = params['slug'];
      this.loadCategory(categorySlug);
    });
  }

  loadCategory(slug: string) {
    // Simulated API call to get category data
    this.categoryName = 'Development';
    this.categoryDescription =
      'Explore the latest articles about software development, programming languages, frameworks, and best practices.';

    // Simulated API call to get posts
    this.posts = [
      {
        id: 1,
        title: 'Getting Started with Angular',
        excerpt:
          'Learn the basics of Angular and how to build your first application.',
        content: 'Full content here...',
        author: 'John Doe',
        category: 'Development',
        featuredImage: 'assets/images/angular.jpg',
        createdAt: '2024-03-15',
        readTime: 5,
        commentsCount: 12,
      },
      {
        id: 2,
        title: 'Advanced TypeScript Patterns',
        excerpt:
          'Discover advanced TypeScript patterns and techniques for better code organization.',
        content: 'Full content here...',
        author: 'Jane Smith',
        category: 'Development',
        featuredImage: 'assets/images/typescript.jpg',
        createdAt: '2024-03-14',
        readTime: 8,
        commentsCount: 8,
      },
      // Add more sample posts...
    ];

    this.totalPosts = this.posts.length;
    this.totalComments = this.posts.reduce(
      (sum, post) => sum + post.commentsCount,
      0,
    );

    this.relatedCategories = [
      { name: 'Web Development', slug: 'web-development', postCount: 15 },
      { name: 'Mobile Development', slug: 'mobile-development', postCount: 10 },
      { name: 'DevOps', slug: 'devops', postCount: 8 },
    ];

    this.filterPosts();
    this.loadPopularPosts();
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });

    this.totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    this.updateCurrentPage();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPage();
    }
  }

  updateCurrentPage() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.filteredPosts = this.filteredPosts.slice(startIndex, endIndex);
  }

  loadPopularPosts() {
    // Simulated API call to get popular posts
    this.popularPosts = this.posts
      .sort((a, b) => b.commentsCount - a.commentsCount)
      .slice(0, 5);
  }
}
