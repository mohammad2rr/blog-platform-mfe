import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, AppComponent],
  exports: [AppComponent],
})
export class UserModule {}
