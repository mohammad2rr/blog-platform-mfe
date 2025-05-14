import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header [menuItems]="menuItems"></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .main-content {
        flex: 1;
        padding: 2rem 0;
      }
    `,
  ],
})
export class AppComponent {
  menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];
}
