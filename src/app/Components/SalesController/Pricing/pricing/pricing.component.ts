import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

export interface TableData {
  pricingType: string;
  department: string;
  scope: string;
  jobStatus: string;
  withEffective: string;
  from: string;
  to: string;
  fromeffective: string;
  toeffective: string;
  fileCount: number;
  fromDate: string;
  toDate: string;
  destination: string;
  numOfArtist: number;
}


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {



  constructor(private _dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

    selectedFilter: number;

  ngOnInit(): void {
    //department
    this.http.get<any>('https://localhost:7208/api/Pricing/pricingList').subscribe(data => {
      this.departments = data.departments;
    });

    //pricingtypes
    this.http.get<any>(`https://localhost:7208/api/Pricing/PricingTypesByDeptId?departmentId=1`).subscribe(data => {
      this.pricingtypes = data;
    });

    //customers
    this.http.get<any>(`https://localhost:7208/api/Pricing/PricingTypesByDeptId?departmentId=1`).subscribe(data => {
      this.customers = data;
    });
    //scopes
    this.http.get<any>(`https://localhost:7208/api/Pricing/PricingTypesByDeptId?departmentId=1`).subscribe(data => {
      this.scopes = data;
    });

  }

  departments: any[] = [];
  selecteddepartmentOption: string; // stores the selected department value
  pricingtypes: any[] = [];
  selectedpricingtypeOption: string;//store the seleceted pricingtype value
  customers: any[] = [];
  selectedcustomerOption: string;
  scopes: any[] = [];
  selectedscopeOption: string;
jobstatus:any[]=[];
selectedjobstatusOption:string;



}
