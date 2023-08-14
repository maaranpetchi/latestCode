import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-index-skillset',
  templateUrl: './index-skillset.component.html',
  styleUrls: ['./index-skillset.component.scss']
})
export class IndexSkillsetComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['EmployeeCode', 'EmployeeName', 'Skill', 'ProficiencyLevel', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.http.get<any>(environment.apiURL+`EmployeeVsSkillset/ShowEmployeeVsSkillset`).subscribe(employees => {
      this.dataSource = new MatTableDataSource(employees.gEvSlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

//aCTIONS
openEditForm(id: number) {
  // this.http.get<any>(environment.apiURL + `Employee/GetEmployeeDetailsByID?employeeID=${id}`).subscribe(results => {
  //   this._empService.setData({ type: 'EDIT', data: results });
  //   this._empService.shouldFetchData = true;
  //   this.router.navigate(['/topnavbar/Emp-editaddEmpcontroller']);
  //});

}
viewEmployee(id: number) {
  // this.http.get<any>(environment.apiURL + `Employee/GetEmployeeDetailsByID?employeeID=${id}`).subscribe(results => {
  //   this._empService.setViewData({ type: 'View', data: results });
  //   this._empService.shouldFetchViewData = true;
  //   this.router.navigate(['/topnavbar/Emp-addeditEmpcontroller']);

  // })
}
deleteEmployee(id: number) {
  // this.spinnerService.requestStarted();

  // this._empService.deleteEmployee(id).subscribe({
  //   next: (res) => {
  //     this.spinnerService.requestEnded();

  //     this._coreService.openSnackBar('Employee deleted!', 'done');
  //     this.fetchtableData();
  //   },
  //   error: console.log,
  // });
}

OpenNewForm(){
  this.router.navigate(['/topnavbar/addeditskillset']);
}
}