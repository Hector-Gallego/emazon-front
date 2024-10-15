import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowDownZA, faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import { BrandPersistenceService } from 'src/app/modules/brand/services/brand-persistence/brand-persistence.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';
import { BrandDataTable } from 'src/app/modules/brand/interfaces/brand-data-table.interface';
import { TableHeader } from 'src/app/shared/interfaces/table-header.interface';
import { ScreenSizeService } from 'src/app/shared/services/screen-size/screen-size.service';
import { SortBy } from 'src/app/shared/enums/sort-by.enum';
import { SortDirection } from 'src/app/shared/enums/sort-direction.enum';
import { Brand } from 'src/app/modules/brand/interfaces/brand.interface';

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
  brandsDataTable: BrandDataTable[] = [];
  brands: Brand[] = [];
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
  sortBy: SortBy = SortBy.NAME;
  sortDirection: SortDirection = SortDirection.ASC;

  buttonLabelAddBrand: string = 'Agregar';
  tableTittleLabel: string = 'Listado de Marcas';

  buttonSizeM = ButtonSize.M;
  buttonSizeS = ButtonSize.S;

  buttonTypePrimary = ButtonType.PRIMARY;
  buttonTypeSecundari = ButtonType.SECUNDARY;

  sortDirectionAsc: SortDirection = SortDirection.ASC;
  sortDirectionDesc: SortDirection = SortDirection.DESC;

  constructor(
    private brandService: BrandPersistenceService,
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
    this.loadBrands();

    const screenSubscription = this.screenSizeService.screenWidth$.subscribe(
      (width) => {
        this.screenWidth = width;
      }
    );
    this.subscription.add(screenSubscription);
  }

  loadBrands(): void {
    this.loader.show();

    const pageRequest: PaginationRequest = {
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

          this.brandsDataTable = this.brands.map((brand) => ({
            ...brand,
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
    this.sortDirection =
      this.sortDirection === this.sortDirectionAsc
        ? this.sortDirectionDesc
        : this.sortDirectionAsc;
    this.loadBrands();
  }

  isLargeScreen(): boolean {
    return this.screenSizeService.isLargeScreen(this.screenWidth);
  }
}
