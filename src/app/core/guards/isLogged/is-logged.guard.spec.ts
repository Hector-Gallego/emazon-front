import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IsLoggedGuard } from './is-logged.guard'; 
import { TokenService } from '../../services/token-service/token.service';

describe('IsLoggedGuard', () => {
  let guard: IsLoggedGuard;
  let tokenService: TokenService;
  let router: Router;

  beforeEach(() => {
    const tokenServiceMock = {
      isValidToken: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        IsLoggedGuard,
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(IsLoggedGuard);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  describe('canLoad', () => {
    it('debería permitir la carga si el token es válido', () => {
    
      (tokenService.isValidToken as jest.Mock).mockReturnValue(true);

      const result = guard.canLoad();

      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('debería redirigir a la página de login si el token no es válido', () => {
    
      (tokenService.isValidToken as jest.Mock).mockReturnValue(false);

      const result = guard.canLoad();

      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    });
  });
});
