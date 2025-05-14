import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

interface Post {
  id: number;
  title: string;
  category: string;
  status: 'published' | 'draft';
  views: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    MenuModule,
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <div class="posts-container">
      <div class="posts-header">
        <h2>My Posts</h2>
        <div class="header-actions">
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <input
              type="text"
              pInputText
              [(ngModel)]="searchQuery"
              (input)="filterPosts()"
              placeholder="Search posts..."
            />
          </span>
          <p-dropdown
            [options]="statusFilters"
            [(ngModel)]="selectedStatus"
            placeholder="Filter by status"
            (onChange)="filterPosts()"
          ></p-dropdown>
          <button
            pButton
            label="New Post"
            icon="pi pi-plus"
            class="p-button-primary"
            routerLink="/posts/new"
          ></button>
        </div>
      </div>

      <p-toast></p-toast>
      <p-confirmDialog></p-confirmDialog>

      <p-table
        [value]="filteredPosts"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
        [rowsPerPageOptions]="[10, 25, 50]"
        [globalFilterFields]="['title', 'category']"
        [sortField]="sortField"
        [sortOrder]="sortOrder"
        (onSort)="onSort($event)"
      >
        <ng-template pTemplate="header">
          <tr>
            <th [pSortableColumn]="'title'">
              Title
              <p-sortIcon [field]="'title'"></p-sortIcon>
            </th>
            <th [pSortableColumn]="'category'">
              Category
              <p-sortIcon [field]="'category'"></p-sortIcon>
            </th>
            <th [pSortableColumn]="'status'">
              Status
              <p-sortIcon [field]="'status'"></p-sortIcon>
            </th>
            <th [pSortableColumn]="'views'">
              Views
              <p-sortIcon [field]="'views'"></p-sortIcon>
            </th>
            <th [pSortableColumn]="'comments'">
              Comments
              <p-sortIcon [field]="'comments'"></p-sortIcon>
            </th>
            <th [pSortableColumn]="'createdAt'">
              Created
              <p-sortIcon [field]="'createdAt'"></p-sortIcon>
            </th>
            <th [pSortableColumn]="'updatedAt'">
              Updated
              <p-sortIcon [field]="'updatedAt'"></p-sortIcon>
            </th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-post>
          <tr>
            <td>
              <a [routerLink]="['/posts', post.id, 'edit']" class="post-title">
                {{ post.title }}
              </a>
            </td>
            <td>{{ post.category }}</td>
            <td>
              <p-tag
                [value]="post.status"
                [severity]="post.status === 'published' ? 'success' : 'warning'"
              ></p-tag>
            </td>
            <td>{{ post.views }}</td>
            <td>{{ post.comments }}</td>
            <td>{{ post.createdAt | date: 'medium' }}</td>
            <td>{{ post.updatedAt | date: 'medium' }}</td>
            <td>
              <div class="action-buttons">
                <button
                  pButton
                  icon="pi pi-eye"
                  class="p-button-rounded p-button-text"
                  pTooltip="View"
                  (click)="viewPost(post)"
                ></button>
                <button
                  pButton
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text"
                  pTooltip="Edit"
                  [routerLink]="['/posts', post.id, 'edit']"
                ></button>
                <button
                  pButton
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger"
                  pTooltip="Delete"
                  (click)="deletePost(post)"
                ></button>
              </div>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="8" class="text-center">
              No posts found. Start by creating a new post!
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [
    `
      .posts-container {
        padding: 1rem;
      }

      .posts-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .header-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .post-title {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }

      .action-buttons {
        display: flex;
        gap: 0.5rem;
      }

      :host ::ng-deep {
        .p-datatable {
          .p-datatable-thead > tr > th {
            background-color: var(--surface-ground);
          }
        }
      }
    `,
  ],
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery: string = '';
  selectedStatus: string = 'all';
  sortField: string = 'createdAt';
  sortOrder: number = -1;

  statusFilters = [
    { label: 'All Posts', value: 'all' },
    { label: 'Published', value: 'published' },
    { label: 'Drafts', value: 'draft' },
  ];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    // TODO: Replace with actual API call
    this.posts = [
      {
        id: 1,
        title: 'Getting Started with Angular',
        category: 'Angular',
        status: 'published',
        views: 1200,
        comments: 45,
        createdAt: '2024-01-15T10:30:00',
        updatedAt: '2024-01-15T10:30:00',
      },
      {
        id: 2,
        title: 'TypeScript Best Practices',
        category: 'Programming',
        status: 'published',
        views: 850,
        comments: 32,
        createdAt: '2024-01-10T14:20:00',
        updatedAt: '2024-01-12T09:15:00',
      },
      {
        id: 3,
        title: 'Micro Frontends Architecture',
        category: 'Web Development',
        status: 'draft',
        views: 0,
        comments: 0,
        createdAt: '2024-01-05T09:15:00',
        updatedAt: '2024-01-05T09:15:00',
      },
    ];
    this.filterPosts();
  }

  filterPosts() {
    this.filteredPosts = this.posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus =
        this.selectedStatus === 'all' || post.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  onSort(event: any) {
    this.sortField = event.field;
    this.sortOrder = event.order;
  }

  viewPost(post: Post) {
    // TODO: Implement view functionality
    this.messageService.add({
      severity: 'info',
      summary: 'View Post',
      detail: 'View functionality coming soon',
    });
  }

  deletePost(post: Post) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this post?',
      accept: () => {
        this.posts = this.posts.filter((p) => p.id !== post.id);
        this.filterPosts();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Post deleted successfully',
        });
      },
    });
  }
}
