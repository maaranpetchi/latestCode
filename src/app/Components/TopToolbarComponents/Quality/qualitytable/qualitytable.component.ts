import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { QualityWorkflowComponent } from '../quality-workflow/quality-workflow.component';
import { ProdjobpopupComponent } from '../../Production/prodjobpopup/prodjobpopup.component';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { SewOutService } from 'src/app/Services/CoreStructure/SewOut/sew-out.service';
import { QualityComponent } from '../quality/quality.component';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { data } from 'jquery';
import { WorkflowService } from 'src/app/Services/CoreStructure/WorkFlow/workflow.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-qualitytable',
  templateUrl: './qualitytable.component.html',
  styleUrls: ['./qualitytable.component.scss']
})
export class QualitytableComponent {
  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();

  employeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  displayedColumns: string[] = [
    'selected',
    'jobId',
    'estjob',
    'action',
    'fileName',
    'fileInwardMode',
    'client',
    'customerSatisfaction',
    'jobstatus',
    'projectcode',
    'allocatedby',
    'processstatus',
    'scope',
    'esttime',
    'deliverydate',
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router:Router,private workflowservice: WorkflowService,private _coreService:CoreService,private sewOutService:SewOutService ,private http: HttpClient, private loginservice: LoginService, private dialog: MatDialog, private spinnerService: SpinnerService,private qualitycomponent:QualityComponent,private workflowService:WorkflowService) { }

  ngOnInit(): void {
    // //ScopeDropdown
    this.fetchScope();
    //FreshJobs
    this.freshJobs();
  }
  ScopeApiData: any[];
  fetchScope() {
    this.http.get<any>(environment.apiURL + `Allocation/getScopeValues/${this.loginservice.getUsername()}`).subscribe(data => {
      this.ScopeApiData = data.scopeDetails;
    });
  }


  //to save the checkbox values
  selectedproduction: any[] = [];
  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedproduction)
    if (completed == true) {
      this.selectedproduction.push(item)
    }
    else {

      if (this.selectedproduction.find(x => x.id == item.id)) {
        this.selectedproduction = this.selectedproduction.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedproduction)
  }

  showAlert() {
    alert('HI TESTING');
  }

  tab(action) {
    if (action == '1') {
      this.freshJobs();
    }
    else if (action == '2') {
      this.revisionJobs();
    }
    else if (action == '3') {
      this.reworkJobs();
    }
    else if (action == '4') {
      this.quoteJobs();
    }
    else if (action == '5') {
      this.bulkJobs();
      this.scopeDisplay = true;

    }
    else if (action == '6') {
      this.bulkUploadJobs();
    }

  }

  freshJobs() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`).subscribe(freshdata => {
      this.spinnerService.requestEnded();
      console.log(freshdata,"totaldata");
      
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  revisionJobs() {
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/2/0`).subscribe(freshdata => {
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  reworkJobs() {
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/3/0`).subscribe(freshdata => {
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  quoteJobs() {
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/4/0`).subscribe(freshdata => {
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  scopeDisplay: boolean = false; // display a scope dropdown div
  bulkJobs() {
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/6/0`).subscribe(freshdata => {
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.scopeDisplay = true;
    });
  }
  bulkUploadJobs() {
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/7/0`).subscribe(freshdata => {
      this.dataSource = new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  openJobDetailsDialog(data) {
    this.dialog.open(ProdjobpopupComponent, {
      width: '80vw',
      data
    })
  }
  getTabValue() {
//console.log("Inside table", this.qualitycomponent.getCurrentTab());
    return this.qualitycomponent.getCurrentTab();
  }

lnkviewedit(data) {
    if (data.processId == 8 || data.processId == 10) {
        let selectedJobs = [{
            DepartmentId: data.departmentId,
            TranMasterId: data.TranMasterId,
            TimeStamp: data.TimeStamp,
            TranId: data.TranId,
            JId: data.JId,
            CustomerId: data.CustomerId
        }];
      let selectedEmployees = [{
            EmployeeId: this.loginservice.getUsername(),
        }];
        var processMovement = {
          "id": 0,
          "processId": data.processId,
          "statusId": 1,
          "selectedScopeId": 0,
          "autoUploadJobs": true,
          "employeeId": 0,
          "remarks": "string",
          "isBench": true,
          "jobId": "string",
          "value": 0,
          "amount": 0,
          "stitchCount": 0,
          "estimationTime": 0,
          "dateofDelivery": "2023-07-11T12:10:42.205Z",
          "comments": "string",
          "validity": 0,
          "copyFiles": true,
          "updatedBy": 0,
          "jId": 0,
          "estimatedTime": 0,
          "tranMasterId": 0,
          "selectedRows": selectedJobs,
          "selectedEmployees": selectedEmployees,
          "departmentId": 0,
          "updatedUTC": "2023-07-11T12:10:42.205Z",
          "categoryDesc": "string",
          "allocatedEstimatedTime": 0,
          "tranId": 0,
          "fileInwardType": "string",
          "timeStamp": "string",
          "scopeId": 0,
          "quotationRaisedby": 0,
          "quotationraisedOn": "2023-07-11T12:10:42.205Z",
          "clientId": 0,
          "customerId": 0,
          "fileReceivedDate": "2023-07-11T12:10:42.205Z",
          "commentsToClient": "string",
          "isJobFilesNotTransfer": true
        }
      this.http.post<any>(environment.apiURL+`Allocation/processMovement`,processMovement).subscribe( result => {
        console.log(result,"processMovementworkkk");
            if (result.Success == true) {
                localStorage.setItem("WFTId", result.wftId);
                localStorage.setItem("WFMId", result.wfmid);
                localStorage.setItem("JId", data.JId);
                localStorage.setItem("processid", result.processId);
                // $location.path('/ProcessTransaction');
            }
            else {
                this.BindPendingJobs();
            }
        });
    }
    else {
        if (data.processId == 9 || data.processId == 11) {
            localStorage.setItem("WFTId", data.tranId);
            localStorage.setItem("WFMId", data.tranMasterId);
            localStorage.setItem("JId", data.jid);
            localStorage.setItem("processid", data.processId);
            // $location.path('/ProcessTransaction');
        }
        else {
            localStorage.setItem("WFTId", data.wftid);
            localStorage.setItem("WFMId", data.wfmid);
            localStorage.setItem("JId", data.jid);
            localStorage.setItem("processid", data.processId);
            // $location.path('/ProcessTransaction');
            this.workflowservice.setData( data);
              this.router.navigate(['/topnavbar/qualityworkflow']);         
        }
    }
};



  BindPendingJobs() {
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`).subscribe(result => {
      console.log(result,"buddyproofmainwwww");
    });
  }

  }
