import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HasRoleGuard } from './has-role.guard';
import { TokenService } from '../../services/token-service/token.service';
import { Role } from 'src/app/shared/enums/role.enum';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('HasRoleGuard', () => {
  let guard: HasRoleGuard;
  let tokenService: jest.Mocked<TokenService>;
  let router: jest.Mocked<Router>;
  let route: Partial<ActivatedRouteSnapshot>;

  beforeEach(() => {
    const tokenServiceMock = {
      getRoleUser: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    route = {
      data: { allowRoles: [Role.ADMIN, Role.CLIENT] },
    };

    TestBed.configureTestingModule({
      providers: [
        HasRoleGuard,
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    router = TestBed.inject(Router) as jest.Mocked<Router>;
    tokenService = TestBed.inject(TokenService) as jest.Mocked<TokenService>;
    guard = TestBed.inject(HasRoleGuard);
  });

  it('debería permitir el acceso si el rol del usuario está en los roles permitidos', () => {
    tokenService.getRoleUser.mockReturnValue(Role.ADMIN);

    const result = guard.canActivate(route as ActivatedRouteSnapshot);

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debería denegar el acceso y redirigir al usuario a /admin si no tiene un rol permitido', () => {
    tokenService.getRoleUser.mockReturnValue(Role.NO_ROLE);

    const result = guard.canActivate(route as ActivatedRouteSnapshot);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['admin']);
  });

  it('debería denegar el acceso y redirigir al usuario a /articulos si el rol es CLIENT pero no está permitido', () => {
    tokenService.getRoleUser.mockReturnValue(Role.CLIENT);
    route.data = { allowRoles: [Role.ADMIN] };

    const result = guard.canActivate(route as ActivatedRouteSnapshot);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['tienda']);
  });
});
