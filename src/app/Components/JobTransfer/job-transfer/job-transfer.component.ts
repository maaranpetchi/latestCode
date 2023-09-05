import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobTransferService } from 'src/app/Services/JobTransfer/job-transfer.service';
import { environment } from 'src/Environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../dialog/dialog.component';
import Swal from 'sweetalert2/src/sweetalert2.js';

@Component({
  selector: 'app-job-transfer',
  templateUrl: './job-transfer.component.html',
  styleUrls: ['./job-transfer.component.scss'],
})
export class JobTransferComponent implements OnInit {
  //  Declare properties
  selectedFilter: number;
  selectedClientId: number;
  selectedJobNumber: string | null;
  selectedFileName: string | null;
  selectedfromDate: string | null;

  fromDate: string | null;
  clients: any[];

  //  ng if condition declarations
  jobNumber: boolean = false;
  fileName: boolean = false;
  dateFields: boolean = false;
  Selectclient: boolean = false;

  //  Table view heading
  displayedColumns: string[] = [
    'selected',
    'fileName',
    'fileReceivedDate',
    'department',
    'client',
    'customerJobType',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _service: JobTransferService,
    private spinnerService: SpinnerService,
    private http: HttpClient,
    private loginservice: LoginService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  myForm = new FormGroup({
    selectdropdown: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required),
    jobNumber: new FormControl(''),
    fromDate: new FormControl(''),
    file: new FormControl(''),
  });

  onFilterChange() {
    if (this.selectedFilter == 3) {
      this.Selectclient = true;
      this.jobNumber = false;
      this.dateFields = false;
      this.fileName = false;
      this.fromDate = '';

      this._service.getJobTransferDetails().subscribe({
        next: (response: any) => {
          this.clients = response;
          
        },
        error: (err) => {
          
          // this.spinnerService.resetSpinner();
        },
      });
    } else if (this.selectedFilter == 2) {
      this.Selectclient = false;
      this.jobNumber = false;
      this.dateFields = true;
      this.fileName = false;
      this.fromDate = '';
    } else if (this.selectedFilter == 1) {
      this.Selectclient = false;
      this.jobNumber = false;
      this.dateFields = false;
      this.fileName = true;
      this.fromDate = '';
    } else if (this.selectedFilter == 0) {
      this.Selectclient = false;
      this.jobNumber = true;
      this.dateFields = false;
      this.fileName = false;
      this.fromDate = '';
    }
  }
  onSearchClick() {
    

    if (
      this.selectedClientId != undefined ||
      this.selectedFileName != undefined ||
      this.selectedFilter != undefined ||
      this.fromDate != undefined
    ) {
      if (this.selectedClientId == undefined || this.selectedClientId == null) {
        this.selectedClientId = 0;
      }
      if (
        this.selectedFileName == undefined ||
        this.selectedFileName == null ||
        this.selectedFileName == ''
      ) {
        this.selectedFileName = null;
      }
      var departmentId = this.selectedFilter;
      if (departmentId == 3 || departmentId == 2 || departmentId == 1) {
        departmentId = 0;
      }
      var jobOrder = {
        jobId: this.selectedJobNumber,
        fileName: this.selectedFileName,
        clientId: this.selectedClientId,
        fileReceivedDate: this.selectedfromDate,
      };
      this.spinnerService.requestStarted();
      this._service.jobOrderDetails(jobOrder).subscribe({
        next: (response) => {
          this.spinnerService.requestEnded();
          this.dataSource = response.jobs;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          
        },
        error: (err: any) => {
          
          this.spinnerService.resetSpinner();
        },
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  selectedJobs: any[] = [];
  //   convert(): void {
  //     this.selectedJobs = this.selectedQuery;
  //     

  //     if (this.selectedJobs.length == 0) {
  //       alert('Please Select Job(s).');

  //   }
  //   else {
  //       var convertdata = {
  //           ConvertDepartment: this.selectedJobs,
  //           UpdatedBy: this.loginservice.getUsername(),
  //       }
  //     this.http
  //       .post(environment.apiURL + `JobTransfer/ConvertDepartment`, convertdata)
  //       .subscribe((response: any) => {
  //         if (response === true) {
  //           alert("Value moved to Selected Jobs")
  //         } else if(response === false){
  //           
  //         }
  //       });
  //   }
  // }
  convert(): void {
      this.selectedJobs = this.selectedQuery;

      if (this.selectedJobs.length === 0) {
        throw new Error('Please Select Job(s).');
      }

      const convertdata = {
        ConvertDepartment: this.selectedJobs,
        UpdatedBy: this.loginservice.getUsername(),
      };

      this.http
        .post(environment.apiURL + `JobTransfer/ConvertDepartment`, convertdata)
        .subscribe((response: any) => {
          if (response) {
            Swal.fire(
              'Done!',
              'Value moved to Selected Jobs!',
              'success'
            )
            window.location.reload();
          } else{
            Swal.fire(
              'Done!',
              'Value Not moved to Selected Jobs!',
              'success'
            )
          }
        });
    
  }

  selectedQuery: any[] = [];
  setAll(completed: boolean, item: any) {
    
    
    if (completed == true) {
      this.selectedQuery.push({
        ...item,
      });
    } else {
      if (this.selectedQuery.find((x) => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter((x) => {
          if (x.id != item.id) {
            return item;
          }
        });
      }
    }
    
  }
}
