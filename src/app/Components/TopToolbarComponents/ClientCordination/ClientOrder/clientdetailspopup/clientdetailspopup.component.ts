import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

export interface TableData {
  amount: number;
  instruction: string;
  suggestion: string;
  vleadComments: string;
  department: string;
}
@Component({
  selector: 'app-clientdetailspopup',
  templateUrl: './clientdetailspopup.component.html',
  styleUrls: ['./clientdetailspopup.component.scss']
})
export class ClientdetailspopupComponent implements OnInit {
  displayedColumns: string[] = ['amount', 'instruction', 'suggestion', 'vleadComments', 'department'];
  dataSource: TableData[] = [];

  constructor(private http: HttpClient,private dialogRef: MatDialogRef<ClientdetailspopupComponent>) {}

  ngOnInit() {
    this.fetchTableData();
  }

  fetchTableData() {
    this.http.get<TableData[]>('https://api.example.com/table-data').subscribe(data => {
      this.dataSource = data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}