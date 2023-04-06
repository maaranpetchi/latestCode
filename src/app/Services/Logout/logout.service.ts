import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private currentUserUrl = 'https://localhost:7208/api/Employee/GetEmployeeList';
  constructor(private http: HttpClient) { }
  


  logout(): Observable<any> {
    return this.http.get('https://localhost:7208/api/Account/logout', {});
  }


  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.currentUserUrl,);
  }

}
