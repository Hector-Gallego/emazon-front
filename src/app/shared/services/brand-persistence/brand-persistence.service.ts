import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../../interfaces/brand.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { environment } from 'src/environments/environment';
import { BrandValuesConstants } from 'src/app/shared/constants/brand.constant';
import { PaginationRequest } from '../../interfaces/pagination-request.interface';
import { PaginationResponse } from 'src/app/shared/interfaces/pagination-response.interface';
import { checkToken } from 'src/app/core/interceptors/token-interceptor/token.interceptor';


@Injectable({
  providedIn: 'root',
})
export class BrandPersistenceService {
  constructor(private readonly http: HttpClient) {}

  addBrand(brandData: Brand): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND,
      brandData,
      { context: checkToken() }
    );
  }

  getBrands(
    paginationRequest: PaginationRequest
  ): Observable<PaginationResponse<Brand>> {
   
    let params = new HttpParams({ fromObject: { ...paginationRequest } });
    return this.http.get<PaginationResponse<Brand>>(
      environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND,
      {
        params,
        context: checkToken()
      }
    );
  }

  getAllBrands() : Observable<any> {

    return this.http.get<any>(
      environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND + '/all',
      {
        context: checkToken()
      }
    )

  }
}
