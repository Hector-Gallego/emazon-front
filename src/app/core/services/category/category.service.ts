import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //private mockTokenAux = 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhdXhAZ21haWwuY29tIiwicm9sZSI6IldBUkVIT1VTRV9BU1NJU1RBTlQiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo5MDAwIiwibmFtZSI6IkF1eCIsImV4cCI6MTczMDk0NzE0MCwidXNlcklkIjoxMX0.Zo4wzKfHqOBan9GhOSY0kaLWUthP64xPVAzOfGxsJOWS0V5CQheF5akmZdm2teWcVtE1aktThCRaip62JQAvxsL4hqTfN86VoXQNfxtLkmN2bfR6nm7s96deGy78b-L6nkRdIOVDG-gAAK_BmX81hzhE-dqjtT0R94VIL9mkJfGcB1AJ5LAURRpqL7TZe76KPBdg2S5X6LFkLqFWMl8Mgzdf0YnoDHtnWkVQBkC9q95WC78kcU-ij_ld4YfY9qhD1ug-2NPkKPGhe6vl_EZfKOyZml8g46zcssBWyVtjeiWPe42Ai_E_GqTwBYQYjsyUpfyyx1LUH1KWu7hoayl0YA';
  private mockTokenAdmin = 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo5MDAwIiwibmFtZSI6ImFkbWluIiwiZXhwIjoxNzMwOTUyMzQ3LCJ1c2VySWQiOjV9.YE-CU10FQpo7CTcJPYOm-cMzacbfHreZtgNWxaapxwWhQ_93VOE9ysHskbtBkP3MtrR2O6hIM-MWRTMx8oaOifKDYYnjH3aduNzT6QiYZcp-pob0DB_sZf9OMS7RIdivgMmYLpefyjYVC6DVCKlq6hwOU0bhg1YwOqG3QJpHE02-W_9WK12sJeBN3JRlXkmp-LyFzKWduCRUk_iULXudPIyFswDcQ3v4B5JDyewCWCRpe_OgD6mLz81RpA0uhQ9lQ52N3gmz_5PCbQjzmwraiUiRgDW3QfCVPD5bgXw6REzQjpYut5mDW7llyuYuqnpGA1kkxX5P9AdIuIiUi8TCzQ';
 
  private apiUrl = 'http://localhost:8080/api/category'; 
  constructor(private http: HttpClient) { }
  addCategory(categoryData: any): Observable<any>{
    const headers = { Authorization: this.mockTokenAdmin};
    return this.http.post(this.apiUrl, categoryData, {headers})
  }
}
