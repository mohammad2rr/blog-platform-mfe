import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

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
    ChartModule,
    ButtonModule,
    TableModule,
    TagModule,
  ],
  template: `
    <div class="dashboard-container">
      <!-- Statistics Cards -->
      <div class="statistics-grid">
        <p-card header="Total Posts" styleClass="stat-card">
          <div class="stat-value">{{ totalPosts }}</div>
          <div class="stat-change positive">
            +{{ newPostsThisMonth }} this month
          </div>
        </p-card>

        <p-card header="Total Views" styleClass="stat-card">
          <div class="stat-value">{{ totalViews }}</div>
          <div class="stat-change positive">
            +{{ viewsChange }}% from last month
          </div>
        </p-card>

        <p-card header="Total Comments" styleClass="stat-card">
          <div class="stat-value">{{ totalComments }}</div>
          <div class="stat-change positive">
            +{{ commentsChange }}% from last month
          </div>
        </p-card>

        <p-card header="Draft Posts" styleClass="stat-card">
          <div class="stat-value">{{ draftPosts }}</div>
          <button
            pButton
            label="Continue Writing"
            icon="pi pi-pencil"
            class="p-button-text"
            routerLink="/drafts"
          ></button>
        </p-card>
      </div>

      <!-- Charts -->
      <div class="charts-grid">
        <p-card header="Views Over Time" styleClass="chart-card">
          <p-chart
            type="line"
            [data]="viewsChartData"
            [options]="chartOptions"
          ></p-chart>
        </p-card>

        <p-card header="Popular Posts" styleClass="chart-card">
          <p-chart
            type="doughnut"
            [data]="popularPostsChartData"
            [options]="chartOptions"
          ></p-chart>
        </p-card>
      </div>

      <!-- Recent Posts -->
      <p-card header="Recent Posts" styleClass="recent-posts-card">
        <p-table [value]="recentPosts" [rows]="5" [paginator]="true">
          <ng-template pTemplate="header">
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Views</th>
              <th>Comments</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-post>
            <tr>
              <td>{{ post.title }}</td>
              <td>
                <p-tag
                  [value]="post.status"
                  [severity]="
                    post.status === 'published' ? 'success' : 'warning'
                  "
                ></p-tag>
              </td>
              <td>{{ post.views }}</td>
              <td>{{ post.comments }}</td>
              <td>{{ post.createdAt | date: 'medium' }}</td>
              <td>
                <button
                  pButton
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text"
                  [routerLink]="['/posts', post.id, 'edit']"
                ></button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .statistics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }

      .stat-card {
        .stat-value {
          font-size: 2rem;
          font-weight: 600;
          color: var(--primary-color);
        }

        .stat-change {
          font-size: 0.875rem;
          margin-top: 0.5rem;

          &.positive {
            color: var(--green-500);
          }

          &.negative {
            color: var(--red-500);
          }
        }
      }

      .charts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1rem;
      }

      .chart-card {
        height: 300px;
      }

      .recent-posts-card {
        margin-top: 1rem;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  // Statistics
  totalPosts = 25;
  newPostsThisMonth = 5;
  totalViews = 12500;
  viewsChange = 15;
  totalComments = 350;
  commentsChange = 8;
  draftPosts = 3;

  // Chart Data
  viewsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Views',
        data: [1200, 1500, 1800, 2100, 2400, 2800],
        borderColor: 'var(--primary-color)',
        tension: 0.4,
      },
    ],
  };

  popularPostsChartData = {
    labels: [
      'Getting Started with Angular',
      'TypeScript Best Practices',
      'Micro Frontends',
    ],
    datasets: [
      {
        data: [300, 250, 200],
        backgroundColor: [
          'var(--primary-color)',
          'var(--primary-400)',
          'var(--primary-200)',
        ],
      },
    ],
  };

  chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  // Recent Posts
  recentPosts: Post[] = [
    {
      id: 1,
      title: 'Getting Started with Angular',
      status: 'published',
      views: 1200,
      comments: 45,
      createdAt: '2024-01-15T10:30:00',
    },
    {
      id: 2,
      title: 'TypeScript Best Practices',
      status: 'published',
      views: 850,
      comments: 32,
      createdAt: '2024-01-10T14:20:00',
    },
    {
      id: 3,
      title: 'Micro Frontends Architecture',
      status: 'draft',
      views: 0,
      comments: 0,
      createdAt: '2024-01-05T09:15:00',
    },
  ];

  ngOnInit() {
    // TODO: Load actual data from API
  }
}
