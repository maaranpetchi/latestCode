

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
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
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
    { value: 'Trial', viewValue: 'Trial' }

  ];

  constructor(private _dialog: MatDialog,
    private spinnerService: SpinnerService,
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
   this.getDepartmentlist();
   


  }
  getAllCustomer() {
    this.spinnerService.requestStarted();
    this.http.get<any[]>(environment.apiURL + 'user/getallcustomers')
      .subscribe({
        next: (customers) => {
          this.spinnerService.requestEnded();
          this.customers = customers.sort((a, b) => a.name.localeCompare(b.name));
        },
        error: (err) => {
          this.spinnerService.resetSpinner(); // Reset spinner on error
          console.error(err);
          Swal.fire(
            'Error!',
            'An error occurred !',
            'error'
          );
        }
      });

  }

  getDepartmentlist(){
    this.spinnerService.requestStarted();
    this._empService.getOptions()
    .subscribe(options => {
      this.spinnerService.requestEnded();
      this.departmentList = options;
    });
  }
  getDDLList(){
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + 'CustomerVsProcess/GetAllddlList').subscribe(data => {
      this.spinnerService.requestEnded();
      this.data = data;
      
    });
  }

  onOptionSelected(event: any, myForm: FormGroup) {
    
    
    if (myForm.value.customerscopestatus.length > 0) {
      this._empService.changeapi({
        "customerId": myForm.value.customer == '' ? 0 : myForm.value.customer,
        "deptId": myForm.value.departmentList,
        "customerJobType": myForm.value.customerscopestatus,
      }).subscribe(data => {
        this.scopeList = data.getScopeList;
        
      })
    }
    else {
      return;
    }
  }

  getEmployeeList() {
    this.spinnerService.requestStarted();
    this._empService.getEmployeeList().subscribe({

      next: (res) => {
        this.spinnerService.requestEnded();

        this.dataSource = new MatTableDataSource(res);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        

      },
      error: 
    });
  }
  // this._empService.getEmployeeList().then((res)=>{


  employeeFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this.spinnerService.requestStarted();
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.spinnerService.requestEnded();
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this._empService.changeapi({
          "customerId": this.myForm.value.customer == '' ? 0 : this.myForm.value.customer,
          "deptId": this.myForm.value.departmentList,
          "customerJobType": this.myForm.value.customerscopestatus,
        }).subscribe(data => {
          this.scopeList = data.getScopeList;

          // 
        })
        this.refreshPage();

      },
      error: 
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
    this.spinnerService.requestStarted();

    
    this.submitted = true;
    this.http.post(environment.apiURL + 'CustomerVsProcess/AddProcessworkflow', {
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
      this.spinnerService.requestEnded();
      Swal.fire(
        'Done!',
        ' Data Added Successfully!',
        'success'
      )
      this.submitted = false;
      this.getEmployeeList();
    });
  }


  refreshPage() {
    this.getEmployeeList();
  }

}
