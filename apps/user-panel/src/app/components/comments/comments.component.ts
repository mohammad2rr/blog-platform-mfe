import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number;
  postTitle: string;
  content: string;
  status: 'approved' | 'pending' | 'spam';
  date: string;
}

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="comments">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>My Comments</h2>
        <div class="btn-group">
          <button
            class="btn btn-outline-primary"
            [class.active]="filter === 'all'"
            (click)="setFilter('all')"
          >
            All
          </button>
          <button
            class="btn btn-outline-primary"
            [class.active]="filter === 'approved'"
            (click)="setFilter('approved')"
          >
            Approved
          </button>
          <button
            class="btn btn-outline-primary"
            [class.active]="filter === 'pending'"
            (click)="setFilter('pending')"
          >
            Pending
          </button>
          <button
            class="btn btn-outline-primary"
            [class.active]="filter === 'spam'"
            (click)="setFilter('spam')"
          >
            Spam
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Comment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let comment of filteredComments">
                  <td>{{ comment.postTitle }}</td>
                  <td>{{ comment.content }}</td>
                  <td>
                    <span
                      class="badge"
                      [ngClass]="{
                        'bg-success': comment.status === 'approved',
                        'bg-warning': comment.status === 'pending',
                        'bg-danger': comment.status === 'spam',
                      }"
                    >
                      {{ comment.status }}
                    </span>
                  </td>
                  <td>{{ comment.date }}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-outline-primary me-2"
                      (click)="editComment(comment)"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      (click)="deleteComment(comment)"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .comments {
        padding: 1rem;
      }
      .table th {
        font-weight: 600;
        background-color: #f8f9fa;
      }
      .badge {
        padding: 0.5em 0.75em;
      }
      .btn-group .btn.active {
        background-color: #0d6efd;
        color: white;
      }
    `,
  ],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  filter: 'all' | 'approved' | 'pending' | 'spam' = 'all';

  get filteredComments(): Comment[] {
    if (this.filter === 'all') {
      return this.comments;
    }
    return this.comments.filter((comment) => comment.status === this.filter);
  }

  ngOnInit() {
    // TODO: Fetch comments from API
    this.comments = [
      {
        id: 1,
        postTitle: 'Getting Started with Angular',
        content: 'Great article! Very helpful for beginners.',
        status: 'approved',
        date: '2024-03-15',
      },
      {
        id: 2,
        postTitle: 'Micro Frontends Best Practices',
        content: 'I have a question about the deployment strategy...',
        status: 'pending',
        date: '2024-03-14',
      },
      {
        id: 3,
        postTitle: 'Building Responsive UIs',
        content: 'This is spam content',
        status: 'spam',
        date: '2024-03-13',
      },
    ];
  }

  setFilter(filter: 'all' | 'approved' | 'pending' | 'spam') {
    this.filter = filter;
  }

  editComment(comment: Comment) {
    // TODO: Implement edit comment functionality
    console.log('Edit comment:', comment);
  }

  deleteComment(comment: Comment) {
    // TODO: Implement delete comment functionality
    console.log('Delete comment:', comment);
  }
}
