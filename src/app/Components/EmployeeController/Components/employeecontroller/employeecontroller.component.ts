import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/Services/EmployeeController/Core/core.service';
import { EmployeeService } from 'src/app/Services/EmployeeController/employee.service';
import { json } from 'stream/consumers';
import { AddEditEmployeecontrollerComponent } from '../add-edit-employeecontroller/add-edit-employeecontroller.component';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { EditService } from 'src/app/Services/Displayorhideform/edit-service.service';
@Component({
  selector: 'app-employeecontroller',
  templateUrl: './employeecontroller.component.html',
  styleUrls: ['./employeecontroller.component.scss']
})
export class EmployeecontrollerComponent implements OnInit {
  

  displayedColumns: string[] = [
    'employeeCode',
    'employeeName',
    'departmentId',
    'designationId',
    'profiencyId',
    'reportingManager1',
    'reportLeader1',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isDeletedInclude = false;
  isResignInclude = false;

  constructor(private _dialog: MatDialog,
    private editService: EditService,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private http: HttpClient) { }


  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditEmployeecontrollerComponent);
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  openEditForm(data: any) {
    this.editService.showEditForm();
    console.log(data, "openeditform");
    const dialogRef = this._dialog.open(AddEditEmployeecontrollerComponent, {
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

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  onCheckboxChange(event, id: number) {
    if (id == 1) {
      this.isDeletedInclude = event.checked;
    }
    else {
      this.isResignInclude = event.checked;
    }
    if (this.isDeletedInclude || this.isResignInclude) {
      this.http.get<any[]>(`https://localhost:7208/api/Employee/GetEmployeeWithDelete?IsDeleted=${this.isDeletedInclude ? 1 : 0}&IsResigned=${this.isResignInclude ? 1 : 0}`).subscribe(data => {
        this.dataSource.data = data;
      });
    } else {
      this.getEmployeeList();
    }
  }

}