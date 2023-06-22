import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AdvanceadjustmentService } from 'src/app/Services/AccountController/AdvanceAdjustment/advanceadjustment.service';
import { AdvanceadjustmentComponent } from '../../Index/advanceadjustment/advanceadjustment.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { environment } from 'src/Environments/environment';


@Component({
  selector: 'app-editadvanceadjustment',
  templateUrl: './editadvanceadjustment.component.html',
  styleUrls: ['./editadvanceadjustment.component.scss']
})
export class EditadvanceadjustmentComponent {
  itemForm: FormGroup;
  invoiceForm: FormGroup;



  //Customerdropdownvalues dropdowndeclaration
  InvoiceId:any=0;
  selectedInvoiceOption: any = '';
  Invoicedropdownvalues: any[] = [];
  invoiceValue: any;
  adjustmentAmount: any;
  input3: any;
  input4: any;
  InvoiceAmount: any;
  input6: any;

  constructor(
    private index:AdvanceadjustmentComponent,private _coreService:CoreService,private advanceservice:AdvanceadjustmentService,private formBuilder: FormBuilder,private http: HttpClient,
    public dialogRef: MatDialogRef<EditadvanceadjustmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data,"indexdata");
  console.log(this.advanceamount,"advanceamount");
  
  }

  values: any[] = [];
  
  valueData: any;


  ngOnInit(): void {
    // department dropdown fetch the values from the API
    this.http.get<any>(environment.apiURL+`Receivable/GetCustomerInvoice?CustomerId=${this.data.department}`).subscribe(invoicedata => {
      this.Invoicedropdownvalues = invoicedata;
    });

    //formvalues
    this.invoiceForm = this.formBuilder.group({
      selectedinvoicenumber:  [''],
      invoicevalue: [{value: '', disabled: true}],
      alreadyadjustedamount:  [{value: '', disabled: true}],
      balanceamount:  [{value: '', disabled: true}],
      InvoiceDate:  [{value: '', disabled: true}],
      AdvanceAmount:  [{value: '', disabled: true}],
      enteramount: [0]
    });
  }

  

  onchangevalues() {
    this.onSelectionChange();
  }

  advanceamount = this.data.availableAdvance;
  onSelectionChange() {
    this.http.get<any>(environment.apiURL+`Receivable/GetInvoice?invoiceNo=${this.selectedInvoiceOption}&customerId=${this.data.department}`).subscribe(data => {
      this.invoiceValue = data.invoiceValue;
      this.adjustmentAmount = data.adjustmentAmount;
      this.input3 = data.input3;
      this.input4 = data.invoiceDate;
      this.InvoiceAmount = this.advanceamount;
      this.InvoiceId=data.id
    });
  }


  onCloseClick(): void {
    this.dialogRef.close();
  }

  invoicetype:string='';
  selectedValue: any;


  items: any[] = [];
   
  addItem(itemForm) {
    console.log(itemForm,"itemform");

    if (!itemForm.valid) {
      return; // prevent adding the item if the form is not valid
    }

    if (!this.input6) {
      return alert("Field is required"); // prevent adding the item if the quantity field is empty
    }

    this.items.push({ invoicetype: this.invoicetype, selectedValue: this.selectedValue,invoiceValue:this.invoiceValue,adjustmentAmount:this.adjustmentAmount,input3:this.input3,input4:this.input4,InvoiceAmount:this.InvoiceAmount,input6:this.input6 ,id:this.InvoiceId});
    this.InvoiceId=0,
    this.invoicetype = '';
    this.selectedValue;
    this.invoiceValue,
    this.adjustmentAmount,
    this.input3,
    this.input4,
    this.InvoiceAmount,
    this.input6,
    itemForm.reset();
    
  }

 amountvalidationerror:boolean= true;

  amountvalidation() {
    // console.log("eenter the values by the user changes");
    
    const enteredAmount = this.invoiceForm.get('enteramount')?.value;
    console.log("Enter the amount",this.InvoiceAmount);
   
    if (this.input6 > this.InvoiceAmount) {
      this.amountvalidationerror = true;
    }
    else{
      this.amountvalidationerror = false;
    }
  }

    deleteItem(index: number) {
      this.items.splice(index, 1);
    }
    onFormSubmit(){
    console.log(this.items,"Advanceadjustemnt");
  let temparray=this.items.map(x =>{
    return  {
      "invoiceId": x.id,
      "invoiceNo": x.selectedValue,
      "adjustmentAmount": x.adjustmentAmount
    }
  })
    let data = {
      "receivableAdjustments": temparray,
      "advanceId": this.data.id
    }
      this.http.post<any>(environment.apiURL+'AdvanceAdjustment/CreateAdvanceAdjustment',data).subscribe(data=>{
        console.log(data,"formsubmission");
        this._coreService.openSnackBar('Employee added successfully');
       this.dialogRef.close();
      })
    }
}
