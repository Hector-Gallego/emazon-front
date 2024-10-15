import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ListBrandsPageComponent } from './list-brands-page.component';
import { PaginationComponent } from 'src/app/design-system/organism/pagination/pagination.component';
import { ToastComponent } from 'src/app/design-system/molecules/toast/toast.component';
import { ButtonComponent } from 'src/app/design-system/atoms/button/button.component';
import { DataTableComponent } from 'src/app/design-system/organism/data-table/data-table.component';
import { IconComponent } from 'src/app/design-system/atoms/icon/icon.component';
import { LoaderComponent } from 'src/app/design-system/atoms/loader/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrandPersistenceService } from 'src/app/modules/brand/services/brand-persistence/brand-persistence.service';
import { Router } from '@angular/router';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { SortDirection } from 'src/app/shared/enums/sort-direction.enum';
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { DataPagination } from 'src/app/shared/interfaces/data-pagination-interface';
import { Brand } from 'src/app/modules/brand/interfaces/brand.interface';

describe('ListBrandComponent', () => {
  let component: ListBrandsPageComponent;
  let fixture: ComponentFixture<ListBrandsPageComponent>;
  let brandService: jest.Mocked<BrandPersistenceService>;
  let router: jest.Mocked<Router>;
  let toastService: jest.Mocked<ToastService>;
  let loaderService: jest.Mocked<LoaderService>;

  beforeEach(async () => {
    const brandServiceMock = {
      getBrands: jest.fn(),
    };
    const routerMock = {
      navigate: jest.fn(),
    };
    const toastServiceMock = {
      triggerToast: jest.fn(),
    };
    const loaderServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ListBrandsPageComponent],
      imports: [FontAwesomeModule, DesignSystemModule],
      providers: [
        { provide: BrandPersistenceService, useValue: brandServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListBrandsPageComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(
      BrandPersistenceService
    ) as jest.Mocked<BrandPersistenceService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>;
    loaderService = TestBed.inject(LoaderService) as jest.Mocked<LoaderService>;

    const mockResponse: DataPagination<Brand> = {
      status: 200,
      message: 'categorias listadas con exito',
      data: {
        content: [{ id: 0, name: 'Adidas', description: 'Ropa deportiva' }],
        totalPages: 1,
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        first: false,
        last: false,
      },
      timestamp: '2024-12-12',
    };

    brandService.getBrands.mockReturnValue(of(mockResponse));

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las marcas al inicializar', () => {
    const expectedPageRequest: PaginationRequest = {
      pageNumber: 0,
      pageSize: component.pageSize,
      sortBy: component.sortBy,
      sortDirection: component.sortDirection,
    };

    expect(brandService.getBrands).toHaveBeenCalledTimes(1);
    expect(brandService.getBrands).toHaveBeenCalledWith(expectedPageRequest);
    expect(component.brandsDataTable).toEqual([
      { id: 0, name: 'Adidas', description: 'Ropa deportiva' },
    ]);
    expect(component.totalPages).toEqual(1);
  });

  it('debería manejar el error al cargar marcas', () => {
    const errorResponse = { message: ErrorMessages.GENERIC_ERROR_MESSAGE };
    brandService.getBrands.mockReturnValue(throwError(() => errorResponse));

    component.loadBrands();

    expect(loaderService.show).toHaveBeenCalled();
    expect(loaderService.hide).toHaveBeenCalledTimes(3);
    expect(toastService.triggerToast).toHaveBeenCalledWith(
      errorResponse.message,
      StatesTypes.ERROR,
      component.toastDuration
    );
  });

  it('debería manejar el error correctamente cuando el error tiene la propiedad "error"', () => {
    const errorResponse = {
      error: true,
      message: 'Error específico del servidor',
    };

    brandService.getBrands.mockReturnValue(throwError(() => errorResponse));

    component.loadBrands();

    expect(component.toastMessage).toEqual('Error específico del servidor');
    expect(component.toastType).toEqual('error');
    expect(toastService.triggerToast).toHaveBeenCalledWith(
      errorResponse.message,
      StatesTypes.ERROR,
      component.toastDuration
    );
  });

  it('debería navegar a la creación de marca al hacer clic en el botón "Agregar"', () => {
    component.navigateToCreateBrand();
    expect(router.navigate).toHaveBeenCalledWith(['/crear-marca']);
  });

  it('debería cambiar la dirección de ordenamiento a desc y cargar categorías al llamar a toggleSortDirection con SorDirection = asc', () => {
    component.sortDirection = SortDirection.ASC;

    component.toggleSortDirection();

    expect(component.sortDirection).toBe(SortDirection.DESC);
    expect(brandService.getBrands).toHaveBeenCalled();
  });

  it('debería cambiar la dirección de ordenamiento a "asc" y cargar categorías al llamar a toggleSortDirection con SorDirection = "desc"', () => {
    component.sortDirection = SortDirection.DESC;

    component.toggleSortDirection();

    expect(component.sortDirection).toBe(SortDirection.ASC);
    expect(brandService.getBrands).toHaveBeenCalled();
  });

  it('debería cambiar a la nueva página y cargar marcas al llamar a onPageChange', () => {
    const newPage = 2;
    jest.spyOn(component, 'loadBrands');
    component.onPageChange(newPage);

    expect(component.currentPage).toBe(newPage);
    expect(component.loadBrands).toHaveBeenCalled();
  });
});
