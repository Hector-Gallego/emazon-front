import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import { BrandPersistenceService } from 'src/app/shared/services/brand-persistence/brand-persistence.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ButtonSize } from 'src/app/shared/enums/button-size.enum';
import { ButtonType } from 'src/app/shared/enums/button-type.enum';
import { TableHeader } from 'src/app/shared/interfaces/table-header.interface';
import { SortBy } from 'src/app/shared/enums/sort-by.enum';
import { SortDirection } from 'src/app/shared/enums/sort-direction.enum';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { TableToolBarService } from 'src/app/shared/services/table-tool-bar/table-tool-bar.service';
import { SortMapper } from 'src/app/shared/mappers/sort.mapper';

@Component({
  selector: 'app-list-brands-page',
  templateUrl: './list-brands-page.component.html',
  styleUrls: ['./list-brands-page.component.scss'],
})
export class ListBrandsPageComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  brands: Brand[] = [];
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
  sortBy: SortBy = SortBy.NAME;
  sortDirection: SortDirection = SortDirection.ASC;

  buttonLabelAddBrand: string = 'Agregar';
  tableTittleLabel: string = 'Listado de Marcas';

  buttonSizeM = ButtonSize.M;
  buttonSizeS = ButtonSize.S;

  buttonTypePrimary = ButtonType.PRIMARY;
  buttonTypeSecundari = ButtonType.SECUNDARY;

  constructor(
    private readonly brandService: BrandPersistenceService,
    private readonly router: Router,
    private readonly loader: LoaderService,
    private readonly toastService: ToastService,
    private readonly tableToolBarService: TableToolBarService
  ) {
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadBrands();

    const showBySubscription = this.tableToolBarService.showBy$.subscribe(
      (value) => {
        this.pageSize = Number(value);
        this.loadBrands();
      }
    );

    const sortBySubscription = this.tableToolBarService.sortBy$.subscribe(
      (value) => {
        const [sortByField, sortDirection] = value.split(':');
        this.sortBy = SortMapper.mapSortBy(sortByField);
        this.sortDirection = SortMapper.mapSortDirection(sortDirection);
        this.loadBrands();
      }
    );

    this.subscription.add(showBySubscription);
    this.subscription.add(sortBySubscription);
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
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (response) => {
          this.brands = response.data.content;
          this.totalPages = response.data.totalPages;
        
        },
        error: (error) => {
          
          this.toastMessage = error?.error?.message || ErrorMessages.GENERIC_ERROR_MESSAGE;
          
          this.toastType = StatesTypes.ERROR;
          this.toastService.triggerToast(
            this.toastMessage,
            this.toastType,
            this.toastDuration
          );
          
        }
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

}
