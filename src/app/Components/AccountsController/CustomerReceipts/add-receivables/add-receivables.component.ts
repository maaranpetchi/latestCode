import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-add-receivables',
  templateUrl: './add-receivables.component.html',
  styleUrls: ['./add-receivables.component.scss']
})
export class AddReceivablesComponent implements OnInit {
  InvoiceDetailsPanel: boolean = false; // to display the invoice div
  RemoveInvoiceId: any;
  isInputDisabled: boolean = true; // Set this based on your logic
  InvoiceDetails: any;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getCustomerDropdown();
  }
  //dropdown restapi of customername
  selectedCustomerNameOption: any = '';
  CustomerNamedropdownvalues: any[] = [];
  AddedInvoice: any[] = [];
  //ngmodel
  voucherdate: string = '';
  referenceNumber: any;
  referencedate: any;
  CustomerId: any;
  destinationBank: any;
  exchangerate: number;
  totalreceiptamount: number;
  description: any;
  //ngmodel invoice details
  selectedInvoiceNumberNameOption: any = '';
  invoiceDate: Date;
  invoiceValue: any;
  amounttobeadjusted: any;
  amountadjusted: any;
  adjustedamount: any;
  balanceadjusted: any;
  invoiceNumber:any;


  //dropdown array declaration
  invoicenumberdropdownvalue: any[] = [];
  ///methods
  getCustomerDropdown() {
    // customername dropdown fetch the values from the API
    this.http.get<any>(environment.apiURL + 'Invoice/getCustomers').subscribe(customernamedata => {
      this.CustomerNamedropdownvalues = customernamedata.stringList;
    });
  }

  CustomerInvoice(id) {
    this.InvoiceDetailsPanel = true;

    //invoicenumber
    this.http.get<any>(environment.apiURL + `Receivable/GetCustomerInvoice?CustomerId=${id}`)
      .subscribe(invoicenumberdata => {
        console.log(invoicenumberdata, "InvoicenumberData")

        this.invoicenumberdropdownvalue = invoicenumberdata;
      });
  }

  RemoveInvoice(i) {
    this.RemoveInvoiceId = i;
  }


  InvoiceDetailsChanges() {
    console.log(this.invoiceNumber, "InvoiceNumber");
    console.log(this.CustomerId, "CustomerId");

    this.http.get<any>(environment.apiURL + `Receivable/GetInvoice?invoiceNo=${this.invoiceNumber}&customerId=${this.CustomerId}`).subscribe(result => {

      this.InvoiceDetails = result;

      var AdjustmentAmount = this.adjustedamount;
      var InvoiceValue = this.invoiceValue;
     let  CurrentAdjustmentCheck = InvoiceValue - AdjustmentAmount;
    let  InvoiceValueCheck = CurrentAdjustmentCheck + AdjustmentAmount;
     // $scope.InvoiceDetails.CurrentAdjustedAmount = InvoiceValue - AdjustmentAmount;
    });
  }

}
