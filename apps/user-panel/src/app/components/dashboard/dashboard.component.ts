import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Chart } from 'chart.js/auto';

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
    <div class="dashboard">
      <h2 class="mb-4">My Dashboard</h2>

      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <h5 class="card-title">My Posts</h5>
              <h2 class="card-text">{{ stats.totalPosts }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-success text-white">
            <div class="card-body">
              <h5 class="card-title">Total Comments</h5>
              <h2 class="card-text">{{ stats.totalComments }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-info text-white">
            <div class="card-body">
              <h5 class="card-title">Post Views</h5>
              <h2 class="card-text">{{ stats.totalViews }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Recent Posts</h5>
              <div class="list-group">
                <a
                  *ngFor="let post of recentPosts"
                  href="#"
                  class="list-group-item list-group-item-action"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">{{ post.title }}</h6>
                    <small>{{ post.date }}</small>
                  </div>
                  <small class="text-muted">{{ post.views }} views</small>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Post Performance</h5>
              <canvas id="performanceChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        border: none;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
        margin-bottom: 0;
        font-size: 2rem;
        font-weight: 600;
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
      title: 'Getting Started with Angular',
      date: '2024-03-15',
      views: 150,
    },
    {
      title: 'Micro Frontends Best Practices',
      date: '2024-03-14',
      views: 120,
    },
    {
      title: 'Building Responsive UIs',
      date: '2024-03-13',
      views: 95,
    },
  ];

  ngOnInit() {
    // TODO: Fetch real data from API
    this.stats = {
      totalPosts: 12,
      totalComments: 45,
      totalViews: 1250,
    };

    this.initializeChart();
  }

  private initializeChart() {
    const ctx = document.getElementById(
      'performanceChart',
    ) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Post Views',
            data: [65, 59, 80, 81, 56, 55],
            borderColor: '#0d6efd',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
