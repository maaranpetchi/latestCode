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
import { environment } from 'src/Environments/environment';


//Interface for servertype
interface GETSTD {
  id: string;
  description: string;
}
interface GETWSD {
  id: string;
  description: string;
}
@Component({
  selector: 'app-add-itassets',
  templateUrl: './add-itassets.component.html',
  styleUrls: ['./add-itassets.component.scss']
})
export class AddItassetsComponent implements OnInit {
  hardwareStepFormGroup: FormGroup;
  softwareStepFormGroup: FormGroup;



  ngOnInit(): void {
    this.getPcType();
  }
  constructor(private http: HttpClient, private _coreService: CoreService, private loginservice: LoginService, private spinnerService: SpinnerService, private router: Router) { }
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['baynumber', 'software', 'softwarestatus', 'Action'];
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
  Type: number;
  BayNo: string;
  Location: string;
  baynodisable: boolean = false;


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
  GetSTD: GETSTD[] = [
    { id: '1', description: "Server" },
    { id: '2', description: "Virtual Server" }
  ];
  ServerTypeV: any;

  InvoiceDate: Date;
  InvoiceNumber: string;
  Mouse: string;
  MouseSNO: string;
  WorkingStatus: any;
  GetWSD: GETWSD[] = [
    { id: '1', description: "Active" },
    { id: '2', description: "Repair" },
    { id: '3', description: "Stand By" }
  ];
  WorkingStatusV: any;
  //NgModel to save the values


  //second Form 
  SoftwareId: number[];
  SoftwareData: any[] = [];
  SoftwareStatus: number;


  //method to get the pctype dropdown
  getPcType() {
    this.http.get<any>(environment.apiURL + `ITAsset/nGetHardwareSoftware`).subscribe(results => {
      this.HardwareData = results.hardwareData;
    });
  }

  //mrthod to show the instock in input field
  onTypeChange() {
    if (this.Type === 2) { // If the selected type is "InStock" (value = 2)
      // Set the BayNo field with the values of InStock
      this.BayNo = 'Instock';
      // Disable the BayNo input field
      this.baynodisable = true;
    } else {
      // If the selected type is anything other than "InStock"
      // Reset the BayNo field to an empty value
      this.BayNo = '';
      // Enable the BayNo input field
      this.baynodisable = false;
    }
  }

  firstNext() {
    console.log("enetr the first");
    
    // let payload = {
    //   BayNumber: this.BayNo,
    //   Brand: this.Brand,
    //   Division: this.Division,
    //   EmployeeId: this.loginservice.getUsername(),
    //   Graphics: this.Graphics,
    //   HardwareId: "2",
    //   Hdd: this.HDD,
    //   InvoiceDate: this.InvoiceDate,
    //   InvoiceNumber: this.InvoiceNumber,
    //   IpAddress: this.IPAddress,
    //   Keyboard: this.keyboard,
    //   KeyboardSerialNumber: this.keyboardSno,
    //   Location: this.Location,
    //   MacAddress: this.MacAddress,
    //   Model: this.Model,
    //   Monitor: this.Monitor,
    //   MonitorSerialNumber: this.MonitorSno,
    //   Mouse: this.Mouse,
    //   MouseSerialNumber: this.MouseSNO,
    //   Os: this.OS,
    //   PcName: this.PcName,
    //   Processor: this.Processor,
    //   Ram: this.RAM,
    //   Roll: this.Roll,
    //   ServerTypeId: this.ServerType,
    //   TagNumber: this.TAGNumber,
    //   WarantyDetails: this.WarrantyDetails,
    //   WorkingStatusId: this.WorkingStatus
    // }


    let payloadupload={
      "id": 0,
      "employeeId":this.loginservice.getUsername(),
      "BayNumber": this.BayNo,
      "Brand": this.Brand,
      "Division": this.Division,
      "EmployeeId": this.loginservice.getUsername(),
      "Graphics": this.Graphics,
      "HardwareId": "2",
      "Hdd": this.HDD,
      "InvoiceDate": this.InvoiceDate,
      "InvoiceNumber": this.InvoiceNumber,
      "IpAddress": this.IPAddress,
      "Keyboard": this.keyboard,
      "KeyboardSerialNumber": this.keyboardSno,
      "Location": this.Location,
      "MacAddress": this.MacAddress,
      "Model": this.Model,
      "Monitor": this.Monitor,
      "MonitorSerialNumber": this.MonitorSno,
      "Mouse": this.Mouse,
      "MouseSerialNumber": this.MouseSNO,
      "Os": this.OS,
      "PcName": this.PcName,
      "Processor": this.Processor,
      "Ram": this.RAM,
      "Roll": this.Roll,
      "ServerTypeId": this.ServerType,
      "TagNumber": this.TAGNumber,
      "WarantyDetails": this.WarrantyDetails,
      "WorkingStatusId": this.WorkingStatus,
      "softwareId": [],
      "softwareStatusId": 0,
      "serverType": "",
      "workingStatus": "",

    }
    this.http.post<any>(environment.apiURL +`ITAsset/nSetITHData`,payloadupload).subscribe(results =>{
      this._coreService.openSnackBar("Data Added successfully!");
    });
    console.log(payloadupload,"payloadinfirstpage");
    
  }
}
