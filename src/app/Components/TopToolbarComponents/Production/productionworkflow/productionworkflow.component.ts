import { DatePipe } from '@angular/common';
import { Component, Inject, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-productionworkflow',
  templateUrl: './productionworkflow.component.html',
  styleUrls: ['./productionworkflow.component.scss'],
  providers: [DatePipe]
})
export class ProductionworkflowComponent {

  processTransaction = {
    stitchCountUpdate: null
  };
  workFlowForm = { RbnError: null, errorId: null }
  jobWorkDetails = {
    data: null
  }
  responseData: any;

  copyFiles = false;
  disableCopyFiles = true;
  showConfirmedPopup = false;
  History: any;
  SummaryHistory: any;
  employeeSummaryHistory: any;
  showFiles: boolean;

  //2nd attemplt
  dates: any[] = [];
  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private http: HttpClient, private loginservice: LoginService, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data, "Popworkflowdata");
  }
  displayedColumns: string[] = ['startDate', 'endDate', 'timeTaken', 'status'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.fetchJobHistory();
    this.getscopevalues();
  }
  fetchJobHistory(): void {


  }
  goBack() {
    window.history.back();
  }
  processStatuses = ['Select Status', 'Completed', 'Query', 'Queryforspecialpricing', 'Workincomplete'];
  selectedStatus: string;
  AttachedFiles: File[] = [];
  AttachedFiles1: File[] = [];
  showCopyFilesCheckbox: boolean = true;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.AttachedFiles = [event.target.files[0], ...this.AttachedFiles];//store the selected file in selectdfile;
    this.AttachedFiles1 = [event.target.files[0], ...this.AttachedFiles1];//store the selected file in selectdfile;
  }
  remarks = '';

  applyFilter(event: Event, column: string): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data[column].toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  //small table
  totalWorked: string;
  breakTime: string;
  trainingMeeting: string;
  holdTime: string;
  othersTime: string;
  totalTime: string;

  fetchSmallTableData() {
    // this.apiService.getData().subscribe((data: any) => {
    //   // Assign the REST API values to the corresponding variables
    //   this.totalWorked = data.totalWorked;
    //   this.breakTime = data.breakTime;
    //   this.trainingMeeting = data.trainingMeeting;
    //   this.holdTime = data.holdTime;
    //   this.othersTime = data.othersTime;
    //   this.totalTime = data.totalTime;
    // });
  }

  ProcessTransaction: any;



  //Dropdowns
  copyPreviousTrayFiles: boolean = false;
  stitchCount: number;

  scopeApiValues: any[] = []; // Holds the values from the REST API
  selectedScopeValue: any; // Holds the selected value

  getscopevalues() {
    // // Fetch data from the REST API
    this.http.get<any>(environment.apiURL+`Allocation/getCustomerScopeValues/1/${this.data.clientId}`).subscribe(data => {
      this.scopeApiValues = data.scopeDetails[0];
      console.log(data.scopeDetails[0] ,"getscopevalues");
    });
  }



  changeWorkType(workType) {
    if (workType == 'Start') {
      this.ChangeWorkflow(workType);
    }
  }


  ChangeWorkflow(workType) {
    let ProcessCheck = localStorage.getItem('processid');
    if (ProcessCheck === '3' || ProcessCheck === '5' || ProcessCheck === '9' || ProcessCheck === '11') {
      if (this.ProcessTransaction.StitchCountUpdate === undefined) {
        this.ProcessTransaction.StitchCountUpdate = this.data.stitchCount;
      }
    } else {
      this.ProcessTransaction.StitchCountUpdate = this.data.stitchCount;
    }

    if (this.workFlowForm.RbnError == 'No Error') {
      this.workFlowForm.errorId = null;
    }
    var processTransaction = {
      WFTId: this.data.wftid,
      WFMId: this.data.wfmid,
      ScopeId: this.data.scopeId,
      ProcessId: this.data.processId,
      WorkType: workType,
      Status: this.selectedStatus,
      CommentsToClient: this.data.commentsToClient,
      Remarks: this.remarks,
      EmployeeId: this.loginservice.getUsername(),
      CopyFiles: this.copyFiles,
      StitchCount: this.data.stitchCount,
      ErrorCategoryId: this.workFlowForm.errorId,
      Value: this.data.estimatedTime
    };

    var fd = new FormData();

    if (workType == 'End') {
      for (let i = 0; i < this.AttachedFiles.length; i++) {
        fd.append('file', this.AttachedFiles[i]);
      }

      if (this.AttachedFiles.length > 0) {
        this.copyFiles = false;
      }
      if ((this.AttachedFiles.length > 0 && this.copyFiles == false) || (this.AttachedFiles1.length > 0)) {
        if (this.AttachedFiles1.length > 0) {
          let processTransaction = {
            WFTId: this.data.wftid,
            WFMId: this.data.wfmid,
            ScopeId: this.data.scopeId,
            ProcessId: this.data.processId,
            WorkType: workType,
            Status: this.selectedStatus,
            CommentsToClient: this.data.commentsToClient,
            Remarks: this.remarks,
            EmployeeId: this.loginservice.getUsername(),
            CopyFiles: this.copyFiles,
            StitchCount: this.data.stitchCount,
            ErrorCategoryId: this.workFlowForm.errorId,
            Value: this.data.estimatedTime,
            files: this.AttachedFiles1,
          };

          fd.append('data', JSON.stringify(processTransaction));

          this.http.post<any>(environment.apiURL + `Workflow/ChangeWorkflow/${this.data.wftid}`, fd).subscribe(ChangeWorkflowResult => {
            console.log(ChangeWorkflowResult, "ChangeWorkflowResult");

            this.BindWorkDetails();
            let confirmationMessage = ChangeWorkflowResult;
            this.showPopup();
          });
        } else {
          fd.append('data', JSON.stringify(processTransaction));
          this.http.post<any>(environment.apiURL + `Workflow/ChangeWorkflow/${this.data.wftid}`, fd).subscribe(ChangeWorkflowResult => {
            console.log(ChangeWorkflowResult, "ChangeWorkflowResult");
            this.BindWorkDetails();
            let confirmationMessage = ChangeWorkflowResult;
            this.showPopup();
          });
        }
      } else {
        fd.append('data', JSON.stringify(processTransaction));
        this.http.post<any>(environment.apiURL + `Workflow/ChangeWorkflow/${this.data.wftid}`, fd).subscribe(ChangeWorkflowResult => {
          console.log(ChangeWorkflowResult, "ChangeWorkflowResult");
          this.BindWorkDetails();
          let confirmationMessage = ChangeWorkflowResult;
          this.showPopup();
        });
      }
    }
  }



  ///Demo



  onScopeChange() {
    if (this.selectedStatus === 'Completed') {
      this.showCopyFilesCheckbox = false;
      this.getscopevalues();
    }
    else {
      this.showCopyFilesCheckbox = true;
      this.getscopevalues();
    }

  }


  //method to implement from exisiting appliacation



  showPopup() {
    this.showConfirmedPopup = true;
  }
  BindWorkDetails() {
    let processTransaction = {
      "wftid": this.data.wftid,
      "wfmid": this.data.wfmid,
      "workType": "string",
      "status": "string",
      "remarks": "string",
      "employeeId": this.loginservice.getUsername(),
      "copyFiles": true,
      "errorCategoryId": 0,
      "value": 0,
      "scopeId": 0,
      "processId": this.loginservice.getProcessId(),
      "stitchCount": 0,
      "orderId": 0,
      "isClientOrder": 0,
      "statusId": 0,
      "sourcePath": "string",
      "dynamicFolderPath": "string",
      "folderPath": "string",
      "fileName": "string",
      "fileCount": 0,
      "orignalPath": "string",
      "orignalDynamicPath": "string",
      "jobId": "string",
      "isProcessWorkFlowTranInserted": 0,
      "isCopyFiles": 0,
      "pid": 0,
      "fakeProcessId": 0,
      "fakeStatusId": 0,
      "fakeDynamicFolderPath": "string",
      "jobFileName": "string",
      "files": [
        "string"
      ],
      "commentsToClient": "string",
      "tranFileUploadPath": "string",
      "selectedRows": [
        "string"
      ]
    }
    this.http.post<any>(environment.apiURL + "/Workflow/GetProductionWorkList", processTransaction).subscribe((result) => {
      this.jobWorkDetails.data = result.jobHistory;
      this.History = result.Summary.SummaryHistory;
      this.SummaryHistory = this.History[0];
      this.employeeSummaryHistory = this.History.splice(1, this.History.length);
      if (result.jobHistory.length > 0) {
        this.showFiles = true;
      }
    });
  }


  //Tring second
  startButton(Start: string) {
    var fd = new FormData();
    if ((this.AttachedFiles.length > 0 && this.copyFiles == false) || (this.AttachedFiles1.length > 0)) {
      if (this.AttachedFiles1.length > 0) {
        let processTransaction = {
          WFTId: this.data.wftid,
          WFMId: this.data.wfmid,
          ScopeId: this.data.scopeId,
          ProcessId: this.data.processId,
          WorkType: Start,
          Status: this.selectedStatus,
          CommentsToClient: this.data.commentsToClient,
          Remarks: this.remarks,
          EmployeeId: this.loginservice.getUsername(),
          CopyFiles: this.copyFiles,
          StitchCount: this.data.stitchCount,
          ErrorCategoryId: this.workFlowForm.errorId,
          Value: this.data.estimatedTime,
          files: this.AttachedFiles1,
        };

        fd.append('data', JSON.stringify(processTransaction));

        this.http.post<any>(environment.apiURL + `Workflow/ChangeWorkflow/${this.data.wftid}`, fd).subscribe(ChangeWorkflowResult => {
          console.log(ChangeWorkflowResult, "ChangeWorkflowResult");

          this.BindWorkDetails();
          let confirmationMessage = ChangeWorkflowResult;
          this.showPopup();
        });
      }
    }
  }
  sample(workType: string) {
    console.log("success");
    var fd = new FormData();
    let processTransaction = {
      WFTId: this.data.wftid,
      WFMId: this.data.wfmid,
      ScopeId: this.data.scopeId,
      ProcessId: this.data.processId,
      WorkType: workType, // Pass the workType parameter
      Status: this.selectedStatus,
      CommentsToClient: this.data.commentsToClient,
      Remarks: this.remarks,
      EmployeeId: this.loginservice.getUsername(),
      CopyFiles: this.copyFiles,
      StitchCount: this.data.stitchCount ? this.data.stitchCount : 0,
      ErrorCategoryId: this.workFlowForm.errorId,
      Value: this.data.estimatedTime,
      files: this.AttachedFiles1,
    };
  
    this.http.post<any>(
      environment.apiURL + `Workflow/ChangeWorkflow/${this.data.wftid}`,
      null,
      {
        headers: new HttpHeaders().set('Content-Type', 'multipart/form-data').append("data", JSON.stringify(processTransaction)),
      }
    ).subscribe(ChangeWorkflowResult => {
      this.getProductionWorkList();
      console.log(ChangeWorkflowResult, "ChangeWorkflowResult");
      console.log(processTransaction, "ChangeWorkflowResultPayload");
    });
  }
  


  getProductionWorkList() {
    let payload = {
      "wftid": this.data.wftid,
      "wfmid": this.data.wfmid,
      "workType": "string",
      "status": "string",
      "remarks": "string",
      "employeeId": this.loginservice.getUsername(),
      "copyFiles": true,
      "errorCategoryId": 0,
      "value": 0,
      "scopeId": 0,
      "processId": this.loginservice.getProcessId(),
      "stitchCount": 0,
      "orderId": 0,
      "isClientOrder": 0,
      "statusId": 0,
      "sourcePath": "string",
      "dynamicFolderPath": "string",
      "folderPath": "string",
      "fileName": "string",
      "fileCount": 0,
      "orignalPath": "string",
      "orignalDynamicPath": "string", 
      "jobId": "string",
      "isProcessWorkFlowTranInserted": 0,
      "isCopyFiles": 0,
      "pid": 0,
      "fakeProcessId": 0,
      "fakeStatusId": 0,
      "fakeDynamicFolderPath": "string",
      "jobFileName": "string",
      "files": [
        "string"
      ],
      "commentsToClient": "string",
      "tranFileUploadPath": "string",
      "selectedRows": []
    }
    this.http.post<any>(environment.apiURL + `Workflow/GetProductionWorkList`, payload).subscribe(getProductionResult => {
      this.dataSource = new MatTableDataSource([getProductionResult.jobHistory[0]]);
      console.log(getProductionResult, "getPRoductionResult");
    });
  }


  
}
