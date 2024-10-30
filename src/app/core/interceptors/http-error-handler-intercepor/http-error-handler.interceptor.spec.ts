import { TestBed } from '@angular/core/testing';

import { HttpErrorHandlerInterceptor } from './http-error-handler.interceptor';

describe('HttpErrorHandlerService', () => {
  let service: HttpErrorHandlerInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorHandlerInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
