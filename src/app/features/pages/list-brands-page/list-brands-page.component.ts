import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { faArrowDownZA, faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/core/models/brand';
import { PageRequest } from 'src/app/core/models/pageRequest';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-list-brands-page',
  templateUrl: './list-brands-page.component.html',
  styleUrls: ['./list-brands-page.component.scss'],
})
export class ListBrandsPageComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  faArrowUpAZ = faArrowUpAZ;
  faArrowDownZA = faArrowDownZA;
  screenWidth: number;
  brands: Brand[] = [];
  toastMessage: string = '';
  toastType: StatesTypes = StatesTypes.SUCCESS;
  toastDuration: number = 10000;
  headers = [
    { displayName: 'Nombre', key: 'name' },
    { displayName: 'Descripción', key: 'description' },
  ];
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 7;
  sortBy: string = 'name';
  sortDirection: string = 'asc';

  constructor(
    private brandService: BrandService,
    private router: Router,
    private loader: LoaderService,
    private toastService: ToastService
  ) {
    this.screenWidth = window.innerWidth;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.loader.show();

    const pageRequest: PageRequest = {
      pageNumber: this.currentPage - 1,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    };

    const getBrandsSubscription = this.brandService
      .getBrands(pageRequest)
      .subscribe({
        next: (response) => {
          this.brands = response.data.content;
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
    this.subscription.add(getBrandsSubscription);
  }

  navigateToCreateBrand(): void {
    this.router.navigate(['/crear-marca']);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadBrands();
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.loadBrands();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

  isLargeScreen(): boolean {
    return this.screenWidth >= 768;
  }
}
