import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BenchStatusService {

  constructor( 
    private http: HttpClient
  ) { }

  viewBenchStatusDescription():Observable<any>{
    return this.http.get('https://localhost:7208/api/Scope/ListofBenchStatus')
  }
  // Delete Bench Status
   deleteBenchStatusDescription(id:any):Observable<any>{
    return this.http.get(`https://localhost:7208/api/Scope/DeleteBenchStatus?id=${id}`)
   }
  //  Edit Bench Status
  editBenchStatus(id:any):Observable<any>{
    return this.http.get(`https://localhost:7208/api/Scope/GetEditBenchStatus?id=${id}`)
  }
  //  Update Bench Status
  updateBenchStatus(id:any):Observable<any>{
    return this.http.post(`https://localhost:7208/api/Scope/UpdateBenchStatus`, id)
  }
}
