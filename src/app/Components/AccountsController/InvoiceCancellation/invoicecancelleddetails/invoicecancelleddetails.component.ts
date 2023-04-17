import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-invoicecancelleddetails',
  templateUrl: './invoicecancelleddetails.component.html',
  styleUrls: ['./invoicecancelleddetails.component.scss']
})
export class InvoicecancelleddetailsComponent implements OnInit {
  displayedColumns: string[] = ['quantity', 'rate', 'value', 'pricingtype', 'scope', 'department', 'invoicenumber', 'invoicedate'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  // getData() {
  //   this.http.get('https://myapi.com/data').subscribe((data: any[]) => {
  //     this.dataSource = new MatTableDataSource(data);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }

  getData() {
    this.http.get('https://myapi.com/data').subscribe((response: any) => {
      if (response && response.length) {
        // transform the API response if needed to match the structure of your table's columns
        const data = response.map(item => {
          return {
            CancellationNo: item.cancellationNo,
            InvoiceNo: item.invoiceNo,
            CancelledDate: item.cancelledDate,
            CancelledBy: item.cancelledBy,
            ProductValue: item.productValue,
            Wavier: item.wavier,
            RoundOff: item.roundOff,
            Discount: item.discount,
            Invoicevalue: item.invoiceValue
          };
        });
        // assign the transformed data to the MatTableDataSource
        this.dataSource = new MatTableDataSource(data);
        // set the paginator and sort to the MatTableDataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}