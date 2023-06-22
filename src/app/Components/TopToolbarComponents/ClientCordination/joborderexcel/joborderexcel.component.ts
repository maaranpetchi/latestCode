import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
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

  importExcel() {
    // Perform any additional processing or validation here
  }

  ngAfterViewInit() {

  }

  ViewImportExcel = {};
  ViewImportExcelTrue = {};
  importExceFile() {
    let employeeId = this.loginservice.getUsername();
    var fd = new FormData();
    for (let i = 0; i < this.selectedFile.length; i++) {
      fd.append('FormCollection[]', this.selectedFile[i]);
    }
    // fd.append('Id', employeeId);
    this.http.post<any>(environment.apiURL+`JobOrder/PostImportExcel?EmployeeId=${this.loginservice.getUsername()}`, fd).subscribe(response => {
      console.log(response, "FileImport");
      this.postBindFileInward();
      this.postFileInwardType();
    })
  }

  postBindFileInward() {
    this.clientcordinationservice.getBindFileInward().subscribe(fileinwarddata => {
      this.ViewImportExcel = fileinwarddata;
      this.dataSource = fileinwarddata;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  postFileInwardType() {
    this.clientcordinationservice.getFileInwardType().subscribe(inwarddata => {
      this.ViewImportExcelTrue = inwarddata;
    });
  }
}

