import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OneTimemasterService {

  constructor(
    private http:HttpClient
  ) { }

  //  Create oneTimemasterService
  oneTimemasterService(id:any):Observable<any>{
    return this.http.post(`https://localhost:7208/api/SingleEntry/postSingleEntryData`, id)
  }
  // getTable Value
  getTableValue(id:any):Observable<any>{
    return this.http.get(`https://localhost:7208/api/SingleEntry/getTableValue?tableName=${id}`)
  }
}
