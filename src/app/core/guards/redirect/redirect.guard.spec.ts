import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RedirectGuard } from './redirect.guard'; // Ajusta la ruta según sea necesario
import { TokenService } from '../../services/token-service/token.service';

describe('RedirectGuard', () => {
  let guard: RedirectGuard;
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
        RedirectGuard,
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(RedirectGuard);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  describe('canActivate', () => {
    it('debería redirigir a /page/articulos si el token es válido', () => {
   
      (tokenService.isValidToken as jest.Mock).mockReturnValue(true);
      const result = guard.canActivate();
      expect(result).toBe(true);
      expect(router.navigate).toHaveBeenCalledWith(['/page/articulos']);
    });

    it('debería permitir la activación si el token no es válido', () => {
      (tokenService.isValidToken as jest.Mock).mockReturnValue(false);
      const result = guard.canActivate();
      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
