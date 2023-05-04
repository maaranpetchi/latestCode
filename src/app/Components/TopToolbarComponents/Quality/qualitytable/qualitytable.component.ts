import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QualitypopupjobassignComponent } from '../../QualityAllocation/qualitypopupjobassign/qualitypopupjobassign.component';
import { QualityjobdetailpopupComponent } from '../qualityjobdetailpopup/qualityjobdetailpopup.component';
@Component({
  selector: 'app-qualitytable',
  templateUrl: './qualitytable.component.html',
  styleUrls: ['./qualitytable.component.scss']
})
export class QualitytableComponent {

  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();
  ScopeApiData: any[];

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

  constructor(private http: HttpClient,public dialog: MatDialog) {}

  ngOnInit(): void {
    // //scopedropdown
     this.fetchScope();
  }

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



  openqualitypop(){
    const dialogRef = this.dialog.open(QualityjobdetailpopupComponent, {
      width: '2000px',
    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  }


