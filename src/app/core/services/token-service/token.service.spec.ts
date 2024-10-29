import { TestBed } from '@angular/core/testing';
import Cookies from 'js-cookie';
import { TokenService } from './token.service';
import { Role } from 'src/app/shared/enums/role.enum';

jest.mock('js-cookie', () => ({
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService],
    });
    service = TestBed.inject(TokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('saveToken', () => {
    it('debería guardar el token en una cookie con expiración de 365 días', () => {
      const token = 'test-token';
      service.saveToken(token);
      expect(Cookies.set).toHaveBeenCalledWith('token', token, { expires: 365, path: '/' });
    });
  });

  describe('getToken', () => {
    it('debería devolver el token desde las cookies', () => {
      const token = 'test-token';
      (Cookies.get as jest.Mock).mockReturnValue(token);
      expect(service.getToken()).toBe(token);
    });
  });

  describe('removeToken', () => {
    it('debería eliminar el token de las cookies', () => {
      service.removeToken();
      expect(Cookies.remove).toHaveBeenCalledWith('token');
    });
  });

  describe('isValidToken', () => {
    it('debería devolver false si no hay un token', () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);
      expect(service.isValidToken()).toBe(false);
    });

    it('debería devolver false si el token ha expirado', () => {
      const expiredToken = { exp: Math.floor(Date.now() / 1000) - 60 }; 
      (Cookies.get as jest.Mock).mockReturnValue('expired-token');
      (jest.requireMock('jwt-decode').jwtDecode as jest.Mock).mockReturnValue(expiredToken);

      expect(service.isValidToken()).toBe(false);
    });

    it('debería devolver true si el token es válido', () => {
      const validToken = { exp: Math.floor(Date.now() / 1000) + 3600 }; 
      (Cookies.get as jest.Mock).mockReturnValue('valid-token');
      (jest.requireMock('jwt-decode').jwtDecode as jest.Mock).mockReturnValue(validToken);

      expect(service.isValidToken()).toBe(true);
    });
  });

  describe('getRoleUser', () => {
    it('debería devolver NO_ROLE si no hay un token', () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);
      expect(service.getRoleUser()).toBe(Role.NO_ROLE);
    });

    it('debería devolver ADMIN si el rol es ADMIN', () => {
      const mockToken = 'mock.jwt.token';
      jest.spyOn(service, 'getToken').mockReturnValue(mockToken);
      (jest.requireMock('jwt-decode').jwtDecode as jest.Mock).mockReturnValue({
        role: 'ADMIN',
      });

      const result = service.getRoleUser();
      expect(result).toBe(Role.ADMIN);
    });

    it('debería devolver WAREHOUSE_ASSISTANT si el rol es WAREHOUSE_ASSISTANT', () => {
      const mockToken = 'mock.jwt.token';
      jest.spyOn(service, 'getToken').mockReturnValue(mockToken);
      (jest.requireMock('jwt-decode').jwtDecode as jest.Mock).mockReturnValue({
        role: 'WAREHOUSE_ASSISTANT',
      });

      const result = service.getRoleUser();
      expect(result).toBe(Role.WAREHOUSE_ASSISTANT);
    });

    it('debería devolver CLIENT si el rol es CLIENT', () => {
      const mockToken = 'mock.jwt.token';
      jest.spyOn(service, 'getToken').mockReturnValue(mockToken);
      (jest.requireMock('jwt-decode').jwtDecode as jest.Mock).mockReturnValue({
        role: 'CLIENT',
      });

      const result = service.getRoleUser();
      expect(result).toBe(Role.CLIENT);
    });

    it('debería devolver NO_ROLE si el rol del token no es reconocido', () => {
      const mockToken = 'unknown-role-token';
      jest.spyOn(service, 'getToken').mockReturnValue(mockToken);
      (jest.requireMock('jwt-decode').jwtDecode as jest.Mock).mockReturnValue({
        role: 'UNKNOWN_ROLE',
      });

      const result = service.getRoleUser();
      expect(result).toBe(Role.NO_ROLE);
    });
  });
});
