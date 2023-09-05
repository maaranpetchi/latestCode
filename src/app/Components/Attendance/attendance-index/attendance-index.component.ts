import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-index',
  templateUrl: './attendance-index.component.html',
  styleUrls: ['./attendance-index.component.scss']
})
export class AttendanceIndexComponent implements OnInit {
  ViewAttendanceExcel: any;
  ngOnInit(): void {

  }
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient, private loginservice: LoginService, private _coreService: CoreService, private spinnerService: SpinnerService, private router: Router) { }

  //ngmodel
  reportAsOn: any;
  selectedFile: File[] = [];

  onFileSelected(event: any) {
    this.selectedFile = event.target.files;

  }
  displayedColumns: string[] = [
    'EmpCode',
    'Name',
    'Devision',
    'shift',
    'AttendanceStatus',
  ];
  btnimportAttendanceexcel() {

    var fd = new FormData();
    for (let i = 0; i < this.selectedFile.length; i++) {
      fd.append('Files', this.selectedFile[i]);
    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `JobOrder/PostImportAttendanceExcel`, fd).subscribe(result => {

      this.spinnerService.requestEnded();
      if (result.result == "success") {


        this.dataSource = result.attendanceList;
        //
        this.ViewAttendanceExcel = result.attendanceList;
        //
        Swal.fire(
          'Done!',
          'File Inward Successfully.!',
          'success'
        )

      }
      else {
        Swal.fire(
          'Done!',
          'Please upload valid file!',
          'success'
        )

      }
      //BindFileInward();
      this.selectedFile.length = 0;
      //BindFileInwardOnlyTrue();
    }, error => {
      this.spinnerService.resetSpinner();
    })

  };


  SaveAttendanceData() {
    

    if (this.selectedFile.length == 0) {

      Swal.fire(
        'Alert!',
        'Please upload file for attendance',
        'info'

      )
    }

    let payload = {
      attendanceList: this.dataSource,
      dt: this.reportAsOn,
      result: " ",
    }

    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `JobOrder/SaveAttendanceList`, payload).subscribe(results => {
      this.spinnerService.requestEnded();
      if (results.result = "Following employee Ids are not available ARTWORK") {
        Swal.fire(
          'Alert!',
          results.result,
          'info'
        )
      }
      else {
        Swal.fire(
          'Done!',
          results.result,
          'success'

        ).then((result) => {

          if (result.isConfirmed) {
            this.dataSource.data = []; // Set the dataSource to an empty array
          }

        })

      }
    })

  }

}
