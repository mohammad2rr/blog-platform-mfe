import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@Component({
  selector: 'admin-panel-wrapper',
  standalone: true,
  imports: [CommonModule, RouterModule, AppComponent],
  template: '<app-admin-panel></app-admin-panel>',
})
export class AdminModule {}
