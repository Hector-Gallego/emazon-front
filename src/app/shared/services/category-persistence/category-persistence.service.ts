import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../interfaces/category.interface';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { CategoryValuesConstants } from 'src/app/shared/constants/category.constants';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import { PaginationResponse } from 'src/app/shared/interfaces/pagination-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryPersistenceService {
  constructor(private http: HttpClient) {}

  addCategory(categoryData: Category): Observable<ApiResponse> {
    const headers = { Authorization: environment.mockTokenAdmin };
    return this.http.post<ApiResponse>(
      environment.stockApiUrl + CategoryValuesConstants.END_POINT_CATEGORY,
      categoryData,
      { headers }
    );
  }

  getCategories(
    paginationRequest: PaginationRequest
  ): Observable<PaginationResponse<Category>> {
    const headers = { Authorization: environment.mockTokenAdmin };
    let params = new HttpParams({ fromObject: { ...paginationRequest } });

    return this.http.get<PaginationResponse<Category>>(
      environment.stockApiUrl + CategoryValuesConstants.END_POINT_CATEGORY,
      {
        params,
        headers,
      }
    );
  }
}
