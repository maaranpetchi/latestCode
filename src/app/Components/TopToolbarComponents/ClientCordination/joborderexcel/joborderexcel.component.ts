import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/Services/Login/login.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-joborderexcel',
  templateUrl: './joborderexcel.component.html',
  styleUrls: ['./joborderexcel.component.scss']
})
export class JoborderexcelComponent implements OnInit {
  selectedFile: File[]=[] ;
 
  
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

  constructor(private http: HttpClient,private loginservice:LoginService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get<any>('YOUR_API_URL').subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
    this.dataSource.paginator = this.paginator;
  }
importExceFile(){
  var employeeId = this.loginservice.getUsername();
  var fd = new FormData();
  for(let i=0; i<this.selectedFile.length;i++){
    fd.append('FormCollection[]', this.selectedFile[i]);
  }
  fd.append('Id', employeeId);
  this.http.post<any>(`https://localhost:7208//JobOrder/PostImportExcel`,fd).subscribe(response =>{
console.log(response,"FileImport");

  })


}



}

