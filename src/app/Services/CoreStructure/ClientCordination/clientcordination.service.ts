import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../Login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ClientcordinationService {

  constructor(private http: HttpClient, private loginservice: LoginService) { }
  getFileInwardType(): Observable<any> {
    return this.http.get(`https://localhost:7208/api/ClientOrderService/getFileInwardTypeListForJO`)
  }
  //joborderexcel
  getBindFileInward(): Observable<any> {
    return this.http.get(`https://localhost:7208/api/JobOrder/GetImportExcel?employeeId=${parseInt(this.loginservice.getUsername())}`)
  }
  getBindFileInwardOnlyTrue():Observable<any>{
    return this.http.get(`https://localhost:7208/api/JobOrder/GetImportExcelTrue?employeeId=${parseInt(this.loginservice.getUsername())}`)
  }



}
