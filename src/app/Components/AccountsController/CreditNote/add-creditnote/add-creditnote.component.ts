import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddeditemployeevsdivisionComponent } from 'src/app/Components/EmployeeVSDivision/addeditemployeevsdivision/addeditemployeevsdivision.component';
import { CreditnoteService } from 'src/app/Services/AccountController/CreditNote/creditnote.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';

@Component({
  selector: 'app-add-creditnote',
  templateUrl: './add-creditnote.component.html',
  styleUrls: ['./add-creditnote.component.scss']
})
export class AddCreditnoteComponent implements OnInit{
  Empregister: FormGroup<any>;
//customerdropdown
  selectedCustomerOption: any = '';
  Customerdropdownvalues: any[] = [];


  constructor(private builder: FormBuilder,
    private http: HttpClient, 
    private _empservice: CreditnoteService, 
    private _dialogRef: MatDialogRef<AddeditemployeevsdivisionComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private _coreService: CoreService){

    this.Empregister = new FormGroup({
      vouchernumber: new FormControl('', Validators.required),
      voucherdate: new FormControl('', Validators.required),
      referencedate: new FormControl('', Validators.required),
      referencenumber: new FormControl('', Validators.required),
      customer: new FormControl('', Validators.required),
      creditnoteamount: new FormControl('', Validators.required),

    });
   }
  ngOnInit(): void {
     // customer dropdown fetch the values from the API
     this._empservice.getcustomerdropdown().subscribe(customerdata => {
      this.Customerdropdownvalues = customerdata.departmentList;
    });
  }
 




  onFormSubmit(){

  }
}
