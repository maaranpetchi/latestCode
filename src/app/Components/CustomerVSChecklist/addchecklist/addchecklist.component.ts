import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-addchecklist',
  templateUrl: './addchecklist.component.html',
  styleUrls: ['./addchecklist.component.scss']
})
export class AddchecklistComponent implements OnInit {

  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService, private loginservice: LoginService) { }
  ngOnInit(): void {
    this.fetchCustomers();
  }
  selectedDepartment: number;
  selectedCustomer: number;
  checklistDescription: string;

  customers: any[] = [];


  fetchCustomers() {
    this.http.get<any>(environment.apiURL + `CustomerVsChecklist/GetDropDownList`).subscribe(
      (data) => {
        this.customers = data.customerList;
      },
      (error) => {
        console.log('Error fetching customers:', error);
      }
    );
  }

  onFormSubmit() {
    // if (this.data.valid) {
    // if (this.data) {
    //   this._empService
    //     .updateEmployee(this.data.id, this.empForm.value)
    //     .subscribe({
    //       next: (val: any) => {
    //         this._coreService.openSnackBar('Employee detail updated!');
    //         this._dialogRef.close(true);
    //       },
    //       error: (err: any) => {
    //         console.error(err);
    //       },
    //     });
    // } else {
    //   this._empService.addEmployee(this.empForm.value).subscribe({
    //     next: (val: any) => {
    //       this._coreService.openSnackBar('Employee added successfully');
    //       this._dialogRef.close(true);
    //     },
    //     error: (err: any) => {
    //       console.error(err);
    //     },
    //   });
    // }
    console.log("customerId", this.selectedCustomer,
      "departmentId", this.selectedDepartment,
      "description", this.checklistDescription,
      "employeeId", this.loginservice.getUsername());

    let payload = {
      "customerId": this.selectedCustomer,
      "departmentId": this.selectedDepartment,
      "description": this.checklistDescription,
      "employeeId": this.loginservice.getUsername()
    }

    this.http.post<any>(environment.apiURL + `CustomerVsChecklist/CreateChecklist`, payload).subscribe(results => {
      this._coreService.openSnackBar(results.cvCList)
    });
  }
  // }
}
