import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  parentId?: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  featuredImage: string;
  createdAt: string;
  readTime: number;
  tags: string[];
  comments: Comment[];
}

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="post-detail-container">
      <!-- Post Header -->
      <div class="post-header text-center mb-5">
        <h1 class="display-4 mb-3">{{ post?.title }}</h1>
        <div class="post-meta">
          <span class="me-3">
            <i class="fas fa-user"></i> {{ post?.author }}
          </span>
          <span class="me-3">
            <i class="fas fa-calendar"></i> {{ post?.createdAt }}
          </span>
          <span class="me-3">
            <i class="fas fa-clock"></i> {{ post?.readTime }} min read
          </span>
          <span> <i class="fas fa-folder"></i> {{ post?.category }} </span>
        </div>
      </div>

      <!-- Featured Image -->
      <div class="featured-image mb-5">
        <img
          [src]="post?.featuredImage"
          [alt]="post?.title"
          class="img-fluid rounded"
        />
      </div>

      <!-- Post Content -->
      <div class="post-content mb-5">
        <div class="content" [innerHTML]="post?.content"></div>
      </div>

      <!-- Tags -->
      <div class="post-tags mb-5">
        <div class="tags">
          <a *ngFor="let tag of post?.tags" href="#" class="tag">{{ tag }}</a>
        </div>
      </div>

      <!-- Social Share -->
      <div class="social-share mb-5">
        <h5 class="mb-3">Share this post</h5>
        <div class="share-buttons">
          <a href="#" class="btn btn-outline-primary me-2">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="btn btn-outline-info me-2">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="btn btn-outline-danger me-2">
            <i class="fab fa-pinterest"></i>
          </a>
          <a href="#" class="btn btn-outline-success">
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="comments-section">
        <h3 class="mb-4">Comments ({{ post?.comments?.length || 0 }})</h3>

        <!-- Comment Form -->
        <div class="comment-form mb-5">
          <h5 class="mb-3">Leave a Comment</h5>
          <form (ngSubmit)="submitComment()">
            <div class="row">
              <div class="col-md-6 mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Your Name"
                  [(ngModel)]="newComment.author"
                  name="author"
                  required
                />
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Your Email"
                  [(ngModel)]="newComment.email"
                  name="email"
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <textarea
                class="form-control"
                rows="4"
                placeholder="Your Comment"
                [(ngModel)]="newComment.content"
                name="content"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Post Comment</button>
          </form>
        </div>

        <!-- Comments List -->
        <div class="comments-list">
          <div *ngFor="let comment of post?.comments" class="comment mb-4">
            <div class="comment-body">
              <div
                class="d-flex justify-content-between align-items-center mb-2"
              >
                <h6 class="mb-0">{{ comment.author }}</h6>
                <small class="text-muted">{{ comment.createdAt }}</small>
              </div>
              <p class="mb-2">{{ comment.content }}</p>
              <div class="comment-actions">
                <button
                  class="btn btn-link btn-sm text-muted"
                  (click)="replyToComment(comment)"
                >
                  <i class="fas fa-reply"></i> Reply
                </button>
              </div>
            </div>

            <!-- Reply Form -->
            <div *ngIf="replyingTo === comment.id" class="reply-form mt-3 ms-4">
              <form (ngSubmit)="submitReply(comment)">
                <div class="mb-3">
                  <textarea
                    class="form-control"
                    rows="2"
                    placeholder="Write a reply..."
                    [(ngModel)]="replyContent"
                    name="replyContent"
                    required
                  ></textarea>
                </div>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary btn-sm">
                    Post Reply
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm"
                    (click)="cancelReply()"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .post-detail-container {
        padding: 2rem 0;
      }

      .post-header {
        max-width: 800px;
        margin: 0 auto;
      }

      .post-meta {
        color: #6c757d;
        font-size: 0.9rem;
      }

      .featured-image img {
        width: 100%;
        max-height: 500px;
        object-fit: cover;
      }

      .post-content {
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.8;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .tag {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        background-color: #f8f9fa;
        border-radius: 1rem;
        color: #6c757d;
        text-decoration: none;
        font-size: 0.875rem;
        transition: all 0.2s;
      }

      .tag:hover {
        background-color: #e9ecef;
        color: #495057;
      }

      .share-buttons .btn {
        width: 40px;
        height: 40px;
        padding: 0;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
      }

      .comment {
        border-left: 3px solid #e9ecef;
        padding-left: 1rem;
      }

      .comment-body {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 0.25rem;
      }

      .reply-form {
        border-left: 2px solid #dee2e6;
        padding-left: 1rem;
      }
    `,
  ],
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  newComment: Comment = {
    id: 0,
    author: '',
    email: '',
    content: '',
    createdAt: '',
  };
  replyingTo: number | null = null;
  replyContent: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get post ID from route params
    this.route.params.subscribe((params) => {
      const postId = +params['id'];
      this.loadPost(postId);
    });
  }

  loadPost(id: number) {
    // Simulated API call to get post
    this.post = {
      id: id,
      title: 'Getting Started with Angular',
      content: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h2>Key Features</h2>
        <ul>
          <li>Component-based architecture</li>
          <li>Two-way data binding</li>
          <li>Dependency injection</li>
          <li>Powerful routing system</li>
        </ul>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      `,
      author: 'John Doe',
      category: 'Development',
      featuredImage: 'assets/images/angular.jpg',
      createdAt: '2024-03-15',
      readTime: 5,
      tags: ['Angular', 'TypeScript', 'Web Development'],
      comments: [
        {
          id: 1,
          author: 'Jane Smith',
          email: 'jane@example.com',
          content: 'Great article! Very informative.',
          createdAt: '2024-03-15 14:30',
        },
        {
          id: 2,
          author: 'Mike Johnson',
          email: 'mike@example.com',
          content: 'Thanks for sharing these insights.',
          createdAt: '2024-03-15 15:45',
          parentId: 1,
        },
      ],
    };
  }

  submitComment() {
    if (this.post) {
      const comment: Comment = {
        id: this.post.comments.length + 1,
        author: this.newComment.author,
        email: this.newComment.email,
        content: this.newComment.content,
        createdAt: new Date().toISOString(),
      };

      this.post.comments.push(comment);
      this.newComment = {
        id: 0,
        author: '',
        email: '',
        content: '',
        createdAt: '',
      };
    }
  }

  replyToComment(comment: Comment) {
    this.replyingTo = comment.id;
    this.replyContent = '';
  }

  submitReply(parentComment: Comment) {
    if (this.post && this.replyingTo) {
      const reply: Comment = {
        id: this.post.comments.length + 1,
        author: this.newComment.author,
        email: this.newComment.email,
        content: this.replyContent,
        createdAt: new Date().toISOString(),
        parentId: this.replyingTo,
      };

      this.post.comments.push(reply);
      this.replyingTo = null;
      this.replyContent = '';
    }
  }

  cancelReply() {
    this.replyingTo = null;
    this.replyContent = '';
  }
}
