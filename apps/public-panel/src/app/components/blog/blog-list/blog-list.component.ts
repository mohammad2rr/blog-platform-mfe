import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="blog-list-container">
      <div class="container py-5">
        <div class="row mb-4">
          <div class="col-md-8">
            <h1 class="display-4">Blog Posts</h1>
            <p class="lead">Discover our latest articles and insights</p>
          </div>
          <div class="col-md-4">
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

        <div class="row mb-4">
          <div class="col-12">
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-outline-primary"
                [class.active]="selectedCategory === 'all'"
                (click)="filterByCategory('all')"
              >
                All
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                [class.active]="selectedCategory === 'technology'"
                (click)="filterByCategory('technology')"
              >
                Technology
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                [class.active]="selectedCategory === 'lifestyle'"
                (click)="filterByCategory('lifestyle')"
              >
                Lifestyle
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                [class.active]="selectedCategory === 'business'"
                (click)="filterByCategory('business')"
              >
                Business
              </button>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-lg-4" *ngFor="let post of filteredPosts">
            <div class="card h-100">
              <img [src]="post.image" class="card-img-top" [alt]="post.title" />
              <div class="card-body">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <span class="badge bg-primary">{{ post.category }}</span>
                  <small class="text-muted">{{ post.date }}</small>
                </div>
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.excerpt }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">By {{ post.author }}</small>
                  <a [routerLink]="['/blog', post.id]" class="btn btn-primary"
                    >Read More</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <nav aria-label="Blog pagination">
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
    </div>
  `,
  styles: [
    `
      .blog-list-container {
        background-color: #f8f9fa;
      }
      .card {
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
      }
      .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .btn-group .btn.active {
        background-color: var(--primary-color);
        color: white;
      }
      .pagination .page-link {
        color: var(--primary-color);
      }
      .pagination .page-item.active .page-link {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
      }
    `,
  ],
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'all';
  currentPage: number = 1;
  postsPerPage: number = 9;
  totalPages: number = 1;

  ngOnInit() {
    // Simulated API call to get posts
    this.posts = [
      {
        id: 1,
        title: 'Getting Started with Angular',
        excerpt:
          'Learn the basics of Angular and start building amazing web applications.',
        author: 'John Doe',
        date: '2024-03-15',
        image: 'assets/images/angular.jpg',
        category: 'technology',
      },
      {
        id: 2,
        title: 'Micro Frontends Best Practices',
        excerpt:
          'Discover the best practices for implementing micro frontends in your applications.',
        author: 'Jane Smith',
        date: '2024-03-14',
        image: 'assets/images/microfrontends.jpg',
        category: 'technology',
      },
      {
        id: 3,
        title: 'Modern Web Development',
        excerpt:
          'Explore the latest trends and technologies in web development.',
        author: 'Mike Johnson',
        date: '2024-03-13',
        image: 'assets/images/webdev.jpg',
        category: 'technology',
      },
    ];
    this.filterPosts();
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory =
        this.selectedCategory === 'all' ||
        post.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
    this.totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    this.currentPage = 1;
    this.updateDisplayedPosts();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filterPosts();
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
}
