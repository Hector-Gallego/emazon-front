import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../interfaces/category.interface';
import { ApiResponse } from '../../../../shared/interfaces/api-response.interface';
import { CategoryValuesConstants } from 'src/app/modules/category/constants/category.constants';
import { CategoryDataForm } from '../../interfaces/category-data-form.interface';
import { PaginationRequest } from 'src/app/shared/interfaces/pagination-request.interface';
import { DataPagination } from 'src/app/shared/interfaces/data-pagination-interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryPersistenceService {
  constructor(private http: HttpClient) {}

  addCategory(categoryData: CategoryDataForm): Observable<ApiResponse> {
    const headers = { Authorization: environment.mockTokenAdmin };
    return this.http.post<ApiResponse>(
      environment.stockApiUrl + CategoryValuesConstants.END_POINT_CATEGORY,
      categoryData,
      { headers }
    );
  }

  getCategories(
    paginationRequest: PaginationRequest
  ): Observable<DataPagination<Category>> {
    const headers = { Authorization: environment.mockTokenAdmin };
    let params = new HttpParams({ fromObject: { ...paginationRequest } });

    return this.http.get<DataPagination<Category>>(
      environment.stockApiUrl + CategoryValuesConstants.END_POINT_CATEGORY,
      {
        params,
        headers,
      }
    );
  }
}
