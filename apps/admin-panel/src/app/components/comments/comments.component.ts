import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

interface Comment {
  id: number;
  postId: number;
  postTitle: string;
  author: string;
  email: string;
  content: string;
  status: 'pending' | 'approved' | 'spam' | 'trash';
  createdAt: string;
  parentId?: number;
  replies?: Comment[];
}

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextarea,
    ToastModule,
    TagModule,
    DropdownModule,
    MenuModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <div class="comments-container">
      <div class="comments-header">
        <h2>Comments Management</h2>
        <div class="header-actions">
          <p-dropdown
            [options]="statusFilters"
            [(ngModel)]="selectedStatus"
            placeholder="Filter by status"
            (onChange)="filterComments()"
          ></p-dropdown>
          <button
            pButton
            label="Bulk Actions"
            icon="pi pi-list"
            (click)="menu.toggle($event)"
          ></button>
          <p-menu #menu [popup]="true" [model]="bulkActions"></p-menu>
        </div>
      </div>

      <p-toast></p-toast>
      <p-confirmDialog></p-confirmDialog>

      <p-table
        [value]="filteredComments"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} comments"
        [rowsPerPageOptions]="[10, 25, 50]"
        [selection]="selectedComments"
        dataKey="id"
      >
        <ng-template pTemplate="header">
          <tr>
            <th style="width: 3rem">
              <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th>Author</th>
            <th>Comment</th>
            <th>In Response To</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-comment>
          <tr>
            <td>
              <p-tableCheckbox [value]="comment"></p-tableCheckbox>
            </td>
            <td>
              <div class="author-info">
                <strong>{{ comment.author }}</strong>
                <small>{{ comment.email }}</small>
              </div>
            </td>
            <td>
              <div class="comment-content">{{ comment.content }}</div>
            </td>
            <td>
              <a [routerLink]="['/posts', comment.postId]">{{
                comment.postTitle
              }}</a>
            </td>
            <td>
              <p-tag
                [value]="comment.status"
                [severity]="getStatusSeverity(comment.status)"
              ></p-tag>
            </td>
            <td>{{ comment.createdAt | date: 'medium' }}</td>
            <td>
              <div class="action-buttons">
                <button
                  pButton
                  icon="pi pi-check"
                  class="p-button-rounded p-button-success p-button-text"
                  (click)="approveComment(comment)"
                  *ngIf="comment.status === 'pending'"
                  pTooltip="Approve"
                ></button>
                <button
                  pButton
                  icon="pi pi-ban"
                  class="p-button-rounded p-button-warning p-button-text"
                  (click)="markAsSpam(comment)"
                  *ngIf="comment.status !== 'spam'"
                  pTooltip="Mark as Spam"
                ></button>
                <button
                  pButton
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger p-button-text"
                  (click)="deleteComment(comment)"
                  pTooltip="Delete"
                ></button>
              </div>
            </td>
          </tr>
          <tr *ngIf="comment.replies?.length">
            <td colspan="7">
              <div class="replies-container">
                <div *ngFor="let reply of comment.replies" class="reply-item">
                  <div class="reply-content">
                    <strong>{{ reply.author }}</strong>
                    <span>{{ reply.content }}</span>
                    <small>{{ reply.createdAt | date: 'medium' }}</small>
                  </div>
                  <div class="reply-actions">
                    <button
                      pButton
                      icon="pi pi-check"
                      class="p-button-rounded p-button-success p-button-text"
                      (click)="approveComment(reply)"
                      *ngIf="reply.status === 'pending'"
                    ></button>
                    <button
                      pButton
                      icon="pi pi-ban"
                      class="p-button-rounded p-button-warning p-button-text"
                      (click)="markAsSpam(reply)"
                      *ngIf="reply.status !== 'spam'"
                    ></button>
                    <button
                      pButton
                      icon="pi pi-trash"
                      class="p-button-rounded p-button-danger p-button-text"
                      (click)="deleteComment(reply)"
                    ></button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [
    `
      .comments-container {
        padding: 1rem;
      }

      .comments-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .header-actions {
        display: flex;
        gap: 1rem;
      }

      .author-info {
        display: flex;
        flex-direction: column;
      }

      .author-info small {
        color: var(--text-color-secondary);
      }

      .comment-content {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .action-buttons {
        display: flex;
        gap: 0.5rem;
      }

      .replies-container {
        padding: 1rem;
        background-color: var(--surface-ground);
        border-radius: 4px;
      }

      .reply-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        border-bottom: 1px solid var(--surface-border);
      }

      .reply-item:last-child {
        border-bottom: none;
      }

      .reply-content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .reply-content small {
        color: var(--text-color-secondary);
      }

      .reply-actions {
        display: flex;
        gap: 0.5rem;
      }
    `,
  ],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  filteredComments: Comment[] = [];
  selectedComments: Comment[] = [];
  selectedStatus: string = 'all';

  statusFilters = [
    { label: 'All Comments', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Spam', value: 'spam' },
    { label: 'Trash', value: 'trash' },
  ];

  bulkActions = [
    {
      label: 'Approve Selected',
      icon: 'pi pi-check',
      command: () => this.approveSelected(),
    },
    {
      label: 'Mark as Spam',
      icon: 'pi pi-ban',
      command: () => this.markSelectedAsSpam(),
    },
    {
      label: 'Delete Selected',
      icon: 'pi pi-trash',
      command: () => this.deleteSelected(),
    },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    // TODO: Replace with actual API call
    this.comments = [
      {
        id: 1,
        postId: 1,
        postTitle: 'Getting Started with Angular',
        author: 'John Doe',
        email: 'john@example.com',
        content: 'Great article! Very helpful for beginners.',
        status: 'approved',
        createdAt: '2024-01-15T10:30:00',
        replies: [
          {
            id: 2,
            postId: 1,
            postTitle: 'Getting Started with Angular',
            author: 'Jane Smith',
            email: 'jane@example.com',
            content: 'Thanks for the feedback!',
            status: 'approved',
            createdAt: '2024-01-15T11:00:00',
            parentId: 1,
          },
        ],
      },
      {
        id: 3,
        postId: 2,
        postTitle: 'Advanced TypeScript Patterns',
        author: 'Bob Wilson',
        email: 'bob@example.com',
        content: 'This is spam content',
        status: 'spam',
        createdAt: '2024-01-14T15:45:00',
      },
    ];
    this.filterComments();
  }

  filterComments() {
    if (this.selectedStatus === 'all') {
      this.filteredComments = this.comments;
    } else {
      this.filteredComments = this.comments.filter(
        (comment) => comment.status === this.selectedStatus,
      );
    }
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'spam':
        return 'danger';
      case 'trash':
        return 'info';
      default:
        return 'info';
    }
  }

  approveComment(comment: Comment) {
    comment.status = 'approved';
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Comment approved successfully',
    });
  }

  markAsSpam(comment: Comment) {
    comment.status = 'spam';
    this.messageService.add({
      severity: 'warning',
      summary: 'Success',
      detail: 'Comment marked as spam',
    });
  }

  deleteComment(comment: Comment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this comment?',
      accept: () => {
        this.comments = this.comments.filter((c) => c.id !== comment.id);
        this.filterComments();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Comment deleted successfully',
        });
      },
    });
  }

  approveSelected() {
    this.selectedComments.forEach((comment) => {
      comment.status = 'approved';
    });
    this.selectedComments = [];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Selected comments approved successfully',
    });
  }

  markSelectedAsSpam() {
    this.selectedComments.forEach((comment) => {
      comment.status = 'spam';
    });
    this.selectedComments = [];
    this.messageService.add({
      severity: 'warning',
      summary: 'Success',
      detail: 'Selected comments marked as spam',
    });
  }

  deleteSelected() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected comments?',
      accept: () => {
        this.comments = this.comments.filter(
          (comment) =>
            !this.selectedComments.some(
              (selected) => selected.id === comment.id,
            ),
        );
        this.selectedComments = [];
        this.filterComments();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Selected comments deleted successfully',
        });
      },
    });
  }
}
