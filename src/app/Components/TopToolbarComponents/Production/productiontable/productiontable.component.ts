import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-productiontable',
  templateUrl: './productiontable.component.html',
  styleUrls: ['./productiontable.component.scss']
})
export class ProductiontableComponent {
  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();
  

  displayedColumns: string[] = [
    'selected',
    'jobId',
    'estjob',
    'action',
    'fileName',
    'fileInwardMode',
    'client',
    'customerSatisfaction',
    'jobstatus',
    'projectcode',
    'allocatedby',
    'processstatus',
    'scope',
    'esttime',
    'deliverydate',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // //ScopeDropdown
     this.fetchScope();
  }
  ScopeApiData:any[];
  fetchScope(){
    this.http.get<any>('ScopeUrl').subscribe(data =>{
      this.ScopeApiData = data;
    });
    }

  assigndatasource(data){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //maintable
  // fetchData(): void {
  //   this.http.get<any>('YOUR_API_URL').subscribe(data => {
  //     this.dataSource = new MatTableDataSource(data);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }
  //to save the checkbox values
  selectedproduction:any[]=[];
  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedproduction)
    if (completed == true) {
      this.selectedproduction.push(item)
    }
    else {

      if (this.selectedproduction.find(x => x.id == item.id)) {
        this.selectedproduction = this.selectedproduction.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedproduction)
  }

  showAlert() {
    alert('HI TESTING');
  }

}
