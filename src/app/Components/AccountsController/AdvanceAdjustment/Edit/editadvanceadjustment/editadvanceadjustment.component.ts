import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AdvanceadjustmentService } from 'src/app/Services/AccountController/AdvanceAdjustment/advanceadjustment.service';
import { AdvanceadjustmentComponent } from '../../Index/advanceadjustment/advanceadjustment.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-editadvanceadjustment',
  templateUrl: './editadvanceadjustment.component.html',
  styleUrls: ['./editadvanceadjustment.component.scss']
})
export class EditadvanceadjustmentComponent {
  itemForm: FormGroup;




  //Customerdropdownvalues dropdowndeclaration
  selectedInvoiceOption: any = '';
  Invoicedropdownvalues: any[] = [];
  invoiceValue: any;
  adjustmentAmount: any;
  input3: any;
  input4: any;
  InvoiceAmount: any;
  input6: any;

  constructor(
    private index:AdvanceadjustmentComponent,private advanceservice:AdvanceadjustmentService,private _fb: FormBuilder,private http: HttpClient,
    public dialogRef: MatDialogRef<EditadvanceadjustmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data,"indexdata");
  console.log(this.advanceamount,"advanceamount");
  
  }

  values: any[] = [];
  
  valueData: any;


  ngOnInit(): void {
    // department dropdown fetch the values from the API
    this.http.get<any>('https://localhost:7208/api/Receivable/GetCustomerInvoice?CustomerId=4141').subscribe(invoicedata => {
      this.Invoicedropdownvalues = invoicedata;
    });
  }


  onchangevalues() {
    this.onSelectionChange(11, 23);
  }

  advanceamount = this.data.availableAdvance;
  onSelectionChange(invoiceid: number, customerid: number) {
    this.http.get<any>(`https://localhost:7208/api/Receivable/GetInvoice?invoiceNo=${this.selectedInvoiceOption}&customerId=${this.data.department}`).subscribe(data => {
      this.invoiceValue = data.invoiceValue;
      this.adjustmentAmount = data.adjustmentAmount;
      this.input3 = data.input3;
      this.input4 = data.invoiceDate;
      this.InvoiceAmount = this.advanceamount;
    });
  }


  onCloseClick(): void {
    this.dialogRef.close();
  }

  invoicetype:string='';
  selectedValue: any;


  items: any[] = [];
   
  addItem(itemForm) {
    if (!itemForm.valid) {
      return; // prevent adding the item if the form is not valid
    }

    if (!this.input6) {
      return alert("Field is required"); // prevent adding the item if the quantity field is empty
    }
    this.items.push({ invoicetype: this.invoicetype, selectedValue: this.selectedValue,invoiceValue:this.invoiceValue,adjustmentAmount:this.adjustmentAmount,input3:this.input3,input4:this.input4,InvoiceAmount:this.InvoiceAmount,input6:this.input6 });
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

    deleteItem(index: number) {
      this.items.splice(index, 1);
    }

}
