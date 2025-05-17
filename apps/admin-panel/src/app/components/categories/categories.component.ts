import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    TagModule,
    BadgeModule,
  ],
  providers: [MessageService],
  template: `
    <div class="categories-container">
      <div class="categories-header">
        <h2>Categories Management</h2>
        <button
          pButton
          label="New Category"
          icon="pi pi-plus"
          (click)="openNew()"
        ></button>
      </div>

      <p-toast></p-toast>

      <p-table
        [value]="categories"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories"
        [rowsPerPageOptions]="[10, 25, 50]"
      >
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Posts</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-category>
          <tr>
            <td>{{ category.name }}</td>
            <td>{{ category.slug }}</td>
            <td>{{ category.description }}</td>
            <td>
              <p-badge [value]="category.postCount" severity="info"></p-badge>
            </td>
            <td>
              <p-tag
                [value]="category.status"
                [severity]="
                  category.status === 'Active' ? 'success' : 'warning'
                "
              ></p-tag>
            </td>
            <td>{{ category.createdAt }}</td>
            <td>
              <button
                pButton
                icon="pi pi-pencil"
                class="p-button-rounded p-button-text"
                (click)="editCategory(category)"
              ></button>
              <button
                pButton
                icon="pi pi-trash"
                class="p-button-rounded p-button-text p-button-danger"
                (click)="deleteCategory(category)"
              ></button>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog
        [(visible)]="categoryDialog"
        [style]="{ width: '450px' }"
        header="Category Details"
        [modal]="true"
        styleClass="p-fluid"
      >
        <ng-template pTemplate="content">
          <div class="field">
            <label for="name">Name</label>
            <input
              type="text"
              pInputText
              id="name"
              [(ngModel)]="category.name"
              required
              autofocus
            />
          </div>
          <div class="field">
            <label for="slug">Slug</label>
            <input
              type="text"
              pInputText
              id="slug"
              [(ngModel)]="category.slug"
              required
            />
          </div>
          <div class="field">
            <label for="description">Description</label>
            <textarea
              pInputTextarea
              id="description"
              [(ngModel)]="category.description"
              rows="3"
            ></textarea>
          </div>
          <div class="field">
            <label for="status">Status</label>
            <p-tag
              [value]="category.status"
              [severity]="category.status === 'Active' ? 'success' : 'warning'"
            ></p-tag>
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
            (click)="saveCategory()"
          ></button>
        </ng-template>
      </p-dialog>

      <p-dialog
        header="Confirm"
        [(visible)]="deleteCategoryDialog"
        [style]="{ width: '450px' }"
        [modal]="true"
      >
        <div class="confirmation-content">
          <i
            class="pi pi-exclamation-triangle p-mr-3"
            style="font-size: 2rem"
          ></i>
          <span>Are you sure you want to delete this category?</span>
          <p class="text-danger mt-2" *ngIf="category.postCount > 0">
            Warning: This category has {{ category.postCount }} posts associated
            with it.
          </p>
        </div>
        <ng-template pTemplate="footer">
          <button
            pButton
            icon="pi pi-times"
            label="No"
            class="p-button-text"
            (click)="deleteCategoryDialog = false"
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
      .categories-container {
        padding: 1rem;
      }

      .categories-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
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
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-align: center;
      }

      .text-danger {
        color: var(--danger-color);
      }

      :host ::ng-deep .p-badge {
        min-width: 2rem;
      }
    `,
  ],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  category: Category = {
    id: 0,
    name: '',
    slug: '',
    description: '',
    postCount: 0,
    status: 'Active',
    createdAt: '',
  };
  categoryDialog = false;
  deleteCategoryDialog = false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    // TODO: Replace with actual API call
    this.categories = [
      {
        id: 1,
        name: 'Technology',
        slug: 'technology',
        description:
          'Articles about programming, software development, and tech news',
        postCount: 15,
        status: 'Active',
        createdAt: '2024-01-01',
      },
      {
        id: 2,
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Tips and stories about daily life, health, and wellness',
        postCount: 8,
        status: 'Active',
        createdAt: '2024-01-02',
      },
      {
        id: 3,
        name: 'Travel',
        slug: 'travel',
        description: 'Travel guides, destination reviews, and travel tips',
        postCount: 0,
        status: 'Inactive',
        createdAt: '2024-01-03',
      },
    ];
  }

  openNew() {
    this.category = {
      id: 0,
      name: '',
      slug: '',
      description: '',
      postCount: 0,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.categoryDialog = true;
  }

  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: Category) {
    this.category = { ...category };
    this.deleteCategoryDialog = true;
  }

  hideDialog() {
    this.categoryDialog = false;
  }

  saveCategory() {
    if (this.category.id === 0) {
      // Add new category
      this.category.id = this.categories.length + 1;
      this.categories.push({ ...this.category });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category created successfully',
      });
    } else {
      // Update existing category
      const index = this.categories.findIndex((c) => c.id === this.category.id);
      this.categories[index] = { ...this.category };
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category updated successfully',
      });
    }

    this.categories = [...this.categories];
    this.categoryDialog = false;
  }

  confirmDelete() {
    this.categories = this.categories.filter((c) => c.id !== this.category.id);
    this.deleteCategoryDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Category deleted successfully',
    });
  }
}
