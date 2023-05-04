import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qualitypopupjobassign',
  templateUrl: './qualitypopupjobassign.component.html',
  styleUrls: ['./qualitypopupjobassign.component.scss']
})
export class QualitypopupjobassignComponent implements OnInit {
  restApiData: any[];
  displayedColumns: string[] = ['sNo', 'jobId', 'client', 'assignedDate', 'fileName', 'tray', 'estimatedTime', 'status'];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData(); // Call the function to fetch data from the REST API
  }

  fetchData() {
    const apiUrl = 'YOUR_REST_API_URL'; // Replace with the actual REST API URL

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.restApiData = response; // Assuming the REST API response is an array of objects
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }

}
