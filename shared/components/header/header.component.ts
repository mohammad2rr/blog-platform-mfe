import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" (click)="navigateTo('/')">Blog Platform</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" (click)="navigateToPublic('/')">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" (click)="navigateToPublic('/blog')">Blog</a>
            </li>
            <li class="nav-item" *ngIf="isLoggedIn">
              <a class="nav-link" (click)="navigateToUser('/profile')"
                >Profile</a
              >
            </li>
            <li class="nav-item" *ngIf="isAdmin">
              <a class="nav-link" (click)="navigateToAdmin('/dashboard')"
                >Admin</a
              >
            </li>
          </ul>
          <div class="d-flex">
            <button
              class="btn btn-outline-light me-2"
              *ngIf="!isLoggedIn"
              (click)="navigateTo('/login')"
            >
              Login
            </button>
            <button
              class="btn btn-outline-light"
              *ngIf="!isLoggedIn"
              (click)="navigateTo('/register')"
            >
              Register
            </button>
            <button
              class="btn btn-outline-light"
              *ngIf="isLoggedIn"
              (click)="logout()"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar-brand,
      .nav-link {
        cursor: pointer;
      }
      .nav-link:hover {
        color: #fff !important;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    // TODO: Implement auth service and check login status
  }

  navigateTo(path: string): void {
    this.navigationService.navigateTo(path);
  }

  navigateToAdmin(path: string): void {
    this.navigationService.navigateToAdmin(path);
  }

  navigateToUser(path: string): void {
    this.navigationService.navigateToUser(path);
  }

  navigateToPublic(path: string): void {
    this.navigationService.navigateToPublic(path);
  }

  logout(): void {
    // TODO: Implement logout functionality
  }
}
