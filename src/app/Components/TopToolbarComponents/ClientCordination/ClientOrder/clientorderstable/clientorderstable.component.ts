import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FileconvertComponent } from './fileconvert/fileconvert.component';
@Component({
  selector: 'app-clientorderstable',
  templateUrl: './clientorderstable.component.html',
  styleUrls: ['./clientorderstable.component.scss']
})
export class ClientorderstableComponent {

  
  @ViewChild('popupComponent') popupComponent: ElementRef;
  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();
  DivisionApiData: any[];

  displayedColumns: string[] = [
    'selected',
    'client',
    'customerSatisfaction',
    'fileName',
    'fileReceivedEstDate',
    'department',
    'quoteparentid',
    'instruction',
    'salespersonname',
    'transactiontype',
    'action',
    'filecount'
  ];

  visibility(){
    let result:string[]= [];
    if(this.displayedColumnsvisibility.selected){
      result.push('selected');
    }
  
    if(this.displayedColumnsvisibility.client){
      result.push('client');
    }
    if(this.displayedColumnsvisibility.customerSatisfaction){
      result.push('customerSatisfaction');
    }
    if(this.displayedColumnsvisibility.fileName){
      result.push('fileName');
    }
    if(this.displayedColumnsvisibility.fileReceivedEstDate){
      result.push('fileReceivedEstDate');
    }
    if(this.displayedColumnsvisibility.department){
      result.push('department');
    }
    if(this.displayedColumnsvisibility.quoteparentid){
      result.push('quoteparentid');
    }
    if(this.displayedColumnsvisibility.instruction){
      result.push('instruction');
    }
    if(this.displayedColumnsvisibility.salespersonname){
      result.push('salespersonname');
    }
    if(this.displayedColumnsvisibility.transactiontype){
      result.push('transactiontype');
    }
    if(this.displayedColumnsvisibility.action){
      result.push('action');
    }
    if(this.displayedColumnsvisibility.filecount){
      result.push('filecount');
    }
    return result;
  }


  displayedColumnsvisibility: any= {
    'selected':true,
    'client':true,
    'customerSatisfaction':true,
    'fileName':true,
    'fileReceivedEstDate':true,
    'department':true,
    'quoteparentid':true,
    'instruction':true,
    'salespersonname':true,
    'transactiontype':true,
    'action':true,
    'filecount':true,
  };
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    // //DivisionApiDatadropdown
    this.fetchdivision();

    this.bindingjobs();
  }

  fetchdivision() {
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/nGetDivisionForJO').subscribe(data => {
      this.DivisionApiData = data;
    });
  }




  //to save the checkbox values
  selectedproduction: any[] = [];
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

  //   OrdersFactory.GetAllClientOrders('ClientOrdersExts', 1).$promise.then(function (result) {
  //     $scope.gridClientOrder.data = result.Data;
  //     $scope.NewJobCount = $scope.gridClientOrder.data.length;
  // });




  bindingjobs() {
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/1').subscribe(binddata => {
      this.dataSource = binddata.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);

    });
  }
  quotationjobs() {
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/2').subscribe(quotation => {
      this.dataSource = new MatTableDataSource(quotation.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);

    });
  }
  convertedjobs() {
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/3').subscribe(converted => {
      this.dataSource = new MatTableDataSource(converted.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }
  deletedjobs() {
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/4').subscribe(deleted => {
      this.dataSource = new MatTableDataSource(deleted.data)
      this.displayedColumnsvisibility.filecount = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }
  quotenotapprovaljobs(){
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/5').subscribe(quotenotapproval => {
      this.displayedColumnsvisibility.filecount = false;  
    this.dataSource = new MatTableDataSource(quotenotapproval.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  queryforsp(){
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/6').subscribe(queryforsp => {
      this.displayedColumnsvisibility.filecount = false;
    this.dataSource = new MatTableDataSource(queryforsp.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });
  }


  tab(action) {
    if (action == '1') {
      this.bindingjobs();
    }
    else if (action == '2') {
      this.quotationjobs();
    }
    else if (action == '3') {
      this.convertedjobs();
    }
    else if (action == '4') {
      this.deletedjobs();
    }
    else if (action == '5') {
      this.quotenotapprovaljobs();
    }
    else if (action == '6') {
      this.queryforsp();
    }

  }

  fileCount:number;

  openPopup(fileCount,row) {
    // Create an instance of the dialog component
    const dialogRef = this.dialog.open(FileconvertComponent, {
      data: {
        fileCount: fileCount, row : row
      }
    });

    // Subscribe to the afterClosed event to handle dialog close actions
    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed, if needed
    });
  }

  handleKeyPress(event: KeyboardEvent,job:any) {
    const enteredNumber = (event.target as HTMLInputElement).value;
    console.log("enter value",enteredNumber)

    if (event.key === 'Enter') {
      this.openPopup(enteredNumber,job);
      console.log(event,"event");
      console.log(job,"job");
    }
  }
}



