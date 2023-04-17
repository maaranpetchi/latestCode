import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-invoicecancellation',
  templateUrl: './invoicecancellation.component.html',
  styleUrls: ['./invoicecancellation.component.scss']
})
export class InvoicecancellationComponent {

  constructor(private http: HttpClient) { }

  displayedColumns: string[] = [
    'invoicenumber',
    'invoicedate',
    'productvalue',
    'wavier',
    'roundoff',
    'discount',
    'invoicevalue',
    
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
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedInvoices)
  }



  ngOnInit(): void {
    //client dropdown
    this.http.get<any>('https://localhost:7208/api/invoice/getdropclientforinvoicecancel').subscribe(data => {
      this.clientdata = data;
      console.log(data);
    });

    //invoicenumber dropdown
    this.http.get<any>('https://localhost:7208/api/invoice/getallinvoicemasterdetails').subscribe(invoicedata => {
      this.invoicenumberdata = invoicedata;
      console.log(invoicedata);
    });
  }

  clientdata: any = {
    clientDrop: [],
  };
  invoicenumberdata: any = {
    getInvoice: [],
  };

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myForm = new FormGroup({
    invoicenumber: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required)
  });



  
  onSubmit() {
    // Call the API to get the search results
    this.http.post<any>('https://localhost:7208/api/Invoice/GetClientDetails', {
      "clientId": this.myForm.value?.ClientId,
      "invoicenumber": this.myForm.value?.invoicenumber,
    }).subscribe((results: any) => {
      // Set the search results in the data source

      this.dataSource.data = results.getInvoice;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(results, "results")
    }
    )
  }

  
}
