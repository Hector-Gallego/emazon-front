import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { TokenService } from 'src/app/core/services/token-service/token.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { Role } from 'src/app/shared/enums/role.enum';
import { LoginRequest } from 'src/app/shared/interfaces/login-request.interface';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganismModule } from 'src/app/components/organism/organism.module';
import {
  ErrorMessages,
  StatesTypes,
} from 'src/app/shared/constants/commonConstants';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: jest.Mocked<Router>;
  let toastService: jest.Mocked<ToastService>;
  let loaderService: jest.Mocked<LoaderService>;
  let authService: jest.Mocked<AuthService>;
  let tokenService: jest.Mocked<TokenService>;

  beforeEach(async () => {
    const authServiceMock = {
      login: jest.fn(),
    };

    const tokenServiceMock = {
      getRoleUser: jest.fn(),
    };

    const loaderServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    };

    const toastServiceMock = {
      triggerToast: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [SharedModule, OrganismModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>;
    loaderService = TestBed.inject(LoaderService) as jest.Mocked<LoaderService>;
    tokenService = TestBed.inject(TokenService) as jest.Mocked<TokenService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a authService.login y redirigir al usuario a la pagina principal si su rol es ADMIN', () => {
    const loginData: LoginRequest = {
      username: 'test@example.com',
      password: 'password',
    };
    (authService.login as jest.Mock).mockReturnValue(of(Role.ADMIN));
    (tokenService.getRoleUser as jest.Mock).mockReturnValue(Role.ADMIN);

    component.onFormSubmit(loginData);

    expect(loaderService.show).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith(loginData);
    expect(router.navigate).toHaveBeenCalledWith(['admin']);
    expect(loaderService.hide).toHaveBeenCalled();
  });

  it('debería llamar a authService.login y redirigir al usuario a la pagina principal si su roles CLIENT', () => {
    const loginData: LoginRequest = {
      username: 'test@example.com',
      password: 'password',
    };
    (authService.login as jest.Mock).mockReturnValue(of(Role.CLIENT));
    (tokenService.getRoleUser as jest.Mock).mockReturnValue(Role.CLIENT);

    component.onFormSubmit(loginData);

    expect(loaderService.show).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith(loginData);
    expect(router.navigate).toHaveBeenCalledWith(['tienda']);
    expect(loaderService.hide).toHaveBeenCalled();
  });


  it('deberiaía mostrar un toast de error si el inicio de sesión es', () => {
    const loginData: LoginRequest = {
      username: 'test@example.com',
      password: 'wrongpassword',
    };
    const errorResponse = { error: { message: 'Login failed' } };

    authService.login.mockReturnValue(
      throwError(() => {
        errorResponse;
      })
    );

    component.onFormSubmit(loginData);

    expect(loaderService.show).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith(loginData);
    expect(loaderService.hide).toHaveBeenCalled();
  });

  it('debería manejar errores genéricos en onFormSubmit()', () => {
    const loginData: LoginRequest = {
      username: 'test@example.com',
      password: 'wrongpassword',
    };
    authService.login.mockReturnValue(
      throwError(() => {
        Error('error');
      })
    );

    component.onFormSubmit(loginData);

    expect(loaderService.show).toHaveBeenCalled();
    expect(toastService.triggerToast).toHaveBeenCalledWith(
      ErrorMessages.GENERIC_ERROR_MESSAGE,
      StatesTypes.ERROR,
      component.toastDuration
    );
    expect(loaderService.hide).toHaveBeenCalled();
  });
});
