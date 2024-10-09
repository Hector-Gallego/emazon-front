import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { environment } from 'src/environments/environment';
import { Category } from '../../models/category';

describe('CategoryService', () => {
    let service: CategoryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CategoryService]
        });
        service = TestBed.inject(CategoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('debería crearse el servicio', () => {
        expect(service).toBeTruthy();
    });

    it('debería enviar una solicitud POST para añadir una categoría', () => {
        const mockCategoryData : Category = { name: 'Electrónica', description: 'Dispositivos y accesorios' };
        const mockResponse = { success: true, message: 'Categoría añadida correctamente' };

        service.addCategory(mockCategoryData).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(environment.stockApiUrl+'/api/category');
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.get('Authorization')).toBe(environment.mockTokenAdmin);
        req.flush(mockResponse);
    });

    it('debería enviar una solicitud GET para obtener categorías', () => {
        const mockPageNumber = 1;
        const mockPageSize = 10;
        const mockSortBy = 'name';
        const mockSortDirection = 'asc';
        const mockResponse = {
            data: {
                content: [{ name: 'Electrónica', description: 'Dispositivos y accesorios' }],
                totalPages: 5
            }
        };

        service.getCategories(mockPageNumber, mockPageSize, mockSortBy, mockSortDirection).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne((request) =>
            request.url === environment.stockApiUrl + '/api/category' &&
            request.params.get('pageNumber') === mockPageNumber.toString() &&
            request.params.get('pageSize') === mockPageSize.toString() &&
            request.params.get('sortBy') === mockSortBy &&
            request.params.get('sortDirection') === mockSortDirection
        );

        expect(req.request.method).toBe('GET');
        expect(req.request.headers.get('Authorization')).toBe(environment.mockTokenAdmin);
        req.flush(mockResponse);
    });
})
