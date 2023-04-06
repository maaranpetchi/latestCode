

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { EmployeevsprocessService } from 'src/app/Services/CustomerVSProcess/employeevsprocess.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customervsprocess',
  templateUrl: './customervsprocess.component.html',
  styleUrls: ['./customervsprocess.component.scss']
})
export class CustomervsprocessComponent implements OnInit {
  customerClassification: any;
  submitted: boolean = false;
  displayedColumns: string[] = [
    'description',
    'shortName',
    'currentProcess',
    'statusDescription',
    'nextProcess',
    'jobStatusDescription',
    'scope',
    'customJobType',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isDeletedInclude = false;
  isResignInclude = false;

  selecteddepartmentOption: any = '';
  selectedcustomerOption: any = '';
  selectedCustomerScopeStatus: any = '';

  Departmentdropdownvalues: any[] = [];
  Customerdropdownvalues: any[] = [];
  customerscopedropdownvalues: any[] = [];

  options = [
    { value: 'Live', viewValue: 'Live' },
    { value: 'Trail', viewValue: 'Trail' }

  ];

  constructor(private _dialog: MatDialog,
    private _empService: EmployeevsprocessService,
    private _coreService: CoreService,
    private router: Router,
    private http: HttpClient,
    private loginservice: LoginService,
    private snackBar: MatSnackBar) { }


  showDropdown: boolean = false;

  myForm = new FormGroup({

    departmentList: new FormControl("", Validators.required),
    employeeName: new FormControl("", Validators.required),
    customer: new FormControl("", Validators.required),
    customerscopestatus: new FormControl('', Validators.required),
    scopeName: new FormControl('', Validators.required),
    jobStatusDescription: new FormControl('', Validators.required),
    currentProcessList: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    NextProcess: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.getEmployeeList();

    this._empService.getOptions()
      .subscribe(options => {
        this.departmentList = options;
      });

    this.http.get<any>('https://localhost:7208/api/CustomerVsProcess/GetAllddlList').subscribe(data => {
      this.data = data;
      console.log(data);

    });

    this.http.get<any[]>('https://localhost:7208/api/user/getallcustomers')
      .subscribe(customers => {
        this.customers = customers.sort((a, b) => a.name.localeCompare(b.name));
      });

  }

  onOptionSelected(event: any, myForm: FormGroup) {
    console.log(event);
    console.log(myForm.value);
    if (myForm.value.customerscopestatus.length > 0) {
      return this.http.post<any>('https://localhost:7208/api/CustomerVsProcess/GetScopeList', {
        "customerId": myForm.value.customer == '' ? 0 : myForm.value.customer,
        "deptId": myForm.value.departmentList,
        "customerJobType": myForm.value.customerscopestatus,
      }).subscribe(data => {
        this.scopeList = data.getScopeList;
        console.log("scopelist" + JSON.stringify(this.scopeList));
      })
    }
    else {
      return;
    }
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({

      next: (res) => {

        this.dataSource = new MatTableDataSource(res);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);

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
        console.log(id);

      },
      error: console.log,
    });
  }



  departmentList: any[];
  selectedDepartmentOption: string;
  selectedCustomerOption: string;
  selectedCustomerScopeStatusOption: string;
  selectedjobStatusOption: string;
  selectedscopeOption: string;
  selectedCurrentProcessOption: string;
  selectedStatusOption: string;
  selectedNextProcessOption: string;
  values: any[] = [];
  customers: any[] = [];


  data: any = {
    departmentList: [],
    jobstatuslist: [],
    statuslist: [],
    currentProcessList: [],
  };


  scopeList: any[] = [];
  showAlert() {
    this.snackBar.open('This is a stylish alert message!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['my-snackbar']
    });
  }

  onSubmit() {
    console.log(this.myForm);
    this.submitted = true;
    this.http.post('https://localhost:7208/api/CustomerVsProcess/AddProcessworkflow', {
      "selectedScopes": this.myForm.value.scopeName,
      "departmentId": this.myForm.value.departmentList,
      "customerId": this.myForm.value.customer,
      "jobStatusId": this.myForm.value.jobStatusDescription,
      "customJobType": this.myForm.value.customerscopestatus,
      "currentProcessId": this.myForm.value.currentProcessList,
      "nextProcessId": this.myForm.value.NextProcess,
      "statusId": this.myForm.value.status,
      "createdBy": parseInt(this.loginservice.getUsername())
    }).subscribe(() => {
      // clear form fields
      this.snackBar.open('Data added Successfully!', 'Close',{
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['my-snackbar']
      });
    
      this.myForm.reset();
      this.submitted = false;
    });
  }


}
