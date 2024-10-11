import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Brand } from '../../models/brand';
import { environment } from 'src/environments/environment';
import { BrandValuesConstants } from 'src/app/shared/constants/brandConstants';
import { PageRequest } from '../../models/pageRequest';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService],
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería enviar una solicitud POST para añadir una marca', () => {
    const mockCategoryData: Brand = {
      name: 'Sony',
      description: 'Marca de tecnología',
    };
    const mockResponse = {
      success: true,
      message: 'Marca añadida correctamente',
    };

    service.addBrand(mockCategoryData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(
      environment.mockTokenAdmin
    );
    req.flush(mockResponse);
  });

  it('debería enviar una solicitud GET para obtener Marcas', () => {
    const mockPageNumber = 1;
    const mockPageSize = 10;
    const mockSortBy = 'name';
    const mockSortDirection = 'asc';
    const mockResponse = {
      data: {
        content: [
          { name: 'Adidas', description: 'Ropa deportiva' },
        ],
        totalPages: 5,
      },
    };

    const pageRequest : PageRequest ={
      pageNumber :mockPageNumber,
      pageSize :mockPageSize,
      sortBy : mockSortBy,
      sortDirection : mockSortDirection
 
    }

    service
      .getBrands(pageRequest)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpMock.expectOne(
      (request) =>
        request.url === environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND &&
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
});
