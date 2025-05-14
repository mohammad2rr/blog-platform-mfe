import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  authorImage: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-detail-container">
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a routerLink="/blog">Blog</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{ post?.title }}
                </li>
              </ol>
            </nav>

            <article class="blog-post">
              <header class="mb-4">
                <h1 class="display-4 mb-3">{{ post?.title }}</h1>
                <div class="d-flex align-items-center mb-3">
                  <img
                    [src]="post?.authorImage"
                    alt="Author"
                    class="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                  <div>
                    <div class="fw-bold">{{ post?.author }}</div>
                    <div class="text-muted">{{ post?.date }}</div>
                  </div>
                </div>
                <div class="d-flex gap-2 mb-3">
                  <span class="badge bg-primary">{{ post?.category }}</span>
                  <span
                    class="badge bg-secondary"
                    *ngFor="let tag of post?.tags"
                    >{{ tag }}</span
                  >
                </div>
              </header>

              <img
                [src]="post?.image"
                [alt]="post?.title"
                class="img-fluid rounded mb-4"
              />

              <div class="blog-content" [innerHTML]="post?.content"></div>

              <hr class="my-5" />

              <div class="blog-share mb-5">
                <h5>Share this post</h5>
                <div class="d-flex gap-3">
                  <a href="#" class="text-primary"
                    ><i class="fab fa-facebook fa-2x"></i
                  ></a>
                  <a href="#" class="text-info"
                    ><i class="fab fa-twitter fa-2x"></i
                  ></a>
                  <a href="#" class="text-danger"
                    ><i class="fab fa-pinterest fa-2x"></i
                  ></a>
                  <a href="#" class="text-primary"
                    ><i class="fab fa-linkedin fa-2x"></i
                  ></a>
                </div>
              </div>

              <div class="blog-comments">
                <h5>Comments ({{ comments.length }})</h5>
                <div class="comment-form mb-4">
                  <textarea
                    class="form-control mb-3"
                    rows="3"
                    placeholder="Write a comment..."
                  ></textarea>
                  <button class="btn btn-primary">Post Comment</button>
                </div>

                <div class="comments-list">
                  <div class="comment mb-4" *ngFor="let comment of comments">
                    <div class="d-flex">
                      <img
                        [src]="comment.authorImage"
                        alt="Commenter"
                        class="rounded-circle me-3"
                        width="50"
                        height="50"
                      />
                      <div class="flex-grow-1">
                        <div
                          class="d-flex justify-content-between align-items-center mb-2"
                        >
                          <h6 class="mb-0">{{ comment.author }}</h6>
                          <small class="text-muted">{{ comment.date }}</small>
                        </div>
                        <p class="mb-2">{{ comment.content }}</p>
                        <div class="d-flex gap-2">
                          <button class="btn btn-sm btn-outline-primary">
                            <i class="fas fa-thumbs-up"></i> Like ({{
                              comment.likes
                            }})
                          </button>
                          <button class="btn btn-sm btn-outline-secondary">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .blog-detail-container {
        background-color: #f8f9fa;
      }
      .blog-post {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .blog-content {
        font-size: 1.1rem;
        line-height: 1.8;
      }
      .blog-content p {
        margin-bottom: 1.5rem;
      }
      .blog-content img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 1.5rem 0;
      }
      .blog-share a {
        text-decoration: none;
        transition: opacity 0.3s ease;
      }
      .blog-share a:hover {
        opacity: 0.8;
      }
      .comment {
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 8px;
      }
    `,
  ],
})
export class BlogDetailComponent implements OnInit {
  post: BlogPost | null = null;
  comments = [
    {
      author: 'John Doe',
      authorImage: 'assets/images/avatar1.jpg',
      content: 'Great article! Very informative and well-written.',
      date: '2024-03-15',
      likes: 5,
    },
    {
      author: 'Jane Smith',
      authorImage: 'assets/images/avatar2.jpg',
      content:
        'Thanks for sharing these insights. Looking forward to more content like this!',
      date: '2024-03-14',
      likes: 3,
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Simulated API call to get post details
    this.post = {
      id: 1,
      title: 'Getting Started with Angular',
      content: `
        <p>Angular is a powerful framework for building web applications. In this article, we'll explore the basics of Angular and how to get started with your first application.</p>
        
        <h2>Why Choose Angular?</h2>
        <p>Angular provides a robust platform for building scalable web applications. It offers:</p>
        <ul>
          <li>Component-based architecture</li>
          <li>Two-way data binding</li>
          <li>Dependency injection</li>
          <li>Powerful CLI tools</li>
        </ul>

        <h2>Getting Started</h2>
        <p>To begin your Angular journey, you'll need to install Node.js and the Angular CLI. Here's how:</p>
        <pre><code>npm install -g @angular/cli</code></pre>

        <h2>Creating Your First App</h2>
        <p>Once you have the CLI installed, creating a new application is as simple as running:</p>
        <pre><code>ng new my-first-app</code></pre>

        <p>This will create a new Angular application with all the necessary files and dependencies.</p>
      `,
      author: 'John Doe',
      authorImage: 'assets/images/avatar1.jpg',
      date: '2024-03-15',
      image: 'assets/images/angular.jpg',
      category: 'technology',
      tags: ['angular', 'web development', 'javascript'],
    };
  }
}
