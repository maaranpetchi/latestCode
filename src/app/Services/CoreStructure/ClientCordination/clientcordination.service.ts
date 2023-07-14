import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../Login/login.service';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientcordinationService {

  constructor(private http: HttpClient, private loginservice: LoginService) { }
  getFileInwardType(): Observable<any> {
    return this.http.get(environment.apiURL+`ClientOrderService/getFileInwardTypeListForJO`)
  }
  //joborderexcel
  getBindFileInward(): Observable<any> {
    return this.http.get(environment.apiURL+`JobOrder/GetImportExcel?employeeId=${parseInt(this.loginservice.getUsername())}`)
  }
  //gettingvalues
  getBindFileInwardOnlyTrue():Observable<any>{
    return this.http.get(environment.apiURL+`JobOrder/GetImportExcelTrue?employeeId=${parseInt(this.loginservice.getUsername())}`)
  }
//jobOrderSubmit
postexcelSubmit(data):Observable<any>{
  return this.http.post<any>(environment.apiURL+`JobOrder/ExcelOrder`,data)
}
//JOBORDERDELETE
deletetempexcel():Observable<any>{
  return   this.http.delete<any>(environment.apiURL+`JobOrder/CancelImportExcel`)
}

}
