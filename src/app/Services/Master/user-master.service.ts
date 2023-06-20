import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../Login/login.service';

@Injectable({
  providedIn: 'root',
})
export class UserMasterService {
  constructor(private _http: HttpClient, private loginservice: LoginService) {}

  // Get master user.
  getAllMasterUsers(): Observable<any> {
    return this._http.get('https://localhost:7208/api/User/GetAllUsers');
  }
  // Add EmployeeMaster User.
  getEmployees(): Observable<any> {
    return this._http.get('https://localhost:7208/api/User/GetEmployees');
  }
  getEmployeeCodeByEmployId(id: number): Observable<any> {
    return this._http.get(
      `https://localhost:7208/api/User/GetEmployeeCodeByEmployeeId?employeeid=${id}`
    );
  }
  getUserByEmployeeId(id: number) {
    return this._http.get(
      `https://localhost:7208/api/User/getUserById?Id=${id}`
    );
  }
  //  Get menu for add edit user
  getMenu(): Observable<any> {
    return this._http.get('https://localhost:7208/api/User/getMenu');
  }
  //  GetallCustomers menu for add edit user
  getAllCustomers(): Observable<any> {
    return this._http.get('https://localhost:7208/api/User/GetAllCustomers');
  }
  
  deleteMasterUser(id:any):Observable<any> {
    return this._http.post(`https://localhost:7208/api/User/DeleteUser`, id);
  }
}
