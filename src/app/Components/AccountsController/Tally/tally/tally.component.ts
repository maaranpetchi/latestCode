import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.scss']
})
export class TallyComponent implements OnInit {
  exchangeHeader: number;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  displayedColumns: string[] = [
    'selected',
    'ClientName',
    'invoiceno',
    'invoicedate',
    'productamount',
    'roundoff',
    'waiver',
    'discount',
    'invoiceamout',
    'paymentmode',
    'exchangerate',
  ];

  selectedInvoices: any[] = [];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedInvoices)
    if (completed == true) {
      this.selectedInvoices.push(item)
    }
    else {

      if (this.selectedInvoices.find(x => x.id == item.id)) {
        this.selectedInvoices = this.selectedInvoices.filter(x => {
          if (x.id!= item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedInvoices)
  }

setExchangeHeader() {
  let temparray:any[]=[]
 let skip:boolean;
    this.dataSource.data.filter((y:any)=>{
      skip=false;
      this.selectedInvoices.forEach(x=>{
      if(y.id===x.id){
        temparray.push({  ...y,
          exchangeRate:this.exchangeHeader,
        isSelected:true})
          skip=true;
      }
     
    })
    if(!skip){
      temparray.push(y)
    }
   
    })

  this.dataSource.data=temparray;
}

  ngOnInit(): void {
    this.http.get<any>('https://localhost:7208/api/Invoice/GetClient').subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }

  data: any = {
    clientList: [],
  };

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myForm = new FormGroup({

    fromDate: new FormControl("", Validators.required),
    toDate: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required)
  });



  // openDialog() {
  //   let clientid = 0;
  //   if (this.selectedInvoices.length == 0) {
  //     const dialogRef = this.dialog.open(InformationpopupComponent, {
  //       width: '500px',
  //       height: '150px',
  //       data: 'Please select the list items!'

  //     }
  //     );
  //   }
  //   else {
  //     let temporaryarray: any[] = [];
  //     clientid = parseInt(this.myForm?.value.ClientId ? this.myForm?.value.ClientId : "0")
  //     let createdby = 152;
  //     temporaryarray = this.selectedInvoices.map(x => {
  //       return {
  //         "jobId": x.jobId,
  //         "shortName": x.shortName,
  //         "scopeId": x.scopeId,
  //         "scopeDesc": "string",
  //         "clientId": x.clientId,
  //         "billingCycleType": x.billingCycleType,
  //         "dateofUpload": x.dateofUpload,
  //         "createdBy": 152,
  //         "departmentId": x.departmentId,
  //         "tranId": 0,
  //         "id": x.id,
  //         "jId": x.jId,
  //         "pricingTypeId": 0,
  //         "getInvoice": [],

  //         "fileReceivedDate": x.fileReceivedDate,
  //         "isBillable": x.isBillable,
  //         "specialPrice": x.specialPrice,
  //         "estimatedTime": x.estimatedTime,
  //         "isWaiver": true,
  //         "jobStatusId": 0
  //       }
  //     })

  //     let result: any = {
  //       "jobId": "string",
  //       "shortName": "string",
  //       "scopeId": 0,
  //       "scopeDesc": "string",
  //       "clientId": 0,
  //       "billingCycleType": "string",
  //       "dateofUpload": "2023-04-06T08:51:10.069Z",
  //       "createdBy": 0,
  //       "departmentId": 0,
  //       "tranId": 0,
  //       "id": 0,
  //       "jId": 0,
  //       "pricingTypeId": 0,
  //       "getInvoice": temporaryarray,
  //       "fileReceivedDate": "2023-04-06T08:51:10.069Z",
  //       "isBillable": true,
  //       "specialPrice": 0,
  //       "estimatedTime": 0,
  //       "isWaiver": true,
  //       "jobStatusId": 0
  //     }
  //     this.onInvoiceCalculation(result)
  //   }

  // }

  getEmployeeList() {
    // this._empService.getEmployeeList().subscribe({

    //   next: (res) => {

    //     this.dataSource = new MatTableDataSource(res);

    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
    //     console.log(res);

    //   },
    //   error: console.log,
    // });
  }
  onSubmit() {
    // Call the API to get the search results
    this.http.post<any>('https://localhost:7208/api/Invoice/GetInvoiceIntegrationMaster', {
      "clientId": this.myForm.value?.ClientId,
      "fromDate": this.myForm.value?.fromDate,
      "toDate": this.myForm.value?.toDate
    }).subscribe((results: any) => {
      // Set the search results in the data source

      this.dataSource.data = results.getInvoice;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(results, "results")
    }
    )
  }

  // onInvoiceCalculation(item: any) {
  //   // Call the API to get the search results
  //   this.http.post<any>('https://localhost:7208/api/Invoice/GetCalculatedInvoice', item).subscribe((results: any) => {
  //     // Set the search results in the data source
  //     const dialogRef = this.dialog.open(InformationpopupComponent, {
  //       width: '500px',
  //       height: '150px',
  //       data: 'Updated successfully!'
  //     }
  //     );
  //   }
  //   )
  // }
updateintegration(){

var invintigxchange = this.selectedInvoices.map(x => {
return { 
  "id": x.id,
  "invoiceNo": "",
  "exchangeRate": this.exchangeHeader,
  "invintigxchange": []
}
})
var data={
  "id": 0,
  "invoiceNo": "",
  "exchangeRate": 0,
  "invintigxchange": invintigxchange
}
this.http.post<any>('https://localhost:7208/api/Invoice/GetExchangeRatetoInvoice',data).subscribe(data => {
  console.log(data, "updateinvooice");
  this.selectedInvoices = [];
  this.onSubmit();
})
}


movetointegration(){

  let invintiglist=  this.selectedInvoices.map(x =>{
    return {
      "id": x.id,
      "invoiceNo": x.invoiceNo,
      "invoiceDate": x.invoiceDate,
      "estInvoiceDate": x.estInvoiceDate,
      "referenceDate": x.referenceDate,
      "shortName": x.shortName,
      "description": x.description,
      "productValue": x.productValue,
      "discount": x.discount,
      "invoiceValue": x.invoiceValue,
      "createdUTC": x.createdUTC,
      "createdBy": 0,
      "employeeId": 0,
      "updatedBy": 0,
      "invintiglist": [],
      "updatedUTC": x.updatedUTC,
      "primaryDateTime": x.primaryDateTime,
      "secondaryDateTime": x.secondaryDateTime,
      "artInvoiceAmount": x.artInvoiceAmount,
      "digiInvoiceAmount": x.digiInvoiceAmount,
      "roundOff": x.roundOff,
      "artWaiver": x.artWaiver,
      "digiWaiver": x.digiWaiver,
      "waiver": x.waiver,
      "receivableValue": x.receivableValue,
      "totalInvoiceValue": x.totalInvoiceValue,
      "transactionId": x.transactionId,
      "exchangeRate": x.exchangeRate
    }
    
  
  })
  let data = {
    "id": 0,
    "invoiceNo": "string",
    "invoiceDate": "2023-04-25T12:46:24.137Z",
    "estInvoiceDate": "2023-04-25T12:46:24.137Z",
    "referenceDate": "2023-04-25T12:46:24.137Z",
    "shortName": "string",
    "description": "string",
    "productValue": 0,
    "discount": 0,
    "invoiceValue": 0,
    "createdUTC": "2023-04-25T12:46:24.137Z",
    "createdBy": 0,
    "employeeId": 152,
    "updatedBy": 0,
    "invintiglist":invintiglist,
    "updatedUTC": "2023-04-25T12:46:24.137Z",
    "primaryDateTime": "2023-04-25T12:46:24.137Z",
    "secondaryDateTime": "2023-04-25T12:46:24.137Z",
    "artInvoiceAmount": 0,
    "digiInvoiceAmount": 0,
    "roundOff": 0,
    "artWaiver": 0,
    "digiWaiver": 0,
    "waiver": 0,
    "receivableValue": 0,
    "totalInvoiceValue": 0,
    "transactionId": 0,
    "exchangeRate": 0
  }
  this.http.post<any>('https://localhost:7208/api/Invoice/GetCopytoIntegration',data).subscribe(data =>{
    console.log(data,"movedata");
    this.selectedInvoices = [];
    this.onSubmit();
  })
}
}
