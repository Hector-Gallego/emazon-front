import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ShoppingCartDetailsPageComponent } from './shopping-cart-details-page.component';
import { ArticleResponse } from 'src/app/shared/interfaces/article.interface';
import { ShoppinCartResponse } from 'src/app/shared/interfaces/shopping-cart-response.interface';
import { BrandPersistenceService } from 'src/app/shared/services/brand-persistence/brand-persistence.service';
import { CategoryPersistenceService } from 'src/app/shared/services/category-persistence/category-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ShoppingCartPersistenceService } from 'src/app/shared/services/shopping-cart-persistence/shopping-cart-persistence.service';
import { TableToolBarService } from 'src/app/shared/services/table-tool-bar/table-tool-bar.service';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReportPersistenceService } from 'src/app/shared/services/report-persistence/report-persistence.service';

describe('ShoppingCartDetailsPageComponent', () => {
  let component: ShoppingCartDetailsPageComponent;
  let fixture: ComponentFixture<ShoppingCartDetailsPageComponent>;

  let loaderServiceMock: jest.Mocked<LoaderService>;
  let tableToolBarServiceMock: jest.Mocked<TableToolBarService>;
  let shoppingCartPersistenceServiceMock: jest.Mocked<ShoppingCartPersistenceService>;
  let brandServiceMock: jest.Mocked<BrandPersistenceService>;
  let categoryServiceMock: jest.Mocked<CategoryPersistenceService>;
  let reportPersistenceServiceMock: jest.Mocked<ReportPersistenceService>;

  beforeEach(() => {
    loaderServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    } as unknown as jest.Mocked<LoaderService>;

    tableToolBarServiceMock = {
      showBy$: of('10'),
      sortBy$: of('name:asc'),
      brandFilter$: of(''),
      categoryFilter$: of(''),
    } as unknown as jest.Mocked<TableToolBarService>;

    shoppingCartPersistenceServiceMock = {
      getShoppingCart: jest.fn(),
      deleteItemFromShoppingCart: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<ShoppingCartPersistenceService>;

    brandServiceMock = {
      getAllBrands: jest.fn(),
    } as unknown as jest.Mocked<BrandPersistenceService>;

    categoryServiceMock = {
      getAllCategories: jest.fn(),
    } as unknown as jest.Mocked<CategoryPersistenceService>;

    reportPersistenceServiceMock = {
      saveReport: jest.fn(),
    } as unknown as jest.Mocked<ReportPersistenceService>;

    TestBed.configureTestingModule({
      declarations: [ShoppingCartDetailsPageComponent],
      imports: [AtomsModule, OrganismModule, HttpClientTestingModule],
      providers: [
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: TableToolBarService, useValue: tableToolBarServiceMock },
        {
          provide: ShoppingCartPersistenceService,
          useValue: shoppingCartPersistenceServiceMock,
        },
        { provide: BrandPersistenceService, useValue: brandServiceMock },
        { provide: CategoryPersistenceService, useValue: categoryServiceMock },
        {
          provide: ReportPersistenceService,
          useValue: reportPersistenceServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartDetailsPageComponent);
    component = fixture.componentInstance;
    jest.spyOn(component, 'loadShoppingCart');
  });

  it('debería cargar el carrito de compras y las categorías y marcas al inicializar', () => {
    const mockCategories = [{ name: 'Electrónica' }, { name: 'Ropa' }];
    const mockBrands = [{ name: 'Nike' }, { name: 'Adidas' }];
    const mockResponse: ShoppinCartResponse<ArticleResponse> = {
      customPage: {
        content: [],
        totalPages: 0,
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        first: true,
        last: true,
      },
      totalPurchase: 0,
    };

    categoryServiceMock.getAllCategories.mockReturnValue(
      of({ data: mockCategories })
    );
    brandServiceMock.getAllBrands.mockReturnValue(of({ data: mockBrands }));
    shoppingCartPersistenceServiceMock.getShoppingCart.mockReturnValue(
      of(mockResponse)
    );

    component.ngOnInit();

    expect(
      shoppingCartPersistenceServiceMock.getShoppingCart
    ).toHaveBeenCalled();
    expect(categoryServiceMock.getAllCategories).toHaveBeenCalled();
    expect(brandServiceMock.getAllBrands).toHaveBeenCalled();

    expect(component.categoryOptions).toEqual([
      { value: '', label: 'Todos' },
      { value: 'Electrónica', label: 'Electrónica' },
      { value: 'Ropa', label: 'Ropa' },
    ]);

    expect(component.brandOptions).toEqual([
      { value: '', label: 'Todos' },
      { value: 'Nike', label: 'Nike' },
      { value: 'Adidas', label: 'Adidas' },
    ]);

    expect(component.articles).toEqual([]);
    expect(component.totalPurchase).toEqual(0);
    expect(component.totalPages).toEqual(0);
  });

  it('debería cambiar a la nueva página y cargar el carrito de compras al llamar a onPageChange', () => {
    const mockResponse: ShoppinCartResponse<ArticleResponse> = {
      customPage: {
        content: [],
        totalPages: 5,
        pageNumber: 1,
        pageSize: 10,
        totalElements: 50,
        first: false,
        last: false,
      },
      totalPurchase: 0,
    };

    shoppingCartPersistenceServiceMock.getShoppingCart.mockReturnValue(
      of(mockResponse)
    );

    component.onPageChange(2);

    expect(component.currentPage).toEqual(2);
    expect(
      shoppingCartPersistenceServiceMock.getShoppingCart
    ).toHaveBeenCalled();
  });

  it('debería eliminar un artículo del carrito y mostrar un mensaje de éxito', () => {
    const articleId = 1;
    const mockResponse: ApiResponse = {
      message: 'Artículo eliminado con éxito',
      status: 0,
      timestamp: '',
    };

    shoppingCartPersistenceServiceMock.deleteItemFromShoppingCart.mockReturnValue(
      of(mockResponse)
    );
    component.deleteItemToShoppingCart(articleId);
    expect(loaderServiceMock.show).toHaveBeenCalled();
    expect(
      shoppingCartPersistenceServiceMock.deleteItemFromShoppingCart
    ).toHaveBeenCalledWith(articleId);
    expect(loaderServiceMock.hide).toHaveBeenCalled();
    expect(component.loadShoppingCart).toHaveBeenCalled();
  });

  it('debería completar la compra, mostrar un mensaje de éxito y limpiar el carrito', () => {
  
    const mockResponse = { message: 'Compra realizada exitosamente' };
    reportPersistenceServiceMock.saveReport.mockReturnValue(of(mockResponse));
  
    component.completedPurchase();

    expect(loaderServiceMock.show).toHaveBeenCalled();
    expect(reportPersistenceServiceMock.saveReport).toHaveBeenCalled();
    expect(loaderServiceMock.hide).toHaveBeenCalled();
    expect(component.loadShoppingCart).toHaveBeenCalled();
   
  });
  
});
