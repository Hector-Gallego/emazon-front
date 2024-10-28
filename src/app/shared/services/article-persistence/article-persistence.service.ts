import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article, ArticleResponse } from '../../interfaces/article.interface';
import { Observable } from 'rxjs';
import { ApiResponse, ApiResponseData } from '../../interfaces/api-response.interface';
import { environment } from 'src/environments/environment';
import { ArticleValuesConstants } from '../../constants/article.constant';
import { PaginationRequest } from '../../interfaces/pagination-request.interface';
import { PaginationResponse } from '../../interfaces/pagination-response.interface';
import { checkToken } from 'src/app/core/interceptors/token-interceptor/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ArticlePersistenceService {

  constructor(private readonly http: HttpClient) { }

  addArticle(articleData: Article): Observable<ApiResponse> {
    
    return this.http.post<ApiResponse>(
      environment.stockApiUrl + ArticleValuesConstants.END_POINT_ARTILCLE_SAVE,
      articleData,
      { context: checkToken() }
    );
  }

  getArticles(
    paginationRequest: PaginationRequest
  ): Observable<PaginationResponse<ArticleResponse>> {
    let params = new HttpParams({ fromObject: { ...paginationRequest } });
    return this.http.get<PaginationResponse<ArticleResponse>>(
      environment.stockApiUrl + ArticleValuesConstants.END_POINT_ARTILCLE,
      {
        params,
        context: checkToken(),
      }
    );
  }

  getArticleById(id: number): Observable<ApiResponseData<ArticleResponse>>{
    return this.http.get<ApiResponseData<ArticleResponse>>(
      environment.stockApiUrl + ArticleValuesConstants.END_POINT_ARTILCLE +`/${id}`,
      {
        context: checkToken()
      }
    );
  }
}
