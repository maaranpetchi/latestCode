import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { CustomerNormsService } from 'src/app/Services/CustomerNorms/customer-norms.service';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
@Component({
  selector: 'app-add-customer-norms',
  templateUrl: './add-customer-norms.component.html',
  styleUrls: ['./add-customer-norms.component.scss']
})
export class AddCustomerNormsComponent implements OnInit {
  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchProcess();
    this.fetchJobStatus();
    this.fetchDivision();
  }
  constructor(private loginservice:LoginService,private http: HttpClient, private router: Router, private spinnerService: SpinnerService, private _empService: CustomerNormsService) { }

  //Array declaration
  departments: any[] = [];
  customers: any[] = [];
  scopes: any[] = [];
  jobstatus: any[] = [];
  process: any[] = [];
  CustomerDivisions: any[] = [];
  //ngmodel
  selectedDepartment: any;
  selectedCustomer: any;
  selectedScope: any;
  selectedJobStatus: any;
  selectedProcess: any;
  selectedDivision: any;
  norms:any;
  //Method
  fetchDepartments(): void {
    this.http.get<any>(environment.apiURL + `Pricing/pricingList`).subscribe(data => {
      this.departments = data.departments;
      this.customers = data.customers;
    });
  }
  onSelectCode(id) {
    this.http.get<any>(environment.apiURL + `Pricing/ScopeByDeptCustId?clientid=${id}&departmentId=${this.selectedDepartment}`).subscribe(results => {
      this.scopes = results
    })
  }
  fetchJobStatus(): void {
    this.http.get<any>(environment.apiURL + `Pricing/GetJobStatusList`).subscribe(data => {
      this.jobstatus = data.jsList;
    });
  }
  fetchProcess(): void {
    this.http.get<any>(environment.apiURL + `Pricing/GetProcessListforNorms`).subscribe(data => {
      this.process = data.prList;
    });
  }
  fetchDivision(): void {
    this.http.get<any>(environment.apiURL + `Pricing/GetCusDvisionforNorms`).subscribe(data => {
      this.CustomerDivisions = data.divList;
    });
  }

  onSubmit() {
let payload={
  "id": 0,
  "customerId": this.selectedCustomer,
  "customerShortName": "string",
  "departmentId": this.selectedDepartment,
  "processId": this.selectedProcess,
  "jobStatusId": this.selectedJobStatus,
  "scopeId": this.selectedScope,
  "norms": this.norms,
  "divisionId": this.selectedDivision,
  "createdBy": this.loginservice.getUsername(),
  "createdUTC": "2023-08-28T07:48:36.543Z",
  "updatedBy": 0,
  "updatedUTC": "2023-08-28T07:48:36.543Z",
  "isDeleted": true
}

this.http.post<any>(environment.apiURL+`Pricing/CreateCustomerNormDetails`,payload).subscribe(results =>{
  Swal.fire(
    'Done!',
  results.stringList,
    'success'
  )
})
  }
}
