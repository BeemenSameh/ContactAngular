import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  logout(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token,
      })
    };

    return this._httpClient.post(`${environment.webAPIURL}/api/Account/Logout`, null, httpOptions);
  }
}
