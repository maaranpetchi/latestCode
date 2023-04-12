import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private currentUserUrl = 'https://localhost:7208/api/Employee/GetEmployeeList';

  private userchangepassword ='https://localhost:7208/api/Account/ChangePassword';

  constructor(private http: HttpClient) { }


changepassword(userId:number,oldPassword:string,latestPassword:string,conformPassword:string){
  return this.http.post<any>(`${this.userchangepassword}`,{userId,oldPassword,latestPassword,conformPassword});
}


  logout(): Observable<any> {
    return this.http.get('https://localhost:7208/api/Account/logout', {});
  }
 

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.currentUserUrl,);
  }

}
