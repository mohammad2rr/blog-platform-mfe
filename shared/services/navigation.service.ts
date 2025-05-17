import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

export interface Breadcrumb {
  label: string;
  path: string;
  icon?: string;
}

export interface NavigationHistory {
  path: string;
  timestamp: number;
  title?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private currentRouteSubject = new BehaviorSubject<string>('');
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  private navigationHistorySubject = new BehaviorSubject<NavigationHistory[]>(
    [],
  );
  private readonly MAX_HISTORY = 10;

  currentRoute$ = this.currentRouteSubject.asObservable();
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();
  navigationHistory$ = this.navigationHistorySubject.asObservable();

  constructor(private router: Router) {
    this.setupRouteTracking();
  }

  private setupRouteTracking(): void {
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRouteSubject.next(event.urlAfterRedirects);
        this.updateBreadcrumbs(event.urlAfterRedirects);
        this.addToHistory(event.urlAfterRedirects);
      });
  }

  private updateBreadcrumbs(url: string): void {
    const segments = url.split('/').filter((segment) => segment);
    const breadcrumbs: Breadcrumb[] = [];
    let currentPath = '';

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        label: this.formatBreadcrumbLabel(segment),
        path: currentPath,
        icon: this.getBreadcrumbIcon(segment),
      });
    });

    this.breadcrumbsSubject.next(breadcrumbs);
  }

  private formatBreadcrumbLabel(segment: string): string {
    return segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private getBreadcrumbIcon(segment: string): string {
    const iconMap: { [key: string]: string } = {
      admin: 'pi pi-shield',
      user: 'pi pi-user',
      public: 'pi pi-globe',
      dashboard: 'pi pi-home',
      posts: 'pi pi-file',
      profile: 'pi pi-user',
      settings: 'pi pi-cog',
    };
    return iconMap[segment] || 'pi pi-angle-right';
  }

  private addToHistory(path: string): void {
    const history = this.navigationHistorySubject.value;
    const newEntry: NavigationHistory = {
      path,
      timestamp: Date.now(),
      title: document.title,
    };

    // Remove duplicate entries
    const filteredHistory = history.filter((entry) => entry.path !== path);

    // Add new entry at the beginning
    const updatedHistory = [newEntry, ...filteredHistory].slice(
      0,
      this.MAX_HISTORY,
    );
    this.navigationHistorySubject.next(updatedHistory);
  }

  navigateTo(
    path: string,
    options?: { queryParams?: any; fragment?: string },
  ): void {
    this.router.navigate([path], options);
  }

  navigateToAdmin(
    path: string,
    options?: { queryParams?: any; fragment?: string },
  ): void {
    this.router.navigate(['/admin', path], options);
  }

  navigateToUser(
    path: string,
    options?: { queryParams?: any; fragment?: string },
  ): void {
    this.router.navigate(['/user', path], options);
  }

  navigateToPublic(
    path: string,
    options?: { queryParams?: any; fragment?: string },
  ): void {
    this.router.navigate(['/public', path], options);
  }

  navigateBack(): void {
    const history = this.navigationHistorySubject.value;
    if (history.length > 1) {
      const previousPath = history[1].path;
      this.router.navigate([previousPath]);
    } else {
      this.router.navigate(['/']);
    }
  }

  clearHistory(): void {
    this.navigationHistorySubject.next([]);
  }

  getCurrentBreadcrumbs(): Breadcrumb[] {
    return this.breadcrumbsSubject.value;
  }

  getNavigationHistory(): NavigationHistory[] {
    return this.navigationHistorySubject.value;
  }

  isCurrentRoute(path: string): boolean {
    return this.currentRouteSubject.value === path;
  }

  isAdminRoute(): boolean {
    return this.currentRouteSubject.value.startsWith('/admin');
  }

  isUserRoute(): boolean {
    return this.currentRouteSubject.value.startsWith('/user');
  }

  isPublicRoute(): boolean {
    return this.currentRouteSubject.value.startsWith('/public');
  }
}
