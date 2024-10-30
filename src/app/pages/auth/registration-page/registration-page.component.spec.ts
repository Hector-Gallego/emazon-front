import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageComponent } from './registration-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { UserPersistenceService } from 'src/app/shared/services/user-persistence/user-persistence.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { of } from 'rxjs';
import { LoginPageComponent } from '../login-page/login-page.component';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;

  let loaderService: LoaderService;
  let userService: jest.Mocked<UserPersistenceService>;

  const mockUser: User = {
    name: 'user',
    lastName: 'user',
    identityDocument: 21212,
    phoneNumber: '12121212',
    birthDate: '2000-10-10',
    email: 'user@gmail.com',
    password: 'User12345',
  };

  const mockResponse: ApiResponse = {
    message: 'Ususario registrado con exito',
    status: 200,
    timestamp: '2024-10-10',
  };

  beforeEach(async () => {
    const loaderServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    };

    const userServiceMock = {
      addUserClient: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      imports: [
        SharedModule,
        OrganismModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'auth/login', component: LoginPageComponent } 
        ]),
      ],
      providers: [
        { provide: UserPersistenceService, useValue: userServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
      ],
    }).compileComponents();

    loaderService = TestBed.inject(LoaderService);
    userService = TestBed.inject(
      UserPersistenceService
    ) as jest.Mocked<UserPersistenceService>;
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('dbería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería gestionar correctamente el envío del formulario y mostrar mensajes apropiados', () => {
    userService.addUserClient.mockReturnValue(of(mockResponse));
    component.onFormSubmit(mockUser);
    expect(loaderService.show).toHaveBeenCalledTimes(1);
    expect(userService.addUserClient).toHaveBeenCalledWith(mockUser);
    expect(loaderService.hide).toHaveBeenCalledTimes(1);
  });
});
