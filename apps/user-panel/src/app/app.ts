import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@Component({
  selector: 'user-panel-wrapper',
  standalone: true,
  imports: [CommonModule, RouterModule, AppComponent],
  template: '<app-user-panel></app-user-panel>',
})
export class UserModule {}
