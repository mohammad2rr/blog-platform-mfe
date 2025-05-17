import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface Post {
  id: number;
  title: string;
  status: 'published' | 'draft';
  views: number;
  comments: number;
  createdAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    TagModule,
    RouterModule,
    ProgressSpinnerModule,
  ],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h2>My Dashboard</h2>
        <div class="header-actions">
          <button
            pButton
            type="button"
            label="Refresh"
            icon="pi pi-refresh"
            class="p-button-text"
          ></button>
          <button
            pButton
            type="button"
            label="View Analytics"
            icon="pi pi-chart-bar"
            class="p-button-text"
          ></button>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h5 class="card-title">My Posts</h5>
                  <h2 class="card-text">{{ stats.totalPosts }}</h2>
                  <p class="card-subtitle">Total published posts</p>
                </div>
                <i class="pi pi-file text-white-50" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-success text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h5 class="card-title">Total Comments</h5>
                  <h2 class="card-text">{{ stats.totalComments }}</h2>
                  <p class="card-subtitle">Comments on your posts</p>
                </div>
                <i
                  class="pi pi-comments text-white-50"
                  style="font-size: 2rem"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-info text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h5 class="card-title">Post Views</h5>
                  <h2 class="card-text">{{ stats.totalViews }}</h2>
                  <p class="card-subtitle">Total views across all posts</p>
                </div>
                <i class="pi pi-eye text-white-50" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h5 class="card-title mb-0">Recent Posts</h5>
              <div class="header-actions">
                <button
                  pButton
                  type="button"
                  icon="pi pi-filter"
                  class="p-button-text"
                ></button>
                <button
                  pButton
                  type="button"
                  label="New Post"
                  icon="pi pi-plus"
                  class="p-button-primary"
                ></button>
              </div>
            </div>
            <div class="card-body">
              <div class="recent-posts">
                <div *ngFor="let post of recentPosts" class="post-item">
                  <div class="post-info">
                    <h6 class="post-title">
                      <a
                        [routerLink]="['/posts', post.id]"
                        class="text-decoration-none"
                        >{{ post.title }}</a
                      >
                    </h6>
                    <div class="post-meta">
                      <span class="post-date">{{ post.createdAt }}</span>
                      <span
                        class="post-status"
                        [ngClass]="
                          post.status === 'published'
                            ? 'status-published'
                            : 'status-draft'
                        "
                      >
                        {{ post.status }}
                      </span>
                    </div>
                  </div>
                  <div class="post-stats">
                    <div class="stat-item">
                      <i class="pi pi-eye"></i>
                      <span>{{ post.views }}</span>
                    </div>
                    <div class="stat-item">
                      <i class="pi pi-comments"></i>
                      <span>{{ post.comments }}</span>
                    </div>
                    <button
                      pButton
                      type="button"
                      icon="pi pi-ellipsis-v"
                      class="p-button-text p-button-rounded"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h5 class="card-title mb-0">Quick Actions</h5>
              <button
                pButton
                type="button"
                icon="pi pi-ellipsis-v"
                class="p-button-text"
              ></button>
            </div>
            <div class="card-body">
              <div class="quick-actions">
                <button
                  pButton
                  type="button"
                  label="Write New Post"
                  icon="pi pi-pencil"
                  class="p-button-primary w-100 mb-2"
                ></button>
                <button
                  pButton
                  type="button"
                  label="Manage Comments"
                  icon="pi pi-comments"
                  class="p-button-secondary w-100 mb-2"
                ></button>
                <button
                  pButton
                  type="button"
                  label="Profile Settings"
                  icon="pi pi-user"
                  class="p-button-info w-100"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        padding: 1.5rem;
      }

      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }

      .header-actions {
        display: flex;
        gap: 0.5rem;
      }

      .card {
        border: none;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }

      .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .card-body {
        padding: 1.5rem;
      }

      .card-title {
        margin-bottom: 1rem;
        font-size: 1.1rem;
        font-weight: 500;
      }

      .card-text {
        margin-bottom: 0.5rem;
        font-size: 2rem;
        font-weight: 600;
      }

      .card-subtitle {
        font-size: 0.9rem;
        opacity: 0.8;
        margin: 0;
      }

      .recent-posts {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .post-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: 8px;
        background-color: #f8f9fa;
        transition: all 0.2s ease;
      }

      .post-item:hover {
        background-color: #e9ecef;
      }

      .post-info {
        flex: 1;
      }

      .post-title {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
      }

      .post-title a {
        color: #212529;
        transition: color 0.2s ease;
      }

      .post-title a:hover {
        color: #0d6efd;
      }

      .post-meta {
        display: flex;
        gap: 1rem;
        font-size: 0.875rem;
        color: #6c757d;
      }

      .post-status {
        text-transform: capitalize;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
      }

      .status-published {
        background-color: #198754;
        color: white;
      }

      .status-draft {
        background-color: #6c757d;
        color: white;
      }

      .post-stats {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #6c757d;
        cursor: help;
      }

      .quick-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .quick-actions button {
        transition: all 0.2s ease;
      }

      .quick-actions button:hover {
        transform: translateX(5px);
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  stats = {
    totalPosts: 0,
    totalComments: 0,
    totalViews: 0,
  };

  recentPosts = [
    {
      id: 1,
      title: 'Getting Started with Angular',
      status: 'published',
      views: 150,
      comments: 12,
      createdAt: '2024-03-15',
    },
    {
      id: 2,
      title: 'Micro Frontends Best Practices',
      status: 'published',
      views: 120,
      comments: 8,
      createdAt: '2024-03-14',
    },
    {
      id: 3,
      title: 'Building Responsive UIs',
      status: 'draft',
      views: 0,
      comments: 0,
      createdAt: '2024-03-13',
    },
  ];

  ngOnInit() {
    // TODO: Fetch real data from API
    this.stats = {
      totalPosts: 12,
      totalComments: 45,
      totalViews: 1250,
    };
  }
}
