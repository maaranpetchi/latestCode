import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//receiptmode dropdown INTERFACE
interface RECEIPTMODE {
  receiptmodevalue: string;
  receiptmodeviewvalue: string;
}
@Component({
  selector: 'app-add-edit-customerreceipts',
  templateUrl: './add-edit-customerreceipts.component.html',
  styleUrls: ['./add-edit-customerreceipts.component.scss']
})

export class AddEditCustomerreceiptsComponent implements OnInit{
  myForm: FormGroup;
  voucherNumber:number;

//dropdown restapi of customername
  selectedCustomerNameOption: any = '';
  CustomerNamedropdownvalues: any[] = [];


   //receiptmode dropdown values
   receiptmodes: RECEIPTMODE[] = [
    { receiptmodevalue: 'Charges',receiptmodeviewvalue: 'Charges' },
    { receiptmodevalue: 'Paypal', receiptmodeviewvalue: 'Paypal' },
    { receiptmodevalue: 'Wire', receiptmodeviewvalue: 'Wire' },
  ];

  constructor(private fb: FormBuilder,private http:HttpClient) {
    this.myForm = this.fb.group({
      vouchernumber: [{ value: 0, disabled: true }],
      voucherdate: ['', Validators.required],
      referencenumber: ['', Validators.required],
      referencedate: ['', Validators.required],
      customername: ['', Validators.required],
      destinationbank: ['', Validators.required],
      description: ['', Validators.required],
      totalreceiptamount: ['', Validators.required],
      exchangerate: ['', Validators.required],

    });


  }
  ngOnInit(){
     // customername dropdown fetch the values from the API
     this.http.get<any>('https://localhost:7208/api/Employee/GetDropDownList').subscribe(customernamedata => {
      this.CustomerNamedropdownvalues = customernamedata.departmentList;
    });
  }

  
  onSubmit() {
    if (this.myForm.valid) {

      const formValue = this.myForm.value;
      console.log(formValue); // Do something with the form value
    }
  }
}
