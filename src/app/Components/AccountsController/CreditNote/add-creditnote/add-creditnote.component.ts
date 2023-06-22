import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
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
  selectedCustomerOption: any = 0;
  Customerdropdownvalues: any[] = [];

//Invoidedropdown
selectedinvoiceoption:any='';
invoicedropdownvalues:any[] = [];


adjustedAmount1:any[] = [];
receivableAdjustment:any[] = [];


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
      invoicenumber: new FormControl(''),

    });
   }
  ngOnInit(): void {
     // customer dropdown fetch the values from the API
     this._empservice.getcustomerdropdown().subscribe(customerdata => {
      this.Customerdropdownvalues = customerdata;
      // Sort the array by a specific property
  this.Customerdropdownvalues.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });
    });

//Invoice number dropdown

  }
 

  selectedValue: any;

  invoiceDate:any=""
  invoiceValue:any=0
  adjustedAmount:number=0;
  amountToBeAdjusted:number=0;
  invoicenumberdetails(){
    this.http.get<any>(environment.apiURL+`Receivable/GetInvoice?invoiceNo=${this.selectedinvoiceoption}&customerId=${this.selectedCustomerOption}`).subscribe(data => {
    console.log(data)  
    this.invoiceDate=new Date(data.invoiceDate).toLocaleDateString()
      this.invoiceValue=data.invoiceValue
      this.adjustedAmount=data.adjustmentAmount
      this.amountToBeAdjusted=data.invoiceValue-data.adjustmentAmount
    });
   
  }

onchangesubmit(){
  this.http.get<any[]>(environment.apiURL+`Receivable/GetCustomerInvoice?CustomerId=${this.selectedCustomerOption}`).subscribe(data => {
    this.invoicedropdownvalues = data;
  });

}

  onFormSubmit(){
    let adjustmentDetails = {
      IsInvoiceAdjustment: true,
      InvoiceId:23,
      InvoiceNo: "3445",
      AdjustmentAmount: 90,
    };
    
    let AlreadyAdjustedDetails = {
      InvoiceId:10,
      InvoiceNo:"9546",
      AlreadyAdjustedAmount:23.45,
      InvoiceValue: 89,
      CurrentAdjustedAmount: 10,
    };
    
    
     this.adjustedAmount1.push(AlreadyAdjustedDetails);
     this.receivableAdjustment.push(adjustmentDetails);
   let receivable = {
        ReceivableAdjustments: this.receivableAdjustment,
        Receivables: {
            CollectionDate: "2023-04-27T12:37:39.120Z",
            CollectionAmount: 23,
            ExchangeRate:23,
            ReferenceNo:"2023",
            ReferenceDate: "2023-04-27T12:37:39.120Z",
            Description: "CreditNoteDetails.Description",
            CreatedBy: 4141,
            CustomerId: 200,
        },
        AlreadyAdjusted: this.adjustedAmount1,
       
    };
    this.http.post<any>(environment.apiURL+`Receivable/CreateCreditNote`,receivable).subscribe(data => {
   console.log(data)
  });
  }
}
