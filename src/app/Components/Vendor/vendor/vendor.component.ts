import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  ngOnInit(): void {
    this.fetchtableData();
  }
  constructor(private http: HttpClient, private loginservice: LoginService, private coreservice: CoreService) { }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['VendorName', 'InvoiceNumber', 'InvoiceDate', 'InvoiceValue', 'PendingAmount', 'AmountPaid', 'Action'];
  btnAccountEEdit(id: string) {
    // Implement your edit logic here
  }

  fetchtableData() {
    this.http.get<any>(environment.apiURL + `ITAsset/nGetVendorData`).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.vendorGDetailList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
