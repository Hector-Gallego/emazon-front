import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AddCategoryPageComponent } from './add-category-page.component';
import { CategoryPersistenceService } from 'src/app/shared/services/category-persistence/category-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { Category } from 'src/app/shared/interfaces/category.interface';

describe('AddCategoryPageComponent', () => {
  let component: AddCategoryPageComponent;
  let fixture: ComponentFixture<AddCategoryPageComponent>;
  let categoryServiceSpy: jest.Mocked<CategoryPersistenceService>;
  let loaderServiceSpy: jest.Mocked<LoaderService>;
  let toastServiceSpy: jest.Mocked<ToastService>;

  beforeEach(async () => {
    const caregoryServiceMock = {
      addCategory: jest.fn(),
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
        AtomsModule,
        OrganismModule
      ],
      declarations: [AddCategoryPageComponent],
      providers: [
        { provide: CategoryPersistenceService, useValue: caregoryServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryPageComponent);
    component = fixture.componentInstance;
    categoryServiceSpy = TestBed.inject(
      CategoryPersistenceService
    ) as jest.Mocked<CategoryPersistenceService>;
    loaderServiceSpy = TestBed.inject(
      LoaderService
    ) as jest.Mocked<LoaderService>;
    toastServiceSpy = TestBed.inject(ToastService) as jest.Mocked<ToastService>;

    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a show() y addCategory() en onFormSubmit() con éxito', () => {
    const mockCategory: Category = {
      name: 'ropa',
      description: 'ropa deportiva',
    };
    const mockResponse: ApiResponse = {
      message: 'categoria agregada con exito',
      status: 200,
      timestamp: '2024-10-10',
    };

    categoryServiceSpy.addCategory.mockReturnValue(of(mockResponse));

    component.onFormSubmit(mockCategory);

    expect(loaderServiceSpy.show).toHaveBeenCalled();
    expect(categoryServiceSpy.addCategory).toHaveBeenCalledWith(mockCategory);
    expect(toastServiceSpy.triggerToast).toHaveBeenCalledWith(
      mockResponse.message,
      StatesTypes.SUCCESS,
      component.toastDuration
    );
    expect(loaderServiceSpy.hide).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores en onFormSubmit()', () => {
    const mockCategory: Category = {
      name: 'ropa',
      description: 'ropa deportiva',
    };

    const errorResponse = {
      error: { message: 'Error al agregar la categoria' },
    };

    categoryServiceSpy.addCategory.mockReturnValue(
      throwError(() => errorResponse)
    );

    component.onFormSubmit(mockCategory);

    expect(loaderServiceSpy.show).toHaveBeenCalled();
    expect(toastServiceSpy.triggerToast).toHaveBeenCalledWith(
      errorResponse.error.message,
      StatesTypes.ERROR,
      component.toastDuration
    );
    expect(loaderServiceSpy.hide).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores genéricos en onFormSubmit()', () => {
    const mockCategory: Category = {
      name: 'ropa',
      description: 'ropa deportiva',
    };

    categoryServiceSpy.addCategory.mockReturnValue(throwError(() => Error('error')));

    component.onFormSubmit(mockCategory);

    expect(loaderServiceSpy.show).toHaveBeenCalled();
    expect(toastServiceSpy.triggerToast).toHaveBeenCalledWith(
      ErrorMessages.GENERIC_ERROR_MESSAGE,
      StatesTypes.ERROR,
      component.toastDuration
    );
    expect(loaderServiceSpy.hide).toHaveBeenCalledTimes(1);
  });

  it('debería desuscribir de las suscripciones al destruir el componente', () => {
    const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
