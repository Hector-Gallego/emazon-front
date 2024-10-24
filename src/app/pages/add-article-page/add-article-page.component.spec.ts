import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticlePageComponent } from './add-article-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { BrandPersistenceService } from 'src/app/shared/services/brand-persistence/brand-persistence.service';
import { CategoryPersistenceService } from 'src/app/shared/services/category-persistence/category-persistence.service';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { ArticlePersistenceService } from 'src/app/shared/services/article-persistence/article-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';

describe('AddArticlePageComponent', () => {
  let component: AddArticlePageComponent;
  let fixture: ComponentFixture<AddArticlePageComponent>;

  const mockArticle: Article = {
    name: 'Test Brand',
    description: 'descripción',
    quantity: 10,
    price: 121,
    categoryIds: [1, 2, 3],
    brandId: 1,
  };
  const mockResponse: ApiResponse = {
    message: 'Brand added successfully',
    status: 200,
    timestamp: '2024-10-10',
  };
  const mockBrandService = {
    getAllBrands: jest.fn().mockReturnValue(of([])),
  };

  const mockCategoryService = {
    getAllCategories: jest.fn().mockReturnValue(of([])),
  };

  const loaderServiceMock = {
    show: jest.fn(),
    hide: jest.fn(),
  };

  const toastServiceMock = {
    triggerToast: jest.fn(),
  };

  const mockArticleService = {
    addArticle: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, OrganismModule, HttpClientModule],
      declarations: [AddArticlePageComponent],
      providers: [
        { provide: CategoryPersistenceService, useValue: mockCategoryService },
        { provide: BrandPersistenceService, useValue: mockBrandService },
        { provide: ArticlePersistenceService, useValue: mockArticleService },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería crear un articulo y llamar a show() y addArticle() en onFormSubmit() con éxito', () => {
    mockArticleService.addArticle.mockReturnValue(of(mockResponse));

    component.onFormSubmit(mockArticle);

    expect(loaderServiceMock.show).toHaveBeenCalled();
    expect(mockArticleService.addArticle).toHaveBeenCalledWith(mockArticle);
    expect(toastServiceMock.triggerToast).toHaveBeenCalledWith(
      mockResponse.message,
      StatesTypes.SUCCESS,
      component.toastDuration
    );
    expect(loaderServiceMock.hide).toHaveBeenCalled();
  });

  it('debería manejar errores de forma correcta en onFormSubmit()', () => {
    const errorResponse = { error: { message: 'Error agregando articulo' } };

    mockArticleService.addArticle.mockReturnValue(
      throwError(() => errorResponse)
    );

    component.onFormSubmit(mockArticle);

    expect(loaderServiceMock.show).toHaveBeenCalled();
    expect(toastServiceMock.triggerToast).toHaveBeenCalledWith(
      errorResponse.error.message,
      StatesTypes.ERROR,
      component.toastDuration
    );
    expect(loaderServiceMock.hide).toHaveBeenCalled();
  });

  it('debería manejar errores genéricos en onFormSubmit()', () => {
    mockArticleService.addArticle.mockReturnValue(
      throwError(() => {
        Error('error');
      })
    );

    component.onFormSubmit(mockArticle);

    expect(loaderServiceMock.show).toHaveBeenCalled();
    expect(toastServiceMock.triggerToast).toHaveBeenCalledWith(
      ErrorMessages.GENERIC_ERROR_MESSAGE,
      StatesTypes.ERROR,
      component.toastDuration
    );
    expect(loaderServiceMock.hide).toHaveBeenCalled();
  });

  it('debería desuscribir de las suscripciones al destruir el componente', () => {
    const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  describe('loadOptions', () => {
    it('debería cargar opciones correctamente', () => {
      const mockEntities: Brand[] = [
        {
          id: 1,
          name: 'Entity 1',
          description: 'Descripcion 1',
        },
        {
          id: 2,
          name: 'Entity 2',
          description: 'Descripcion 2',
        },
      ];
      const mockServiceMethod = jest
        .fn()
        .mockReturnValue(of({ data: mockEntities }));

      component.loadOptions(mockServiceMethod, 4);

      expect(loaderServiceMock.show).toHaveBeenCalled();
      expect(mockServiceMethod).toHaveBeenCalled();
      expect(loaderServiceMock.hide).toHaveBeenCalled();
      expect(component.articleFields[4].options).toEqual([
        { value: '1', label: 'Entity 1' },
        { value: '2', label: 'Entity 2' },
      ]);
    });

    it('debería manejar errores en loadOptions()', () => {
      const errorResponse = { error: { message: 'Error cargando opciones' } };
      const mockServiceMethod = jest
        .fn()
        .mockReturnValue(throwError(() => errorResponse));

      component.loadOptions(mockServiceMethod, 4);

      expect(loaderServiceMock.show).toHaveBeenCalled();
      expect(mockServiceMethod).toHaveBeenCalled();
      expect(loaderServiceMock.hide).toHaveBeenCalled();
      expect(toastServiceMock.triggerToast).toHaveBeenCalledWith(
        errorResponse.error.message,
        StatesTypes.ERROR,
        component.toastDuration
      );
    });

    it('debería manejar correctamente la carga de marcas sin IDs', () => {
      const mockBrandsResponse = {
        data: [{ name: 'Brand A' }, { id: 2, name: 'Brand B' }],
      };

      mockBrandService.getAllBrands.mockReturnValue(of(mockBrandsResponse));
      component.loadBrands();

      expect(mockBrandService.getAllBrands).toHaveBeenCalled();
      expect(component.articleFields[4].options).toEqual([
        { value: '0', label: 'Brand A' },
        { value: '2', label: 'Brand B' },
      ]);
    });
  });

  it('debería mostrar un mensaje de error genérico al fallar la carga de datos', () => {
    const errorResponse = {
      error: 'Error génerico',
    };

    mockBrandService.getAllBrands.mockReturnValue(
      throwError(() => errorResponse)
    );

    component.loadBrands();

    expect(loaderServiceMock.show).toHaveBeenCalled();
    expect(toastServiceMock.triggerToast).toHaveBeenCalledWith(
      ErrorMessages.GENERIC_ERROR_MESSAGE,
      StatesTypes.ERROR,
      component.toastDuration
    );
    expect(loaderServiceMock.hide).toHaveBeenCalled();
  });
});
