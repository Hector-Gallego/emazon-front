import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../../interfaces/brand.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../shared/interfaces/api-response.interface';
import { environment } from 'src/environments/environment';
import { BrandValuesConstants } from 'src/app/modules/brand/constant/brand.constant';
import { PaginationRequest } from '../../../../shared/interfaces/pagination-request.interface';
import { DataPagination } from 'src/app/shared/interfaces/data-pagination-interface';
import { BrandDataForm } from '../../interfaces/brand-data-form.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandPersistenceService {
  constructor(private http: HttpClient) {}

  addBrand(brandData: BrandDataForm): Observable<ApiResponse> {
    const headers = { Authorization: environment.mockTokenAdmin };
    return this.http.post<ApiResponse>(
      environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND,
      brandData,
      { headers }
    );
  }

  getBrands(
    paginationRequest: PaginationRequest
  ): Observable<DataPagination<Brand>> {
    const headers = { Authorization: environment.mockTokenAdmin };
    let params = new HttpParams({ fromObject: { ...paginationRequest } });
    return this.http.get<DataPagination<Brand>>(
      environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND,
      {
        params,
        headers,
      }
    );
  }
}
