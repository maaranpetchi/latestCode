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
    'fileReceivedEstDate',
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

//   OrdersFactory.GetAllClientOrders('ClientOrdersExts', 1).$promise.then(function (result) {
//     $scope.gridClientOrder.data = result.Data;
//     $scope.NewJobCount = $scope.gridClientOrder.data.length;
// });




bindingjobs(){
  this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/1').subscribe(binddata =>{
      this.dataSource = binddata.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    
    });
}

quotationjobs(){
  this.http.get<any>('https://localhost:7208/api/ClientOrderService/ClientOrdersExts/2').subscribe(quotation =>{
      this.dataSource = quotation.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    
    });
}

tab(action){
  if(action == '1'){
    this.bindingjobs();
  }
  else if(action == '2'){
      this.quotationjobs();
      
    }

}
  }



