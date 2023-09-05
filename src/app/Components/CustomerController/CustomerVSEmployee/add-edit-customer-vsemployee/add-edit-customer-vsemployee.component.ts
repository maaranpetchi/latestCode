import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { state } from '@angular/animations';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { CustomerVSEmployeeService } from 'src/app/Services/CustomerVSEmployee/customer-vsemployee.service';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
//customerClassification INTERFACE
interface customerClassification {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-edit-customer-vsemployee',
  templateUrl: './add-edit-customer-vsemployee.component.html',
  styleUrls: ['./add-edit-customer-vsemployee.component.scss']
})

export class AddEditCustomerVSEmployeeComponent implements OnInit {
  state: number = 0;
  customervalue: any[] = [];


  myForm = new FormGroup({
    id: new FormControl(this.data1?.id),
    classificationList: new FormControl(this.data1?.classId, Validators.required),
    employeeName: new FormControl(this.data1?.employeeId, Validators.required),
    customer: new FormControl(this.customervalue, Validators.required),
    customerId: new FormControl('', Validators.required),

  });
  values: any[] = [];

  selectControl = new FormControl();

  data: any = {
    classificationList: [],
    employeeList: [],
    customerList: [],
  };

  constructor(private http: HttpClient,
    private _dialogRef: MatDialogRef<AddEditCustomerVSEmployeeComponent>,
    private _coreService: CoreService,
    private spinnerService: SpinnerService,
    private employeeservice: CustomerVSEmployeeService,
    @Inject(MAT_DIALOG_DATA)

    public data1: any,

  ) { this.customervalue.push(data1?.customerId); 


  ngOnInit(): void {
    this.spinnerService.requestStarted();

    this.http.get<any>(environment.apiURL + 'CustomerVsEmployee/GetAllddlList').subscribe(data => {
      this.spinnerService.requestEnded();
      this.data = data;
      

    });
  }



  onSubmit(num: number) {

    const Editid = this.myForm.getRawValue().id;
    if (Editid != '' && Editid != null) {
      this.spinnerService.requestStarted();
      this.http.post(environment.apiURL + 'CustomerVsEmployee/EditCustomerVsEmployee', {
        Id: Editid,
        CustomerId: this.myForm.value.customer,
        EmployeeId: this.myForm.value.employeeName,
        IsDeleted: 0,
        CreatedUTC: new Date(),
        UpdatedUTC: new Date(),
        CreatedBy: 152,
        UpdatedBy: 152,
        ClassId: this.myForm.value.classificationList

      }).subscribe({
        next:(result) =>{
          this.spinnerService.requestEnded();
          this._coreService.openSnackBar("updated data successfully");
        }
      })
      // 
    } else {
      this.spinnerService.requestStarted();
      this.http.post(environment.apiURL + 'CustomerVsEmployee/CreateCustomerVsEmployee', {
        Id: 0,
        CustomerId: this.myForm.value.customer,
        EmployeeId: this.myForm.value.employeeName,
        IsDeleted: 0,
        CreatedUTC: new Date(),
        UpdatedUTC: new Date(),
        CreatedBy: 152,
        UpdatedBy: 0,
        ClassId: this.myForm.value.classificationList
      }).subscribe({
        next: (res) => {
          this.spinnerService.requestEnded();

          Swal.fire(
            'Done!',
            'Employee Added Successfully!',
            'success'
          ).then((result)=>{
            if(result.isConfirmed){
              this._dialogRef.close();
            }
          })

        },
        error: (err) => {
           this.spinnerService.resetSpinner(); // Reset spinner on error
           console.error(err);
           Swal.fire(
             'Error!',
             'Already Exist',
             'error'
           );
         }
      });
    }


    // 
  }


}
