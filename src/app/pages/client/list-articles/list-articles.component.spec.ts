import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesComponent } from './list-articles.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { MoleculesModule } from 'src/app/components/molecules/molecules.module';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { PaginationResponse } from 'src/app/shared/interfaces/pagination-response.interface';
import { ArticleResponse } from 'src/app/shared/interfaces/article.interface';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { of, throwError } from 'rxjs';
import { ArticlePersistenceService } from 'src/app/shared/services/article-persistence/article-persistence.service';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import { ErrorMessages, StatesTypes } from 'src/app/shared/constants/commonConstants';

describe('ListArticlesComponent', () => {
  let component: ListArticlesComponent;
  let fixture: ComponentFixture<ListArticlesComponent>;

  const toastServiceMock = {
    triggerToast: jest.fn(),
  };

  const loaderServiceMock = {
    show: jest.fn(),
    hide: jest.fn(),
  };

  const mockBrand: Brand = {
    name: 'marca',
    description: 'descripcion marca',
  };

  const mockArticle: ArticleResponse = {
    id: 1,
    name: 'articulo',
    description: 'descripcion',
    quantity: 10,
    price: 10,
    categories: [],
    brand: mockBrand,
  };

  const mockResponse: PaginationResponse<ArticleResponse> = {
    status: 200,
    message: 'categorias listadas con exito',
    data: {
      content: [
        mockArticle
      ],
      totalPages: 1,
      pageNumber: 0,
      pageSize: 0,
      totalElements: 0,
      first: false,
      last: false,
    },
    timestamp: '2024-12-12',
  };

  const articleServiceMock = {
    getArticles: jest.fn().mockReturnValue(of(mockResponse)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        OrganismModule,
        MoleculesModule,
        AtomsModule,
      ],
      declarations: [ListArticlesComponent],
      providers: [
        { provide: ToastService, useValue: toastServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: ArticlePersistenceService, useValue: articleServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los articulos al inicializar', () => {
    const expectedPageRequest: PaginationRequest = {
      pageNumber: 0,
      pageSize: component.pageSize,
      sortBy: component.sortBy,
      sortDirection: component.sortDirection,
    };

    expect(articleServiceMock.getArticles).toHaveBeenCalled();
    expect(articleServiceMock.getArticles).toHaveBeenCalledWith(
      expectedPageRequest
    );
    expect(component.articles).toEqual([
      mockArticle
    ]);
    expect(component.totalPages).toEqual(1);
  });


  it('debería manejar el error al cargar marcas', () => {
    const errorResponse = { message: ErrorMessages.GENERIC_ERROR_MESSAGE };
    articleServiceMock.getArticles.mockReturnValue(throwError(() => errorResponse));

    component.loadArticles();

    expect(loaderServiceMock.show).toHaveBeenCalled();
    expect(toastServiceMock.triggerToast).toHaveBeenCalledWith(
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

    articleServiceMock.getArticles.mockReturnValue(throwError(() => errorResponse));
    component.loadArticles();
    expect(component.toastMessage).toEqual('Error específico del servidor');
    expect(component.toastType).toEqual('error');
    expect(toastServiceMock.triggerToast).toHaveBeenCalledWith(
      errorResponse.error.message,
      StatesTypes.ERROR,
      component.toastDuration
    );
  });

  it('debería cambiar a la nueva página y cargar marcas al llamar a onPageChange', () => {
    const newPage = 2;
    jest.spyOn(component, 'loadArticles');
    component.onPageChange(newPage);

    expect(component.currentPage).toBe(newPage);
    expect(component.loadArticles).toHaveBeenCalled();
  });
});
