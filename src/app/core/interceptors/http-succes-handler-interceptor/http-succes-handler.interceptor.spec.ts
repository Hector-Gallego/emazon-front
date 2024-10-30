import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StatesTypes } from 'src/app/shared/constants/commonConstants';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';
import { HttpSuccesHandlerInterceptor } from './http-succes-handler.interceptor';

describe('HttpSuccesHandlerInterceptor', () => {
  let interceptor: HttpSuccesHandlerInterceptor;
  let toastService: ToastService;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    const toastServiceSpy = { triggerToast: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        HttpSuccesHandlerInterceptor,
        { provide: ToastService, useValue: toastServiceSpy }
      ]
    });

    interceptor = TestBed.inject(HttpSuccesHandlerInterceptor);
    toastService = TestBed.inject(ToastService);

    httpHandler = {
      handle: jest.fn().mockReturnValue(of(new HttpResponse<ApiResponse>({ body: { message: 'Operación exitosa', status: 200, timestamp: '2014-12-12' } })))
    };
  });

  it('debería crear el interceptor', () => {
    expect(interceptor).toBeTruthy();
  });

  it('debería mostrar un mensaje de éxito cuando la solicitud es POST, PUT o DELETE', (done) => {
   
    const httpRequest = new HttpRequest('POST' as any, '/test-url');

    interceptor.intercept(httpRequest, httpHandler).pipe(
      tap(() => {
        expect(toastService.triggerToast).toHaveBeenCalledWith(
          'Operación exitosa',
          StatesTypes.SUCCESS,
          5000
        );
        done();
      })
    ).subscribe();
  }, 10000); 

  it('debería mostrar un mensaje predeterminado cuando no hay un mensaje en el cuerpo de la respuesta', (done) => {
    const httpRequest = new HttpRequest('POST' as any, '/test-url');
  
    httpHandler.handle = jest.fn().mockReturnValue(of(new HttpResponse<ApiResponse>({})));
  
    interceptor.intercept(httpRequest, httpHandler).pipe(
      tap(() => {
        expect(toastService.triggerToast).toHaveBeenCalledWith(
          'Operación realizada con éxito!',
          StatesTypes.SUCCESS,
          5000
        );
        done();
      })
    ).subscribe();
  });
  

  it('no debería mostrar un mensaje de éxito para solicitudes GET', (done) => {
    const httpRequest = new HttpRequest('GET' as any, '/test-url');

    interceptor.intercept(httpRequest, httpHandler).pipe(
      tap(() => {
        expect(toastService.triggerToast).not.toHaveBeenCalled();
        done();
      })
    ).subscribe();
  });
});
