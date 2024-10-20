import { TestBed } from '@angular/core/testing';

import { BrandPersistenceService } from './brand-persistence.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { BrandValuesConstants } from 'src/app/shared/constants/brand.constant';
import { PaginationRequest } from '../../interfaces/pagination-request.interface';
import { Brand } from '../../interfaces/brand.interface';


describe('BrandPersistenceService', () => {
  let service: BrandPersistenceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandPersistenceService],
    });
    service = TestBed.inject(BrandPersistenceService);
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

    service.getBrands(paginationRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url ===
          environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND &&
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
