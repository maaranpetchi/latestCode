import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { Observable } from 'rxjs';
import { EmployeePopupComponent } from '../employee-popup/employee-popup.component';
import { JobCategorypopupComponent } from '../job-categorypopup/job-categorypopup.component';
interface Employee {
  id: number;
  name: string;
  shift: string;
}
@Component({
  selector: 'app-proofreading-alocationtable',
  templateUrl: './proofreading-alocationtable.component.html',
  styleUrls: ['./proofreading-alocationtable.component.scss'],
})
export class ProofreadingAlocationtableComponent implements OnInit {
  exchangenumber: number;
  dataEmployeeSource: MatTableDataSource<Employee>;
  displayedEmployeeColumns: string[] = ['selected', 'employee', 'shift'];

  scopes: any[] = [];
  selectedScope: any = 0;
  selectedJobs: any[] = [];

  displayedColumns: string[] = [
    'selected',
    'jobId',
    'artist',
    'estjob',
    'fileName',
    'fileInwardMode',
    'client',
    'customerClassification',
    'jobstatus',
    'projectcode',
    'status',
    'scope',
    'esttime',
    'deliverydate',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  estTime: number;

  constructor(
    private http: HttpClient,
    private loginservice: LoginService,
    private _dialog: MatDialog,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    //maintable
    this.freshJobs();
    //Employeetable
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyEmployeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataEmployeeSource.filter = filterValue.trim().toLowerCase();

    if (this.dataEmployeeSource.paginator) {
      this.dataEmployeeSource.paginator.firstPage();
    }
  }

  //to save the checkbox value
  selectedQuery: any[] = [];
  selectedEmployee: any[] = [];

  setAllJobs(completed: boolean, item: any) {
    
    
    if (completed == true) {
      if (item.allocatedEstimatedTime == null) item.allocatedEstimatedTime = 0;
      if (item.employeeId == null) item.employeeId = 0;
      if (item.estimatedTime == null) item.estimatedTime = 0;
      this.selectedQuery.push({
        ...item,
        CategoryDesc: '',
        Comments: '',
        CommentsToClient: '',
        Remarks: '',
        SelectedEmployees: [],
        SelectedRows: [],
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

  setEmployeeAll(completed: boolean, item: any) {
    
    
    if (completed == true) {
      if (item.jId != null)
        this.selectedEmployee.push({
          ...item,
          CategoryDesc: '',
          Comments: '',
          CommentsToClient: '',
          FileInwardType: '',
          JobId: 0,
          Remarks: '',
          SelectedEmployees: [],
          SelectedRows: [],
          TimeStamp: '',
        });
      else {
        this.selectedEmployee.push({
          ...item,
          jId: 0,
          CategoryDesc: '',
          Comments: '',
          CommentsToClient: '',
          FileInwardType: '',
          JobId: 0,
          Remarks: '',
          SelectedEmployees: [],
          SelectedRows: [],
          TimeStamp: '',
        });
      }
    } else {
      if (this.selectedEmployee.find((x) => x.id == item.id)) {
        this.selectedEmployee = this.selectedEmployee.filter((x) => {
          if (x.id != item.id) {
            return item;
          }
        });
      }
    }
    
  }

  exchangeHeader: number;
  benchChecked: boolean = false;
  onBenchCheckboxChange(event: any) {
    this.benchChecked = event.checked;
  }

  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  tab(action) {
    if (action == '1') {
      this.freshJobs();
    } else if (action == '2') {
      this.revisionJobs();
    } else if (action == '3') {
      this.reworkJobs();
    } else if (action == '4') {
      this.allocaetdJobs();
    } else if (action == '5') {
      this.queries();
    } else if (action == '6') {
      this.queryResposne();
    } else if (action == '7') {
      this.errorJobs();
    } else if (action == '8') {
      this.quotationJobs();
    }
  }

  freshJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/1/0`
      )
      .subscribe({
        next: (freshJobs) => {
          this.spinnerService.requestEnded();
          this.dataSource = new MatTableDataSource(freshJobs.allocationJobs);
          this.dataSource.paginator = this.paginator1;
          this.dataSource.sort = this.sort;
          // employee table details
          this.dataEmployeeSource = new MatTableDataSource(
            freshJobs.employees
          );
          
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          
        },
      });
  }
  revisionJobs() {
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/2/0`
      )
      .subscribe((revisionJobs) => {
        this.dataSource = new MatTableDataSource(revisionJobs.allocationJobs);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.sort = this.sort;
        
      });
  }
  reworkJobs() {
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/3/0`
      )
      .subscribe((reworkJobs) => {
        this.dataSource = new MatTableDataSource(reworkJobs.allocationJobs);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.sort = this.sort;
        
      });
  }
  allocaetdJobs() {
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/4/0`
      )
      .subscribe((allocaetdJobs) => {
        this.dataSource = new MatTableDataSource(allocaetdJobs.allocationJobs);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.sort = this.sort;
        
      });
  }
  queries() {
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getQueryPendingJobs/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/5/0`
      )
      .subscribe((queries) => {
        this.dataSource = new MatTableDataSource(queries.allocationJobs);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.sort = this.sort;
        
      });
  }
  queryResposne() {
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getQueryResponseJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/6/0`
      )
      .subscribe((queryResposne) => {
        this.dataSource = new MatTableDataSource(queryResposne.allocationJobs);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.sort = this.sort;
        
      });
  }
  errorJobs() {
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/7/0`
      )
      .subscribe((errorJobs) => {
        this.dataSource = new MatTableDataSource(errorJobs);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.sort = this.sort;
        
      });
  }
  quotationJobs() {
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/8/0`
      )
      .subscribe((quotationJobs) => {
        this.dataSource = new MatTableDataSource(quotationJobs);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.sort = this.sort;
        
      });
  }

