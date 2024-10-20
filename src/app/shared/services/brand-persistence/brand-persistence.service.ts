import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../../interfaces/brand.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { environment } from 'src/environments/environment';
import { BrandValuesConstants } from 'src/app/shared/constants/brand.constant';
import { PaginationRequest } from '../../interfaces/pagination-request.interface';
import { PaginationResponse } from 'src/app/shared/interfaces/pagination-response.interface';


@Injectable({
  providedIn: 'root',
})
export class BrandPersistenceService {
  constructor(private readonly http: HttpClient) {}

  addBrand(brandData: Brand): Observable<ApiResponse> {
    const headers = { Authorization: environment.mockTokenAdmin };
    return this.http.post<ApiResponse>(
      environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND,
      brandData,
      { headers }
    );
  }

  getBrands(
    paginationRequest: PaginationRequest
  ): Observable<PaginationResponse<Brand>> {
    const headers = { Authorization: environment.mockTokenAdmin };
    let params = new HttpParams({ fromObject: { ...paginationRequest } });
    return this.http.get<PaginationResponse<Brand>>(
      environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND,
      {
        params,
        headers,
      }
    );
  }
}
