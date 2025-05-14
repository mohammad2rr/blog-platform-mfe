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
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  status: string;
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
    <div class="users-container">
      <div class="users-header">
        <h2>Users Management</h2>
        <button
          pButton
          label="New User"
          icon="pi pi-plus"
          (click)="openNew()"
        ></button>
      </div>

      <p-toast></p-toast>

      <p-table
        [value]="users"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
        [rowsPerPageOptions]="[10, 25, 50]"
      >
        <ng-template pTemplate="header">
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-user>
          <tr>
            <td>{{ user.username }}</td>
            <td>{{ user.fullName }}</td>
            <td>{{ user.email }}</td>
            <td>
              <p-tag
                *ngFor="let role of user.roles"
                [value]="role"
                [severity]="getRoleSeverity(role)"
              ></p-tag>
            </td>
            <td>
              <span
                [class]="'status-badge status-' + user.status.toLowerCase()"
              >
                {{ user.status }}
              </span>
            </td>
            <td>{{ user.lastLogin }}</td>
            <td>
              <button
                pButton
                icon="pi pi-pencil"
                class="p-button-rounded p-button-text"
                (click)="editUser(user)"
              ></button>
              <button
                pButton
                icon="pi pi-trash"
                class="p-button-rounded p-button-text p-button-danger"
                (click)="deleteUser(user)"
              ></button>
            </td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog
        [(visible)]="userDialog"
        [style]="{ width: '450px' }"
        header="User Details"
        [modal]="true"
        styleClass="p-fluid"
      >
        <ng-template pTemplate="content">
          <div class="field">
            <label for="username">Username</label>
            <input
              type="text"
              pInputText
              id="username"
              [(ngModel)]="user.username"
              required
              autofocus
            />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input
              type="email"
              pInputText
              id="email"
              [(ngModel)]="user.email"
              required
            />
          </div>
          <div class="field">
            <label for="fullName">Full Name</label>
            <input
              type="text"
              pInputText
              id="fullName"
              [(ngModel)]="user.fullName"
              required
            />
          </div>
          <div class="field">
            <label for="roles">Roles</label>
            <p-multiSelect
              id="roles"
              [options]="availableRoles"
              [(ngModel)]="user.roles"
              [filter]="false"
              placeholder="Select Roles"
              [showToggleAll]="true"
            ></p-multiSelect>
          </div>
          <div class="field">
            <label for="status">Status</label>
            <p-dropdown
              id="status"
              [options]="statuses"
              [(ngModel)]="user.status"
              placeholder="Select Status"
            ></p-dropdown>
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
            (click)="saveUser()"
          ></button>
        </ng-template>
      </p-dialog>

      <p-dialog
        header="Confirm"
        [(visible)]="deleteUserDialog"
        [style]="{ width: '450px' }"
        [modal]="true"
      >
        <div class="confirmation-content">
          <i
            class="pi pi-exclamation-triangle p-mr-3"
            style="font-size: 2rem"
          ></i>
          <span>Are you sure you want to delete this user?</span>
        </div>
        <ng-template pTemplate="footer">
          <button
            pButton
            icon="pi pi-times"
            label="No"
            class="p-button-text"
            (click)="deleteUserDialog = false"
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
      .users-container {
        padding: 1rem;
      }

      .users-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .status-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .status-active {
        background-color: var(--success-color);
        color: white;
      }

      .status-inactive {
        background-color: var(--warning-color);
        color: white;
      }

      .status-suspended {
        background-color: var(--danger-color);
        color: white;
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
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }

      :host ::ng-deep .p-tag {
        margin-right: 0.5rem;
      }
    `,
  ],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  user: User = {
    id: 0,
    username: '',
    email: '',
    fullName: '',
    roles: [],
    status: 'Active',
    lastLogin: '',
  };
  userDialog = false;
  deleteUserDialog = false;
  availableRoles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Editor', value: 'Editor' },
    { label: 'Author', value: 'Author' },
    { label: 'User', value: 'User' },
  ];
  statuses = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
    { label: 'Suspended', value: 'Suspended' },
  ];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    // TODO: Replace with actual API call
    this.users = [
      {
        id: 1,
        username: 'johndoe',
        email: 'john.doe@example.com',
        fullName: 'John Doe',
        roles: ['Admin'],
        status: 'Active',
        lastLogin: '2024-01-15 14:30',
      },
      {
        id: 2,
        username: 'janesmith',
        email: 'jane.smith@example.com',
        fullName: 'Jane Smith',
        roles: ['Editor', 'Author'],
        status: 'Active',
        lastLogin: '2024-01-14 09:15',
      },
    ];
  }

  getRoleSeverity(role: string): string {
    switch (role) {
      case 'Admin':
        return 'danger';
      case 'Editor':
        return 'warning';
      case 'Author':
        return 'info';
      default:
        return 'success';
    }
  }

  openNew() {
    this.user = {
      id: 0,
      username: '',
      email: '',
      fullName: '',
      roles: [],
      status: 'Active',
      lastLogin: new Date().toISOString(),
    };
    this.userDialog = true;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.user = { ...user };
    this.deleteUserDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
  }

  saveUser() {
    if (this.user.id === 0) {
      // Add new user
      this.user.id = this.users.length + 1;
      this.users.push({ ...this.user });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User created successfully',
      });
    } else {
      // Update existing user
      const index = this.users.findIndex((u) => u.id === this.user.id);
      this.users[index] = { ...this.user };
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User updated successfully',
      });
    }

    this.users = [...this.users];
    this.userDialog = false;
  }

  confirmDelete() {
    this.users = this.users.filter((u) => u.id !== this.user.id);
    this.deleteUserDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User deleted successfully',
    });
  }
}
