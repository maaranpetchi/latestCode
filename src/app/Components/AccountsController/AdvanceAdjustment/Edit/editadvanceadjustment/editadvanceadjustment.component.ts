import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AdvanceadjustmentService } from 'src/app/Services/AccountController/AdvanceAdjustment/advanceadjustment.service';
import { AdvanceadjustmentComponent } from '../../Index/advanceadjustment/advanceadjustment.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Console } from 'console';

@Component({
  selector: 'app-editadvanceadjustment',
  templateUrl: './editadvanceadjustment.component.html',
  styleUrls: ['./editadvanceadjustment.component.scss']
})
export class EditadvanceadjustmentComponent {
  //Customerdropdownvalues dropdowndeclaration
  selectedInvoiceOption: any = '';
  Invoicedropdownvalues: any[] = [];
  input1: any;
  input2: any;
  input3: any;
  input4: any;
  input5: any;
  input6: any;
  constructor(
    private index:AdvanceadjustmentComponent,
    private advanceservice:AdvanceadjustmentService,
    private _fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { console.log(data,"indexdata");
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

  onSelectionChange(invoiceid: number, customerid: number) {
    this.http.get<any>(`https://localhost:7208/api/Receivable/GetInvoice?invoiceNo=${this.selectedInvoiceOption}&customerId=${this.data}`).subscribe(data => {
      this.input1 = data.invoiceValue;
      this.input2 = data.adjustmentAmount;
      this.input3 = data.input3;
      this.input4 = data.invoiceDate;
      this.input5 = data.input5;
    });
  }

  invoicetype:string='';
  selectedValue: any;


  items: any[] = [];
    addItem(form: any) {
      if (form.valid) {
        console.log(form,"additem");
        
        this.items.push({ invoicetype: this.invoicetype, selectedValue: this.selectedValue,input1:this.input1,input2:this.input2,input3:this.input3,input4:this.input4,input5:this.input5,input6:this.input6 });
        this.invoicetype = '';
        this.selectedValue;
        this.input1,
        this.input2,
        this.input3,
        this.input4,
        this.input5,
        this.input6,
        
        form.reset();
      }
    }

    deleteItem(index: number) {
      this.items.splice(index, 1);
    }

}
