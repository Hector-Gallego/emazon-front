import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { environment } from 'src/environments/environment';
import { UserValuesConstants } from '../../constants/user.constants';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/core/services/token-service/token.service';
import { checkToken } from 'src/app/core/interceptors/token-interceptor/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UserPersistenceService {
  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  addUser(userData: User): Observable<ApiResponse> {
      
    return this.http.post<ApiResponse>(
      environment.userApiUrl +
        UserValuesConstants.END_POINT_REGISTER_WAREHOUSE_ASSISTANT,
      userData,
      { context: checkToken() }
    );
  }

  addUserClient(userData: User): Observable<ApiResponse> {
      
    return this.http.post<ApiResponse>(
      environment.userApiUrl +
        UserValuesConstants.END_POINT_REGISTER_CLIENT,
      userData,
      { context: checkToken() }
    );
  }
}
