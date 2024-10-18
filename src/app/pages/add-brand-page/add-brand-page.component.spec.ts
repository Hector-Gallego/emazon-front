import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AddBrandPageComponent } from './add-brand-page.component';
import { BrandPersistenceService } from 'src/app/shared/services/brand-persistence/brand-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { BrandFormComponent } from 'src/app/components/organism/brand-form/brand-form.component';
import {
  StatesTypes,
  ErrorMessages,
} from 'src/app/shared/constants/commonConstants';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { Brand } from 'src/app/shared/interfaces/brand.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DesignSystemModule } from 'src/app/design-system/design-system.module';
import { BrandModule } from 'src/app/modules/brand/brand.module';
import { BrandDataForm } from 'src/app/shared/interfaces/brand-data-form.interface';

describe('AddBrandPageComponent', () => {
  let component: AddBrandPageComponent;
  let fixture: ComponentFixture<AddBrandPageComponent>;
  let brandPersistenceService: jest.Mocked<BrandPersistenceService>;
  let loaderService: LoaderService;
  let toastService: ToastService;

  beforeEach(async () => {
    const brandServiceMock = {
      addBrand: jest.fn(),
    };

    const loaderServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    };

    const toastServiceMock = {
      triggerToast: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        DesignSystemModule,
        BrandModule,
      ],
      declarations: [AddBrandPageComponent, BrandFormComponent],
      providers: [
        { provide: BrandPersistenceService, useValue: brandServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBrandPageComponent);
    component = fixture.componentInstance;
    brandPersistenceService = TestBed.inject(
      BrandPersistenceService
    ) as jest.Mocked<BrandPersistenceService>;
    loaderService = TestBed.inject(LoaderService);
    toastService = TestBed.inject(ToastService);

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a show() y addBrand() en onFormSubmit() con éxito', () => {
    const mockBrand: BrandDataForm = {
      name: 'Test Brand',
      description: 'descripción',
    };
    const mockResponse: ApiResponse = {
      message: 'Brand added successfully',
      status: 200,
      timestamp: '2024-10-10',
    };

    brandPersistenceService.addBrand.mockReturnValue(of(mockResponse));

    component.onFormSubmit(mockBrand);

    expect(loaderService.show).toHaveBeenCalled();
    expect(brandPersistenceService.addBrand).toHaveBeenCalledWith(mockBrand);
    expect(toastService.triggerToast).toHaveBeenCalledWith(
      mockResponse.message,
      StatesTypes.SUCCESS,
      component.toastDuration
    );
    expect(loaderService.hide).toHaveBeenCalledTimes(2);
  });

  it('debería manejar errores en onFormSubmit()', () => {
    const mockBrand: BrandDataForm = {
      name: 'Adidas',
      description: 'marca de ropa deportiva',
    };
    const errorResponse = { error: { message: 'Error agregando marca' } };

    brandPersistenceService.addBrand.mockReturnValue(
      throwError(() => errorResponse)
    );

    component.onFormSubmit(mockBrand);

    expect(loaderService.show).toHaveBeenCalled();
    expect(toastService.triggerToast).toHaveBeenCalledWith(
      errorResponse.error.message,
      StatesTypes.ERROR,
      component.toastDuration
    );
    expect(loaderService.hide).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores genéricos en onFormSubmit()', () => {
    const mockBrand: BrandDataForm = {
      name: 'Adidas',
      description: 'marca de ropa deportiva',
    };

    brandPersistenceService.addBrand.mockReturnValue(throwError({}));

    component.onFormSubmit(mockBrand);

    expect(loaderService.show).toHaveBeenCalled();
    expect(toastService.triggerToast).toHaveBeenCalledWith(
      ErrorMessages.GENERIC_ERROR_MESSAGE,
      StatesTypes.ERROR,
      component.toastDuration
    );
    expect(loaderService.hide).toHaveBeenCalledTimes(1);
  });

  it('debería desuscribir de las suscripciones al destruir el componente', () => {
    const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