  estTimeinput: any[] = [];

  afterCellEdit(rowEntity: any) {
    
    if (parseInt(this.loginservice.getProcessId()) == 2) {
      var colls = this.estTimeinput;
      var Esttime1 = colls[0].estimatedTime;
      var Esttime2 = colls[1].estimatedTime;
      var Esttime3 = colls[2].estimatedTime;
      var Esttime4 = colls[3].estimatedTime;
      var desc1 = colls[0].description;
      var desc2 = colls[1].description;
      var desc3 = colls[2].description;
      var desc4 = colls[3].description;
      var desc5 = colls[4].description;
      if (rowEntity.estTime <= Esttime1 && rowEntity.estTime > 0) {
        rowEntity.status = desc1;
      } else if (
        rowEntity.estTime <= Esttime2 &&
        rowEntity.estTime > Esttime1
      ) {
        rowEntity.status = desc2;
      } else if (
        rowEntity.estTime <= Esttime3 &&
        rowEntity.estTime > Esttime2
      ) {
        rowEntity.status = desc3;
      } else if (
        rowEntity.estTime <= Esttime4 &&
        rowEntity.estTime > Esttime3
      ) {
        rowEntity.status = desc4;
      } else if (rowEntity.estTime > Esttime4) {
        rowEntity.status = desc5;
      }
      this.selectedEmployee = this.selectedEmployee.map((x) => {
        if (x.employeeId == rowEntity.employeeId) {
          return { ...x, estTime: rowEntity.estTime, status: rowEntity.status };
        } else return x;
      });
    }
  }

  onKeyPress(event: KeyboardEvent, job: any) {
    if (event.key === 'Enter') {
      this.afterCellEdit(job);
    }
  }

  ScopeId: any;
  scopeChange(scope) {
    this.ScopeId = scope;
  }
  data: any;
  onSubmit(data: any) {
    

    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }
    var selectedJobCount = this.selectedJobs.length;
    var selectedEmployeeCount = this.selectedEmployee.length;
    
