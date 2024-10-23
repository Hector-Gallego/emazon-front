import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { environment } from 'src/environments/environment';
import { ArticleValuesConstants } from '../../constants/article.constant';

@Injectable({
  providedIn: 'root'
})
export class ArticlePersistenceService {

  constructor(private readonly http: HttpClient) { }

  addArticle(articleData: Article): Observable<ApiResponse> {
    const headers = { Authorization: environment.mockTokenAdmin };
    return this.http.post<ApiResponse>(
      environment.stockApiUrl + ArticleValuesConstants.END_POINT_ARTILCLE_SAVE,
      articleData,
      { headers }
    );
  }
}
