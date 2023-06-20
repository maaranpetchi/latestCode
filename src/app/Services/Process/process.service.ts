import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http:HttpClient) { }
  
  private formDataSubject = new BehaviorSubject<any>(null);
  public formData$ = this.formDataSubject.asObservable();

  setFormData(formData: any) {
    this.formDataSubject.next(formData);
  }

  //  View Table List
  getProcessList():Observable<any>{
    return this.http.get('https://localhost:7208/api/Process/ListProcess')
  }

  //  Delete Process
  deleteProcess(id:any):Observable<any>{
   return this.http.get(`https://localhost:7208/api/Process/Delete-Process?id=${id}`)
  }

  // Create Process
  createProcess(id:any):Observable<any>{
    return this.http.post(`https://localhost:7208/api/Process/CreateProcessFlow`,id)
  }
  // update Process
  updateProcess(id:any):Observable<any>{
    return this.http.post(`https://localhost:7208/api/Process/Update-Process`,id)
  }
}
