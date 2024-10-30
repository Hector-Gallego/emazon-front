import { TestBed } from '@angular/core/testing';

import { UserPersistenceService } from './user-persistence.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user.interface';
import { UserValuesConstants } from '../../constants/user.constants';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  checkToken,
  TokenInterceptor,
} from 'src/app/core/interceptors/token-interceptor/token.interceptor';

describe('UserPersistenceService', () => {
  let service: UserPersistenceService;
  let httpMock: HttpTestingController;

  const mockUserData: User = {
    name: 'user',
    lastName: 'user',
    identityDocument: 0,
    phoneNumber: '123456',
    birthDate: '2000-10-10',
    email: 'user@gmail.com',
    password: 'User12345',
  };
  const mockResponse = {
    success: true,
    message: 'Usuario añadido correctamente',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserPersistenceService],
    });
    service = TestBed.inject(UserPersistenceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería enviar una solicitud POST para añadir una usuario auxiliar de bodega', () => {
    service.addUser(mockUserData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      environment.userApiUrl +
        UserValuesConstants.END_POINT_REGISTER_WAREHOUSE_ASSISTANT
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('debería enviar una solicitud POST para añadir un usuario cliente', () => {
    service.addUserClient(mockUserData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      environment.userApiUrl +
        UserValuesConstants.END_POINT_REGISTER_CLIENT
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
