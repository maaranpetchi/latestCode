import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorCategoryService {

  constructor(private http :HttpClient) { }


  // List of errorsCategoryService
  getErrorCategoryList(): Observable<any> {
    return this.http.get('https://localhost:7208/api/ErrorCategory/ListErrorCategory')
  }

  // ErrorCategoryLists
  getCategoryList(): Observable<any> {
    return this.http.get('https://localhost:7208/api/Scope/GetDropDownList')
  }

  //  ErrorCategory Details 
  getErrorCategoryDetails(id:any): Observable<any>{
    return this.http.get(`https://localhost:7208/api/ErrorCategory/GetErrorCategoryDetails?Id= ${id}`)
  }
  // Update error category.
  updateErrorCategory(id:any):Observable<any>{
    return this.http.post('https://localhost:7208/api/ErrorCategory/Update-ErrorCategory' , id)
  }

   //Delete ErrorCategory
  deleteErrorCategoryDetails(id:any):Observable<any>{
    return this.http.get(`https://localhost:7208/api/ErrorCategory/Delete-ErrorCategory?Id= ${id}`)
  }
}
