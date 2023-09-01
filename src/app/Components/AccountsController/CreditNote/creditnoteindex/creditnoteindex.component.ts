import { Component, Inject,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddCreditnoteComponent } from '../add-creditnote/add-creditnote.component';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreditnoteService } from 'src/app/Services/AccountController/CreditNote/creditnote.service';

@Component({
  selector: 'app-creditnoteindex',
  templateUrl: './creditnoteindex.component.html',
  styleUrls: ['./creditnoteindex.component.scss']
})
export class CreditnoteindexComponent {
  displayedColumns: string[] = [
    'employeeCode',
    'employeeName',
    'departmentId',
    'designationId',
    'profiencyId',
    'reportingManager1',
    'reportLeader1',
    'invoicenumber'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog,
    private _empService: CreditnoteService,
    private _coreService: CoreService,
    private http: HttpClient,) { }


  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddCreditnoteComponent,{
      height: '80vh',
      //width: '80vw'
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });

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


  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  openEditForm(data: any) {
    console.log(data, "openeditform");
    const dialogRef = this._dialog.open(AddCreditnoteComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();

        }
      },
    });
  }

}
