import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/Services/AccountController/ScopeChange/Core/core.service';
import { ScopechangeService } from 'src/app/Services/AccountController/ScopeChange/scopechange.service';
//MARTIAL INTERFACE
interface Department {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-scopechange',
  templateUrl: './scopechange.component.html',
  styleUrls: ['./scopechange.component.scss']
})
export class ScopechangeComponent implements OnInit {
  displayedColumns: string[] = [
    'jobid',
    'jobdate',
    'department',
    'filename',
    'jobstatus',
    'Scope',

  ];
  //martial status dropdown values
  departments: Department[] = [
    { value: '0', viewValue: 'Artwork' },
    { value: '1', viewValue: 'Digitizing' },
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private _empService: ScopechangeService,

    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      fromdate: '',
      todate: '',
      client: '',
      department: '',
    });
  }


  //Customerdropdownvalues dropdowndeclaration
  selectedclientOption: any = '';
  Clientdropdownvalues: any[] = [];
  //Resign dropdowndeclaration
  selectedresignOption: any = '';
  Resigndropdownvalues: any[] = [];


  ngOnInit(): void {


    // customerdata dropdown fetch the values from the API
    this.http.get<any>('https://localhost:7208/api/Employee/GetDropDownList').subscribe(clientdata => {
      this.Clientdropdownvalues = clientdata.designationList;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
