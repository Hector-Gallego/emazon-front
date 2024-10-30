import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StatesTypes } from 'src/app/shared/constants/commonConstants';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { ApiResponse } from 'src/app/shared/interfaces/api-response.interface';

@Injectable()
export class HttpSuccesHandlerInterceptor implements HttpInterceptor {

  constructor(private readonly toastService: ToastService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<ApiResponse>) => {

        if (event instanceof HttpResponse) { 
          if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
            const successMessage = event.body?.message || 'Operación realizada con éxito!';
            this.toastService.triggerToast(successMessage, StatesTypes.SUCCESS, 5000);
          }
          
        }
      })
    );
  }
}
