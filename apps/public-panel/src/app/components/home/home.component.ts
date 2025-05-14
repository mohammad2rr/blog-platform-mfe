import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <div class="hero-section text-center py-5 mb-5">
        <h1 class="display-4 mb-3">Welcome to Our Blog</h1>
        <p class="lead mb-4">
          Discover the latest insights, tutorials, and stories from our
          community
        </p>
        <div class="search-box mx-auto">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search posts..."
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
          <!-- Category Filter -->
          <div class="category-filter mb-4">
            <div class="btn-group">
              <button
                class="btn"
                [class.btn-primary]="selectedCategory === ''"
                [class.btn-outline-primary]="selectedCategory !== ''"
                (click)="selectCategory('')"
              >
                All
              </button>
              <button
                *ngFor="let category of categories"
                class="btn"
                [class.btn-primary]="selectedCategory === category"
                [class.btn-outline-primary]="selectedCategory !== category"
                (click)="selectCategory(category)"
              >
                {{ category }}
              </button>
            </div>
          </div>

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
          <!-- Popular Posts -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Popular Posts</h5>
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

          <!-- Categories -->
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Categories</h5>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <a
                  *ngFor="let category of categories"
                  href="#"
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  (click)="selectCategory(category)"
                >
                  {{ category }}
                  <span class="badge bg-primary rounded-pill">{{
                    getCategoryCount(category)
                  }}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Tags</h5>
            </div>
            <div class="card-body">
              <div class="tags">
                <a
                  *ngFor="let tag of tags"
                  href="#"
                  class="tag"
                  (click)="selectTag(tag)"
                  >{{ tag }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        padding: 2rem 0;
      }

      .hero-section {
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

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .tag {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        background-color: #f8f9fa;
        border-radius: 1rem;
        color: #6c757d;
        text-decoration: none;
        font-size: 0.875rem;
        transition: all 0.2s;
      }

      .tag:hover {
        background-color: #e9ecef;
        color: #495057;
      }

      .category-filter {
        overflow-x: auto;
        white-space: nowrap;
        padding-bottom: 0.5rem;
      }

      .category-filter .btn-group {
        flex-wrap: nowrap;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  popularPosts: Post[] = [];
  categories: string[] = [];
  tags: string[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedTag: string = '';
  currentPage: number = 1;
  postsPerPage: number = 6;
  totalPages: number = 1;

  ngOnInit() {
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
        title: 'Micro Frontends Best Practices',
        excerpt:
          'Explore the best practices for implementing micro frontends in your applications.',
        content: 'Full content here...',
        author: 'Jane Smith',
        category: 'Architecture',
        featuredImage: 'assets/images/microfrontends.jpg',
        createdAt: '2024-03-14',
        readTime: 8,
        commentsCount: 8,
      },
      // Add more sample posts...
    ];

    this.categories = ['Development', 'Architecture', 'Design', 'DevOps'];
    this.tags = [
      'Angular',
      'React',
      'Vue',
      'TypeScript',
      'JavaScript',
      'CSS',
      'HTML',
    ];

    this.filterPosts();
    this.loadPopularPosts();
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory =
        !this.selectedCategory || post.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });

    this.totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    this.updateCurrentPage();
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.filterPosts();
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
    this.currentPage = 1;
    this.filterPosts();
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

  getCategoryCount(category: string): number {
    return this.posts.filter((post) => post.category === category).length;
  }

  loadPopularPosts() {
    // Simulated API call to get popular posts
    this.popularPosts = this.posts
      .sort((a, b) => b.commentsCount - a.commentsCount)
      .slice(0, 5);
  }
}
