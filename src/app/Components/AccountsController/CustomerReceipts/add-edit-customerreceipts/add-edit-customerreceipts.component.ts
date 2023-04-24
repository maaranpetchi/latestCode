import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//receiptmode dropdown INTERFACE
interface RECEIPTMODE {
  receiptmodevalue: string;
  receiptmodeviewvalue: string;
}

interface Item {
  siNo: number;
  type: string;
  transactionNo: string;
  amount: number;
  bankName: string;
  date: string;
}

interface Invoice {
  number: string;
  date: string;
  value: number;
  amountToBeAdjusted: number;
  adjustedAmount: number;
  balanceToBeAdjusted: number;
}

@Component({
  selector: 'app-add-edit-customerreceipts',
  templateUrl: './add-edit-customerreceipts.component.html',
  styleUrls: ['./add-edit-customerreceipts.component.scss']
})

export class AddEditCustomerreceiptsComponent implements OnInit {
  selectedType: string='';
  transactionNo: string='';
  amount: number=0;
  bankName: string='';
  date: string='';
  items: any[] = [];
  showTable = false;
  invoicenumber:string='';


  myForm: FormGroup;
  voucherNumber: number;
  totalreceiptamount: string = '';
  Amount: string = '';

  add() {
    const newItem: Item = {
      siNo: this.items.length + 1,
      type: this.selectedType,
      transactionNo: this.transactionNo,
      amount: this.amount,
      bankName: this.bankName,
      date: this.date
    };
    this.items.push(newItem);
    this.showTable = true;
  }

  delete(index: number) {
    this.items.splice(index, 1);
  }


  setamountvalue() {
    this.Amount = this.totalreceiptamount;
  }

  //dropdown restapi of customername
  selectedCustomerNameOption: any = '';
  CustomerNamedropdownvalues: any[] = [];
//invoicenumber
selectedInvoiceNumberNameOption:any ='';
invoicenumberdropdownvalue:any[] = [];

  //receiptmode dropdown values
  receiptmodes: RECEIPTMODE[] = [
    { receiptmodevalue: 'Charges', receiptmodeviewvalue: 'Charges' },
    { receiptmodevalue: 'Paypal', receiptmodeviewvalue: 'Paypal' },
    { receiptmodevalue: 'Wire', receiptmodeviewvalue: 'Wire' },
  ];

  //invoicedetails
  invoices: Invoice[];
  selectedInvoice: Invoice = {} as Invoice;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      vouchernumber: [{ value: 0, disabled: true }, Validators.required],
      voucherdate: ['', Validators.required],
      referencenumber: ['', Validators.required],
      referencedate: ['', Validators.required],
      customername: ['', Validators.required],
      destinationbank: ['', Validators.required],
      description: ['', Validators.required],
      totalreceiptamount: ['', Validators.required],
      exchangerate: ['', Validators.required],
      receiptmode: ['', Validators.required],
      bankname: ['', Validators.required],
      transactionnumber: ['', Validators.required],
      amount: [{ disabled: true }, Validators.required],
      transactiondate: ['', Validators.required],
      invoicenumber:['', Validators.required],
    });


  }
  ngOnInit() {
    // customername dropdown fetch the values from the API
    this.http.get<any>('https://localhost:7208/api/Invoice/getCustomers').subscribe(customernamedata => {
      this.CustomerNamedropdownvalues = customernamedata.stringList;
    });

    //invoicenumber
    this.http.get<any>('https://localhost:7208/api/Receivable/GetCustomerInvoice?CustomerId=4141')
    .subscribe(invoicenumberdata => {
      this.invoicenumberdropdownvalue = invoicenumberdata;
    });
}


onSubmit() {
  if (this.myForm.valid) {

    const formValue = this.myForm.value;
    console.log(formValue); // Do something with the form value
  }
}
}
