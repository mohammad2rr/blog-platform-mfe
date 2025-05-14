import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private currentRouteSubject = new BehaviorSubject<string>('');
  currentRoute$ = this.currentRouteSubject.asObservable();

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.currentRouteSubject.next(path);
  }

  navigateToAdmin(path: string): void {
    this.router.navigate(['/admin', path]);
  }

  navigateToUser(path: string): void {
    this.router.navigate(['/user', path]);
  }

  navigateToPublic(path: string): void {
    this.router.navigate(['/public', path]);
  }
}
