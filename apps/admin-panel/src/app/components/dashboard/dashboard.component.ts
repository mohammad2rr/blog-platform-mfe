import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="row g-4">
        <!-- Stats Cards -->
        <div class="col-md-3">
          <div class="card stat-card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="card-subtitle mb-2 text-muted">Total Posts</h6>
                  <h2 class="card-title mb-0">{{ stats.totalPosts }}</h2>
                </div>
                <div class="stat-icon">
                  <i class="fas fa-file-alt"></i>
                </div>
              </div>
              <div class="stat-trend up">
                <i class="fas fa-arrow-up"></i> 12%
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card stat-card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="card-subtitle mb-2 text-muted">Total Users</h6>
                  <h2 class="card-title mb-0">{{ stats.totalUsers }}</h2>
                </div>
                <div class="stat-icon">
                  <i class="fas fa-users"></i>
                </div>
              </div>
              <div class="stat-trend up">
                <i class="fas fa-arrow-up"></i> 8%
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card stat-card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="card-subtitle mb-2 text-muted">Comments</h6>
                  <h2 class="card-title mb-0">{{ stats.totalComments }}</h2>
                </div>
                <div class="stat-icon">
                  <i class="fas fa-comments"></i>
                </div>
              </div>
              <div class="stat-trend down">
                <i class="fas fa-arrow-down"></i> 3%
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card stat-card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="card-subtitle mb-2 text-muted">Page Views</h6>
                  <h2 class="card-title mb-0">{{ stats.pageViews }}</h2>
                </div>
                <div class="stat-icon">
                  <i class="fas fa-eye"></i>
                </div>
              </div>
              <div class="stat-trend up">
                <i class="fas fa-arrow-up"></i> 15%
              </div>
            </div>
          </div>
        </div>

        <!-- Charts -->
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Traffic Overview</h5>
              <canvas id="trafficChart"></canvas>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">User Distribution</h5>
              <canvas id="userChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Recent Posts</h5>
              <div class="list-group list-group-flush">
                <div class="list-group-item" *ngFor="let post of recentPosts">
                  <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">{{ post.title }}</h6>
                    <small>{{ post.date }}</small>
                  </div>
                  <p class="mb-1">{{ post.excerpt }}</p>
                  <small>By {{ post.author }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Recent Comments</h5>
              <div class="list-group list-group-flush">
                <div
                  class="list-group-item"
                  *ngFor="let comment of recentComments"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">{{ comment.author }}</h6>
                    <small>{{ comment.date }}</small>
                  </div>
                  <p class="mb-1">{{ comment.content }}</p>
                  <small>On: {{ comment.postTitle }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .stat-card {
        border: none;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: rgba(0, 123, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: #007bff;
      }

      .stat-trend {
        margin-top: 0.5rem;
        font-size: 0.875rem;
      }

      .stat-trend.up {
        color: #28a745;
      }

      .stat-trend.down {
        color: #dc3545;
      }

      .list-group-item {
        border-left: none;
        border-right: none;
        padding: 1rem 0;
      }

      .list-group-item:first-child {
        border-top: none;
      }

      .list-group-item:last-child {
        border-bottom: none;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  stats = {
    totalPosts: 156,
    totalUsers: 2345,
    totalComments: 892,
    pageViews: '12.5K',
  };

  recentPosts = [
    {
      title: 'Getting Started with Angular',
      excerpt:
        'Learn the basics of Angular and start building amazing web applications.',
      author: 'John Doe',
      date: '2 hours ago',
    },
    {
      title: 'Micro Frontends Best Practices',
      excerpt:
        'Discover the best practices for implementing micro frontends in your applications.',
      author: 'Jane Smith',
      date: '5 hours ago',
    },
    {
      title: 'Modern Web Development',
      excerpt: 'Explore the latest trends and technologies in web development.',
      author: 'Mike Johnson',
      date: '1 day ago',
    },
  ];

  recentComments = [
    {
      author: 'Sarah Wilson',
      content: 'Great article! Very informative and well-written.',
      postTitle: 'Getting Started with Angular',
      date: '1 hour ago',
    },
    {
      author: 'David Brown',
      content:
        'Thanks for sharing these insights. Looking forward to more content like this!',
      postTitle: 'Micro Frontends Best Practices',
      date: '3 hours ago',
    },
    {
      author: 'Emily Davis',
      content:
        'This is exactly what I was looking for. Clear and concise explanation.',
      postTitle: 'Modern Web Development',
      date: '1 day ago',
    },
  ];

  ngOnInit() {
    this.initTrafficChart();
    this.initUserChart();
  }

  private initTrafficChart() {
    const ctx = document.getElementById('trafficChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Page Views',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: '#007bff',
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

  private initUserChart() {
    const ctx = document.getElementById('userChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['New Users', 'Returning Users', 'Active Users'],
        datasets: [
          {
            data: [30, 40, 30],
            backgroundColor: ['#007bff', '#28a745', '#ffc107'],
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
