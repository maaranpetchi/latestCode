import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from 'src/app/Services/Login/login.service';
import { ProductionAllocationService } from 'src/app/Services/CoreStructure/ProductionAllocation/production-allocation.service';
import { JobAssignedDetailsPopupComponent } from '../job-assigned-details-popup/job-assigned-details-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { Observable } from 'rxjs';
import { ProductionAllocatedPopupComponent } from '../production-allocated-popup/production-allocated-popup.component';
import { JoballocatedEmplpopupComponent } from '../joballocated-emplpopup/joballocated-emplpopup.component';
import { EmployeePopupTableComponent } from '../../QualityAllocation/employee-popup-table/employee-popup-table.component';
import { error } from 'jquery';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { ProductionQuotationComponent } from '../production-quotation/production-quotation.component';

@Component({
  selector: 'app-productionallocationtable',
  templateUrl: './productionallocationtable.component.html',
  styleUrls: ['./productionallocationtable.component.scss'],
})
export class ProductionallocationtableComponent implements OnInit {
  exchangenumber: number;
  dataEmployeeSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedEmployeeColumnsVisibility: any = {
    selected: true,
    employees: true,
    allocatedEmployee: true,
    estTime: true,
    jobCategory: true,
    shift: true,
  };

  dataSource: MatTableDataSource<any>;
  displayedColumnsVisibility: any = {
    selected: true,
    jobId: true,
    allocatedJobId: true,
    quatationJobId:true,
    employee: true,
    estjob: true,
    fileName: true,
    fileInwardMode: true,
    client: true,
    customerSatisfaction: true,
    jobstatus: true,
    projectcode: true,
    status: true,
    scope: true,
    esttime: true,
    deliverydate: true,
  };
  scopes: any[] = [];
  selectedScope: any = 0;
  estTime = 0;

  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pendingJobsCount: any;
  exchangeHeader: any;
  exmployeeEstTime:any
  freshJobsCount: number;
  revisionJobsCount: number;
  reworkJobsCount: number;
  allocatedJobCount: number;
  queriesJobsCount: number;
  queryResponseJobsCount: number;
  errorJobsCount: number;
  quotationJobCount: number;

