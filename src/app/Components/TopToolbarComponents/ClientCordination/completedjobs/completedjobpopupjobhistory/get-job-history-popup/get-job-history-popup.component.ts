
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-get-job-history-popup',
  templateUrl: './get-job-history-popup.component.html',
  styleUrls: ['./get-job-history-popup.component.scss']
})
export class GetJobHistoryPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient){}
  
 displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataJobSource: MatTableDataSource<any>;
 displayedQueryColumns: string[] = ['movedFrom', 'movedTo', 'jobStatus', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataQuerySource: MatTableDataSource<any>;

 remarks: string;  // to store the remark value
 selectedQureryStatus: string; // to store the selected query status


 copyPreviousTrayFiles:boolean = false;
  ngOnInit() {
    // Fetch data from the REST API and populate the table job history
    this.http.post<any>('https://localhost:7208/api/JobOrder/getJobHistory',this.data.jid).subscribe(data => {
      this.dataJobSource = data.jobHistory;
      console.log(data,"JobDetails");
      
    });
  }

  selectedFile: File;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
