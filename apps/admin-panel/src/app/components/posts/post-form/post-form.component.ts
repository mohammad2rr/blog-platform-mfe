import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="post-form-container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0">{{ isEditMode ? 'Edit Post' : 'Create New Post' }}</h4>
        <button class="btn btn-outline-secondary" routerLink="../">
          <i class="fas fa-arrow-left"></i> Back to Posts
        </button>
      </div>

      <div class="card">
        <div class="card-body">
          <form [formGroup]="postForm" (ngSubmit)="onSubmit()">
            <div class="row">
              <div class="col-md-8">
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    formControlName="title"
                    [class.is-invalid]="isFieldInvalid('title')"
                    placeholder="Enter post title"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('title')">
                    Title is required
                  </div>
                </div>

                <div class="mb-3">
                  <label for="content" class="form-label">Content</label>
                  <textarea
                    class="form-control"
                    id="content"
                    formControlName="content"
                    [class.is-invalid]="isFieldInvalid('content')"
                    rows="10"
                    placeholder="Write your post content here..."
                  ></textarea>
                  <div
                    class="invalid-feedback"
                    *ngIf="isFieldInvalid('content')"
                  >
                    Content is required
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Post Settings</h5>

                    <div class="mb-3">
                      <label for="category" class="form-label">Category</label>
                      <select
                        class="form-select"
                        id="category"
                        formControlName="category"
                        [class.is-invalid]="isFieldInvalid('category')"
                      >
                        <option value="">Select a category</option>
                        <option value="technology">Technology</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="business">Business</option>
                      </select>
                      <div
                        class="invalid-feedback"
                        *ngIf="isFieldInvalid('category')"
                      >
                        Category is required
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="status" class="form-label">Status</label>
                      <select
                        class="form-select"
                        id="status"
                        formControlName="status"
                        [class.is-invalid]="isFieldInvalid('status')"
                      >
                        <option value="draft">Draft</option>
                        <option value="pending">Pending Review</option>
                        <option value="published">Published</option>
                      </select>
                      <div
                        class="invalid-feedback"
                        *ngIf="isFieldInvalid('status')"
                      >
                        Status is required
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="featuredImage" class="form-label"
                        >Featured Image</label
                      >
                      <input
                        type="file"
                        class="form-control"
                        id="featuredImage"
                        (change)="onFileSelected($event)"
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label">Tags</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Add tags (comma separated)"
                        (keyup.enter)="addTag($event)"
                      />
                      <div class="tags-container mt-2">
                        <span
                          class="badge bg-primary me-2 mb-2"
                          *ngFor="let tag of tags"
                        >
                          {{ tag }}
                          <i
                            class="fas fa-times ms-1"
                            style="cursor: pointer"
                            (click)="removeTag(tag)"
                          ></i>
                        </span>
                      </div>
                    </div>

                    <div class="d-grid gap-2">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        [disabled]="postForm.invalid"
                      >
                        {{ isEditMode ? 'Update Post' : 'Create Post' }}
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        (click)="saveAsDraft()"
                      >
                        Save as Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .post-form-container {
        padding: 1rem;
      }

      .tags-container {
        min-height: 38px;
      }

      .badge {
        font-size: 0.875rem;
        padding: 0.5em 0.75em;
      }

      .badge i {
        font-size: 0.75rem;
      }
    `,
  ],
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  isEditMode = false;
  tags: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
      status: ['draft', [Validators.required]],
    });
  }

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.isEditMode = true;
      // Simulated API call to get post data
      this.postForm.patchValue({
        title: 'Getting Started with Angular',
        content: 'This is a sample post content...',
        category: 'technology',
        status: 'published',
      });
      this.tags = ['angular', 'web development', 'javascript'];
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.postForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Handle file upload
      console.log('Selected file:', file);
    }
  }

  addTag(event: Event) {
    const input = event.target as HTMLInputElement;
    const tag = input.value.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      input.value = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  onSubmit() {
    if (this.postForm.valid) {
      const formData = {
        ...this.postForm.value,
        tags: this.tags,
      };
      console.log('Form submitted:', formData);
      // Implement save logic here
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  saveAsDraft() {
    this.postForm.patchValue({ status: 'draft' });
    this.onSubmit();
  }
}
