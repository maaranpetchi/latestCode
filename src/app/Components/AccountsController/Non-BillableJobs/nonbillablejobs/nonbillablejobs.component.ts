import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/Services/AccountController/NonBillablejobs/Core/core.service';
import { NonbillablejobsService } from 'src/app/Services/AccountController/NonBillablejobs/nonbillablejobs.service';

@Component({
  selector: 'app-nonbillablejobs',
  templateUrl: './nonbillablejobs.component.html',
  styleUrls: ['./nonbillablejobs.component.scss']
})
export class NonbillablejobsComponent implements OnInit {
  displayedColumns: string[] = [
    'jobid',
    'jobcode',
    'filename',
    'department',
    'jobstatus',
    'customer',
    'Scope',
    'stitchcount',
    'Scope',
    'nonbillablestatus',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private _empService: NonbillablejobsService,
    
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
     fromdate:'',
     todate:'',
     customer:'',
     department:'',
    });
  }

  
  //Customerdropdownvalues dropdowndeclaration
  selectedcustomerOption: any = '';
  Customerdropdownvalues: any[] = [];
  //Customerdropdownvalues dropdowndeclaration
  selecteddepartmentOption: any = '';
  Departmentdropdownvalues: any[] = [];

  ngOnInit(): void {
    

     // customerdata dropdown fetch the values from the API
     this.http.get<any>('https://localhost:7208/api/Employee/GetDropDownList').subscribe(customerdata => {
      this.Customerdropdownvalues = customerdata.designationList;
    });
     // Departmentdropdownvalues  dropdown fetch the values from the API
     this.http.get<any>('https://localhost:7208/api/Employee/GetDropDownList').subscribe(departmentdata => {
      this.Departmentdropdownvalues = departmentdata.designationList;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onFormSubmit() {
    
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee added successfully');
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
}
