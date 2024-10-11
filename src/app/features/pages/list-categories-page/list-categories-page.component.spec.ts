import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCategoriesPageComponent } from './list-categories-page.component';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { ToastComponent } from 'src/app/components/molecules/toast/toast.component';
import { PaginatonComponent } from 'src/app/components/organism/paginaton/paginaton.component';
import { ButtonComponent } from 'src/app/components/atoms/button/button.component';
import { DataTableComponent } from 'src/app/components/organism/data-table/data-table.component';
import { IconComponent } from 'src/app/components/atoms/icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from 'src/app/components/atoms/loader/loader.component';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesPageComponent;
  let fixture: ComponentFixture<ListCategoriesPageComponent>;
  let categoryService: jest.Mocked<CategoryService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const categoryServiceMock = {
      getCategories: jest.fn(),
    };
    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [
        ListCategoriesPageComponent,
        ToastComponent,
        PaginatonComponent,
        ButtonComponent,
        DataTableComponent,
        IconComponent,
        LoaderComponent,
      ],
      imports: [FontAwesomeModule],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCategoriesPageComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(
      CategoryService
    ) as jest.Mocked<CategoryService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    const mockResponse = {
      data: {
        content: [{ name: 'Categoría 1', description: 'Descripción 1' }],
        totalPages: 1,
      },
    };

    categoryService.getCategories.mockReturnValue(of(mockResponse));

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las categorías al inicializar', () => {
    component.ngOnInit();

    expect(categoryService.getCategories).toHaveBeenCalledWith(
      0,
      component.pageSize,
      component.sortBy,
      component.sortDirection
    );
    expect(component.categories).toEqual([
      { name: 'Categoría 1', description: 'Descripción 1' },
    ]);
    expect(component.totalPages).toEqual(1);
  });

  it('debería navegar a la creación de categoría al hacer clic en el botón "Agregar"', () => {
    component.navigateToCreateCategory();
    expect(router.navigate).toHaveBeenCalledWith(['/crear-categoria']);
  });

  it('debería cambiar la dirección de ordenamiento y cargar categorías al llamar a toggleSortDirection', () => {
    component.sortDirection = 'asc';

    component.toggleSortDirection();

    expect(component.sortDirection).toBe('desc');
    expect(categoryService.getCategories).toHaveBeenCalled();
  });

});
