import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../../models/brand';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/apiResponse';
import { environment } from 'src/environments/environment';
import { BrandValuesConstants } from 'src/app/shared/constants/brandConstants';
import { PageRequest as pageRequest } from '../../models/pageRequest';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  addBrand(brandData: Brand): Observable<ApiResponse> {
    const headers = { Authorization: environment.mockTokenAdmin };
    return this.http.post<ApiResponse>(
      environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND,
      brandData,
      { headers }
    );
  }

  getBrands(PageRequest: pageRequest): Observable<any> {

    const headers = { Authorization: environment.mockTokenAdmin };
    let params = new HttpParams({ fromObject: { ...PageRequest } });
    return this.http.get<Brand>(
      environment.stockApiUrl + BrandValuesConstants.END_POINT_BRAND,
      {
        params,
        headers,
      }
    );
  }
}
