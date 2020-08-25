import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RegisterModule } from './register.module';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _httpClient: HttpClient) { }
  register(registerModule: RegisterModule): Observable<any> {
    return this._httpClient.post(`${environment.webAPIURL}/api/Account/Register`, registerModule);
  }
}
