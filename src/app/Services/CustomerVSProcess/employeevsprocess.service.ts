
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../Login/login.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeevsprocessService {
  public departmentoptionapiurl="https://localhost:7208/api/CustomerVsProcess/GetAllddlList";
  
  constructor(private _http: HttpClient, private loginservice:LoginService) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post('https://localhost:7208/api/Employee/AddEmployee', data);
  }

  updateEmployee(employeeId: number, data: any): Observable<any> {
    return this._http.put(`https://localhost:7208/api/Employee/EditEmployee/${employeeId}`, data);
  }

  getEmployeeList(): Observable<any> {

     return this._http.get('https://localhost:7208/api/CustomerVsProcess/CustomerVsProcess');
    // return fetch('https://localhost:7208/api/Employee/GetEmployeeList').then(res => res.json());
  }
  getOptions(): Observable<any[]> {
    return this._http.get<any[]>(this.departmentoptionapiurl);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.get(`https://localhost:7208/api/CustomerVsProcess/DeleteProcessworkflow?Id=${id}&EmployeeId=${parseInt(this.loginservice.getUsername())}`);
  }


  changeapi(data):Observable<any>{
   return  this._http.post<any>('https://localhost:7208/api/CustomerVsProcess/GetScopeList', data)
  }
}
