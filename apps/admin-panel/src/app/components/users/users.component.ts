import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'author' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    TagModule,
    MultiSelectModule,
  ],
  providers: [MessageService],
  template: `
    <div class="users">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Users</h2>
        <button class="btn btn-primary" (click)="openNewUserModal()">
          <i class="fas fa-user-plus me-2"></i>New User
        </button>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of users">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>
                    <span
                      class="badge"
                      [ngClass]="{
                        'bg-danger': user.role === 'admin',
                        'bg-primary': user.role === 'author',
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
                        'bg-warning': user.status === 'inactive',
                      }"
                    >
                      {{ user.status }}
                    </span>
                  </td>
                  <td>{{ user.lastLogin }}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-outline-primary me-2"
                      (click)="editUser(user)"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      (click)="deleteUser(user)"
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
      .users {
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
export class UsersComponent implements OnInit {
  users: User[] = [];

  ngOnInit() {
    // TODO: Fetch users from API
    this.users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-03-15 14:30',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'author',
        status: 'active',
        lastLogin: '2024-03-14 09:15',
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'user',
        status: 'inactive',
        lastLogin: '2024-03-10 16:45',
      },
    ];
  }

  openNewUserModal() {
    // TODO: Implement new user modal
    console.log('Open new user modal');
  }

  editUser(user: User) {
    // TODO: Implement edit user functionality
    console.log('Edit user:', user);
  }

  deleteUser(user: User) {
    // TODO: Implement delete user functionality
    console.log('Delete user:', user);
  }
}
