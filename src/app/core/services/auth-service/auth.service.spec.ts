import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { TokenService } from '../../services/token-service/token.service';
import { UserValuesConstants } from 'src/app/shared/constants/user.constants';
import { LoginRequest } from 'src/app/shared/interfaces/login-request.interface';
import { LoginResponse } from 'src/app/shared/interfaces/login.response.interface';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const tokenServiceMock = {
      saveToken: jest.fn(),
      removeToken: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: TokenService, useValue: tokenServiceMock },
      ],
    });

    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('login', () => {
    it('debería realizar el login y guardar el token', () => {
      const loginRequest: LoginRequest = {
        username: 'testuser',
        password: 'testpassword',
      };
      const mockResponse: LoginResponse = {
        accessToken: 'mock_access_token',
        status: 200,
        message: 'usuario autenticado',
        timestamp: '2021-12-12',
      };

      authService.login(loginRequest).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(tokenService.saveToken).toHaveBeenCalledWith(
          mockResponse.accessToken
        );
      });

      const req = httpTestingController.expectOne(
        `${environment.userApiUrl}${UserValuesConstants.END_POINT_LOGIN}`
      );

      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('debería eliminar el token al hacer logout', () => {
      authService.logout();
      expect(tokenService.removeToken).toHaveBeenCalled();
    });
  });
});
