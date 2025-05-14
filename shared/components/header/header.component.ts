import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" [routerLink]="['/']">Blog Platform</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item" *ngFor="let item of menuItems">
              <a
                class="nav-link"
                [routerLink]="item.path"
                routerLinkActive="active"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
          <div class="d-flex">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        padding: 1rem 0;
      }
      .navbar-brand {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .nav-link {
        font-size: 1.1rem;
        margin: 0 0.5rem;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  @Input() menuItems: { label: string; path: string }[] = [];
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
