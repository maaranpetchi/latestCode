import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

   
  
  constructor(private _http: HttpClient) {}
 
 

  addEmployee(data: any): Observable<any> {
    return this._http.post(environment.apiURL+'Employee/AddEmployee', data);
  }

  updateEmployee(data: any): Observable<any> {
    //  // Set the request headers
    //  const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this._http.post(environment.apiURL+`Employee/EditEmployee`, data);
  }

  getEmployeeList(): Observable<any> {

     return this._http.get(environment.apiURL+'Employee/GetEmployee');
    // return fetch('https://localhost:7208/api/Employee/GetEmployeeList').then(res => res.json());
  }


  

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7208/api/Employee/PostDeleteEmployee?data=${id}&data1=152`);
  }
}
