import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientcordinationService {

  constructor(private http:HttpClient) { }
getFileInwardType():Observable<any>{
  return this.http.get(`https://localhost:7208/api/ClientOrderService/getFileInwardTypeListForJO`)
}
  
}
