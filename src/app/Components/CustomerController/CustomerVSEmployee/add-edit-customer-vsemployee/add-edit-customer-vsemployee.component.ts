import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { state } from '@angular/animations';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { CustomerVSEmployeeService } from 'src/app/Services/CustomerVSEmployee/customer-vsemployee.service';

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
private _coreService:CoreService,
private employeeservice:CustomerVSEmployeeService,
    @Inject(MAT_DIALOG_DATA)

    public data1: any,

  ) { this.customervalue.push(data1?.customerId); console.log("passing val" + data1); }


  ngOnInit(): void {
    this.http.get<any>('https://localhost:7208/api/CustomerVsEmployee/GetAllddlList').subscribe(data => {
      this.data = data;
      console.log(data);

    });
  }




  //   onSubmit(num:number) {
  //     console.log(this.myForm);
  //      console.log(this.data1?.id);
  //     if(num==1){
  //     this.http.post('https://localhost:7208/api/CustomerVsEmployee/CreateCustomerVsEmployee', {
  //       Id :0,
  //       CustomerId:this.myForm.value.customer, 
  //      EmployeeId :this.myForm.value.employeeName,
  //       IsDeleted :0,
  //       CreatedUTC :new Date(),
  //       UpdatedUTC :new Date(),
  //        CreatedBy : 152,
  //        UpdatedBy : 0,
  //       ClassId : this.myForm.value.classificationList


  //     }).subscribe(
  //       result => console.log("Data update succesfully"),
  //       error => console.log('Error:', error)
  //     );
  //     // console.log(this.myForm.value)


  //   }
  //   else{
  //     this.http.post('https://localhost:7208/api/CustomerVsEmployee/EditCustomerVsEmployee', {
  //       Id :0,
  //       CustomerId:this.myForm.value.customer, 
  //      EmployeeId :this.myForm.value.employeeName,
  //       IsDeleted :0,
  //       CreatedUTC :new Date(),
  //       UpdatedUTC :new Date(),
  //        CreatedBy : 152,
  //        UpdatedBy : 0,
  //       ClassId : this.myForm.value.classificationList

  //     }).subscribe(
  //       result => console.log("Data update succesfully"),
  //       error => console.log('Error:', error)
  //     );
  //     // console.log(this.myForm.value)



  //   }
  // }


  onSubmit(num: number) {

    const Editid = this.myForm.getRawValue().id;
    if (Editid != '' && Editid != null) {

      this.http.post('https://localhost:7208/api/CustomerVsEmployee/EditCustomerVsEmployee', {
        Id: Editid,
        CustomerId: this.myForm.value.customer,
        EmployeeId: this.myForm.value.employeeName,
        IsDeleted: 0,
        CreatedUTC: new Date(),
        UpdatedUTC: new Date(),
        CreatedBy: 152,
        UpdatedBy: 152,
        ClassId: this.myForm.value.classificationList

      }).subscribe(
        res=> alert("Data update succesfully") ,

        error => console.log('Error:', error)
        
      );

      // console.log(this.myForm.value)
    } else {
      this.http.post('https://localhost:7208/api/CustomerVsEmployee/CreateCustomerVsEmployee', {
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
          this._coreService.openSnackBar('Employee Added!', 'done');
          this._dialogRef.close();
          this.employeeservice.getEmployeeList();
  
        },
        error: console.log,
      });
      }
        
    
      // console.log(this.myForm.value)
    }


  }
