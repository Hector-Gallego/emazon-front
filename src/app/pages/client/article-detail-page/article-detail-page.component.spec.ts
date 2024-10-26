import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailPageComponent } from './article-detail-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticlePersistenceService } from 'src/app/shared/services/article-persistence/article-persistence.service';
import { ArticleResponse } from 'src/app/shared/interfaces/article.interface';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ApiResponseData } from 'src/app/shared/interfaces/api-response.interface';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { MoleculesModule } from 'src/app/components/molecules/molecules.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
describe('ArticleDetailPageComponent', () => {
  let component: ArticleDetailPageComponent;
  let fixture: ComponentFixture<ArticleDetailPageComponent>;

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

  const apiResponseMock: ApiResponseData<ArticleResponse> = {
    status: 200,
    message: 'articulo cargado con exito',
    data: mockArticle,
    timestamp: '2024-10-12',
  };
  const articleServiceMock = {
    getArticleById: jest.fn().mockReturnValue(of(apiResponseMock)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        AtomsModule,
        MoleculesModule,
        OrganismModule,
      ],
      declarations: [ArticleDetailPageComponent],
      providers: [
        { provide: ArticlePersistenceService, useValue: articleServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: mockArticle.id }),
          },
        },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar un artículo de manera exitosa al crearse el componente', () => {

    articleServiceMock.getArticleById.mockReturnValue(of(apiResponseMock));
    expect(component.article).toEqual(mockArticle);
    expect(articleServiceMock.getArticleById).toHaveBeenCalledWith(
      mockArticle.id
    );
  });

  it('debería manejar el error generíco si falla la carga del articulo', () => {
    const errorResponse = { message: ErrorMessages.GENERIC_ERROR_MESSAGE };
    articleServiceMock.getArticleById.mockReturnValue(
      throwError(() => errorResponse)
    );

    component.loadArticle();

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

    articleServiceMock.getArticleById.mockReturnValue(
      throwError(() => errorResponse)
    );
    component.loadArticle();
    expect(component.toastMessage).toEqual('Error específico del servidor');
    expect(component.toastType).toEqual('error');
    expect(toastServiceMock.triggerToast).toHaveBeenCalledWith(
      errorResponse.error.message,
      StatesTypes.ERROR,
      component.toastDuration
    );
  });
});
