import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';

interface RecentActivity {
  type: 'post' | 'comment' | 'user';
  action: string;
  title: string;
  timestamp: string;
  user: string;
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
    ProgressSpinnerModule,
    RouterModule,
  ],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h2>Dashboard</h2>
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
            label="Export"
            icon="pi pi-download"
            class="p-button-text"
          ></button>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h5 class="card-title">Total Posts</h5>
                  <h2 class="card-text">{{ stats.totalPosts }}</h2>
                  <p class="card-subtitle">Active posts on the platform</p>
                </div>
                <i class="pi pi-file text-white-50" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-success text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h5 class="card-title">Total Users</h5>
                  <h2 class="card-text">{{ stats.totalUsers }}</h2>
                  <p class="card-subtitle">Registered users</p>
                </div>
                <i
                  class="pi pi-users text-white-50"
                  style="font-size: 2rem"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-info text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h5 class="card-title">Total Categories</h5>
                  <h2 class="card-text">{{ stats.totalCategories }}</h2>
                  <p class="card-subtitle">Content categories</p>
                </div>
                <i class="pi pi-tags text-white-50" style="font-size: 2rem"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-warning text-white">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <h5 class="card-title">Total Comments</h5>
                  <h2 class="card-text">{{ stats.totalComments }}</h2>
                  <p class="card-subtitle">User interactions</p>
                </div>
                <i
                  class="pi pi-comments text-white-50"
                  style="font-size: 2rem"
                ></i>
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
              <h5 class="card-title mb-0">Recent Activity</h5>
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
                  icon="pi pi-ellipsis-v"
                  class="p-button-text"
                ></button>
              </div>
            </div>
            <div class="card-body">
              <div class="activity-list">
                <div
                  *ngFor="let activity of recentActivities"
                  class="activity-item"
                >
                  <div
                    class="activity-icon"
                    [ngClass]="'bg-' + getActivityColor(activity.type)"
                  >
                    <i [class]="getActivityIcon(activity.type)"></i>
                  </div>
                  <div class="activity-content">
                    <div class="activity-header">
                      <span class="activity-user">{{ activity.user }}</span>
                      <span class="activity-time">{{
                        activity.timestamp
                      }}</span>
                    </div>
                    <p class="activity-text">
                      {{ activity.action }}: {{ activity.title }}
                    </p>
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
                  label="New Post"
                  icon="pi pi-plus"
                  class="p-button-primary w-100 mb-2"
                ></button>
                <button
                  pButton
                  type="button"
                  label="Manage Users"
                  icon="pi pi-users"
                  class="p-button-secondary w-100 mb-2"
                ></button>
                <button
                  pButton
                  type="button"
                  label="Content Settings"
                  icon="pi pi-cog"
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

      .activity-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .activity-item {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-radius: 8px;
        background-color: #f8f9fa;
        transition: all 0.2s ease;
      }

      .activity-item:hover {
        background-color: #e9ecef;
      }

      .activity-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
      }

      .activity-content {
        flex: 1;
      }

      .activity-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.25rem;
      }

      .activity-user {
        font-weight: 500;
      }

      .activity-time {
        color: #6c757d;
        font-size: 0.875rem;
      }

      .activity-text {
        margin: 0;
        color: #495057;
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
    totalUsers: 0,
    totalCategories: 0,
    totalComments: 0,
  };

  recentActivities: RecentActivity[] = [];

  ngOnInit() {
    // TODO: Fetch real data from API
    this.stats = {
      totalPosts: 150,
      totalUsers: 1200,
      totalCategories: 15,
      totalComments: 450,
    };

    this.recentActivities = [
      {
        type: 'post',
        action: 'Created new post',
        title: 'Getting Started with Angular',
        timestamp: '2 hours ago',
        user: 'John Doe',
      },
      {
        type: 'comment',
        action: 'Left a comment',
        title: 'Great article!',
        timestamp: '3 hours ago',
        user: 'Jane Smith',
      },
      {
        type: 'user',
        action: 'New user registered',
        title: 'Welcome to the platform',
        timestamp: '5 hours ago',
        user: 'Mike Johnson',
      },
    ];
  }

  getActivityColor(type: string): string {
    switch (type) {
      case 'post':
        return 'primary';
      case 'comment':
        return 'success';
      case 'user':
        return 'info';
      default:
        return 'secondary';
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'post':
        return 'pi pi-file';
      case 'comment':
        return 'pi pi-comments';
      case 'user':
        return 'pi pi-user';
      default:
        return 'pi pi-info-circle';
    }
  }
}
