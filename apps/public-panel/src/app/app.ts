import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@Component({
  selector: 'public-panel-wrapper',
  standalone: true,
  imports: [CommonModule, RouterModule, AppComponent],
  template: '<app-public-panel></app-public-panel>',
})
export class PublicModule {}
