import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryPersistenceService } from 'src/app/shared/services/category-persistence/category-persistence.service';
import { Router } from '@angular/router';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, Subscription } from 'rxjs';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';
import { TableHeader } from 'src/app/shared/interfaces/table-header.interface';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { SortBy } from 'src/app/shared/enums/sort-by.enum';
import { SortDirection } from 'src/app/shared/enums/sort-direction.enum';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { TableToolBarService } from 'src/app/shared/services/table-tool-bar/table-tool-bar.service';
import { SortMapper } from 'src/app/shared/mappers/sort.mapper';
@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories-page.component.html',
  styleUrls: ['./list-categories-page.component.scss'],
})
export class ListCategoriesPageComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  categories: Category[] = [];

  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;

  headers: TableHeader[] = [
    { displayName: 'Nombre', key: 'name' },
    { displayName: 'Descripción', key: 'description' },
  ];

  showByOptions = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' }
  ];

  sortByOptions = [
    { value: 'name:asc', label: 'nombre ASC' },
    { value: 'name:desc', label: 'nombre DESC' }
  ];

  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 5;

  sortBy: string = SortBy.NAME;
  sortDirection: SortDirection = SortDirection.ASC;

  buttonLabelAddCategory: string = 'Agregar';
  tableTittleLabel: string = 'Listado de Categorías';

  buttonTypePrimary = ButtonType.PRIMARY;
  buttonTypeSecundary = ButtonType.SECUNDARY;

  constructor(
    private categoryService: CategoryPersistenceService,
    private router: Router,
    private loader: LoaderService,
    private toastService: ToastService,
    private tableToolBarService: TableToolBarService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadCategories();

    const showBySubscription = this.tableToolBarService.showBy$.subscribe(
      (value) => {
        this.pageSize = Number(value);
        this.loadCategories();
      }
    );

    const sortBySubscription = this.tableToolBarService.sortBy$.subscribe(
      (value) => {
        const [sortByField, sortDirection] = value.split(':');
        this.sortBy = SortMapper.mapSortBy(sortByField);
        this.sortDirection = SortMapper.mapSortDirection(sortDirection);
        this.loadCategories();
      }
    );

    this.subscription.add(showBySubscription);
    this.subscription.add(sortBySubscription);
  }

  loadCategories(): void {
    this.loader.show();

    const pageRequest: PaginationRequest = {
      pageNumber: this.currentPage - 1,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    };

    const getCategoriesSubscription = this.categoryService
      .getCategories(pageRequest)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (response) => {
          this.categories = response.data.content;
          this.totalPages = response.data.totalPages;
        },
        error: (error) => {
          if (error && error.error) {
            this.toastMessage = error.message;
          } else {
            this.toastMessage = ErrorMessages.GENERIC_ERROR_MESSAGE;
          }
          this.toastType = StatesTypes.ERROR;
          this.toastService.triggerToast(
            this.toastMessage,
            this.toastType,
            this.toastDuration
          );
        },
      });
    this.subscription.add(getCategoriesSubscription);
  }

  navigateToCreateCategory(): void {
    this.router.navigate(['/crear-categoria']);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadCategories();
  }
}
