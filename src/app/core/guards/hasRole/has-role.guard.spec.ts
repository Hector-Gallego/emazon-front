import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/enums/role.enum';
import { TokenService } from '../../services/token-service/token.service';
import { hasRole } from './has-role.guard';

let tokenService: TokenService;
let router: Router;

xdescribe('hasRole Guard', () => {
  const mockTokenService = {
    getRoleUser: jest.fn(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: mockTokenService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  test('debería retornar true si el usuario tiene un rol valido', () => {
    const allowedRoles = [Role.ADMIN, Role.CLIENT];
    mockTokenService.getRoleUser.mockReturnValue(Role.ADMIN);

    const guard = hasRole(allowedRoles);

    expect(guard()).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  test('debería redireccionar a /articulos si el usuario es CLIENT', () => {
    const allowedRoles = [Role.ADMIN];
    mockTokenService.getRoleUser.mockReturnValue(Role.CLIENT);

    //const guard = TestBed.runInInjectionContext(() => hasRole(allowedRoles));

    //expect(guard()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/articulos']);
  });
});
