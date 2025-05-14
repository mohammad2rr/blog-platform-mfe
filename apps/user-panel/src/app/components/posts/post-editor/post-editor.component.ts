import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

@Component({
  selector: 'app-post-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputTextarea,
    ButtonModule,
    DropdownModule,
    ToastModule,
    EditorModule,
    InputSwitchModule,
    TagModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <div class="post-editor-container">
      <p-toast></p-toast>
      <p-confirmDialog></p-confirmDialog>

      <form [formGroup]="postForm" (ngSubmit)="savePost()">
        <div class="editor-header">
          <h2>{{ isEditMode ? 'Edit Post' : 'Create New Post' }}</h2>
          <div class="header-actions">
            <button
              pButton
              type="button"
              label="Preview"
              icon="pi pi-eye"
              class="p-button-text"
              (click)="previewPost()"
            ></button>
            <button
              pButton
              type="button"
              label="Save Draft"
              icon="pi pi-save"
              class="p-button-secondary"
              (click)="saveDraft()"
            ></button>
            <button
              pButton
              type="submit"
              label="Publish"
              icon="pi pi-check"
              class="p-button-primary"
              [disabled]="!postForm.valid"
            ></button>
          </div>
        </div>

        <div class="editor-content">
          <div class="main-content">
            <div class="form-field">
              <label for="title">Title</label>
              <input
                type="text"
                pInputText
                id="title"
                formControlName="title"
                placeholder="Enter post title"
              />
            </div>

            <div class="form-field">
              <label for="content">Content</label>
              <p-editor
                id="content"
                formControlName="content"
                [style]="{ height: '400px' }"
              ></p-editor>
            </div>
          </div>

          <div class="sidebar">
            <p-card header="Post Settings">
              <div class="form-field">
                <label for="category">Category</label>
                <p-dropdown
                  id="category"
                  [options]="categories"
                  formControlName="category"
                  optionLabel="name"
                  placeholder="Select a category"
                ></p-dropdown>
              </div>

              <div class="form-field">
                <label for="tags">Tags</label>
                <p-dropdown
                  id="tags"
                  [options]="availableTags"
                  formControlName="tags"
                  optionLabel="name"
                  [multiple]="true"
                  placeholder="Select tags"
                ></p-dropdown>
              </div>

              <div class="form-field">
                <label for="excerpt">Excerpt</label>
                <textarea
                  pInputTextarea
                  id="excerpt"
                  formControlName="excerpt"
                  [rows]="3"
                  placeholder="Enter a brief excerpt"
                ></textarea>
              </div>

              <div class="form-field-checkbox">
                <p-inputSwitch
                  id="featured"
                  formControlName="featured"
                ></p-inputSwitch>
                <label for="featured">Feature this post</label>
              </div>

              <div class="form-field-checkbox">
                <p-inputSwitch
                  id="allowComments"
                  formControlName="allowComments"
                ></p-inputSwitch>
                <label for="allowComments">Allow comments</label>
              </div>
            </p-card>

            <p-card header="SEO Settings" class="mt-3">
              <div class="form-field">
                <label for="metaTitle">Meta Title</label>
                <input
                  type="text"
                  pInputText
                  id="metaTitle"
                  formControlName="metaTitle"
                  placeholder="Enter meta title"
                />
              </div>

              <div class="form-field">
                <label for="metaDescription">Meta Description</label>
                <textarea
                  pInputTextarea
                  id="metaDescription"
                  formControlName="metaDescription"
                  [rows]="3"
                  placeholder="Enter meta description"
                ></textarea>
              </div>
            </p-card>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .post-editor-container {
        padding: 1rem;
      }

      .editor-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .header-actions {
        display: flex;
        gap: 0.5rem;
      }

      .editor-content {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 1.5rem;
      }

      .main-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .sidebar {
        .p-card {
          margin-bottom: 1rem;
        }
      }

      .form-field {
        margin-bottom: 1rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
      }

      .form-field-checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;

        label {
          margin: 0;
        }
      }

      :host ::ng-deep {
        .p-editor-container {
          border: 1px solid var(--surface-border);
          border-radius: 6px;
        }
      }
    `,
  ],
})
export class PostEditorComponent implements OnInit {
  postForm: FormGroup;
  isEditMode = false;
  postId: number | null = null;

  categories: Category[] = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Programming' },
    { id: 3, name: 'Web Development' },
    { id: 4, name: 'Angular' },
  ];

  availableTags: Tag[] = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'Web Development' },
    { id: 5, name: 'Frontend' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', Validators.required],
      category: [null, Validators.required],
      tags: [[]],
      excerpt: [''],
      featured: [false],
      allowComments: [true],
      metaTitle: [''],
      metaDescription: [''],
    });
  }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    if (this.postId) {
      this.isEditMode = true;
      this.loadPost(this.postId);
    }
  }

  loadPost(id: number) {
    // TODO: Replace with actual API call
    const mockPost = {
      title: 'Getting Started with Angular',
      content: '<h2>Introduction</h2><p>This is a sample post content...</p>',
      category: this.categories[0],
      tags: [this.availableTags[0], this.availableTags[1]],
      excerpt: 'Learn the basics of Angular development',
      featured: true,
      allowComments: true,
      metaTitle: 'Getting Started with Angular - A Complete Guide',
      metaDescription:
        'Learn how to build modern web applications with Angular',
    };

    this.postForm.patchValue(mockPost);
  }

  savePost() {
    if (this.postForm.valid) {
      // TODO: Replace with actual API call
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Post published successfully',
      });
      this.router.navigate(['/posts']);
    }
  }

  saveDraft() {
    if (this.postForm.valid) {
      // TODO: Replace with actual API call
      this.messageService.add({
        severity: 'info',
        summary: 'Draft Saved',
        detail: 'Post saved as draft',
      });
    }
  }

  previewPost() {
    // TODO: Implement preview functionality
    this.messageService.add({
      severity: 'info',
      summary: 'Preview',
      detail: 'Preview functionality coming soon',
    });
  }
}
