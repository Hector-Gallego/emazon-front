import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CategoryPersistenceService } from 'src/app/shared/services/category-persistence/category-persistence.service';
import { Router } from '@angular/router';
import { faArrowUpAZ, faArrowDownZA } from '@fortawesome/free-solid-svg-icons';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { Subscription } from 'rxjs';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { TableHeader } from 'src/app/shared/interfaces/table-header.interface';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ScreenSizeService } from 'src/app/shared/services/screen-size/screen-size.service';
import { SortBy } from 'src/app/shared/enums/sort-by.enum';
import { SortDirection } from 'src/app/shared/enums/sort-direction.enum';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories-page.component.html',
  styleUrls: ['./list-categories-page.component.scss'],
})
export class ListCategoriesPageComponent implements OnInit, OnDestroy {
  constructor(
    private categoryService: CategoryPersistenceService,
    private router: Router,
    private loader: LoaderService,
    private toastService: ToastService,
    private screenSizeService: ScreenSizeService
  ) {
    this.screenWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadCategories();
    const screenSubscription = this.screenSizeService.screenWidth$.subscribe(
      (width) => {
        this.screenWidth = width;
      }
    );
    this.subscription.add(screenSubscription);
  }

  subscription = new Subscription();

  faArrowUpAZ = faArrowUpAZ;
  faArrowDownZA = faArrowDownZA;
  screenWidth: number;
  categoriesDatatable: Category[] = [];
  categories: Category[] = [];

  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;

  headers: TableHeader[] = [
    { displayName: 'Nombre', key: 'name' },
    { displayName: 'Descripción', key: 'description' },
  ];
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 7;

  sortBy: string = SortBy.NAME;
  sortDirection: string = SortDirection.ASC;

  sortDirectionAsc: SortDirection = SortDirection.ASC;
  sordirectionDesc: SortDirection = SortDirection.DESC;

  buttonLabelAddCategory: string = 'Agregar';
  tableTittleLabel: string = 'Listado de Categorías';

  buttonSizeS = ButtonSize.S;
  buttonSizeM = ButtonSize.M;
  buttonTypePrimary = ButtonType.PRIMARY;
  buttonTypeSecundary = ButtonType.SECUNDARY;

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
      .subscribe({
        next: (response) => {
          this.categories = response.data.content;

          this.categoriesDatatable = this.categories.map((category) => ({
            ...category,
          }));
          this.totalPages = response.data.totalPages;
          this.loader.hide();
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
          this.loader.hide();
        },
        complete: () => {
          this.loader.hide();
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

  toggleSortDirection(): void {
    this.sortDirection =
      this.sortDirection === this.sortDirectionAsc
        ? this.sordirectionDesc
        : this.sortDirectionAsc;
    this.loadCategories();
  }

  isLargeScreen(): boolean {
    return this.screenSizeService.isLargeScreen(this.screenWidth);
  }
}
