import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-joborderexcel',
  templateUrl: './joborderexcel.component.html',
  styleUrls: ['./joborderexcel.component.scss']
})
export class JoborderexcelComponent implements OnInit {
  selectedFile: File | undefined;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];//store the selected file in selectdfile
  }
  
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

  constructor(private http: HttpClient) {}

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






}

