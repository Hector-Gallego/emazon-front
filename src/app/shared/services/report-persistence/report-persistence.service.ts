import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { checkToken } from 'src/app/core/interceptors/token-interceptor/token.interceptor';
import { environment } from 'src/environments/environment';
import { PurchaseReport } from '../../interfaces/report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportPersistenceService {

  constructor(private readonly http: HttpClient) { }

  saveReport(): Observable<unknown> { 
    return this.http.post(
      environment.reportApiUrl + "/api/reports/saveReport",
      {}, 
      { context: checkToken() } 
    );
  }

  getReports(): Observable<PurchaseReport[]> {
    return this.http.get<PurchaseReport[]>(
      environment.reportApiUrl + "/api/reports/getReports",
      { context: checkToken() } 
    );
  }
}
