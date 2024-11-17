import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListReportsPageComponent } from './list-reports-page.component';
import { ReportPersistenceService } from 'src/app/shared/services/report-persistence/report-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';

describe('ListReportsPageComponent', () => {
  let component: ListReportsPageComponent;
  let fixture: ComponentFixture<ListReportsPageComponent>;
  let reportPersistenceService: ReportPersistenceService;
  let loaderService: LoaderService;

  beforeEach(() => {
   
    const reportPersistenceServiceMock = {
      getReports: jest.fn().mockReturnValue(of([{ id: 1, name: 'Report 1' }])) 
    };

    const loaderServiceMock = {
      show: jest.fn(),
      hide: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [ListReportsPageComponent],
      providers: [
        { provide: ReportPersistenceService, useValue: reportPersistenceServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListReportsPageComponent);
    component = fixture.componentInstance;
    reportPersistenceService = TestBed.inject(ReportPersistenceService);
    loaderService = TestBed.inject(LoaderService);
  });

  it('debería cargar los reportes de venta', () => {
   
    component.loadReports();
    expect(loaderService.show).toHaveBeenCalled();
    fixture.detectChanges();
    expect(loaderService.hide).toHaveBeenCalled();
    expect(component.purchaseReport).toEqual([{ id: 1, name: 'Report 1' }]);
  });

 
});
