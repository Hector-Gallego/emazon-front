import { TestBed } from '@angular/core/testing';
import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ErrorMessages, StatesTypes } from 'src/app/shared/constants/commonConstants';

describe('HttpErrorHandlerInterceptor', () => {
  let interceptor: HttpErrorHandlerInterceptor;
  let toastService: ToastService;
  let httpRequest: HttpRequest<unknown>;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    const toastServiceSpy = { triggerToast: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        HttpErrorHandlerInterceptor,
        { provide: ToastService, useValue: toastServiceSpy }
      ]
    });

    interceptor = TestBed.inject(HttpErrorHandlerInterceptor);
    toastService = TestBed.inject(ToastService);
    httpRequest = new HttpRequest('GET', '/test-url');
    httpHandler = {
      handle: jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500, error: { message: 'Server error' } })))
    };
  });

  it('debería crear el interceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  it('debería manejar un error y llamar a triggerToast con el mensaje de error', (done) => {
    interceptor.intercept(httpRequest, httpHandler).subscribe({
      error: () => {
        expect(toastService.triggerToast).toHaveBeenCalledWith(
          'Server error',
          StatesTypes.ERROR,
          5000
        );
        done();
      }
    });
  });

  it('debería manejar un error y usar el mensaje de error genérico si no se proporciona mensaje', (done) => {
    httpHandler.handle = jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })));

    interceptor.intercept(httpRequest, httpHandler).subscribe({
      error: () => {
        expect(toastService.triggerToast).toHaveBeenCalledWith(
          ErrorMessages.GENERIC_ERROR_MESSAGE,
          StatesTypes.ERROR,
          5000
        );
        done();
      }
    });
  });
});
