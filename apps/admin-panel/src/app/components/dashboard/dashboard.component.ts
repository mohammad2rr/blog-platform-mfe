import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule],
  template: `
    <div class="dashboard">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-users"></i>
          </div>
          <div class="stat-content">
            <h3>Total Users</h3>
            <p class="stat-value">1,234</p>
            <p class="stat-change positive">+12% from last month</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-file"></i>
          </div>
          <div class="stat-content">
            <h3>Total Posts</h3>
            <p class="stat-value">567</p>
            <p class="stat-change positive">+8% from last month</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-comments"></i>
          </div>
          <div class="stat-content">
            <h3>Total Comments</h3>
            <p class="stat-value">2,345</p>
            <p class="stat-change positive">+15% from last month</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-eye"></i>
          </div>
          <div class="stat-content">
            <h3>Total Views</h3>
            <p class="stat-value">45,678</p>
            <p class="stat-change positive">+23% from last month</p>
          </div>
        </div>
      </div>

      <div class="charts-grid">
        <div class="chart-card">
          <h3>User Growth</h3>
          <p-chart
            type="line"
            [data]="userGrowthData"
            [options]="chartOptions"
          ></p-chart>
        </div>

        <div class="chart-card">
          <h3>Post Categories</h3>
          <p-chart
            type="pie"
            [data]="categoryData"
            [options]="chartOptions"
          ></p-chart>
        </div>
      </div>

      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div class="activity-list">
          <div class="activity-item" *ngFor="let activity of recentActivities">
            <div class="activity-icon">
              <i [class]="activity.icon"></i>
            </div>
            <div class="activity-content">
              <p class="activity-text">{{ activity.text }}</p>
              <p class="activity-time">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        padding: 1rem;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .stat-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
      }

      .stat-icon i {
        font-size: 1.5rem;
      }

      .stat-content h3 {
        margin: 0;
        font-size: 0.875rem;
        color: #6c757d;
      }

      .stat-value {
        margin: 0.5rem 0;
        font-size: 1.5rem;
        font-weight: bold;
      }

      .stat-change {
        margin: 0;
        font-size: 0.875rem;
      }

      .stat-change.positive {
        color: var(--success-color);
      }

      .stat-change.negative {
        color: var(--danger-color);
      }

      .charts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .chart-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .chart-card h3 {
        margin: 0 0 1rem 0;
      }

      .recent-activity {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .recent-activity h3 {
        margin: 0 0 1rem 0;
      }

      .activity-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .activity-item {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        border-radius: 4px;
        background: #f8f9fa;
      }

      .activity-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
      }

      .activity-content {
        flex: 1;
      }

      .activity-text {
        margin: 0;
        font-size: 0.875rem;
      }

      .activity-time {
        margin: 0.25rem 0 0 0;
        font-size: 0.75rem;
        color: #6c757d;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  userGrowthData: any;
  categoryData: any;
  chartOptions: any;
  recentActivities = [
    {
      icon: 'pi pi-user-plus',
      text: 'New user registered',
      time: '5 minutes ago',
    },
    {
      icon: 'pi pi-file',
      text: 'New post published',
      time: '1 hour ago',
    },
    {
      icon: 'pi pi-comments',
      text: 'New comment on "Getting Started with Angular"',
      time: '2 hours ago',
    },
    {
      icon: 'pi pi-heart',
      text: 'Post "Micro Frontends" received 10 likes',
      time: '3 hours ago',
    },
  ];

  ngOnInit() {
    this.initCharts();
  }

  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary',
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.userGrowthData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Users',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--primary-color'),
          tension: 0.4,
        },
      ],
    };

    this.categoryData = {
      labels: ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health'],
      datasets: [
        {
          data: [300, 50, 100, 40, 120],
          backgroundColor: [
            documentStyle.getPropertyValue('--primary-color'),
            documentStyle.getPropertyValue('--success-color'),
            documentStyle.getPropertyValue('--info-color'),
            documentStyle.getPropertyValue('--warning-color'),
            documentStyle.getPropertyValue('--danger-color'),
          ],
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
}
