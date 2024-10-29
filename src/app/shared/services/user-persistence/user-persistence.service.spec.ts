import { TestBed } from '@angular/core/testing';

import { UserPersistenceService } from './user-persistence.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user.interface';
import { UserValuesConstants } from '../../constants/user.constants';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { checkToken, TokenInterceptor } from 'src/app/core/interceptors/token-interceptor/token.interceptor';

describe('UserPersistenceService', () => {
  let service: UserPersistenceService;
  let httpMock: HttpTestingController;

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

  it('debería enviar una solicitud POST para añadir una usuario', () => {
    const mockCategoryData: User = {
      name: '',
      lastName: '',
      identityDocument: 0,
      phoneNumber: '',
      birthDate: '',
      email: '',
      password: ''
    };
    const mockResponse = {
      success: true,
      message: 'Usuario añadido correctamente',
    };

    service.addUser(mockCategoryData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      environment.userApiUrl + UserValuesConstants.END_POINT_REGISTER_WAREHOUSE_ASSISTANT
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

});
