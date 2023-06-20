import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JobHistoryComponent } from '../job-history/job-history.component';

@Component({
  selector: 'app-jobhistory-details',
  templateUrl: './jobhistory-details.component.html',
  styleUrls: ['./jobhistory-details.component.scss']
})
export class JobhistoryDetailsComponent implements OnInit {

  displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','MovedTo', 'remarks' , 'files'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    public dialogRef: MatDialogRef<JobHistoryComponent>,

  ){}
  dataJobSource: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getJobHistoryDetails(this.data);
    
  }

  getJobHistoryDetails(data:any){
    this.http.post<any>('https://localhost:7208/api/JobOrder/getJobHistory',this.data.jId).subscribe(data => {
      this.dataJobSource = data.jobHistory; 
  })
  }
  downloadExcell(){}


  closeButton(){
    this.dialogRef.close();
  }

}
