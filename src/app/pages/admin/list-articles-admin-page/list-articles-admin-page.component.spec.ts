import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesAdminPageComponent } from './list-articles-admin-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { ArticlePersistenceService } from 'src/app/shared/services/article-persistence/article-persistence.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { TableToolBarService } from 'src/app/shared/services/table-tool-bar/table-tool-bar.service';
import { PaginationResponse } from 'src/app/shared/interfaces/pagination-response.interface';
import { ArticleDataTable, ArticleResponse } from 'src/app/shared/interfaces/article.interface';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { of } from 'rxjs';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';

describe('ListArticlesAdminPageComponent', () => {

  let component: ListArticlesAdminPageComponent;
  let fixture: ComponentFixture<ListArticlesAdminPageComponent>;
  let articleService: jest.Mocked<ArticlePersistenceService>;
  let router: jest.Mocked<Router>;
  let loaderService: jest.Mocked<LoaderService>;
  let tableToolBarService: TableToolBarService;

  const brandMock : Brand = {
    name: 'Marca de prueba',
    description: 'descripcion de prueba'
  }
  
  const mockResponse: PaginationResponse<ArticleResponse> = {
    status: 200,
    message: 'categorias listadas con exito',
    data: {
      content: [{
        id: 0, name: 'prueba', description: 'prueba',
        quantity: 0,
        price: 0,
        categories: [],
        brand: brandMock
      }],
      totalPages: 1,
      pageNumber: 0,
      pageSize: 0,
      totalElements: 0,
      first: false,
      last: false,
    },
    timestamp: '2024-12-12',
  };
  beforeEach(async () => {

   

  
    const articleServiceMock = {
      getArticles: jest.fn(),
      addSupply: jest.fn()
    };
    const routerMock = {
      navigate: jest.fn(),
    }; 
    const loaderServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [ ListArticlesAdminPageComponent ],
      imports: [HttpClientTestingModule, OrganismModule, AtomsModule ],
      providers: [
        { provide: ArticlePersistenceService, useValue: articleServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: LoaderService, useValue: loaderServiceMock },
      ],
    })
    .compileComponents();

    articleService = TestBed.inject(
      ArticlePersistenceService
    ) as jest.Mocked<ArticlePersistenceService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    loaderService = TestBed.inject(LoaderService) as jest.Mocked<LoaderService>;
    tableToolBarService = TestBed.inject(TableToolBarService);
    fixture = TestBed.createComponent(ListArticlesAdminPageComponent);
    component = fixture.componentInstance;
    articleService.getArticles.mockReturnValue(of(mockResponse));
   
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
    expect(articleService.getArticles).toHaveBeenCalledWith(expectedPageRequest);
    expect(component.articles).toEqual([
      {
        id: 0,
        name: 'prueba',
        description: 'prueba',
        quantity: 0,
        price: 0,
        categories: [],
        brand: {
          name: 'Marca de prueba',
          description: 'descripcion de prueba',
        },
      },
    ]);
    expect(component.totalPages).toEqual(1);
  });

  it('debería agregar suministro correctamente y ocultar el loader', () => {
    const quantity = 5;
    component.selectedArticleId = 1; 
    const expectedSupply = {
      articleId: component.selectedArticleId,
      quantity: quantity,
      cartIds: [],
    };
    
    jest.spyOn(articleService, 'addSupply').mockReturnValue(of()); 
    const loaderShowSpy = jest.spyOn(loaderService, 'show');
    const loaderHideSpy = jest.spyOn(loaderService, 'hide');
    
    component.onAddSupply(quantity);
    
    expect(loaderShowSpy).toHaveBeenCalled();
    expect(articleService.addSupply).toHaveBeenCalledWith(expectedSupply);
    expect(loaderHideSpy).toHaveBeenCalled();
    expect(component.selectedArticleId).toBeNull(); 
  });

  it('debería navegar a la página de crear artículo', () => {
    component.navigateToCreateArticle();
    expect(router.navigate).toHaveBeenCalledWith(['/admin/crear-articulo']);
  });


  it('debería cambiar de página y cargar artículos', () => {

    const newPage = 2; 
    const loadArticlesSpy = jest.spyOn(component, 'loadArticles');
    component.onPageChange(newPage);   
    expect(component.currentPage).toEqual(newPage); 
    expect(loadArticlesSpy).toHaveBeenCalled(); 

  });
  
  it('debería cerrar el popup', () => {
    component.isPopupVisible = true; 
    component.closePopup();
    expect(component.isPopupVisible).toBe(false); 
  });
  

  it('debería obtener las coordenadas del mouse y establecer la posición del popup', () => {
    const event = {
      clientY: 100,
      clientX: 200,
    } as MouseEvent;
    component.onGetMouseCoords(event);  
    expect(component.popupPosition).toEqual({
      top: '100px',
      left: '200px',
    });
  });
  
  it('debería seleccionar un artículo y mostrar el popup', () => {
    const articleMock: ArticleDataTable = {
      id: 1,
      name: 'Artículo de prueba',
      quantity: 10,
      description: '',
      price: 0,
      categoryNames: '',
      brandName: ''
    };
  
    component.onGetArticleSelected(articleMock);
    
    expect(component.selectedArticleId).toEqual(articleMock.id);
    expect(component.selectedArticleName).toEqual(articleMock.name);
    expect(component.selectedArticleStock).toEqual(articleMock.quantity);
    expect(component.isPopupVisible).toBe(true); 
  });
  
  

});
