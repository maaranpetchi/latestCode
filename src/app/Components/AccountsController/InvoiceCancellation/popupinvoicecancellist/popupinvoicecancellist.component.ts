import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-popupinvoicecancellist',
  templateUrl: './popupinvoicecancellist.component.html',
  styleUrls: ['./popupinvoicecancellist.component.scss']
})
export class PopupinvoicecancellistComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['quantity', 'rate', 'value', 'pricingtype','scope','department','invoicenumber','invoicedate'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const request = {
      // your request body goes here
      "id":0,
      "invoiceNo":"18190055"
    };

    this.http.post<any>('https://localhost:7208/api/Invoice/GetInvoiceTranforSalesCancel', request).subscribe(data => {
      const invoicedata = data.invoicesc
    this.dataSource = new MatTableDataSource(invoicedata);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}