  constructor(
    private http: HttpClient,
    private loginservice: LoginService,
    private productionallocation: ProductionAllocationService,
    private _dialog: MatDialog,
    private spinnerService: SpinnerService,
    private router: Router
  ) {
    // Initialize the `editing` flag for each job object to `false`
    this.dataEmployeeSource.data.forEach((job) => {
      job.editing = false;
    });
  }
  editTime: number;
  ngOnInit(): void {
    this.freshJobs();
    //scopes
    this.fetchScopes();
    this.getJobCategoryStatus();
  }
  visibility() {
    let result: string[] = [];
    if (this.displayedColumnsVisibility.selected) {
      result.push('selected');
    }
    if (this.displayedColumnsVisibility.jobId) {
      result.push('jobId');
    }
    if (this.displayedColumnsVisibility.allocatedJobId) {
      result.push('allocatedJobId');
    }
    if (this.displayedColumnsVisibility.quatationJobId) {
      result.push('quatationJobId');
    }
    if (this.displayedColumnsVisibility.employee) {
      result.push('employee');
    }

    if (this.displayedColumnsVisibility.estjob) {
      result.push('estjob');
    }
    if (this.displayedColumnsVisibility.fileName) {
      result.push('fileName');
    }
    if (this.displayedColumnsVisibility.fileInwardMode) {
      result.push('fileInwardMode');
    }
    if (this.displayedColumnsVisibility.client) {
      result.push('client');
    }
    if (this.displayedColumnsVisibility.customerSatisfaction) {
      result.push('customerSatisfaction');
    }
    if (this.displayedColumnsVisibility.jobstatus) {
      result.push('jobstatus');
    }
    if (this.displayedColumnsVisibility.projectcode) {
      result.push('projectcode');
    }
    if (this.displayedColumnsVisibility.status) {
      result.push('status');
    }
    if (this.displayedColumnsVisibility.scope) {
      result.push('scope');
    }
    if (this.displayedColumnsVisibility.esttime) {
      result.push('esttime');
    }
    if (this.displayedColumnsVisibility.deliverydate) {
      result.push('deliverydate');
    }

    return result;
  }
  employeeVisibility() {
    let result: string[] = [];
    if (this.displayedEmployeeColumnsVisibility.selected) {
      result.push('selected');
    }
    if (this.displayedEmployeeColumnsVisibility.employees) {
      result.push('employees');
    }
    if (this.displayedEmployeeColumnsVisibility.allocatedEmployee) {
      result.push('allocatedEmployee');
    }
    if (this.displayedEmployeeColumnsVisibility.estTime) {
      result.push('estTime');
    }
    if (this.displayedEmployeeColumnsVisibility.jobCategory) {
      result.push('jobCategory');
    }
    if (this.displayedEmployeeColumnsVisibility.shift) {
      result.push('shift');
    }
    return result;
  }
  fetchScopes() {
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getScopeValues/${this.loginservice.getUsername()}`
      )
      .subscribe((scopedata) => {
        this.scopes = scopedata.scopeDetails;
        this.scopes.sort((a, b) => a.name.localeCompare(b.name)); // Sort the scopes based on the 'name' property
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataEmployeeSource.filter = filterValue.trim().toLowerCase();

    if (this.dataEmployeeSource.paginator) {
      this.dataEmployeeSource.paginator.firstPage();
    }
  }

  //to save the checkbox value
  selectedQuery: any[] = [];
  selectedEmployee: any[] = [];

  setAll(completed: boolean, item: any) {
    
    
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
  setExchangeHeader() {
    
    

    let temparray: any[] = [];
    let selected:any[]=[];
    let skip: boolean;
    this.dataSource.data.filter((y: any) => {
      skip = false;
      this.selectedQuery.forEach((x) => {
        let id: string = y.jobId;
        if (id == x.jobId) {
          temparray.push({
            ...y,
            allocatedEstimatedTime: this.exchangeHeader,
            isSelected: true,
          });
          selected.push({
            ...y,
            CategoryDesc: '',
            Comments: '',
            CommentsToClient: '',
            Remarks: '',
            SelectedEmployees: [],
            SelectedRows: [],
            allocatedEstimatedTime: this.exchangeHeader})
          skip = true;
        }
      });
      if (!skip) {
        temparray.push(y);
      }
    });
    this.dataSource.data = temparray;
    this.selectedQuery=selected;
  }
  
  benchChecked: boolean = false;
  onBenchCheckboxChange(event: any) {
    this.benchChecked = event.checked;
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
          this.displayedColumnsVisibility.employee = false;
          this.displayedColumnsVisibility.allocatedJobId = false;
          this.displayedColumnsVisibility.quatationJobId = false;
          this.displayedColumnsVisibility.jobId = true;
          this.displayedEmployeeColumnsVisibility.allocatedEmployee = false;
          this.displayedEmployeeColumnsVisibility.employees = true;
          this.dataSource = new MatTableDataSource(freshJobs.allocationJobs);
          this.dataSource.paginator = this.paginator1;
          this.dataSource.sort = this.sort;
          this.dataEmployeeSource = new MatTableDataSource(
            freshJobs.employees
          );
          this.dataEmployeeSource.paginator = this.paginator2;
          this.dataEmployeeSource.sort = this.sort;
          
          );
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          
        },
      });
  }
  revisionJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/2/0`
      )
      .subscribe({
        next: (revisionJobs) => {
          this.spinnerService.requestEnded();
          this.dataSource = new MatTableDataSource(revisionJobs.allocationJobs);
          this.dataSource.paginator = this.paginator1;
          this.dataSource.sort = this.sort;
          this.displayedColumnsVisibility.employee = false;
          this.displayedColumnsVisibility.quatationJobId = false;
          this.dataEmployeeSource = new MatTableDataSource(
            revisionJobs.employees
          );
          this.dataEmployeeSource.paginator = this.paginator2;
          this.dataEmployeeSource.sort = this.sort;
          
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          
        },
      });
  }
  reworkJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/3/0`
      )
      .subscribe({
        next: (reworkJobs) => {
          this.spinnerService.requestEnded();
          this.dataSource = new MatTableDataSource(reworkJobs.allocationJobs);
          this.dataSource.paginator = this.paginator1;
          this.dataSource.sort = this.sort;
          this.displayedColumnsVisibility.employee = false;
          this.displayedColumnsVisibility.quatationJobId = false;
          this.dataEmployeeSource = new MatTableDataSource(
            reworkJobs.employees
          );
          this.dataEmployeeSource.sort = this.sort;
          this.dataEmployeeSource.paginator = this.paginator2;
          
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          
        },
      });
  }
  allocaetdJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/4/0`
      )
      .subscribe({
        next: (allocaetdJobs) => {
          this.spinnerService.requestEnded();
          this.dataSource = new MatTableDataSource(
            allocaetdJobs.allocationJobs
          );
          this.dataSource.paginator = this.paginator1;
          this.dataSource.sort = this.sort;
          this.displayedColumnsVisibility.employee = true;
          this.displayedColumnsVisibility.allocatedJobId = true;
          this.displayedColumnsVisibility.quatationJobId = false;
          this.displayedColumnsVisibility.jobId = false;
          this.displayedEmployeeColumnsVisibility.allocatedEmployee = true;
          this.displayedEmployeeColumnsVisibility.employees = false;
          this.dataEmployeeSource = new MatTableDataSource(
            allocaetdJobs.employees
          );
          this.dataEmployeeSource.paginator = this.paginator2;
          this.dataEmployeeSource.sort = this.sort;
          
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          
        },
      });
  }
  queries() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/0`
      )
      .subscribe({
        next: (queries) => {
          this.spinnerService.requestEnded();
          this.dataSource = new MatTableDataSource(queries.allocationJobs);
          this.dataSource.paginator = this.paginator1;
          this.dataSource.sort = this.sort;
          this.displayedColumnsVisibility.employee = false;
          this.displayedColumnsVisibility.quatationJobId = false;
          this.dataEmployeeSource = new MatTableDataSource(queries.employees);
          this.dataEmployeeSource.paginator = this.paginator2;
          this.dataEmployeeSource.sort = this.sort;
          
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          
        },
      });
  }
  queryResposne() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getQueryResponseJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/0`
      )
      .subscribe({
        next: (queryResposne) => {
          this.spinnerService.requestEnded();
          this.dataSource = new MatTableDataSource(
            queryResposne.allocationJobs
          );
          this.dataSource.paginator = this.paginator1;
          this.dataSource.sort = this.sort;
          this.displayedColumnsVisibility.employee = false;
          this.displayedColumnsVisibility.quatationJobId = false;
          this.dataEmployeeSource = new MatTableDataSource(
            queryResposne.employees
          );
          this.dataEmployeeSource.paginator = this.paginator2;
          this.dataEmployeeSource.sort = this.sort;
          
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          
        },
      });
  }
  errorJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/5/0`
      )
      .subscribe({
        next: (errorJobs) => {
          this.spinnerService.requestEnded();
          this.dataSource = new MatTableDataSource(errorJobs.allocationJobs);
          this.dataSource.paginator = this.paginator1;
          this.dataSource.sort = this.sort;
          this.dataEmployeeSource = new MatTableDataSource(errorJobs.employees);
          this.dataEmployeeSource.paginator = this.paginator2;
          this.dataEmployeeSource.sort = this.sort;
          this.displayedColumnsVisibility.employee = false;
          this.displayedColumnsVisibility.quatationJobId = false;
          
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          
        },
      });
  }
  quotationJobs() {
    this.spinnerService.requestStarted();
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getPendingAllocationJobsAndEmployees/${parseInt(
            this.loginservice.getUsername()
          )}/${parseInt(this.loginservice.getProcessId())}/7/0`
      )
      .subscribe({
        next: (quotationJobs) => {
          this.spinnerService.requestEnded();
          this.dataSource = new MatTableDataSource(quotationJobs.allocationJobs);
          this.dataSource.paginator = this.paginator1;
          this.dataSource.sort = this.sort;
          this.displayedColumnsVisibility.employee = false;
          this.displayedColumnsVisibility.quatationJobId = true;
          this.displayedColumnsVisibility.allocatedJobId = false;
          this.displayedColumnsVisibility.jobId = false;
          this.dataEmployeeSource = new MatTableDataSource(quotationJobs.employees);
          this.dataEmployeeSource.paginator = this.paginator2;
          this.dataEmployeeSource.sort = this.sort;
          
        },
        error: (err) => {
          this.spinnerService.resetSpinner();
          
        },
      });
  }

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

  estTimeinput: any[] = [];

  getJobCategoryStatus() {
    this.productionallocation
      .getJobCategoryStatusMessage()
      .subscribe((data) => {
        this.estTimeinput = data;
      });
  }


  onKeyPress(event: KeyboardEvent, job: any) {
    // if (event.key === 'Enter') {
      this.afterCellEdit(job);
    // }
  }
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

  getProductionJob(data: any) {
    const dialogRef = this._dialog.open(JobAssignedDetailsPopupComponent, {
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
  getemployeeName(data: any) {
    const dialogRef = this._dialog.open(JoballocatedEmplpopupComponent, {
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
  getAllocatedJobId(data: any) {
    const dialogRef = this._dialog.open(ProductionAllocatedPopupComponent, {
      width: '100%',
      height: '850px',
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
  // 681
  getQuatationJobId(data:any){
    const dialogRef = this._dialog.open(ProductionQuotationComponent, {
      width: '100%',
      height: '850px',
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
  employeeProduction(data: any) {
    const dialogRef = this._dialog.open(EmployeePopupTableComponent, {
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

  selectedJobs: any[] = [];
  onSubmit() {
    
    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }
     this.spinnerService.requestStarted();

    var selectedJobCount = this.selectedJobs.length;
    var selectedEmployeeCount = this.selectedEmployee.length;
    
    

    if (this.loginservice.getProcessName() == 'Production Allocation') {
      if (selectedJobCount != 0 && selectedEmployeeCount != 0) {
        if (selectedJobCount > 1) {
          if (selectedEmployeeCount > 1) {
            
            alert('Please select one Employee!');
          }
          else {
            
            
            for (var i = 0; i < selectedJobCount; i++) {
            
                if (this.selectedJobs[i].allocatedEstimatedTime == undefined || this.selectedJobs[i].allocatedEstimatedTime == "" || this.selectedJobs[i].allocatedEstimatedTime == 0) {
                    alert('Please enter Estimated Time for Selected Job');
                    return;
                }
            }
            this.postJobs();
          }
        } else {
          for (var i = 0; i < selectedEmployeeCount; i++) {
            if (
              this.selectedEmployee[i].estTime == undefined ||
              this.selectedEmployee[i].estTime == '' ||
              this.selectedEmployee[i].estTime == 0
            ) {
              alert('Please enter Estimated Time for Selected Employee');
              return;
            }
          }
          this.postJobs();
        }
      } else {
        alert('Please select Job and Employeesss');
        
        
      }
    } else {
      if (selectedJobCount != 0 && selectedEmployeeCount != 0) {
        if (selectedEmployeeCount > 1) {
          alert('Please select one Employee!');
          return;
        }
        this.postJobs();
      } else {
        alert('Please select Job and Employee');
        // $('#alertPopup').modal('show');
      }
    }
    
  }

  ScopeId: any;
  scopeChange(scope) {
    this.ScopeId = scope;
  }

  postJobs() {
    let processMovement = {
      id: 0,
      processId: this.loginservice.getProcessId(),
      statusId: 1,
      selectedScopeId: this.ScopeId?this.ScopeId:0,
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
      estimatedTime: this.estTime,
      tranMasterId: 0,
      selectedRows: this.selectedJobs,
      selectedEmployees: this.selectedEmployee,
      departmentId: 0,
      updatedUTC: '2023-06-22T11:47:25.193Z',
      categoryDesc: 'string',
      allocatedEstimatedTime:this.exchangeHeader ,
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
  refreshPage() {
    this.freshJobs();
    // window.location.reload();
  }
  jobMovement(processMovement) {
    var confirmationMessage: any;
    let AttachedFiles = [];
    this.selectedJobs = processMovement.SelectedRows;
    this.selectedEmployee = processMovement.SelectedEmployees;
    this.http
      .post(environment.apiURL + 'Allocation/processMovement', processMovement)
      .subscribe((response:any) => {
        confirmationMessage = response;
        this.spinnerService.requestEnded();
        if (response.success === false) {
          alert("Error the job assigned")
        }else if(response.success === true){
          Swal.fire(
            'Done!',
            'Job assigned successfully!',
            'success'
          )
          this.http
          .post(environment.apiURL + 'Allocation/processMovement', processMovement)
          .subscribe((result) => {
            confirmationMessage = result;
            if (AttachedFiles.length > 0) {
              var fd = new FormData();
              for (let i = 0; i < AttachedFiles.length; i++) {
                fd.append('file', AttachedFiles[i]);
              }
              let file = {
                orderId: 0,
                isClientOrder: 0,
                processId: 0,
                statusId: 0,
                sourcePath: 'string',
                dynamicFolderPath: 'string',
                folderPath: 'string',
                fileName: 'string',
                fileCount: 0,
                wfmId: 0,
                wftId: 0,
                orignalPath: 'string',
                orignalDynamicPath: 'string',
                jobId: 'string',
                isProcessWorkFlowTranInserted: 0,
                isCopyFiles: 0,
                pid: 0,
                fakeProcessId: 0,
                fakeStatusId: 0,
                fakeDynamicFolderPath: 'string',
                jobFileName: 'string',
                files: ['string'],
                message: 'string',
                creditMessage: 'string',
                clientName: 'string',
                clientId: 0,
              };
              this.spinnerService.requestStarted();
              this.http
                .post(environment.apiURL + 'JobOrder/openFolder', file)
                .subscribe({
                  next: (data) => {
                    this.spinnerService.requestEnded();
                    
                    AttachedFiles = [];
                    
                  },
                  error: (err) => {
                    this.spinnerService.resetSpinner();
                    
                  }
                })
            }
          });
          this.router.navigate(["topnavbar/production"]);
          this.refreshPage();
        }
    (error) => {
      console.error('Error occurred during API call:', error);
      this.spinnerService.resetSpinner();
      Swal.fire(
        'Done!',
        'Job assigned Failed!',
        'error'
      )
    }
      });

 
  }
  ProcessMovementData(url: string, data: any): Observable<any> {
    return this.http.post(
      environment.apiURL + 'Allocation/QARestriction ',
      data
    );
  }
}
