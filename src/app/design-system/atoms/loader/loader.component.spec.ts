import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: LoaderService;
  let loadingSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    loadingSubject = new BehaviorSubject<boolean>(false);
    const loaderServiceMock = {
      loading$: loadingSubject.asObservable(),
      show: jest.fn(),
      hide: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [{ provide: LoaderService, useValue: loaderServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('no debería mostrar el loader cuando isLoading es false', () => {
    component.isLoading = of(false);
    fixture.detectChanges();

    const loaderElement = fixture.debugElement.query(By.css('.peeek-loading'));
    expect(loaderElement).toBeNull();
  });

  it('debería mostrar el loader cuando isLoading es true', () => {
    component.isLoading = of(true);
    fixture.detectChanges();

    const loaderElement = fixture.debugElement.query(By.css('.peeek-loading'));
    expect(loaderElement).toBeTruthy();
  });

  it('debería suscribirse al loaderService.loading$', () => {
    loadingSubject.next(true);
    fixture.detectChanges();

    component.isLoading.subscribe((loading) => {
      expect(loading).toBe(true);
    });
  });
});
