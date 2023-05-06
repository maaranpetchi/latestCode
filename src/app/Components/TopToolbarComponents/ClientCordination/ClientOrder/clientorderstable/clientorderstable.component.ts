import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-clientorderstable',
  templateUrl: './clientorderstable.component.html',
  styleUrls: ['./clientorderstable.component.scss']
})
export class ClientorderstableComponent {

  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();
  DivisionApiData: any[];

  displayedColumns: string[] = [
    'selected',
    'client',
    'customerSatisfaction',
    'fileName',
    'fileInwardMode',
    'department',
    'quoteparentid',
    'instruction',
    'salespersonname',
    'transactiontype',
    'action',
    'filecount'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,public dialog: MatDialog) {}

  ngOnInit(): void {
    // //DivisionApiDatadropdown
     this.fetchdivision();
  }

  fetchdivision(){
  this.http.get<any>('ScopeUrl').subscribe(data =>{
    this.DivisionApiData = data;
  });
  }


  assigndatasource(data){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


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


  }



