import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvanceadjustmentService {
  public departmentoptionapiurl="https://localhost:7208/api/Customer/GetCustomers";
  
  constructor(private _http: HttpClient) {}

  getdropdownvalues(): Observable<any> {
    return this._http.get(`https://localhost:7208/api/Customer/GetCustomers`);
  }

}
