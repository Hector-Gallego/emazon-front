import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarehouseAssistantPageComponent } from './add-warehouse-assistant-page.component';
import { UserPersistenceService } from 'src/app/shared/services/user-persistence/user-persistence.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from 'src/app/components/atoms/atoms.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import {
  StatesTypes,
  ErrorMessages,
} from 'src/app/shared/constants/commonConstants';
import { of, throwError } from 'rxjs';

describe('AddWarehouseAssistantPageComponent', () => {
  let component: AddWarehouseAssistantPageComponent;
  let fixture: ComponentFixture<AddWarehouseAssistantPageComponent>;
  let loaderService: LoaderService;
  let userService: jest.Mocked< UserPersistenceService>;
  let toastService: ToastService;

  

  const mockUser: User = {
    name: 'Adidas',
    lastName: '',
    identityDocument: 0,
    phoneNumber: '',
    birthDate: '',
    email: '',
    password: '',
  };

  const mockResponse: ApiResponse = {
    message: 'Brand added successfully',
    status: 200,
    timestamp: '2024-10-10',
  };

  beforeEach(async () => {
    const loaderServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    };

    const userServiceMock = {
      addUser: jest.fn(),
    };
    const toastServiceMock = {
      triggerToast: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AddWarehouseAssistantPageComponent],
      imports: [FormsModule, ReactiveFormsModule, AtomsModule, OrganismModule],
      providers: [
        { provide: UserPersistenceService, useValue: userServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    loaderService = TestBed.inject(LoaderService);
    userService = TestBed.inject(UserPersistenceService) as jest.Mocked<UserPersistenceService>;
    toastService = TestBed.inject(ToastService);
    fixture = TestBed.createComponent(AddWarehouseAssistantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('déberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería gestionar correctamente el envío del formulario y mostrar mensajes apropiados', () => {
    userService.addUser.mockReturnValue(of(mockResponse));

    component.onFormSubmit(mockUser);

    expect(loaderService.show).toHaveBeenCalledTimes(1);
    expect(userService.addUser).toHaveBeenCalledWith(mockUser);
    expect(toastService.triggerToast).toHaveBeenCalledTimes(1);
    expect(toastService.triggerToast).toHaveBeenCalledWith(
      mockResponse.message,
      StatesTypes.SUCCESS,
      component.toastDuration
    );
    expect(loaderService.hide).toHaveBeenCalledTimes(1);
  });

  it('debería manejar los errores enviados por el servidor al enviar los datos del formulario', () => {
    
    const errorResponse = { error: { message: 'Error agregando marca' } };
    userService.addUser.mockReturnValue(throwError(() => errorResponse));
    
    component.onFormSubmit(mockUser);

    expect(loaderService.show).toHaveBeenCalledTimes(1);
    expect(userService.addUser).toHaveBeenCalledTimes(1);
    expect(toastService.triggerToast).toHaveBeenCalledTimes(1);
    expect(toastService.triggerToast).toHaveBeenCalledWith(
      errorResponse.error.message,
      StatesTypes.ERROR,
      component.toastDuration
    );
    expect(loaderService.hide).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores genéricos al enviar los datos del formulario()', () => {
    userService.addUser.mockReturnValue(
      throwError(() => {
        Error('error');
      })
    );

    component.onFormSubmit(mockUser);

    expect(loaderService.show).toHaveBeenCalledTimes(1);
    expect(toastService.triggerToast).toHaveBeenCalledTimes(1);
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
    expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
  });
});
