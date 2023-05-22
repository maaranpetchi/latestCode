import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from 'src/app/Services/Login/login.service';


@Component({
  selector: 'app-query-to-client',
  templateUrl: './query-to-client.component.html',
  styleUrls: ['./query-to-client.component.scss']
})
export class QueryToClientComponent implements OnInit {
  displayedColumns: string[] = [
    'selected',
    'jobId',
    'jobName',
    'fileName',
    'fileReceivedEstDate',
    'fileInwardMode',
    'client',
    'customerSatisfaction'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,private loginservice:LoginService) {}

  ngOnInit(): void {
    //to get the data and show it in table
  this.queriesToClient();
  }



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 


  //to save the checkbox value
  selectedQuery:any[]=[];

  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedQuery)
    if (completed == true) {
      this.selectedQuery.push(item)
    }
    else {

      if (this.selectedQuery.find(x => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedQuery)
  }


queriesToClient(){
  this.http.get<any>(`https://localhost:7208/api/Allocation/getPendingJobs/${this.loginservice.getUsername()}/1`).subscribe(data => {
    this.dataSource = data.quotationJobs;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log("Queries to client")
  });  
}
queryResponse(){
  this.http.get<any>(`http://localhost:56081/api/Allocation/getQueryResponseJobs/${this.loginservice.getUsername()}/1`).subscribe(data => {
    this.dataSource = data.quotationJobs;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(" queryResponse")
  });  
}
cancelledJobs(){
  this.http.get<any>(`http://localhost:56081/api/Allocation/getPendingJobs/${this.loginservice.getUsername()}/1`).subscribe(data => {
    this.dataSource = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log("cancelledJobs")
  });  
}
quotationJobs(){
  this.http.get<any>(`http://localhost:56081/api/Allocation/getPendingJobs/${this.loginservice.getUsername()}/1`).subscribe(data => {
    this.dataSource = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log("quotationJobs")
  });  
}


tab(action) {
  if (action == '1') {
    this.queriesToClient();
  }
  else if (action == '2') {
    this.queryResponse();
  }
  else if (action == '3') {
    this.cancelledJobs();
  }
  else if (action == '4') {
    this.quotationJobs();
  }

}


}
