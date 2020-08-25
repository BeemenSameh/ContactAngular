import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LoginModule, LoginResponseModule } from './login.module';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient) { }
  login(loginModule: LoginModule): Observable<LoginResponseModule> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'access-control-allow-headers': '*',
        // 'access-control-allow-methods': 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
        // 'access-control-allow-origin': '*',
        // 'access-control-expose-headers': '*'
      })
    };

    const body = new HttpParams().set('grant_type', 'password').set('username', loginModule.username).set('password', loginModule.password);

    return this._httpClient.post<LoginResponseModule>(`${environment.webAPIURL}/token`, body.toString(), httpOptions);
  }
}
