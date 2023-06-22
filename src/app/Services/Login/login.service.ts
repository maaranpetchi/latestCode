import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl =environment.apiURL+ 'Account/externalLogin';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}`, { username, password });
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token') && this.cookieService.check('username');
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  getUsername(): string {
    return this.cookieService.get('username');
  }


  getProcessId() {
    return this.cookieService.get('processId');
  }
}
