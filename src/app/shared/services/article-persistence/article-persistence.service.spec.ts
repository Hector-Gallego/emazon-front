import { TestBed } from '@angular/core/testing';

import { ArticlePersistenceService } from './article-persistence.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Article, ArticleResponse } from '../../interfaces/article.interface';
import { environment } from 'src/environments/environment';
import { ArticleValuesConstants } from '../../constants/article.constant';
import { PaginationRequest } from '../../interfaces/pagination-request.interface';
import { ApiResponseData } from '../../interfaces/api-response.interface';

describe('ArticlePersistenceService', () => {
  let service: ArticlePersistenceService;
  let httpMock: HttpTestingController;

  const mockResponse: ApiResponseData<ArticleResponse> = {
    status: 200,
    message: 'Artículo encontrado',
    data: {
      id: 1,
      name: 'Adidas',
      description: 'Ropa deportiva',
      quantity: 2,
      price: 33234,
      categories: [],
      brand: { name: 'marca', description: 'descripcion marca' },
    },
    timestamp: '2024-10-12',
  };

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticlePersistenceService],
    });
   
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ArticlePersistenceService);
  });

  afterEach(() => {
    httpMock.verify();
  })
  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería enviar una solicitud POST para añadir un artículo', () => {
    const mockCategoryData: Article = {
      name: 'Sony',
      description: 'Marca de tecnología',
      quantity: 10,
      price: 1212,
      categoryIds: [1, 2, 3],
      brandId: 1
    };
    const mockResponse = {
      success: true,
      message: 'Marca añadida correctamente',
    };

    service.addArticle(mockCategoryData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      environment.stockApiUrl + ArticleValuesConstants.END_POINT_ARTILCLE_SAVE
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(
      environment.mockTokenAdmin
    );
    req.flush(mockResponse);
  });

  it('debería enviar una solicitud GET para obtener Marcas paginadas', () => {
    const mockPageNumber = 1;
    const mockPageSize = 10;
    const mockSortBy = 'name';
    const mockSortDirection = 'asc';
    const mockResponse = {
      data: {
        content: [{ name: 'Adidas', description: 'Ropa deportiva' }],
        totalPages: 5,
      },
    };

    const paginationRequest: PaginationRequest = {
      pageNumber: mockPageNumber,
      pageSize: mockPageSize,
      sortBy: mockSortBy,
      sortDirection: mockSortDirection,
    };

    service.getArticles(paginationRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url ===
          environment.stockApiUrl + ArticleValuesConstants.END_POINT_ARTILCLE &&
        request.params.get('pageNumber') === mockPageNumber.toString() &&
        request.params.get('pageSize') === mockPageSize.toString() &&
        request.params.get('sortBy') === mockSortBy &&
        request.params.get('sortDirection') === mockSortDirection
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(
      environment.mockTokenAdmin
    );
    req.flush(mockResponse);
  });

  it('should get article by ID', () => {
    

    const articleId = 1;

    service.getArticleById(articleId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.stockApiUrl}${ArticleValuesConstants.END_POINT_ARTILCLE}/${articleId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(environment.mockTokenAdmin);
    req.flush(mockResponse);
  });

});
