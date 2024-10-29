import { TestBed } from '@angular/core/testing';
import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpContext,
} from '@angular/common/http';
import { TokenInterceptor, CHECK_TOKEN } from './token.interceptor'; 
import { TokenService } from '../../services/token-service/token.service';
import { Observable, of } from 'rxjs';

type MockHttpHandler = {
  handle: jest.Mock<Observable<HttpEvent<any>>, [request: HttpRequest<any>]>;
};

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let tokenService: TokenService;
  let httpHandler: MockHttpHandler;

  beforeEach(() => {
    const tokenServiceMock = {
      getToken: jest.fn(),
    };

    httpHandler = {
      handle: jest.fn(
        (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
          return of(new HttpResponse({ status: 200, body: request }));
        }
      ),
    };

    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor,
        { provide: TokenService, useValue: tokenServiceMock },
      ],
    });

    interceptor = TestBed.inject(TokenInterceptor);
    tokenService = TestBed.inject(TokenService);
  });

  describe('intercept', () => {
    it('debería agregar el token a la solicitud si CHECK_TOKEN está activado', () => {
      const accessToken = 'test_token';
      (tokenService.getToken as jest.Mock).mockReturnValue(accessToken);

      const request = new HttpRequest('GET', '/test', {
        context: new HttpContext().set(CHECK_TOKEN, true),
      });

      interceptor.intercept(request, httpHandler).subscribe((event) => {
        if (event instanceof HttpResponse) {
          expect(event.body).toBe(request);
        }
      });

      expect(httpHandler.handle).toHaveBeenCalled();
      const [req] = httpHandler.handle.mock.calls[0];
      expect(req.headers.has('Authorization')).toBe(true);
      expect(req.headers.get('Authorization')).toBe(`Bearer ${accessToken}`);
    });

    it('debería no agregar el token si CHECK_TOKEN no está activado', () => {
  
      const request = new HttpRequest('GET', '/test', {
        context: new HttpContext().set(CHECK_TOKEN, false),
      });

      interceptor.intercept(request, httpHandler).subscribe((event) => {
        if (event instanceof HttpResponse) {
          expect(event.body).toBe(request);
        }
      });

      expect(httpHandler.handle).toHaveBeenCalledWith(request);
      expect(httpHandler.handle).toHaveBeenCalledTimes(1);
    });
  });
});
