import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { ClientcordinationService } from 'src/app/Services/CoreStructure/ClientCordination/clientcordination.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';

@Component({
  selector: 'app-joborderexcel',
  templateUrl: './joborderexcel.component.html',
  styleUrls: ['./joborderexcel.component.scss']
})
export class JoborderexcelComponent implements OnInit {
  selectedFile: File[] = [];


  displayedColumns: string[] = [
    'Department',
    'clientname',
    'clientstatus',
    'jobstatus',
    'filename',
    'fileReceivedDate',
    'Divisions',
    'uploaded'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private loginservice: LoginService, private clientcordinationservice: ClientcordinationService, private _coreService: CoreService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files;

  }
  ViewImportExcelFinal = {};
  ViewImportExcel = {};
  ViewImportExcelTrue = {};
  importExceFile() {
    let employeeId = this.loginservice.getUsername();
    var fd = new FormData();
    for (let i = 0; i < this.selectedFile.length; i++) {
      fd.append('Files', this.selectedFile[i]);
    }
    fd.append('Id', employeeId);
    this.http.post<any>(environment.apiURL + `JobOrder/PostImportExcel?EmployeeId=${parseInt(this.loginservice.getUsername())}`, fd).subscribe(response => {
      this.postBindFileInward();
      this.postFileInwardType();
    }, (error) => {
      // Handle error (optional)
      this.spinnerService.requestEnded();
      console.error('API call failed:', error);
    }
    );
  }

  postBindFileInward() {
    this.spinnerService.requestStarted();
    this.clientcordinationservice.getBindFileInward().subscribe(fileinwarddata => {
      this.spinnerService.requestEnded();
      this.ViewImportExcel = fileinwarddata;
      this.dataSource = fileinwarddata;
      

    }, (error) => {
      // Handle error (optional)
      this.spinnerService.resetSpinner();
      console.error('API call failed:', error);
    });
  }

  postFileInwardType() {
    this.spinnerService.requestStarted();
    this.clientcordinationservice.getBindFileInwardOnlyTrue().subscribe(inwarddata => {
      this.spinnerService.requestEnded();
      this.ViewImportExcelTrue = inwarddata;
      
    }, (error) => {
      // Handle error (optional)
      this.spinnerService.resetSpinner();
      console.error('API call failed:', error);
    });
  }


  //submit
  InwardExcelDatas() {
    let payload = {
      "id": 0,
      "dateofReceived": "2023-06-21T11:58:24.045Z",
      "clientName": "string",
      "clientJobId": "string",
      "fileName": "string",
      "jobStatusDescription": "string",
      "username": "string",
      "salesPersonName": "string",
      "clientSalesPerson": "string",
      "customerName": "string",
      "temp": "string",
      "style": "string",
      "projectCode": "string",
      "teamCode": "string",
      "schoolName": "string",
      "ground": "string",
      "gender": "string",
      "fileInwardMode": "string",
      "status": true,
      "fileReceivedDate": "2023-06-21T11:58:24.045Z",
      "jobDescription": "string",
      "jobStatusId": 0,
      "departmentId": 0,
      "divisionId": 0,
      "employeeId": 0,
      "clientId": 0,
      "remarks": "string",
      "poNo": "string",
      "fileInwardTypeId": 0,
      "color": "string",
      "logoDimensionWidth": "string",
      "logoDimensionsLength": "string",
      "apparelLogoLocation": "string",
      "imprintColors1": "string",
      "imprintColors2": "string",
      "imprintColors3": "string",
      "virtualProof": "string",
      "dateofUpload": "2023-06-21T11:58:24.045Z",
      "dateofClose": "2023-06-21T11:58:24.045Z",
      "customerJobType": "string",
      "jobDate": "2023-06-21T11:58:24.045Z",
      "clientOrderId": 0,
      "viewDatas": this.ViewImportExcelTrue,
      "createdBy": this.loginservice.getUsername(),
      "poDate": "2023-06-21T11:58:24.045Z",
      "ccId": 0,
      "ccEmailId": "string",
      "dateofDelivery": "2023-06-21T11:58:24.045Z",
      "getAllValues": []
    }
    // var SaveInward =
    // {
    //   ViewDatas: this.ViewImportExcelTrue,
    //   CreatedBy: this.loginservice.getUsername(),
    // }
    var viewdata = JSON.stringify(this.ViewImportExcelTrue);
    if (viewdata != "{}" && viewdata != "[]") {
// this.spinnerService.requestStarted();
      this.clientcordinationservice.postexcelSubmit(payload).subscribe(postdataresult => {
        // this.spinnerService.requestEnded();
        this.ViewImportExcelFinal = postdataresult;
        
        this.clientcordinationservice.getBindFileInward();
        Swal.fire(
          'Done!',
          'File Inward Successfully.',
          'success'
        );
        this.postBindFileInward();
      }, (error) => {
        // Handle error (optional)
        this.spinnerService.resetSpinner();
        console.error('API call failed:', error);
      });

    }
    else {
      alert("No Success file imported.");
    }
  };

  //deletetemptable
  CancelInward() {
    // this.spinnerService.requestStarted();
    this.clientcordinationservice.deletetempexcel().subscribe(data => {
      // this.spinnerService.requestEnded();
      this._coreService.openSnackBar('Inward File Cancelled Successfully.');
      this.clientcordinationservice.getBindFileInward();
      this.clientcordinationservice.getBindFileInwardOnlyTrue();
      this.postBindFileInward();
    }, (error) => {
      // Handle error (optional)
      this.spinnerService.resetSpinner();
      console.error('API call failed:', error);
    });
  }

}
