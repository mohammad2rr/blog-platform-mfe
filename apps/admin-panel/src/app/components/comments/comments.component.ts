import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number;
  postId: number;
  postTitle: string;
  author: string;
  email: string;
  content: string;
  status: 'pending' | 'approved' | 'spam' | 'rejected';
  createdAt: string;
  parentId?: number;
}

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="comments-container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0">Manage Comments</h4>
        <div class="d-flex gap-2">
          <button class="btn btn-success" (click)="approveSelected()">
            <i class="fas fa-check"></i> Approve Selected
          </button>
          <button class="btn btn-danger" (click)="rejectSelected()">
            <i class="fas fa-times"></i> Reject Selected
          </button>
          <button class="btn btn-warning" (click)="markAsSpam()">
            <i class="fas fa-ban"></i> Mark as Spam
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-4">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search comments..."
                  [(ngModel)]="searchQuery"
                  (input)="filterComments()"
                />
                <button class="btn btn-outline-secondary" type="button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div class="col-md-3">
              <select
                class="form-select"
                [(ngModel)]="selectedStatus"
                (change)="filterComments()"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="spam">Spam</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      class="form-check-input"
                      [checked]="selectAll"
                      (change)="toggleSelectAll()"
                    />
                  </th>
                  <th>Author</th>
                  <th>Comment</th>
                  <th>Post</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let comment of filteredComments">
                  <td>
                    <input
                      type="checkbox"
                      class="form-check-input"
                      [checked]="selectedComments.includes(comment.id)"
                      (change)="toggleCommentSelection(comment.id)"
                    />
                  </td>
                  <td>
                    <div>{{ comment.author }}</div>
                    <small class="text-muted">{{ comment.email }}</small>
                  </td>
                  <td>
                    <div class="comment-content">{{ comment.content }}</div>
                    <small class="text-muted" *ngIf="comment.parentId"
                      >Reply to comment #{{ comment.parentId }}</small
                    >
                  </td>
                  <td>
                    <a href="#" class="text-decoration-none">{{
                      comment.postTitle
                    }}</a>
                  </td>
                  <td>
                    <span
                      class="badge"
                      [ngClass]="{
                        'bg-warning': comment.status === 'pending',
                        'bg-success': comment.status === 'approved',
                        'bg-danger': comment.status === 'spam',
                        'bg-secondary': comment.status === 'rejected',
                      }"
                    >
                      {{ comment.status }}
                    </span>
                  </td>
                  <td>{{ comment.createdAt }}</td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-sm btn-outline-success"
                        (click)="approveComment(comment.id)"
                        *ngIf="comment.status !== 'approved'"
                      >
                        <i class="fas fa-check"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        (click)="rejectComment(comment.id)"
                        *ngIf="comment.status !== 'rejected'"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-warning"
                        (click)="markCommentAsSpam(comment.id)"
                        *ngIf="comment.status !== 'spam'"
                      >
                        <i class="fas fa-ban"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-primary"
                        (click)="viewComment(comment)"
                      >
                        <i class="fas fa-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Comment View Modal -->
    <div
      class="modal fade"
      id="commentModal"
      tabindex="-1"
      aria-labelledby="commentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModalLabel">Comment Details</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" *ngIf="selectedComment">
            <div class="mb-3">
              <h6>Author Information</h6>
              <p class="mb-1">
                <strong>Name:</strong> {{ selectedComment.author }}
              </p>
              <p class="mb-1">
                <strong>Email:</strong> {{ selectedComment.email }}
              </p>
            </div>
            <div class="mb-3">
              <h6>Comment Content</h6>
              <p class="mb-1">{{ selectedComment.content }}</p>
            </div>
            <div class="mb-3">
              <h6>Post Information</h6>
              <p class="mb-1">
                <strong>Post:</strong> {{ selectedComment.postTitle }}
              </p>
              <p class="mb-1">
                <strong>Comment ID:</strong> {{ selectedComment.id }}
              </p>
              <p class="mb-1" *ngIf="selectedComment.parentId">
                <strong>Reply to:</strong> Comment #{{
                  selectedComment.parentId
                }}
              </p>
            </div>
            <div class="mb-3">
              <h6>Status</h6>
              <select
                class="form-select"
                [(ngModel)]="selectedComment.status"
                (change)="updateCommentStatus(selectedComment)"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="spam">Spam</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .comments-container {
        padding: 1rem;
      }

      .table th {
        font-weight: 600;
        background-color: #f8f9fa;
      }

      .btn-group .btn {
        padding: 0.25rem 0.5rem;
      }

      .badge {
        font-weight: 500;
        padding: 0.5em 0.75em;
      }

      .comment-content {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  filteredComments: Comment[] = [];
  searchQuery: string = '';
  selectedStatus: string = '';
  selectedComments: number[] = [];
  selectAll: boolean = false;
  selectedComment: Comment | null = null;

  ngOnInit() {
    // Simulated API call to get comments
    this.comments = [
      {
        id: 1,
        postId: 1,
        postTitle: 'Getting Started with Angular',
        author: 'John Doe',
        email: 'john.doe@example.com',
        content: 'Great article! Very informative and well-written.',
        status: 'approved',
        createdAt: '2024-03-15 14:30',
      },
      {
        id: 2,
        postId: 1,
        postTitle: 'Getting Started with Angular',
        author: 'Jane Smith',
        email: 'jane.smith@example.com',
        content: 'Thanks for sharing these insights.',
        status: 'pending',
        createdAt: '2024-03-15 15:45',
        parentId: 1,
      },
      {
        id: 3,
        postId: 2,
        postTitle: 'Micro Frontends Best Practices',
        author: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        content: 'This is exactly what I was looking for.',
        status: 'spam',
        createdAt: '2024-03-15 16:20',
      },
    ];
    this.filterComments();
  }

  filterComments() {
    this.filteredComments = this.comments.filter((comment) => {
      const matchesSearch =
        comment.content
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        comment.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        comment.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus =
        !this.selectedStatus || comment.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    if (this.selectAll) {
      this.selectedComments = this.filteredComments.map((c) => c.id);
    } else {
      this.selectedComments = [];
    }
  }

  toggleCommentSelection(commentId: number) {
    const index = this.selectedComments.indexOf(commentId);
    if (index === -1) {
      this.selectedComments.push(commentId);
    } else {
      this.selectedComments.splice(index, 1);
    }
    this.selectAll =
      this.selectedComments.length === this.filteredComments.length;
  }

  approveSelected() {
    this.selectedComments.forEach((id) => this.approveComment(id));
    this.selectedComments = [];
    this.selectAll = false;
  }

  rejectSelected() {
    this.selectedComments.forEach((id) => this.rejectComment(id));
    this.selectedComments = [];
    this.selectAll = false;
  }

  markAsSpam() {
    this.selectedComments.forEach((id) => this.markCommentAsSpam(id));
    this.selectedComments = [];
    this.selectAll = false;
  }

  approveComment(id: number) {
    const comment = this.comments.find((c) => c.id === id);
    if (comment) {
      comment.status = 'approved';
      this.filterComments();
    }
  }

  rejectComment(id: number) {
    const comment = this.comments.find((c) => c.id === id);
    if (comment) {
      comment.status = 'rejected';
      this.filterComments();
    }
  }

  markCommentAsSpam(id: number) {
    const comment = this.comments.find((c) => c.id === id);
    if (comment) {
      comment.status = 'spam';
      this.filterComments();
    }
  }

  viewComment(comment: Comment) {
    this.selectedComment = { ...comment };
    // Show modal using Bootstrap
    const modal = document.getElementById('commentModal');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  updateCommentStatus(comment: Comment) {
    const index = this.comments.findIndex((c) => c.id === comment.id);
    if (index !== -1) {
      this.comments[index] = { ...comment };
      this.filterComments();
    }
  }
}
