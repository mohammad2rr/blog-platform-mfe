import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Post {
  id: number;
  title: string;
  status: 'published' | 'draft';
  views: number;
  comments: number;
  date: string;
}

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="my-posts">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>My Posts</h2>
        <button class="btn btn-primary" (click)="createNewPost()">
          <i class="fas fa-plus me-2"></i>New Post
        </button>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Comments</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let post of posts">
                  <td>{{ post.title }}</td>
                  <td>
                    <span
                      class="badge"
                      [ngClass]="{
                        'bg-success': post.status === 'published',
                        'bg-warning': post.status === 'draft',
                      }"
                    >
                      {{ post.status }}
                    </span>
                  </td>
                  <td>{{ post.views }}</td>
                  <td>{{ post.comments }}</td>
                  <td>{{ post.date }}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-outline-primary me-2"
                      (click)="editPost(post)"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      (click)="deletePost(post)"
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
      .my-posts {
        padding: 1rem;
      }
      .table th {
        font-weight: 600;
        background-color: #f8f9fa;
      }
      .badge {
        padding: 0.5em 0.75em;
      }
    `,
  ],
})
export class MyPostsComponent implements OnInit {
  posts: Post[] = [];

  ngOnInit() {
    // TODO: Fetch posts from API
    this.posts = [
      {
        id: 1,
        title: 'Getting Started with Angular',
        status: 'published',
        views: 150,
        comments: 12,
        date: '2024-03-15',
      },
      {
        id: 2,
        title: 'Micro Frontends Best Practices',
        status: 'draft',
        views: 0,
        comments: 0,
        date: '2024-03-14',
      },
      {
        id: 3,
        title: 'Building Responsive UIs',
        status: 'published',
        views: 95,
        comments: 8,
        date: '2024-03-13',
      },
    ];
  }

  createNewPost() {
    // TODO: Implement new post functionality
    console.log('Create new post');
  }

  editPost(post: Post) {
    // TODO: Implement edit post functionality
    console.log('Edit post:', post);
  }

  deletePost(post: Post) {
    // TODO: Implement delete post functionality
    console.log('Delete post:', post);
  }
}
