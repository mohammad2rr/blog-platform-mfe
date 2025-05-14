import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextarea,
    DropdownModule,
    ToastModule,
  ],
  providers: [MessageService],
  template: `
    <div class="posts-container">
      <div class="posts-header">
        <h2>Posts Management</h2>
        <button
          pButton
          label="New Post"
          icon="pi pi-plus"
          (click)="openNew()"
        ></button>
      </div>

      <p-toast></p-toast>

      <p-table
        [value]="posts"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
        [rowsPerPageOptions]="[10, 25, 50]"
      >
        <ng-template pTemplate="header">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-post>
          <tr>
            <td>{{ post.title }}</td>
            <td>{{ post.category }}</td>
            <td>{{ post.author }}</td>
            <td>
              <span
                [class]="'status-badge status-' + post.status.toLowerCase()"
              >
                {{ post.status }}
              </span>
            </td>
            <td>{{ post.date }}</td>
            <td>
              <button
                pButton
                icon="pi pi-pencil"
                class="p-button-rounded p-button-text"
                (click)="editPost(post)"
              ></button>
              <button
                pButton
                icon="pi pi-trash"
                class="p-button-rounded p-button-text p-button-danger"
                (click)="deletePost(post)"
              ></button>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog
        [(visible)]="postDialog"
        [style]="{ width: '450px' }"
        header="Post Details"
        [modal]="true"
        styleClass="p-fluid"
      >
        <ng-template pTemplate="content">
          <div class="field">
            <label for="title">Title</label>
            <input
              type="text"
              pInputText
              id="title"
              [(ngModel)]="post.title"
              required
              autofocus
            />
          </div>
          <div class="field">
            <label for="content">Content</label>
            <textarea
              pInputTextarea
              id="content"
              [(ngModel)]="post.content"
              rows="5"
              required
            ></textarea>
          </div>
          <div class="field">
            <label for="category">Category</label>
            <p-dropdown
              id="category"
              [options]="categories"
              [(ngModel)]="post.category"
              placeholder="Select a Category"
            ></p-dropdown>
          </div>
          <div class="field">
            <label for="status">Status</label>
            <p-dropdown
              id="status"
              [options]="statuses"
              [(ngModel)]="post.status"
              placeholder="Select a Status"
            ></p-dropdown>
          </div>
        </ng-template>

        <ng-template pTemplate="footer">
          <button
            pButton
            icon="pi pi-times"
            label="Cancel"
            class="p-button-text"
            (click)="hideDialog()"
          ></button>
          <button
            pButton
            icon="pi pi-check"
            label="Save"
            (click)="savePost()"
          ></button>
        </ng-template>
      </p-dialog>

      <p-dialog
        header="Confirm"
        [(visible)]="deletePostDialog"
        [style]="{ width: '450px' }"
        [modal]="true"
      >
        <div class="confirmation-content">
          <i
            class="pi pi-exclamation-triangle p-mr-3"
            style="font-size: 2rem"
          ></i>
          <span>Are you sure you want to delete this post?</span>
        </div>
        <ng-template pTemplate="footer">
          <button
            pButton
            icon="pi pi-times"
            label="No"
            class="p-button-text"
            (click)="deletePostDialog = false"
          ></button>
          <button
            pButton
            icon="pi pi-check"
            label="Yes"
            class="p-button-text p-button-danger"
            (click)="confirmDelete()"
          ></button>
        </ng-template>
      </p-dialog>
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
        margin-bottom: 1rem;
      }

      .status-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .status-published {
        background-color: var(--success-color);
        color: white;
      }

      .status-draft {
        background-color: var(--warning-color);
        color: white;
      }

      .status-archived {
        background-color: var(--secondary-color);
        color: white;
      }

      .field {
        margin-bottom: 1rem;
      }

      .field label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      .confirmation-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }
    `,
  ],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  post: Post = {
    id: 0,
    title: '',
    content: '',
    category: '',
    status: '',
    author: '',
    date: '',
  };
  postDialog = false;
  deletePostDialog = false;
  categories = [
    { label: 'Technology', value: 'Technology' },
    { label: 'Lifestyle', value: 'Lifestyle' },
    { label: 'Travel', value: 'Travel' },
    { label: 'Food', value: 'Food' },
    { label: 'Health', value: 'Health' },
  ];
  statuses = [
    { label: 'Published', value: 'Published' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Archived', value: 'Archived' },
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    // TODO: Replace with actual API call
    this.posts = [
      {
        id: 1,
        title: 'Getting Started with Angular',
        content: 'Learn the basics of Angular...',
        category: 'Technology',
        status: 'Published',
        author: 'John Doe',
        date: '2024-01-15',
      },
      {
        id: 2,
        title: 'Micro Frontends Best Practices',
        content: 'Discover the best practices...',
        category: 'Technology',
        status: 'Draft',
        author: 'Jane Smith',
        date: '2024-01-14',
      },
    ];
  }

  openNew() {
    this.post = {
      id: 0,
      title: '',
      content: '',
      category: '',
      status: '',
      author: 'Admin User',
      date: new Date().toISOString().split('T')[0],
    };
    this.postDialog = true;
  }

  editPost(post: Post) {
    this.post = { ...post };
    this.postDialog = true;
  }

  deletePost(post: Post) {
    this.post = { ...post };
    this.deletePostDialog = true;
  }

  hideDialog() {
    this.postDialog = false;
  }

  savePost() {
    if (this.post.id === 0) {
      // Add new post
      this.post.id = this.posts.length + 1;
      this.posts.push({ ...this.post });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post created successfully',
      });
    } else {
      // Update existing post
      const index = this.posts.findIndex((p) => p.id === this.post.id);
      this.posts[index] = { ...this.post };
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post updated successfully',
      });
    }

    this.posts = [...this.posts];
    this.postDialog = false;
  }

  confirmDelete() {
    this.posts = this.posts.filter((p) => p.id !== this.post.id);
    this.deletePostDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Post deleted successfully',
    });
  }
}
