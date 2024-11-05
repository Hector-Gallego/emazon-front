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
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ShoppingCartPersistenceService } from 'src/app/shared/services/shopping-cart-persistence/shopping-cart-persistence.service';
import { ShoppingCartStateService } from 'src/app/shared/services/shopping-cart-state/shopping-cart-state.service';
import { CartItem } from 'src/app/shared/interfaces/cart-item.inteface';
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
    sufficientStock: false,
    supplyDate: new Date()
  };

  const apiResponseMock: ApiResponseData<ArticleResponse> = {
    status: 200,
    message: 'articulo cargado con exito',
    data: mockArticle,
    timestamp: '2024-10-12',
  };
  const mockCartItem: CartItem = {
    articleId: 1,
    quantity: 1,
  };
  const articleServiceMock = {
    getArticleById: jest.fn().mockReturnValue(of(apiResponseMock)),
  };

  const shoppingCartPersistenceServiceMock = {
    saveItemtoShoppingCart: jest.fn(),
  };

  const shoppingCartStateServiceMock = {
    addItemToShoppingCart: jest.fn(),
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
        { provide: ShoppingCartPersistenceService, useValue: shoppingCartPersistenceServiceMock },
        { provide: ShoppingCartStateService, useValue: shoppingCartStateServiceMock },
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


  it('debería mostrar el loader, añadir un artículo al carrito y ocultar el loader al finalizar', () => {
    shoppingCartPersistenceServiceMock.saveItemtoShoppingCart.mockReturnValue(of(null));
    component.article = { id: 1, name: 'Artículo de prueba' } as any;
    component.quantityToAdd = 1;

    component.addItemToShoppinCart();

    expect(loaderServiceMock.show).toHaveBeenCalled();
    expect(loaderServiceMock.hide).toHaveBeenCalled();
  });

  it('debería ocultar el loader al fallar la operación de añadir artículo al carrito', () => {
    shoppingCartPersistenceServiceMock.saveItemtoShoppingCart.mockReturnValue(throwError(() => new Error('Error de prueba')));

    component.article = { id: 1, name: 'Artículo de prueba' } as any;
    component.quantityToAdd = 1;

    component.addItemToShoppinCart();

    expect(loaderServiceMock.show).toHaveBeenCalled();
    expect(shoppingCartPersistenceServiceMock.saveItemtoShoppingCart).toHaveBeenCalledWith(mockCartItem);
    expect(loaderServiceMock.hide).toHaveBeenCalled();
  });

  it('debería actualizar quantityToAdd al llamar a getQuantityToAdd', () => {
    const testQuantity = 5;
    
    component.getQuantityToAdd(testQuantity);
  
    expect(component.quantityToAdd).toEqual(testQuantity);
  });
});
