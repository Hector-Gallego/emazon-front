import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';


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
        const mockCategoryData = { name: 'Electrónica', description: 'Dispositivos y accesorios' };
        const mockResponse = { success: true, message: 'Categoría añadida correctamente' };

        service.addCategory(mockCategoryData).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(service['apiUrl']);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.get('Authorization')).toBe(service['mockTokenAdmin']);
        req.flush(mockResponse);
    });
})
