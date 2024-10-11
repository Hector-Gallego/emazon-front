import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ListBrandsPageComponent } from './list-brands-page.component';
import { PaginatonComponent } from 'src/app/components/organism/paginaton/paginaton.component';
import { ToastComponent } from 'src/app/components/molecules/toast/toast.component';
import { ButtonComponent } from 'src/app/components/atoms/button/button.component';
import { DataTableComponent } from 'src/app/components/organism/data-table/data-table.component';
import { IconComponent } from 'src/app/components/atoms/icon/icon.component';
import { LoaderComponent } from 'src/app/components/atoms/loader/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import { Router } from '@angular/router';
import { PageRequest } from 'src/app/core/models/pageRequest';
import { ErrorMessages, StatesTypes } from 'src/app/shared/constants/commonConstants';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';

describe('ListBrandComponent', () => {
  let component: ListBrandsPageComponent;
  let fixture: ComponentFixture<ListBrandsPageComponent>;
  let brandService: jest.Mocked<BrandService>;
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
      declarations: [
        ListBrandsPageComponent,
        ToastComponent,
        PaginatonComponent,
        ButtonComponent,
        DataTableComponent,
        IconComponent,
        LoaderComponent,
      ],
      imports: [FontAwesomeModule],
      providers: [
        { provide: BrandService, useValue: brandServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListBrandsPageComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(BrandService) as jest.Mocked<BrandService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>;
    loaderService = TestBed.inject(LoaderService) as jest.Mocked<LoaderService>;

    const mockResponse = {
      data: {
        content: [{ name: 'Adidas', description: 'Ropa deportiva' }],
        totalPages: 1,
      },
    };

    brandService.getBrands.mockReturnValue(of(mockResponse));

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las marcas al inicializar', () => {

    // se llama dos veces a getBrands
    //component.ngOnInit();
    const expectedPageRequest: PageRequest = {
      pageNumber: 0,
      pageSize: component.pageSize,
      sortBy: component.sortBy,
      sortDirection: component.sortDirection,
    };

    expect(brandService.getBrands).toHaveBeenCalledTimes(1);
    expect(brandService.getBrands).toHaveBeenCalledWith(expectedPageRequest);
    expect(component.brands).toEqual([{ name: 'Adidas', description: 'Ropa deportiva' }]);
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

  it('debería cambiar la dirección de ordenamiento y cargar marcas al llamar a toggleSortDirection', () => {
    component.sortDirection = 'asc';

    component.toggleSortDirection();

    expect(component.sortDirection).toBe('desc');
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
