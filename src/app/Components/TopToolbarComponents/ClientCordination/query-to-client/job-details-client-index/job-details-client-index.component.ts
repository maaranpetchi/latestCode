import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-job-details-client-index',
  templateUrl: './job-details-client-index.component.html',
  styleUrls: ['./job-details-client-index.component.scss']
})
export class JobDetailsClientIndexComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient){}
  
 displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataJobSource: MatTableDataSource<any>;
 displayedQueryColumns: string[] = ['movedFrom', 'movedTo', 'jobStatus', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataQuerySource: MatTableDataSource<any>;

 remarks: string;  // to store the remark value
 selectedQureryStatus: string; // to store the selected query status



  ngOnInit() {
    // Fetch data from the REST API and populate the table
    this.http.post<any>('https://localhost:7208/api/JobOrder/getJobHistory',this.data.jid).subscribe(data => {
      this.dataJobSource = data.jobHistory;
      console.log(data,"JobDetails");
      
    });
    // Fetch data from the REST API and populate the table
    this.http.post<any>('https://localhost:7208/api/JobOrder/getJobHistory',this.data.jid).subscribe(data => {
      this.dataQuerySource = data.jobQueryHistory;
      
    });
  }
}
