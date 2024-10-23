import { TestBed } from '@angular/core/testing';

import { ArticlePersistenceService } from './article-persistence.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Article } from '../../interfaces/article.interface';
import { environment } from 'src/environments/environment';
import { ArticleValuesConstants } from '../../constants/article.constant';

describe('ArticlePersistenceService', () => {
  let service: ArticlePersistenceService;
  let httpMock: HttpTestingController;

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

});
