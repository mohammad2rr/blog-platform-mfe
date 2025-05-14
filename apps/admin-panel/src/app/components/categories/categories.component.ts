import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  createdAt: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="categories-container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0">Manage Categories</h4>
        <button class="btn btn-primary" (click)="openAddModal()">
          <i class="fas fa-plus"></i> Add Category
        </button>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search categories..."
                  [(ngModel)]="searchQuery"
                  (input)="filterCategories()"
                />
                <button class="btn btn-outline-secondary" type="button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Description</th>
                  <th>Posts</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let category of filteredCategories">
                  <td>{{ category.name }}</td>
                  <td>{{ category.slug }}</td>
                  <td>{{ category.description }}</td>
                  <td>{{ category.postCount }}</td>
                  <td>{{ category.createdAt }}</td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-sm btn-outline-primary"
                        (click)="openEditModal(category)"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        (click)="deleteCategory(category.id)"
                      >
                        <i class="fas fa-trash"></i>
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

    <!-- Category Modal -->
    <div
      class="modal fade"
      id="categoryModal"
      tabindex="-1"
      aria-labelledby="categoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="categoryModalLabel">
              {{ isEditMode ? 'Edit Category' : 'Add Category' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  [(ngModel)]="categoryForm.name"
                  name="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="slug" class="form-label">Slug</label>
                <input
                  type="text"
                  class="form-control"
                  id="slug"
                  [(ngModel)]="categoryForm.slug"
                  name="slug"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                  class="form-control"
                  id="description"
                  [(ngModel)]="categoryForm.description"
                  name="description"
                  rows="3"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-primary" (click)="onSubmit()">
              {{ isEditMode ? 'Update' : 'Create' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .categories-container {
        padding: 1rem;
      }

      .table th {
        font-weight: 600;
        background-color: #f8f9fa;
      }

      .btn-group .btn {
        padding: 0.25rem 0.5rem;
      }
    `,
  ],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchQuery: string = '';
  isEditMode = false;
  categoryForm = {
    id: 0,
    name: '',
    slug: '',
    description: '',
  };

  ngOnInit() {
    // Simulated API call to get categories
    this.categories = [
      {
        id: 1,
        name: 'Technology',
        slug: 'technology',
        description: 'Articles about technology and programming',
        postCount: 45,
        createdAt: '2024-03-15',
      },
      {
        id: 2,
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Lifestyle and wellness articles',
        postCount: 28,
        createdAt: '2024-03-14',
      },
      {
        id: 3,
        name: 'Business',
        slug: 'business',
        description: 'Business and entrepreneurship content',
        postCount: 32,
        createdAt: '2024-03-13',
      },
    ];
    this.filterCategories();
  }

  filterCategories() {
    this.filteredCategories = this.categories.filter((category) =>
      category.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  openAddModal() {
    this.isEditMode = false;
    this.categoryForm = {
      id: 0,
      name: '',
      slug: '',
      description: '',
    };
    // Show modal using Bootstrap
    const modal = document.getElementById('categoryModal');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  openEditModal(category: Category) {
    this.isEditMode = true;
    this.categoryForm = { ...category };
    // Show modal using Bootstrap
    const modal = document.getElementById('categoryModal');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      // Update existing category
      const index = this.categories.findIndex(
        (c) => c.id === this.categoryForm.id,
      );
      if (index !== -1) {
        this.categories[index] = {
          ...this.categories[index],
          ...this.categoryForm,
        };
      }
    } else {
      // Add new category
      const newCategory: Category = {
        id: this.categories.length + 1,
        name: this.categoryForm.name,
        slug: this.categoryForm.slug,
        description: this.categoryForm.description,
        postCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      this.categories.push(newCategory);
    }

    this.filterCategories();
    // Hide modal using Bootstrap
    const modal = document.getElementById('categoryModal');
    if (modal) {
      const bsModal = (window as any).bootstrap.Modal.getInstance(modal);
      bsModal.hide();
    }
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categories = this.categories.filter((c) => c.id !== id);
      this.filterCategories();
    }
  }
}
