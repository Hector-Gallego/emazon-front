import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCategoriesPageComponent } from './list-categories-page.component';
import { CategoryPersistenceService } from 'src/app/shared/services/category-persistence/category-persistence.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { SortDirection } from 'src/app/shared/enums/sort-direction.enum';
import { PaginationResponse } from 'src/app/shared/interfaces/pagination-response.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { TableToolBarService } from 'src/app/shared/services/table-tool-bar/table-tool-bar.service';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesPageComponent;
  let fixture: ComponentFixture<ListCategoriesPageComponent>;
  let categoryService: jest.Mocked<CategoryPersistenceService>;
  let router: jest.Mocked<Router>;
  let toastService: jest.Mocked<ToastService>;
  let loaderService: jest.Mocked<LoaderService>;
  let tableToolBarService: TableToolBarService;
  
  beforeEach(async () => {
    const categoryServiceMock = {
      getCategories: jest.fn(),
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
      declarations: [ListCategoriesPageComponent],
      imports: [FontAwesomeModule, AtomsModule, OrganismModule],
      providers: [
        { provide: CategoryPersistenceService, useValue: categoryServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCategoriesPageComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(
      CategoryPersistenceService
    ) as jest.Mocked<CategoryPersistenceService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>;
    loaderService = TestBed.inject(LoaderService) as jest.Mocked<LoaderService>;
    tableToolBarService = TestBed.inject(TableToolBarService);

    const mockResponse: PaginationResponse<Category> = {
      data: {
        content: [
          {
            id: 0,
            name: 'Ropa',
            description: 'Ropa de todo tipo',
          },
        ],
        totalPages: 1,
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        first: false,
        last: false,
      },
      status: 0,
      message: '',
      timestamp: '',
    };

    categoryService.getCategories.mockReturnValue(of(mockResponse));

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las categorías al inicializar', () => {
    component.ngOnInit();

    const expectedPageRequest: PaginationRequest = {
      pageNumber: 0,
      pageSize: component.pageSize,
      sortBy: component.sortBy,
      sortDirection: component.sortDirection,
    };

    expect(categoryService.getCategories).toHaveBeenCalledWith(
      expectedPageRequest
    );
    expect(component.categories).toEqual([
      { id: 0, name: 'Ropa', description: 'Ropa de todo tipo' },
    ]);
    expect(component.totalPages).toEqual(1);
  });

  it('debería manejar el error al cargar categorias', () => {
    const errorResponse = { message: ErrorMessages.GENERIC_ERROR_MESSAGE };
    categoryService.getCategories.mockReturnValue(
      throwError(() => errorResponse)
    );

    component.loadCategories();

    expect(loaderService.show).toHaveBeenCalled();
    expect(toastService.triggerToast).toHaveBeenCalledWith(
      errorResponse.message,
      StatesTypes.ERROR,
      component.toastDuration
    );
  });

  it('debería manejar el error correctamente cuando el error tiene la propiedad "error"', () => {
    const errorResponse = {
      error: {
        message: 'Error específico del servidor',
      },
    };


    categoryService.getCategories.mockReturnValue(
      throwError(() => errorResponse)
    );

    component.loadCategories();

    expect(component.toastMessage).toEqual('Error específico del servidor');
    expect(component.toastType).toEqual('error');
    expect(toastService.triggerToast).toHaveBeenCalledWith(
      errorResponse.error.message,
      StatesTypes.ERROR,
      component.toastDuration
    );
  });

  it('debería navegar a la creación de categoría al hacer clic en el botón "Agregar"', () => {
    component.navigateToCreateCategory();
    expect(router.navigate).toHaveBeenCalledWith(['/crear-categoria']);
  });

  it('debería cambiar la dirección de ordenamiento a desc y cargar categorías al llamar a toggleSortDirection con SorDirection = asc', () => {
    component.sortDirection = SortDirection.ASC;
    const newSort = 'name:desc';
    tableToolBarService.updateSortBy(newSort);
    expect(component.sortDirection).toBe(SortDirection.DESC);
    expect(categoryService.getCategories).toHaveBeenCalled();
  });

  it('debería cambiar la dirección de ordenamiento a asc y cargar categorías al llamar a toggleSortDirection con SorDirection = desc', () => {
    component.sortDirection = SortDirection.DESC;

    const newSort = 'name:asc';
    tableToolBarService.updateSortBy(newSort);
    expect(component.sortDirection).toBe(SortDirection.ASC);
    expect(categoryService.getCategories).toHaveBeenCalled();
  });

  it('debería cambiar a la nueva página y cargar marcas al llamar a onPageChange', () => {
    const newPage = 2;
    jest.spyOn(component, 'loadCategories');
    component.onPageChange(newPage);

    expect(component.currentPage).toBe(newPage);
    expect(component.loadCategories).toHaveBeenCalled();
  });
});
