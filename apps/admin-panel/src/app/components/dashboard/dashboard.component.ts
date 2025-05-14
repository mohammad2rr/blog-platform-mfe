import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2 class="mb-4">Dashboard</h2>

      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <h5 class="card-title">Total Posts</h5>
              <h2 class="card-text">{{ stats.totalPosts }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-success text-white">
            <div class="card-body">
              <h5 class="card-title">Total Users</h5>
              <h2 class="card-text">{{ stats.totalUsers }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-info text-white">
            <div class="card-body">
              <h5 class="card-title">Total Categories</h5>
              <h2 class="card-text">{{ stats.totalCategories }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-warning text-white">
            <div class="card-body">
              <h5 class="card-title">Total Comments</h5>
              <h2 class="card-text">{{ stats.totalComments }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Posts Overview</h5>
              <canvas id="postsChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">User Activity</h5>
              <canvas id="usersChart"></canvas>
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
    totalUsers: 0,
    totalCategories: 0,
    totalComments: 0,
  };

  ngOnInit() {
    // TODO: Fetch real data from API
    this.stats = {
      totalPosts: 150,
      totalUsers: 1200,
      totalCategories: 15,
      totalComments: 450,
    };

    this.initializeCharts();
  }

  private initializeCharts() {
    // Posts Chart
    const postsCtx = document.getElementById('postsChart') as HTMLCanvasElement;
    new Chart(postsCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Posts',
            data: [12, 19, 15, 25, 22, 30],
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

    // Users Chart
    const usersCtx = document.getElementById('usersChart') as HTMLCanvasElement;
    new Chart(usersCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'New Users',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: '#198754',
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
