import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../../Login/login.service';
@Injectable({
  providedIn: 'root'
})
export class ProductionAllocationService {
  constructor(private http:HttpClient,private loginservice:LoginService) { }


  getJobCategoryStatusMessage(){
   return this.http.get<any[]>(`https://localhost:7208/api/allocation/getjobcategory`)
  }
}
