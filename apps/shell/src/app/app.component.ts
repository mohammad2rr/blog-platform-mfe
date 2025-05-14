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
      <main class="content">
        <app-header></app-header>
        <router-outlet></router-outlet>
        <app-footer></app-footer>
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .content {
        flex: 1;
        padding: 2rem 0;
      }
    `,
  ],
})
export class AppComponent {}
