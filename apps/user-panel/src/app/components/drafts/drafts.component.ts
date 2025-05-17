import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

interface Draft {
  id: number;
  title: string;
  category: string;
  lastEdited: string;
  wordCount: number;
  hasContent: boolean;
  hasExcerpt: boolean;
  hasTags: boolean;
  hasCategory: boolean;
}

@Component({
  selector: 'app-drafts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    MenuModule,
    TooltipModule,
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <div class="drafts-container">
      <div class="drafts-header">
        <h2>Draft Posts</h2>
        <div class="header-actions">
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <input
              type="text"
              pInputText
              [(ngModel)]="searchQuery"
              (input)="filterDrafts()"
              placeholder="Search drafts..."
            />
          </span>
          <p-dropdown
            [options]="completionFilters"
            [(ngModel)]="selectedCompletion"
            placeholder="Filter by completion"
            (onChange)="filterDrafts()"
          ></p-dropdown>
          <button
            pButton
            label="New Draft"
            icon="pi pi-plus"
            class="p-button-primary"
            routerLink="/posts/new"
          ></button>
        </div>
      </div>

      <p-toast></p-toast>
      <p-confirmDialog></p-confirmDialog>

      <p-table
        [value]="filteredDrafts"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} drafts"
        [rowsPerPageOptions]="[10, 25, 50]"
        [globalFilterFields]="['title', 'category']"
        [sortField]="sortField"
        [sortOrder]="sortOrder"
        (onSort)="onSort($event)"
      >
        <ng-template pTemplate="header">
          <tr>
            <th [pSortableColumn]="'title'">
              Title
              <p-sortIcon [field]="'title'"></p-sortIcon>
            </th>
            <th [pSortableColumn]="'category'">
              Category
              <p-sortIcon [field]="'category'"></p-sortIcon>
            </th>
            <th [pSortableColumn]="'lastEdited'">
              Last Edited
              <p-sortIcon [field]="'lastEdited'"></p-sortIcon>
            </th>
            <th [pSortableColumn]="'wordCount'">
              Word Count
              <p-sortIcon [field]="'wordCount'"></p-sortIcon>
            </th>
            <th>Completion</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-draft>
          <tr>
            <td>
              <a
                [routerLink]="['/posts', draft.id, 'edit']"
                class="draft-title"
              >
                {{ draft.title || 'Untitled Draft' }}
              </a>
            </td>
            <td>{{ draft.category || 'Uncategorized' }}</td>
            <td>{{ draft.lastEdited | date: 'medium' }}</td>
            <td>{{ draft.wordCount }}</td>
            <td>
              <div class="completion-status">
                <p-tag
                  *ngIf="draft.hasContent"
                  value="Content"
                  severity="success"
                  pTooltip="Post has content"
                ></p-tag>
                <p-tag
                  *ngIf="draft.hasExcerpt"
                  value="Excerpt"
                  severity="success"
                  pTooltip="Post has excerpt"
                ></p-tag>
                <p-tag
                  *ngIf="draft.hasTags"
                  value="Tags"
                  severity="success"
                  pTooltip="Post has tags"
                ></p-tag>
                <p-tag
                  *ngIf="draft.hasCategory"
                  value="Category"
                  severity="success"
                  pTooltip="Post has category"
                ></p-tag>
              </div>
            </td>
            <td>
              <div class="action-buttons">
                <button
                  pButton
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text"
                  pTooltip="Edit"
                  [routerLink]="['/posts', draft.id, 'edit']"
                ></button>
                <button
                  pButton
                  icon="pi pi-check"
                  class="p-button-rounded p-button-text p-button-success"
                  pTooltip="Publish"
                  (click)="publishDraft(draft)"
                ></button>
                <button
                  pButton
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger"
                  pTooltip="Delete"
                  (click)="deleteDraft(draft)"
                ></button>
              </div>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="6" class="text-center">
              No draft posts found. Start by creating a new draft!
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [
    `
      .drafts-container {
        padding: 1rem;
      }

      .drafts-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .header-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .draft-title {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }

      .completion-status {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .action-buttons {
        display: flex;
        gap: 0.5rem;
      }

      :host ::ng-deep {
        .p-datatable {
          .p-datatable-thead > tr > th {
            background-color: var(--surface-ground);
          }
        }
      }
    `,
  ],
})
export class DraftsComponent implements OnInit {
  drafts: Draft[] = [];
  filteredDrafts: Draft[] = [];
  searchQuery: string = '';
  selectedCompletion: string = 'all';
  sortField: string = 'lastEdited';
  sortOrder: number = -1;

  completionFilters = [
    { label: 'All Drafts', value: 'all' },
    { label: 'Complete', value: 'complete' },
    { label: 'Incomplete', value: 'incomplete' },
  ];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.loadDrafts();
  }

  loadDrafts() {
    // TODO: Replace with actual API call
    this.drafts = [
      {
        id: 1,
        title: 'Advanced Angular Patterns',
        category: 'Angular',
        lastEdited: '2024-01-15T10:30:00',
        wordCount: 1200,
        hasContent: true,
        hasExcerpt: true,
        hasTags: true,
        hasCategory: true,
      },
      {
        id: 2,
        title: 'State Management in Micro Frontends',
        category: 'Web Development',
        lastEdited: '2024-01-12T14:20:00',
        wordCount: 850,
        hasContent: true,
        hasExcerpt: false,
        hasTags: true,
        hasCategory: true,
      },
      {
        id: 3,
        title: '',
        category: '',
        lastEdited: '2024-01-10T09:15:00',
        wordCount: 0,
        hasContent: false,
        hasExcerpt: false,
        hasTags: false,
        hasCategory: false,
      },
    ];
    this.filterDrafts();
  }

  filterDrafts() {
    this.filteredDrafts = this.drafts.filter((draft) => {
      const matchesSearch =
        (draft.title || '')
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        (draft.category || '')
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      const matchesCompletion =
        this.selectedCompletion === 'all' ||
        (this.selectedCompletion === 'complete' &&
          this.isDraftComplete(draft)) ||
        (this.selectedCompletion === 'incomplete' &&
          !this.isDraftComplete(draft));
      return matchesSearch && matchesCompletion;
    });
  }

  isDraftComplete(draft: Draft): boolean {
    return (
      draft.hasContent && draft.hasExcerpt && draft.hasTags && draft.hasCategory
    );
  }

  onSort(event: any) {
    this.sortField = event.field;
    this.sortOrder = event.order;
  }

  publishDraft(draft: Draft) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to publish this draft?',
      accept: () => {
        // TODO: Implement publish functionality
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Draft published successfully',
        });
        this.router.navigate(['/posts']);
      },
    });
  }

  deleteDraft(draft: Draft) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this draft?',
      accept: () => {
        this.drafts = this.drafts.filter((d) => d.id !== draft.id);
        this.filterDrafts();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Draft deleted successfully',
        });
      },
    });
  }
}
