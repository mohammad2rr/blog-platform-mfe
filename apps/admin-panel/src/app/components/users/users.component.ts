import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'editor' | 'author' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdAt: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="users-container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0">Manage Users</h4>
        <button class="btn btn-primary" (click)="openAddModal()">
          <i class="fas fa-plus"></i> Add User
        </button>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-4">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search users..."
                  [(ngModel)]="searchQuery"
                  (input)="filterUsers()"
                />
                <button class="btn btn-outline-secondary" type="button">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
            <div class="col-md-3">
              <select
                class="form-select"
                [(ngModel)]="selectedRole"
                (change)="filterUsers()"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="author">Author</option>
                <option value="user">User</option>
              </select>
            </div>
            <div class="col-md-3">
              <select
                class="form-select"
                [(ngModel)]="selectedStatus"
                (change)="filterUsers()"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of filteredUsers">
                  <td>{{ user.firstName }} {{ user.lastName }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span
                      class="badge"
                      [ngClass]="{
                        'bg-danger': user.role === 'admin',
                        'bg-warning': user.role === 'editor',
                        'bg-info': user.role === 'author',
                        'bg-secondary': user.role === 'user',
                      }"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td>
                    <span
                      class="badge"
                      [ngClass]="{
                        'bg-success': user.status === 'active',
                        'bg-secondary': user.status === 'inactive',
                        'bg-danger': user.status === 'suspended',
                      }"
                    >
                      {{ user.status }}
                    </span>
                  </td>
                  <td>{{ user.lastLogin }}</td>
                  <td>{{ user.createdAt }}</td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-sm btn-outline-primary"
                        (click)="openEditModal(user)"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        (click)="deleteUser(user.id)"
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

    <!-- User Modal -->
    <div
      class="modal fade"
      id="userModal"
      tabindex="-1"
      aria-labelledby="userModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">
              {{ isEditMode ? 'Edit User' : 'Add User' }}
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
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    [(ngModel)]="userForm.firstName"
                    name="firstName"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    [(ngModel)]="userForm.lastName"
                    name="lastName"
                    required
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  [(ngModel)]="userForm.email"
                  name="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select
                  class="form-select"
                  id="role"
                  [(ngModel)]="userForm.role"
                  name="role"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="author">Author</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select
                  class="form-select"
                  id="status"
                  [(ngModel)]="userForm.status"
                  name="status"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div class="mb-3" *ngIf="!isEditMode">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  [(ngModel)]="userForm.password"
                  name="password"
                  required
                />
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
      .users-container {
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
    `,
  ],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  selectedRole: string = '';
  selectedStatus: string = '';
  isEditMode = false;
  userForm = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: 'user' as User['role'],
    status: 'active' as User['status'],
    password: '',
  };

  ngOnInit() {
    // Simulated API call to get users
    this.users = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-03-15 14:30',
        createdAt: '2024-01-01',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'editor',
        status: 'active',
        lastLogin: '2024-03-15 12:15',
        createdAt: '2024-01-15',
      },
      {
        id: 3,
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@example.com',
        role: 'author',
        status: 'inactive',
        lastLogin: '2024-03-10 09:45',
        createdAt: '2024-02-01',
      },
    ];
    this.filterUsers();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole = !this.selectedRole || user.role === this.selectedRole;
      const matchesStatus =
        !this.selectedStatus || user.status === this.selectedStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.userForm = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      role: 'user',
      status: 'active',
      password: '',
    };
    // Show modal using Bootstrap
    const modal = document.getElementById('userModal');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  openEditModal(user: User) {
    this.isEditMode = true;
    this.userForm = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      status: user.status,
      password: '',
    };
    // Show modal using Bootstrap
    const modal = document.getElementById('userModal');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      // Update existing user
      const index = this.users.findIndex((u) => u.id === this.userForm.id);
      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          ...this.userForm,
        };
      }
    } else {
      // Add new user
      const newUser: User = {
        id: this.users.length + 1,
        firstName: this.userForm.firstName,
        lastName: this.userForm.lastName,
        email: this.userForm.email,
        role: this.userForm.role,
        status: this.userForm.status,
        lastLogin: '-',
        createdAt: new Date().toISOString().split('T')[0],
      };
      this.users.push(newUser);
    }

    this.filterUsers();
    // Hide modal using Bootstrap
    const modal = document.getElementById('userModal');
    if (modal) {
      const bsModal = (window as any).bootstrap.Modal.getInstance(modal);
      bsModal.hide();
    }
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter((u) => u.id !== id);
      this.filterUsers();
    }
  }
}
