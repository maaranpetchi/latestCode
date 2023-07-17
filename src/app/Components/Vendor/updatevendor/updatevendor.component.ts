import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { VendorService } from 'src/app/Services/Vendor/vendor.service';

@Component({
  selector: 'app-updatevendor',
  templateUrl: './updatevendor.component.html',
  styleUrls: ['./updatevendor.component.scss']
})
export class UpdatevendorComponent implements OnInit {
  amtPaidHide: boolean = true;
  originalAmtPaid: number;
  type: string;
  id: number;
  constructor(
    private loginservice: LoginService,
    private _fb: FormBuilder,
    public sharedService: VendorService,
    private http: HttpClient,
    private _dialogRef: MatDialogRef<UpdatevendorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    console.log(this.data, "injected data");
    let amountdisplayed = this.originalAmtPaid + this.Amounttobepaid;

    this.type = this.data.type;
    this.id = this.data.data.id;
    this.originalAmtPaid = this?.data.data?.amountPaid || 0; // Add null check for data
    this.empForm = this._fb.group({
      vendorName: '',
      invoiceNumber: '',
      invoiceDate: '',
      invoiceValue: '',
      pendingAmount: { value: '' },
      amountsToBePaid: '',
      amtPaid: { value: this?.data?.data?.amountPaid + this?.Amounttobepaid, disabled: true },
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data.data);
    this.updatePendingAndPaidAmounts();
  }

  empForm: FormGroup;

  updatePendingAndPaidAmounts() {
    this.empForm.get('amountsToBePaid')?.valueChanges.subscribe((value: number) => {
      const invoiceValue = this.empForm.get('invoiceValue')?.value;
      // const amtPaid = this.empForm.get('amtPaid')?.value;
      const pendingAmount = invoiceValue ? invoiceValue - value : 0; // Add null check for invoiceValue
      // this.empForm.patchValue({ pendingAmount, amtPaid: amtPaid ? amtPaid + value : value }); // Add null check for amtPaid
    });
  }

  onFormSubmit() {
    this.http.post<any>(environment.apiURL + `ITAsset/nSetVendorDetails`, this.empForm.value).subscribe(data => {
      this._coreService.openSnackBar('Employee added successfully');
      this._dialogRef.close();
    });
  }

  InvValueChngCheck = 0;
  Amounttobepaid: number = 0;
  AmtbePaidChng() {
    if (this.type === 'edit') {
      if (this.InvValueChngCheck === 1) {
        this.empForm.patchValue({
          amtPaid: this.empForm.value.amountsToBePaid,
          pendingAmount: this.empForm.value.invoiceValue - this.empForm.value.amountsToBePaid
        });
      } else {
        const Para = {
          Id: this.id
        };

        this.http.post<any>(environment.apiURL + 'ITAsset/nGetVendorEditDetail', Para).subscribe(results => {
          const GetVED = results.getVEDetailList;
          const newAmtPaid = GetVED.amountPaid + this.empForm.value.amountsToBePaid;
          const newPendingAmount = this.empForm.value.invoiceValue - newAmtPaid;
          this.empForm.patchValue({
            amtPaid: newAmtPaid,
            pendingAmount: newPendingAmount
          });
        });
      }
    } else {
      this.empForm.patchValue({
        pendingAmount: this.empForm.value.invoiceValue - this.empForm.value.amountsToBePaid
      });
    }
  }




  InvValueChng() {
    if (this.type == "edit") {
      this.InvValueChngCheck = 1;
      this.empForm.value.amtPaid.value = 0;
    }
  }

  onSubmitDetails() {
    let payload = {
      "id": this.data.data.id,
      "vendorName": this.data.data.vendorName,
      "invoiceNumber": this.empForm.value.invoiceNumber,
      "invoiceDate": this.empForm.value.invoiceDate,
      "invoiceValue": this.empForm.value.invoiceValue,
      "pendingAmount": this.empForm.value.pendingAmount,
      "amountbePaid": this.empForm.value.amountsToBePaid,
      "amountPaid": this.empForm.value.amtPaid,
      "employeeId": this.loginservice.getUsername(),
    }
    this.http.post<any>(environment.apiURL + `ITAsset/nSetVendorDetails`, payload).subscribe(result => {
      this._coreService.openSnackBar(result.setVDetailList)
    });
  }


}