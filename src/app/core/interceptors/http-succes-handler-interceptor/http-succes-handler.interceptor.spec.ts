import { TestBed } from '@angular/core/testing';

import { HttpSuccesHandlerInterceptor } from './http-succes-handler.interceptor';

describe('HttpSuccesHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpSuccesHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpSuccesHandlerInterceptor = TestBed.inject(HttpSuccesHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
