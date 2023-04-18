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
  displayedColumns: string[] = ['quantity', 'rate', 'value', 'pricingtype', 'scope', 'department',];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
   
  }

  

  



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}