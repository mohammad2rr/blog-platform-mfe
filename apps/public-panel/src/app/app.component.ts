import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="public-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .public-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Public Panel';
}
