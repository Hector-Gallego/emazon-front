import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorMessages, StatesTypes } from 'src/app/shared/constants/commonConstants';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private readonly toastService: ToastService) { }
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        const errorMessage =
          error?.error?.message || ErrorMessages.GENERIC_ERROR_MESSAGE;

        this.toastService.triggerToast(
          errorMessage,
          StatesTypes.ERROR,
          5000 
        );

        return throwError(() => error);

      })
    );
  }
}
