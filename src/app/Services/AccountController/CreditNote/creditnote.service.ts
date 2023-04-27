import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreditnoteService {

  constructor(private _http: HttpClient) {}
 


  getcustomerdropdown():Observable<any>{

    return this._http.get('https://localhost:7208/api/Customer/GetCustomers')
  }
  addEmployee(data: any): Observable<any> {
    return this._http.post('https://localhost:7208/api/Employee/AddEmployee', data);
  }

  updateEmployee(data: any): Observable<any> {
    return this._http.post(`https://localhost:7208/api/Employee/EditEmployee`, data);
  }

  getEmployeeList(): Observable<any> {
     return this._http.get('https://localhost:7208/api/Receivable/GetAllCreditNotes');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7208/api/Employee/PostDeleteEmployee?data=${id}&data1=152`);
  }
}
