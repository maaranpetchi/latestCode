import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/Services/AccountController/CustomerReceipts/Core/core.service';
import { CustomerreceiptsService } from 'src/app/Services/AccountController/CustomerReceipts/customerreceipts.service';


import { AddEditCustomerreceiptsComponent } from '../add-edit-customerreceipts/add-edit-customerreceipts.component';
@Component({
  selector: 'app-customerreceiptsindex',
  templateUrl: './customerreceiptsindex.component.html',
  styleUrls: ['./customerreceiptsindex.component.scss']
})
export class CustomerreceiptsindexComponent implements OnInit{

  displayedColumns: string[] = [
    'voucherNo',
    'collectionDate',
    'shortName',
    'collectionAmount',
    'referenceNo',
    'referenceDate',
    'description',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isDeletedInclude = false;
  isResignInclude = false;


constructor( private _dialog: MatDialog,
  private router:Router,
  private _empService:CustomerreceiptsService ,
  private _coreService: CoreService,
  private http:HttpClient){}

  
  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    this.router.navigate(['/topnavbar/addreceivables']);

  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
     
      next: (res) => {
      
        this.dataSource = new MatTableDataSource(res);
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     
      },
      error: console.log,
    });
  }
    // this._empService.getEmployeeList().then((res)=>{console.log(res)}).catch(err=> console.log(err));


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  // openEditForm(data: any) {
  //   const dialogRef = this._dialog.open(AddEditEmployeecontrollerComponent, {
  //     data,
  //   });

  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.getEmployeeList();
  //       }
  //     },
  //   });
  // }
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditCustomerreceiptsComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();

        }
      },
    });
    // this.router.navigate(['/topnavbar/dashboard']);
  }


 
 
}
