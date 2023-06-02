import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-details-sew-pop',
  templateUrl: './job-details-sew-pop.component.html',
  styleUrls: ['./job-details-sew-pop.component.scss']
})
export class JobDetailsSewPopComponent implements OnInit {
  displayedColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy', 'movedToAgain', 'remarks'];
  dataSource: any;

  constructor(private http: HttpClient,@Inject(MAT_DIALOG_DATA) public data: any) {console.log(data,"POpup"); }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    // Make an HTTP GET request to your API endpoint
      // Assign the retrieved data to the dataSource variable
      this.dataSource = this.data;
  }
}