import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../models/category';
import { ApiResponse } from '../../models/apiResponse';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(categoryData: Category): Observable<ApiResponse>{
    const headers = { Authorization: environment.mockTokenAdmin};
    return this.http.post<ApiResponse>(environment.stockApiUrl+'/api/category', categoryData, {headers})
  }

  getCategories(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string): Observable<any> {
    const headers = { Authorization: environment.mockTokenAdmin};
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    return this.http.get<Category>(environment.stockApiUrl+'/api/category', { params, headers });
  }
}
