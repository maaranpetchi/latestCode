import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core'; import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { SpinnerService } from '../../Spinner/spinner.service';
@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent implements OnInit {
  vendorName: '';
  invoiceNumber: '';
  invoiceDate: '';
  invoiceValue: '';
  pendingAmount:'';
  amountPaid:'';
  amtPaidHide: boolean = true;
  constructor(private _fb: FormBuilder,
    private spinnerService: SpinnerService,
    private http: HttpClient,
    private _dialogRef: MatDialogRef<EditVendorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {

  }
  ngOnInit(): void {
    // Listen for changes in the amountsToBePaid control
    this.empForm.get('amountPaid')?.valueChanges.subscribe((value: number) => {
      const invoiceValue = this.empForm.get('invoiceValue')?.value;
      const pendingAmount = invoiceValue - value;
      this.empForm.patchValue({ pendingAmount });
    });

  }


  empForm: FormGroup;

  onFormSubmit() {
    let payload={
      "id": 0,
      "vendorName": "string",
      "invoiceNumber": "string",
      "invoiceDate": "2023-07-17T10:24:07.267Z",
      "invoiceValue": 0,
      "pendingAmount": 0,
      "amountbePaid": 0,
      "amountPaid": 0,
      "employeeId": 0
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `ITAsset/nSetVendorDetails`, this.empForm.value).subscribe({
      next: (val: any) => {
        this.spinnerService.requestEnded();
        this._coreService.openSnackBar('Employee added successfully');
        this._dialogRef.close();
      },
      error: (err: any) => {
        this.spinnerService.resetSpinner();
      }
    });

  }


}
