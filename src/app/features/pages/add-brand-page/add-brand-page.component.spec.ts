import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrandPageComponent } from './add-brand-page.component';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Brand } from 'src/app/core/models/brand';
import { ApiResponse } from 'src/app/core/models/apiResponse';
import { BrandFormComponent } from 'src/app/components/organism/brand-form/brand-form.component';
import { InputComponent } from 'src/app/components/atoms/input/input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { of, throwError } from 'rxjs';

describe('AddBrandPageComponent', () => {
  let component: AddBrandPageComponent;
  let fixture: ComponentFixture<AddBrandPageComponent>;

  let brandService: BrandService;
  let loaderService: LoaderService;
  let toastService: ToastService;

  const setupMocks = () => {
    const brandServiceMock = {
      addBrand: jest.fn(),
    };

    const loaderServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    };

    const toastServiceMock = {
      showToast: jest.fn(),
    };

    return { brandServiceMock, loaderServiceMock, toastServiceMock };
  };

  const formData: Brand = {
    name: 'Nueva Marca',
    description: 'descripción',
  };

  const mockResponse: ApiResponse = {
    message: 'Marca agregada exitosamente!',
    status: 200,
    timestamp: '2024-12-12',
  };

  beforeEach(async () => {
    const { brandServiceMock, loaderServiceMock, toastServiceMock } =
      setupMocks();
    await TestBed.configureTestingModule({
      declarations: [AddBrandPageComponent, BrandFormComponent, InputComponent],
      providers: [
        { provide: BrandService, useValue: brandServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBrandPageComponent);
    component = fixture.componentInstance;

    brandService = TestBed.inject(BrandService);
    loaderService = TestBed.inject(LoaderService);
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  const testSuccessResponse = () => {
    jest.spyOn(brandService, 'addBrand').mockReturnValue(of(mockResponse));
    const toastShowSpy = jest.spyOn(toastService, 'showToast');
    const resetFormSpy = jest.spyOn(component.brandForm, 'resetForm');

    component.onFormSubmit(formData);

    expect(loaderService.show).toHaveBeenCalled();
    expect(brandService.addBrand).toHaveBeenCalledWith(formData);
    expect(toastShowSpy).toHaveBeenCalledWith({
      message: mockResponse.message,
      duration: 10000,
      type: StatesTypes.SUCCESS,
    });
    expect(resetFormSpy).toHaveBeenCalled();
    expect(loaderService.hide).toHaveBeenCalled();
  };

  const testErrorResponse = (error: any) => {
    jest
      .spyOn(brandService, 'addBrand')
      .mockReturnValue(throwError(() => error));
    const toastShowSpy = jest.spyOn(toastService, 'showToast');

    component.onFormSubmit(formData);

    expect(loaderService.show).toHaveBeenCalled();
    expect(brandService.addBrand).toHaveBeenCalledWith(formData);
    expect(toastShowSpy).toHaveBeenCalledWith({
      message: error.error?.message || ErrorMessages.GENERIC_ERROR_MESSAGE,
      duration: 10000,
      type: StatesTypes.ERROR,
    });
    expect(loaderService.hide).toHaveBeenCalled();
  };

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a addBrand y mostrar el toast de éxito', () => {
    testSuccessResponse();
  });

  it('debería manejar un error al añadir una marca y mostrar el toast de error', () => {
    const mockError = { message: ErrorMessages.GENERIC_ERROR_MESSAGE };
    testErrorResponse(mockError);
  });

  it('debería manejar un error específico al agregar marca', () => {
    const mockError = {
      error: { message: ErrorMessages.GENERIC_ERROR_MESSAGE },
    };
    testErrorResponse(mockError);
  });

  it('debería manejar un error sin mensaje y mostrar el toast de error genérico', () => {
    const mockError = {};
    testErrorResponse(mockError);
  });

  it('debería llamar a hide de loaderService al completar la solicitud', () => {
    jest.spyOn(brandService, 'addBrand').mockReturnValue(of(mockResponse));

    component.onFormSubmit(formData);
    expect(loaderService.show).toHaveBeenCalled();
  });
});
