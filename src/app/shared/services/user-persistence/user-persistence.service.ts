import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { environment } from 'src/environments/environment';
import { UserValuesConstants } from '../../constants/user.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserPersistenceService {

  constructor(private readonly http: HttpClient) { }

  addUser(userData: User): Observable<ApiResponse> {
    const headers = { Authorization: environment.mockTokenAdmin };
    return this.http.post<ApiResponse>(
      environment.userApiUrl + UserValuesConstants.END_POINT_REGISTER_WAREHOUSE_ASSISTANT,
      userData,
      { headers }
    );
  }
}
