
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PricingcalculationService } from 'src/app/Services/AccountController/PricingCalculation/pricingcalculation.service';
import { PopupinvoiceComponent } from '../popupinvoice/popupinvoice.component';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  constructor(private http: HttpClient, private _empService: PricingcalculationService, private dialog: MatDialog) { }

  displayedColumns: string[] = [
    'selected',
    'Client',
    'Jobid',
    'Jobdate',
    'FileName',
    'ProjectCode',
    'Department',
    'JobStatus',
    'scope',
    'StitchCount',
    'estimatedtime',
    'rate',
    'ESTFileReceivedDate',
    'ESTDateofUpload',
    'nonbillableupload'
  ];

  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectedInvoices: any[] = [];
  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedInvoices)
    if (completed == true) {
      this.selectedInvoices.push(item)
    }
    else {

      if (this.selectedInvoices.find(x => x.id == item.id)) {
        this.selectedInvoices = this.selectedInvoices.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedInvoices)
  }
  openDialog() {
    let clientid = 0;
    if (this.selectedInvoices.length == 0) {
      const dialogRef = this.dialog.open(PopupinvoiceComponent, {
        width: '500px',
        height: '150px',
        data: 'Please select the list items!'

      }
      );
    }
    else {
      let temporaryarray: any[] = [];
      clientid = parseInt(this.myForm?.value.ClientId ? this.myForm?.value.ClientId : "0")
      let createdby = 152;
      temporaryarray = this.selectedInvoices.map(x => {
        return {
          "jobId": x.jobId,
          "shortName": x.shortName,
          "scopeId": x.scopeId,
          "scopeDesc": "string",
          "clientId": x.clientId,
          "billingCycleType": x.billingCycleType,
          "dateofUpload": x.dateofUpload,
          "createdBy": 152,
          "departmentId": x.departmentId,
          "tranId": 0,
          "id": x.id,
          "jId": x.jId,
          "pricingTypeId": 0,
          "getInvoice": [],

          "fileReceivedDate": x.fileReceivedDate,
          "isBillable": x.isBillable,
          "specialPrice": x.specialPrice?x.specialPrice:0,
          "estimatedTime": x.estimatedTime,
          "isWaiver": true,
          "jobStatusId": 0
        }
      })

      let result: any = {
        "jobId": "string",
        "shortName": "string",
        "scopeId": 0,
        "scopeDesc": "string",
        "clientId": 0,
        "billingCycleType": "string",
        "dateofUpload": "2023-04-06T08:51:10.069Z",
        "createdBy": 152,
        "departmentId": 0,
        "tranId": 0,
        "id": 0,
        "jId": 0,
        "pricingTypeId": 0,
        "getInvoice": temporaryarray,
        "fileReceivedDate": "2023-04-06T08:51:10.069Z",
        "isBillable": true,
        "specialPrice": 0,
        "estimatedTime": 0,
        "isWaiver": true,
        "jobStatusId": 0
      }
      this.onInvoiceCalculation(result)
    }

  }



  ngOnInit(): void {
    this.http.get<any>(environment.apiURL+'Invoice/GetClient').subscribe(data => {
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


 


  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({

      next: (res) => {

        this.dataSource = new MatTableDataSource(res);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);

      },
      error: console.log,
    });
  }
  onSubmit() {
    // Call the API to get the search results
    this.http.post<any>(environment.apiURL+'Invoice/GetClientDetails', {
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

  onInvoiceCalculation(item: any) {
   // Call the API to get the search results
    this.http.post<any>(environment.apiURL+'Invoice/GenerateInvoice', item).subscribe((results: any) => {
      // Set the search results in the data source
      const dialogRef = this.dialog.open(PopupinvoiceComponent, {
        width: '500px',
        height: '150px',
        data: 'Updated successfully!'
      }
      );
    }
    )
  }
}
