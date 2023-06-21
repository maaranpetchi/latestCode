import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientcordinationService } from 'src/app/Services/CoreStructure/ClientCordination/clientcordination.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import * as XLSX from 'xlsx';


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

  constructor(private http: HttpClient, private loginservice: LoginService, private clientcordinationservice: ClientcordinationService) { }

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
    this.http.post<any>(`https://localhost:7208/api/JobOrder/PostImportExcel?employeeId=${employeeId}`, fd).subscribe(response => {
      console.log(response, "FileImport");
      this.postBindFileInward();
      this.postFileInwardType();
    })
  }

  postBindFileInward() {
    this.clientcordinationservice.getBindFileInward().subscribe(fileinwarddata => {
      this.ViewImportExcel = fileinwarddata;
      this.dataSource = fileinwarddata;
      console.log(fileinwarddata, "postbindfile");

    });
  }

  postFileInwardType() {
    this.clientcordinationservice.getBindFileInwardOnlyTrue().subscribe(inwarddata => {
      this.ViewImportExcelTrue = inwarddata;
      console.log(inwarddata, "postbindfile");
    });
  }


  //submit
  InwardExcelDatas() {
    var SaveInward =
    {
      ViewDatas: this.ViewImportExcelTrue,
      CreatedBy: this.loginservice.getUsername(),
    }
    var viewdata = JSON.stringify(this.ViewImportExcelTrue);
    if (viewdata != "{}" && viewdata != "[]") {

      this.clientcordinationservice.postexcelSubmit(SaveInward).subscribe(postdataresult => {
        this.ViewImportExcelFinal = postdataresult;
        console.log(this.ViewImportExcelFinal,"ViewImportExcelFinal");
        
        // if (this.ViewImportExcelFinal.Message == "Client Sales Person Name does not Exists / File Name Already Exist") {
        //   alert(this.ViewImportExcelFinal.Message);
        // }
        // else {
        //   //alert('File Inward Successfully.');
        //   alert(this.ViewImportExcelFinal.Message);
        // }
         this.clientcordinationservice.getBindFileInward();
      });
      
    }
    else {
      alert("No Success file imported.");
    }
  };

}

