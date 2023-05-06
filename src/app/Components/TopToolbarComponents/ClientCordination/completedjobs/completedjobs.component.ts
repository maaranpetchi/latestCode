import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-completedjobs',
  templateUrl: './completedjobs.component.html',
  styleUrls: ['./completedjobs.component.scss']
})
export class CompletedjobsComponent implements OnInit {
  displayedColumns: string[] = [
    'selected',
    'jobnumber',
    'estjob',
    'department',
    'client',
    'customerclasiification',
    'clientstatus',
    'jobstatus',
    'parentjobid',
    'filename',
    'fileInwardMode',
    'fileReceivedEstDate',
    'jobcloseddate',
    'commentstoclient'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<any>('YOUR_API_URL').subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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

}