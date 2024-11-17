import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReportPersistenceService } from './report-persistence.service';
import { environment } from 'src/environments/environment';
import { PurchaseReport } from 'src/app/shared/interfaces/report.interface';
import { CHECK_TOKEN } from 'src/app/core/interceptors/token-interceptor/token.interceptor';


describe('ReportPersistenceService', () => {
  let service: ReportPersistenceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportPersistenceService],
    });

    service = TestBed.inject(ReportPersistenceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('debería crear el componente', () => {
    expect(service).toBeTruthy();
  });

  it('deberia llamar a saveReport de forma correcta', () => {
    service.saveReport().subscribe((response) => {
      expect(response).toBeDefined();
    });

    const req = httpMock.expectOne(
      `${environment.reportApiUrl}/api/reports/saveReport`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    expect(req.request.context.get(CHECK_TOKEN)).toBe(true);

    req.flush({ success: true });
  });

  it('debería llamar agetReports de forma correcta', () => {
    const mockReports: PurchaseReport[] = [
      {
        id: 1,
        userId: 1,
        purchaseDate: '2024-10-10',
        totalAmount: 223123,
        itemCarts: [],
        customerEmail: 'email@gmail.com'
      },
      {
        id: 2,
        userId: 2,
        purchaseDate: '2023-12-12',
        totalAmount: 2121212,
        itemCarts: [],
        customerEmail: 'email@gmail.com'
      },
    ];

    service.getReports().subscribe((response) => {
      expect(response).toEqual(mockReports);
    });

    const req = httpMock.expectOne(
      `${environment.reportApiUrl}/api/reports/getReports`
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.context.get(CHECK_TOKEN)).toBe(true);

    req.flush(mockReports); 
  });
});