    if (this.loginservice.getProcessName() == 'Production Allocation') {
      if (selectedJobCount != 0 && selectedEmployeeCount != 0) {
        if (selectedJobCount > 1) {
          if (selectedEmployeeCount > 1) {
            alert('Please select one Employee!');
            // $('#alertPopup').modal('show');
          } else {
            for (var i = 0; i < selectedJobCount; i++) {
              if (
                this.selectedJobs[i].allocatedEstimatedTime == undefined ||
                this.selectedJobs[i].allocatedEstimatedTime == '' ||
                this.selectedJobs[i].allocatedEstimatedTime == 0
              ) {
                alert('Please enter Estimated Time for Selected Job');
                // $('#alertPopup').modal('show');
                return;
              }
            }
            this.postJobs(data);
          }
        } else {
          for (var i = 0; i < selectedEmployeeCount; i++) {
            if (
              this.selectedEmployee[i].estTime == undefined ||
              this.selectedEmployee[i].estTime == '' ||
              this.selectedEmployee[i].estTime == 0
            ) {
              alert('Please enter Estimated Time for Selected Employee');
              // $('#alertPopup').modal('show');
              return;
            }
          }
          this.postJobs(data);
        }
      } else {
        alert('Please select Job and Employeesss');
        // $('#alertPopup').modal('show');
      }
    } else {
      if (selectedJobCount != 0 && selectedEmployeeCount != 0) {
        if (selectedEmployeeCount > 1) {
          alert('Please select one Employee!');
          // $('#alertPopup').modal('show');
          return;
        }
        this.postJobs(data);
      } else {
        alert('Please select Job and Employee');
        // $('#alertPopup').modal('show');
      }
    }
  }
  postJobs(data: any) {
    //   let processMovement = {
    //     selectedRows: this.selectedJobs,
    //     selectedEmployees: this.selectedEmployee,
    //     selectedScopeId: this.ScopeId,
    //     employeeId: this.loginservice.getUsername(),
    //     processId: this.loginservice.getProcessId(),
    //     statusId: 1,
    //     isBench:this.benchChecked
    // }
    let processMovement = {
      id: 0,
      processId: this.loginservice.getProcessId(),
      statusId: 1,
      selectedScopeId: this.ScopeId,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: 'string',
      isBench: this.benchChecked,
      jobId: 'string',
      value: 0,
      amount: 0,
      stitchCount: 0,
      estimationTime: 0,
      dateofDelivery: '2023-06-22T11:47:25.193Z',
      comments: 'string',
      validity: 0,
      copyFiles: true,
      updatedBy: 0,
      jId: 0,
      estimatedTime: this.estTime !== 0 ? this.estTime : 0,
      tranMasterId: 0,
      selectedRows: this.selectedJobs,
      selectedEmployees: this.selectedEmployee,
      departmentId: 0,
      updatedUTC: '2023-06-22T11:47:25.193Z',
      categoryDesc: 'string',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: 'string',
      timeStamp: '',
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: '2023-06-22T11:47:25.193Z',
      clientId: 0,
      customerId: 0,
      fileReceivedDate: '2023-06-22T11:47:25.193Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };

    

    if (this.loginservice.getProcessName() == 'Quality Allocation') {
      this.ProcessMovementData('QARestriction', processMovement).subscribe(
        (result) => {
          var SameQAEmployeeJobList = processMovement.selectedRows.filter(
            function (item) {
              var exists = result.jids.some((x) => x == item.jId);
              return exists;
            }
          );

          var processedRows = processMovement.selectedRows.filter(function (
            item
          ) {
            var exists = result.jids.some((x) => x == item.jId);
            return !exists;
          });

          if (processedRows.length > 0) {
            processMovement.selectedRows = processedRows;

            this.jobMovement(processMovement);
          }
          if (SameQAEmployeeJobList.length > 0) {
            var strJobId = '';
            for (var i = 0; i < SameQAEmployeeJobList.length; i++) {
              if (i == 0) {
                strJobId += SameQAEmployeeJobList[i].JobId;
              } else {
                strJobId += ',' + SameQAEmployeeJobList[i].JobId;
              }
            }
            alert('Following Job Ids are assigne to same employee ' + strJobId);
          }
        }
      );
    } else {
      this.jobMovement(processMovement);
    }
  }

  jobMovement(processMovement) {
    var confirmationMessage: any;
    const AttachedFiles = [];
    this.selectedJobs = processMovement.selectedRows;
    this.selectedEmployee = processMovement.selectedEmployees;
    this.http
      .post(environment.apiURL + 'Allocation/processMovement', processMovement)
      .subscribe((result) => {
        confirmationMessage = result;
      });
    this.http
      .post(environment.apiURL + 'Allocation/processMovement', processMovement)
      .subscribe((result) => {
        confirmationMessage = result;
        // if (AttachedFiles.length > 0) {
        //     var fd = new FormData();
        //     for (let i = 0; i < AttachedFiles.length; i++) {
        //       fd.append('file', AttachedFiles[i]);
        //     }

        // $parent.loader = true;
        // serviceCall.uploadFile('uploadFiles', result.OrderId, 0, ProcessId, processMovement.StatusId, 1, ProcessId, processMovement.StatusId, fd).$promise.then(function (uploadResult) {
        //     quotationquerySubmitted = false;
        //     QuotationpopupSubmitForm.$setPristine();
        //     AttachedFiles = [];
        //     $('#fileUpload').val('');
        //     $('#confirmedPopup').modal('show');
        // }

        // })
        // .catch(function (response) {
        //     
        // }).finally(function () {
        //     // parent.loader = false;
        // });
        // }
        // Isbench = false;
        // $('#confirmedPopup').modal('show');
        // clear();
        // $('#quotationModal').modal('hide');
        // selectedGrid = '';
      });
  }

  onSubmits(type: any, data: any) {
    

    var confirmationMessage: any;

    if (type == 'AllocationForm') {
      const submitted = true;
      // if (scopeValidate.$valid) {
      confirmationMessage = 'Allocate selected job(s)?';
      // $('#conformationPopup').modal('show');
      // }
    } else if (type == 'QueryForm') {
      const querySubmitted = true;
      // if (popupSubmitForm.$valid) {
      confirmationMessage = 'Send this job as query?';
      if (data.Status == 100) {
        confirmationMessage = 'Change Estimated Time?';
      } else if (data.Status == 6 || data.Status == 8) {
        confirmationMessage = 'Send this job as query?';
      } else if (data.Status == 5) {
        confirmationMessage = 'Cancel This Job?';
      } else {
        confirmationMessage = 'Move this job to next process?';
      }
      // $('#conformationPopup').modal('show');
      // }
    } else if (type == 'QuotationForm') {
      const quotationquerySubmitted = true;
      // if (QuotationpopupSubmitForm.$valid) {
      confirmationMessage = 'Send this job as quotation?';
      // $('#conformationPopup').modal('show');
      // }
    }
  }

  ProcessMovementData(url: string, data: any): Observable<any> {
    return this.http.post(
      environment.apiURL + 'Allocation/QARestriction ',
      data
    );
  }
  openjobDialog(data: any) {
    const dialogRef = this._dialog.open(JobCategorypopupComponent, {
      width: '100%',
      height: '450px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.freshJobs();
        }
      },
    });
  }
  openEmployeeDialog(data: any) {
    const dialogRef = this._dialog.open(EmployeePopupComponent, {
      width: '100%',
      height: '450px',
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.freshJobs();
        }
      },
    });
  }
}
