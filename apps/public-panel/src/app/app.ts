import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), AppComponent],
  exports: [AppComponent],
})
export class PublicModule {}
