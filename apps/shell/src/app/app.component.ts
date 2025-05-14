import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="d-flex flex-column min-vh-100">
      <HeaderComponent></HeaderComponent>
      <main class="flex-grow-1">
        <router-outlet></router-outlet>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  `,
  styles: [
    `
      main {
        padding: 2rem 0;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Blog Platform';
}
