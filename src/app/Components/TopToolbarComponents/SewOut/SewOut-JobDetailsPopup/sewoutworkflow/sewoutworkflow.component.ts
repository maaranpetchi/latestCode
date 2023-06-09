import { DatePipe } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sewoutworkflow',
  templateUrl: './sewoutworkflow.component.html',
  styleUrls: ['./sewoutworkflow.component.scss'],
  providers: [DatePipe]
})
export class SewoutworkflowComponent {
  responseData: any;
  constructor(private route: ActivatedRoute, private datePipe: DatePipe,private http:HttpClient) {}
  displayedColumns: string[] = ['startDate', 'endDate', 'timeTaken', 'status'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    const data = history.state.data;
    // Use the retrieved data as needed
    console.log(data,"datapassed"),
    this.responseData = data;

    this.fetchJobHistory();

  }
  fetchJobHistory(): void {

  
  }
  goBack() {
    window.history.back();
}


applyFilter(event: Event, column: string): void {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filterPredicate = (data: any, filter: string) => {
    return data[column].toLowerCase().includes(filter);
  };
  this.dataSource.filter = filterValue;
}

//small table
totalWorked: string;
  breakTime: string;
  trainingMeeting: string;
  holdTime: string;
  othersTime: string;
  totalTime: string;

  fetchSmallTableData() {
    // this.apiService.getData().subscribe((data: any) => {
    //   // Assign the REST API values to the corresponding variables
    //   this.totalWorked = data.totalWorked;
    //   this.breakTime = data.breakTime;
    //   this.trainingMeeting = data.trainingMeeting;
    //   this.holdTime = data.holdTime;
    //   this.othersTime = data.othersTime;
    //   this.totalTime = data.totalTime;
    // });
  }




}
