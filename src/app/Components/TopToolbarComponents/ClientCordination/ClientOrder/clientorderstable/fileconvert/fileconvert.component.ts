import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fileconvert',
  templateUrl: './fileconvert.component.html',
  styleUrls: ['./fileconvert.component.scss']
})
export class FileconvertComponent {


  private apiUrl = 'https://api.example.com/data'; // Replace with your REST API endpoint

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
}
