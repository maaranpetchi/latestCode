import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClientorderstableComponent } from '../clientorderstable.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface TableData {
  fileName: string;
  poNo: string;
  poDate: string;
  instruction: string;
  salesPersonName: string;
  transactionType: string;
  division: string;
}

@Component({
  selector: 'app-fileconvert',
  templateUrl: './fileconvert.component.html',
  styleUrls: ['./fileconvert.component.scss']
})
export class FileconvertComponent implements OnInit {
  displayedColumns: string[] = [
    'fileName',
    'poNo',
    'poDate',
    'instruction',
    'salesPersonName',
    'transactionType',
    'division'
  ];
  dataSource = new MatTableDataSource<TableData>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  @ViewChild(ClientorderstableComponent) ClientorderstableComponent: ClientorderstableComponent;

  constructor(private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any) {console.log(data,"data");
    }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchDataFromAPI();
  }

  fetchDataFromAPI() {
    // Replace 'API_URL' with the actual URL of your REST API
    this.http.get<TableData[]>('API_URL').subscribe(data => {
      this.dataSource.data = data;
    });
  }


}