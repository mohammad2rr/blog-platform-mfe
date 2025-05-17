import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [NavigationService],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: var(--surface-ground);
      }

      .main-content {
        flex: 1;
        padding: 2rem 0;
        background-color: var(--surface-ground);
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      @media (max-width: 768px) {
        .main-content {
          padding: 1rem 0;
        }
      }
    `,
  ],
})
export class AppComponent {}
