import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Router } from '@angular/router';
import { faArrowUpAZ, faArrowDownZA } from '@fortawesome/free-solid-svg-icons';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { ToastComponent } from 'src/app/components/molecules/toast/toast.component';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories-page.component.html',
  styleUrls: ['./list-categories-page.component.scss'],
})
export class ListCategoriesPageComponent implements OnInit, OnDestroy {
  
  subscription = new Subscription();

  faArrowUpAZ = faArrowUpAZ;
  faArrowDownZA = faArrowDownZA;
  screenWidth: number;
  categories: Category[] = [];
  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  headers = [
    { displayName: 'Nombre', key: 'name' },
    { displayName: 'Descripción', key: 'description' },
  ];
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 7;
  sortBy: string = 'name';
  sortDirection: string = 'asc';

  @ViewChild(ToastComponent) toast!: ToastComponent;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private loader: LoaderService
  ) {
    this.screenWidth = window.innerWidth;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loader.show();

    const getCategoriesSubscription = this.categoryService
      .getCategories(
        this.currentPage - 1,
        this.pageSize,
        this.sortBy,
        this.sortDirection
      )
      .subscribe({
        next: (response) => {
          this.categories = response.data.content;
          this.totalPages = response.data.totalPages;
          this.loader.hide();
        },
        error: (err) => {
          this.toastMessage = ErrorMessages.GENERIC_ERROR_MESSAGE;
          this.toastType = StatesTypes.ERROR;
          this.toast.show();
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
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.loadCategories();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  isLargeScreen(): boolean {
    return this.screenWidth >= 768;
  }
}
