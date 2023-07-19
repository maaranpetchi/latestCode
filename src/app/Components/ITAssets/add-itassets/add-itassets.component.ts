import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-add-itassets',
  templateUrl: './add-itassets.component.html',
  styleUrls: ['./add-itassets.component.scss']
})
export class AddItassetsComponent implements OnInit {
  hardwareStepFormGroup: FormGroup;
  softwareStepFormGroup: FormGroup;
  
  ngOnInit(): void {
  
  }
  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService, private loginservice: LoginService, private spinnerService: SpinnerService,  private router: Router) {}
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;  
  displayedColumns: string[] = ['baynumber', 'software', 'softwarestatus','Action'];
  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    // this.spinnerService.requestStarted();

    // this.checklistservice.deleteEmployee(id).subscribe({
    //   next: (res) => {
    //     this.spinnerService.requestEnded();

    //     this._coreService.openSnackBar('Employee deleted!', 'done');
    //     this.fetchtableData();
    //   },
    //   error: console.log,
    // });
  }
  //NgModel to save the values
  Type:number;
  BayNo: string; 
  Location: string; 
  baynodisable: boolean; 


  PcName: string; 
  PcType: any; 
  HardwareData: any[] = [];
  PcTypeV: any;

  Monitor: string; 
  MonitorSno: string; 
  keyboard: string;
  keyboardSno: string;

  Roll: string; 
  Division: string;

  Brand: string;
  Model: string;

  WarrantyDetails: string; 
  RAM: string;

  Processor: string;
  Graphics: string;
 
  HDD: string; 
  TAGNumber: string;

  MacAddress: string; 
  OS: string;

  IPAddress: string; 
  ServerType: any; 
  GetSTD: any[] =[];
  ServerTypeV: any;

  InvoiceDate: Date; 
  InvoiceNumber: string;
  Mouse: string; 
  MouseSNO: string; 
  WorkingStatus: any; 
  GetWSD: any[] = [];
  WorkingStatusV: any;
//NgModel to save the values


//second Form 
SoftwareId: number[];
SoftwareData: any[] = []; 
SoftwareStatus: number;

}
