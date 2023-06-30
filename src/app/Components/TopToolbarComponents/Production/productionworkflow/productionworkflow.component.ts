import { DatePipe } from '@angular/common';
import { Component, Inject, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  responseData: any;

  copyFiles = false;
  disableCopyFiles = true;

  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private http: HttpClient, private loginservice: LoginService, @Inject(MAT_DIALOG_DATA) public data: any,private modalService: NgbModal) {
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

  //   ChangeWorkflow(workType) {
  //     let ProcessCheck = parseInt(this.loginservice.getProcessId());
  //     if (ProcessCheck == 3 || ProcessCheck == 5 || ProcessCheck == 9 || ProcessCheck == 11) {
  //         if (this.ProcessTransaction.StitchCountUpdate == undefined) {
  //             this.ProcessTransaction.StitchCountUpdate = this.responseData.stitchCount;
  //         }
  //     }
  //     else {
  //         this.ProcessTransaction.StitchCountUpdate = this.ProcessTransaction.StitchCount;
  //     }

  //     if (workFlowForm.RbnError == 'No Error') {
  //         $scope.workFlowForm.errorId = null;
  //     }
  //     var processTransaction = {
  //         WFTId: $scope.ProcessTransaction.WFTId,
  //         WFMId: $scope.ProcessTransaction.WFMId,
  //         ScopeId: $scope.ProcessTransaction.ScopeId,
  //         ProcessId: $scope.ProcessTransaction.ProcessId,
  //         WorkType: workType,
  //         Status: $scope.workFlowForm.Status,
  //         CommentsToClient: $scope.ProcessTransaction.CommentsToClient,
  //         Remarks: $scope.workFlowForm.Remarks,
  //         EmployeeId: $scope.EmployeeId,
  //         CopyFiles: $scope.workFlowForm.CopyPreviousFiles,
  //         StitchCount: $scope.ProcessTransaction.StitchCountUpdate,
  //         ErrorCategoryId: $scope.workFlowForm.errorId,
  //         Value: $scope.ProcessTransaction.EstimatedTime
  //     };

  //     var fd = new FormData();

  //     if (workType == 'End') {
  //         for (i = 0; i < $scope.AttachedFiles.length; i++) {
  //             fd.append('file', $scope.AttachedFiles[i]);              
  //         }

  //         if ($scope.AttachedFiles.length > 0) {
  //             $scope.workFlowForm.CopyPreviousFiles = false;
  //         }
  //         if (($scope.AttachedFiles.length > 0 && $scope.workFlowForm.CopyPreviousFiles == false) || ($scope.AttachedFiles1.length > 0)) {

  //             if ($scope.AttachedFiles1.length > 0) {
  //                 processTransaction = {
  //                     WFTId: $scope.ProcessTransaction.WFTId,
  //                     WFMId: $scope.ProcessTransaction.WFMId,
  //                     ScopeId: $scope.ProcessTransaction.ScopeId,
  //                     ProcessId: $scope.ProcessTransaction.ProcessId,
  //                     WorkType: workType,
  //                     Status: $scope.workFlowForm.Status,
  //                     CommentsToClient: $scope.ProcessTransaction.CommentsToClient,
  //                     Remarks: $scope.workFlowForm.Remarks,
  //                     EmployeeId: $scope.EmployeeId,
  //                     CopyFiles: $scope.workFlowForm.CopyPreviousFiles,
  //                     StitchCount: $scope.ProcessTransaction.StitchCountUpdate,
  //                     ErrorCategoryId: $scope.workFlowForm.errorId,
  //                     Value: $scope.ProcessTransaction.EstimatedTime,
  //                     files: $scope.AttachedFiles1,
  //                 };

  //                 fd.append('data', JSON.stringify(processTransaction));
  //                 $scope.$parent.loader = true; 
  //                 WorkflowFactory.ChangeWorkflow('ChangeWorkflow', $scope.ProcessTransaction.WFTId, fd).$promise.then(function (ChangeWorkflowResult) {
  //                     $scope.BindWorkDetails();
  //                     $scope.confirmationMessage = ChangeWorkflowResult.Message;
  //                     $('#confirmedPopup').modal('show');
  //                     $scope.$parent.loader = false;
  //                 });
  //             }
  //             else {
  //                 $scope.$parent.loader = true;
  //                 fd.append('data', JSON.stringify(processTransaction));                   
  //                 WorkflowFactory.ChangeWorkflow('ChangeWorkflow', $scope.ProcessTransaction.WFTId, fd).$promise.then(function (ChangeWorkflowResult) {
  //                     $scope.BindWorkDetails();
  //                     $scope.confirmationMessage = ChangeWorkflowResult.Message;
  //                     $('#confirmedPopup').modal('show');
  //                     $scope.$parent.loader = false;
  //                 });
  //             }
  //         }
  //         else {
  //             $scope.$parent.loader = true;
  //             fd.append('data', JSON.stringify(processTransaction));              
  //             WorkflowFactory.ChangeWorkflow('ChangeWorkflow', $scope.ProcessTransaction.WFTId, fd).$promise.then(function (ChangeWorkflowResult) {
  //                 $scope.BindWorkDetails();
  //                 $scope.confirmationMessage = ChangeWorkflowResult.Message;
  //                 $('#confirmedPopup').modal('show');
  //                 $scope.$parent.loader = false;
  //             });
  //         }
  //     }
  //     else {
  //         fd.append('data', JSON.stringify(processTransaction));         
  //         WorkflowFactory.ChangeWorkflow('ChangeWorkflow', $scope.ProcessTransaction.WFTId, fd).$promise.then(function (ChangeWorkflowResult) {
  //             if (workType == 'End') {
  //                 $scope.BindWorkDetails();
  //                 $scope.confirmationMessage = ChangeWorkflowResult.Message;
  //                 $('#confirmedPopup').modal('show');
  //             }
  //             else {
  //                 $scope.BindWorkDetails();
  //             }
  //         });
  //     }

  // };


  //Dropdowns
  copyPreviousTrayFiles: boolean = false;
  stitchCount: number;

  scopeApiValues: any[] = []; // Holds the values from the REST API
  selectedScopeValue: any; // Holds the selected value

  getscopevalues() {
    // // Fetch data from the REST API
    this.http.get<any>(`https://localhost:7208/api/Allocation/getCustomerScopeValues/${this.responseData.departmentId}/${this.responseData.clientId}`).subscribe(data => {
      this.scopeApiValues = data.scopeDetails[0];
    });
  }



  changeWorkType(workType) {

  }



  ChangeWorkflow(workType) {
    let ProcessCheck = localStorage.getItem('processid');
    if (ProcessCheck === '3' || ProcessCheck === '5' || ProcessCheck === '9' || ProcessCheck === '11') {
      if (this.ProcessTransaction.StitchCountUpdate === undefined) {
        this.ProcessTransaction.StitchCountUpdate = this.data.stitchCount;
      }
    }

    else {
      this.ProcessTransaction.StitchCountUpdate = this.ProcessTransaction.StitchCount;
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
          //             $scope.$parent.loader = true; 
          //             WorkflowFactory.ChangeWorkflow('ChangeWorkflow', $scope.ProcessTransaction.WFTId, fd).$promise.then(function (ChangeWorkflowResult) {
          //                 $scope.BindWorkDetails();
          //                 $scope.confirmationMessage = ChangeWorkflowResult.Message;
          //                 $('#confirmedPopup').modal('show');
          //                 $scope.$parent.loader = false;
          //             });
          //         }
          //         else {
          //             $scope.$parent.loader = true;
          //             fd.append('data', JSON.stringify(processTransaction));                   
          //             WorkflowFactory.ChangeWorkflow('ChangeWorkflow', $scope.ProcessTransaction.WFTId, fd).$promise.then(function (ChangeWorkflowResult) {
          //                 $scope.BindWorkDetails();
          //                 $scope.confirmationMessage = ChangeWorkflowResult.Message;
          //                 $('#confirmedPopup').modal('show');
          //                 $scope.$parent.loader = false;
          //             });
          //         }
          //     }
          //     else {
          //         $scope.$parent.loader = true;
          //         fd.append('data', JSON.stringify(processTransaction));              
          //         WorkflowFactory.ChangeWorkflow('ChangeWorkflow', $scope.ProcessTransaction.WFTId, fd).$promise.then(function (ChangeWorkflowResult) {
          //             $scope.BindWorkDetails();
          //             $scope.confirmationMessage = ChangeWorkflowResult.Message;
          //             $('#confirmedPopup').modal('show');
          //             $scope.$parent.loader = false;
          //         });
          //     }
          // }
          // else {
          //     fd.append('data', JSON.stringify(processTransaction));         
          //     WorkflowFactory.ChangeWorkflow('ChangeWorkflow', $scope.ProcessTransaction.WFTId, fd).$promise.then(function (ChangeWorkflowResult) {
          //         if (workType == 'End') {
          //             $scope.BindWorkDetails();
          //             $scope.confirmationMessage = ChangeWorkflowResult.Message;
          //             $('#confirmedPopup').modal('show');
          //         }
          //         else {
          //             $scope.BindWorkDetails();
          //         }
          //     });
          // }

        };



        ///Demo


        buttonStart() {


        }

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
        ChangeWorkflowFactory(){
          this.http.post<any>(environment.apiURL + `Workflow/ChangeWorkflow/${data.wftid}`).subscribe(ChangeWorkflowResult => {
            this.BindWorkDetails();
            let confirmationMessage = ChangeWorkflowResult;
          });
        }

        openModal() {
          this.modalService.open('#confirmedPopup');
        }
        
      }
