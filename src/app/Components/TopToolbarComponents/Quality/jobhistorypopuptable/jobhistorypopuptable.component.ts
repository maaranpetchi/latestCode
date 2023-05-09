import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

interface MoveData {
  movedFrom: string;
  movedTo: string;
  movedDate: string;
  movedBy: string;
  remarks: string;
}


@Component({
  selector: 'app-jobhistorypopuptable',
  templateUrl: './jobhistorypopuptable.component.html',
  styleUrls: ['./jobhistorypopuptable.component.scss']
})
export class JobhistorypopuptableComponent implements OnInit {
  displayedColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy', 'remarks'];
  dataSource: MatTableDataSource<MoveData>;
  

  constructor(private http: HttpClient,public dialogRef: MatDialogRef<JobhistorypopuptableComponent>) {}

  ngOnInit(): void {
    this.http
      .get<MoveData[]>('http://your-rest-api-url.com/move-data')
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<MoveData>(data);
      });
  }

  closejobform(){
    this.dialogRef.close();
  }
}