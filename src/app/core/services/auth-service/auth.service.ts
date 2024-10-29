import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/core/services/token-service/token.service';
import { LoginResponse } from 'src/app/shared/interfaces/login.response.interface';
import { LoginRequest } from 'src/app/shared/interfaces/login-request.interface';
import { UserValuesConstants } from 'src/app/shared/constants/user.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        environment.userApiUrl + UserValuesConstants.END_POINT_LOGIN,
        loginRequest
      )
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.accessToken);
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
  }
}
