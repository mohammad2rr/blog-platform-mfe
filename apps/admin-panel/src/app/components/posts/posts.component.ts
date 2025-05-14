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
  category: string;
  author: string;
  status: 'published' | 'draft';
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
    <div class="posts">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Posts</h2>
        <button class="btn btn-primary" (click)="openNewPostModal()">
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
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let post of posts">
                  <td>{{ post.title }}</td>
                  <td>{{ post.category }}</td>
                  <td>{{ post.author }}</td>
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
      .posts {
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
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  post: Post = {
    id: 0,
    title: '',
    category: '',
    author: '',
    status: 'published',
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
    // TODO: Fetch posts from API
    this.posts = [
      {
        id: 1,
        title: 'Getting Started with Angular',
        category: 'Technology',
        author: 'John Doe',
        status: 'published',
        date: '2024-03-15',
      },
      {
        id: 2,
        title: 'Micro Frontends Architecture',
        category: 'Technology',
        author: 'Jane Smith',
        status: 'draft',
        date: '2024-03-14',
      },
      {
        id: 3,
        title: 'Best Practices for Web Development',
        category: 'Development',
        author: 'Mike Johnson',
        status: 'published',
        date: '2024-03-13',
      },
    ];
  }

  openNewPostModal() {
    // TODO: Implement new post modal
    console.log('Open new post modal');
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
