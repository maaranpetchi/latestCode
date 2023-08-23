import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-job-details-client-index',
  templateUrl: './job-details-client-index.component.html',
  styleUrls: ['./job-details-client-index.component.scss']
})
export class JobDetailsClientIndexComponent implements OnInit {
  QuotationDetailsList: any;
  QueryEstimatedTime: any;
  QueryEstimatedScope: any;
  QueryEstimatedSpecialPrice: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private spinnerService: SpinnerService, private loginservice: LoginService, private _coreService: CoreService, public dialogRef: MatDialogRef<JobDetailsClientIndexComponent>,) {
    console.log(data, "datainformation");
    console.log(this.data, "jobStatusDescription");
  }

  displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy', 'MovedTo', 'remarks'];
  dataJobSource: MatTableDataSource<any>;
  displayedQueryColumns: string[] = ['movedFrom', 'movedTo', 'jobStatus', 'movedDate', 'movedBy', 'MovedTo', 'remarks'];
  dataQuerySource: MatTableDataSource<any>;

  remarks: string;  // to store the remark value
  Status: string; // to store the selected query status


  pricingAmount: string; // to store the priceAmount value
  ngOnInit() {
    this.getJobHistory();
    this.getJobqueryHistory();


  }

  getJobHistory() {
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'JobOrder/getJobHistory', this.data.jid).subscribe(jobdata => {
      this.spinnerService.requestEnded();
      this.dataJobSource = jobdata.jobHistory;
      console.log(jobdata, "JobDetails");
    });
  }

  getJobqueryHistory() {
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'JobOrder/getJobHistory', this.data.jid).subscribe(getJobqueryHistorydata => {
      this.spinnerService.requestEnded();
      this.dataQuerySource = getJobqueryHistorydata.jobQueryHistory;
    });
  }
  QueryDetailsList: any;
  selectedJobs: any;



  res: string;
  res1: string;

  // postQueryData(data) {
  //   this.selectedJobs = [{
  //     DepartmentId: data.departmentId,
  //     TranMasterId: data.tranMasterId,
  //     JId: data.jid,
  //     CustomerId: data.customerId,
  //     JobId: "",
  //     Remarks: "",
  //     Comments: "",
  //     TimeStamp: "",
  //     CategoryDesc: "",
  //     SelectedRows: [],
  //     FileInwardType: "",
  //     CommentsToClient: "",
  //     SelectedEmployees: []
  //   }];


  //   var processMovement = {
  //     "id": 0,
  //     "statusId": data.statusId.toString(),
  //     "selectedScopeId": 0,
  //     "autoUploadJobs": true,
  //     "employeeId": this.loginservice.getUsername(),
  //     "remarks": this.remarks,
  //     "isBench": true,
  //     "jobId": data.jobId,
  //     "value": 0,
  //     "amount": 0,
  //     "stitchCount": 0,
  //     "estimationTime": 0,
  //     "dateofDelivery": "2023-06-24T09:40:49.877Z",
  //     "comments": "string",
  //     "validity": 0,
  //     "copyFiles": true,
  //     "updatedBy": 0,
  //     "jId": data.jid,
  //     "estimatedTime": data.estimatedTime !== null ? data.estimatedTime : 0,
  //     "tranMasterId": 0,
  //     "selectedRows": this.selectedJobs,
  //     "selectedEmployees": [],
  //     "departmentId": 0,
  //     "updatedUTC": "2023-06-24T09:40:49.877Z",
  //     "categoryDesc": "string",
  //     "allocatedEstimatedTime": 0,
  //     "tranId": 0,
  //     "fileInwardType": "string",
  //     "timeStamp": data.timeStamp,
  //     "scopeId": data.scopeId ? data.scopeId : 0,
  //     "quotationRaisedby": 0,
  //     "quotationraisedOn": "2023-06-24T09:40:49.877Z",
  //     "clientId": data.clientId,
  //     "customerId": 0,
  //     "fileReceivedDate": data.estfileReceivedDate,
  //     "commentsToClient": "string",
  //     "isJobFilesNotTransfer": true
  //   }


  //   this.jobMovement(processMovement);
  //   const res: string = btoa(this.data.jid);
  //   const res1: string = btoa(this.data.statusId);

  //   if (this.data.statusId === 6 || this.data.statusId === 8) {
  //     const url = environment.apiURL + 'ClientOrderLocal/SendMailForQueryJobs';
  //     const params = new HttpParams()
  //       .set('WFMId', this.data.tranMasterId
  //       )
  //       .set('JobId', res)
  //       .set('StatusIdVal', res1);

  //     const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //     const options = { headers: headers, params: params };

  //     this.http.post(url, null, options).subscribe((response) => {
  //       this._coreService.openSnackBar('Data added successfully');
  //       this.dialogRef.close();
  //     });
  //   }
  // };

  confirmationMessage: string;
  jobMovement(processMovement) {
    this.http.post<any>(environment.apiURL + `Allocation/processMovement`, processMovement).subscribe(result => {

      if (result.message == "Job sent as query") {
        Swal.fire(
          ' Done!',
          result.message,
          'success'
        )
      }
      else {
        Swal.fire(
          'Alert!',
          result.message,
          'info'
        )
      }

      if (processMovement.statusId === 19) {
        const url = '/ClientOrder/SendMailForCompletedJobs';
        const params = new HttpParams().set('JobId', result.J);

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const options = { headers: headers, params: params };

        this.http.post(url, null, options)
          .subscribe(
            () => {
              // Success callback
            },
            (error) => {
              // Error callback
            }
          );
      }

    });

  }
  scopeid: any;
  esttime: any;
  stitchcount: any;
  //bottom dropdowns
  getAmountForSpecialPrice(data) {
    this.http.post<any>(environment.apiURL + 'JobOrder/getJobHistory', this.data.jid).subscribe(jobdata => {
      this.http.get<any>(environment.apiURL + `ClientOrderService/QueryDetails?WFTId=${this.data.tranId}&WFMId=${this.data.tranMasterId}`).subscribe(result => {
        this.QueryDetailsList = result;

        if (this.QueryDetailsList == undefined) {
          this.scopeid = null;
          this.esttime = null;
          this.stitchcount = null;
        }
        else {
          this.scopeid = result.scope.id;
          this.esttime = result.estimatedTime;
          this.stitchcount = result.stitchCount;
        }
        console.log(this.data.scopeId);

        var processMovementPayload = {
          "id": 0,
          "processId": 0,
          "statusId": this.Status,
          "selectedScopeId": parseInt(this.data.scopeId), // Parse the value to an integer
          "autoUploadJobs": true,
          "employeeId": this.loginservice.getUsername(),
          "remarks": this.remarks,
          "isBench": true,
          "jobId": "string",
          "value": 0,
          "amount": 0,
          "stitchCount": this.data.stitchCount,
          "estimationTime": jobdata.jobCommonDetail,
          "dateofDelivery": "2023-07-03T12:35:41.988Z",
          "comments": "string",
          "validity": 0,
          "copyFiles": true,
          "updatedBy": 0,
          "jId": this.data.jid,
          "estimatedTime": 0,
          "tranMasterId": 0,
          "selectedRows": [],
          "selectedEmployees": [],
          "departmentId": this.data.departmentId,
          "updatedUTC": "2023-07-03T12:35:41.988Z",
          "categoryDesc": "string",
          "allocatedEstimatedTime": 0,
          "tranId": 0,
          "fileInwardType": "string",
          "timeStamp": "string",
          "scopeId": 0,
          "quotationRaisedby": 0,
          "quotationraisedOn": "2023-07-03T12:35:41.988Z",
          "clientId": this.data.clientId,
          "customerId": 0,
          "fileReceivedDate": this.data.fileReceivedDate,
          "commentsToClient": "string",
          "isJobFilesNotTransfer": true
        };

        this.http.post<any>(environment.apiURL + `Allocation/getAmountForSpecialPrice`, processMovementPayload).subscribe(result => {
          this.pricingAmount = result.amount;
          if (result.message != "") {
            alert(result.message);
          }
          console.log(result, "postresult");
        });
        console.log(result, "QueryDetailsList");
      });
    });
  };




  ///2208changes
  statusChange(statusId) {
    if (statusId == 19) {

      this.http.get<any>(environment.apiURL + `ClientOrderService/QuotationDetails?JobId=${this.data.jid}`).subscribe(result => {
        this.QuotationDetailsList = result;
      });
    }
    else if (statusId == 8 || statusId == 9) {
      this.http.get<any>(environment.apiURL + `ClientOrderService/QueryDetails?WFTId=${this.data.tranId}&WFMId=${this.data.tranMasterId}`).subscribe(results => {
console.log(results,"Resultsquery");

        this.QueryDetailsList = results;
        this.QueryEstimatedTime = results.estimatedTime;
        this.QueryEstimatedScope = results.scope.description;
        this.QueryEstimatedSpecialPrice = results.specialPrice;
      })

    }
  };



  submitpostQueryData(data) {
console.log(this.QueryEstimatedTime,"QueryEstimatedTime");

    this.selectedJobs = [{
      DepartmentId: this.data.departmentId,
      TranMasterId: this.data.tranMasterId,
      JId: this.data.jid,
      CustomerId: this.data.clientId,
      JobId:'',
      Comments:'',
      TimeStamp:'',
      CategoryDesc:'',
      SelectedRows:[],
      FileInwardType:"",
      CommentsToClient:"",
      SelectedEmployees:[]
    }];
    if (this.QueryDetailsList == undefined) {
      this.scopeid = null;
      this.esttime = null;
      this.stitchcount = null;
    }
    else {
      this.scopeid = this.QueryDetailsList.scope.id;
      //esttime = $scope.QueryDetailsList.Value;
      this.esttime = this.QueryDetailsList.estimatedTime;
      this.stitchcount = this.QueryDetailsList.stitchCount;
    }

    //$scope.specialPriceValue = $("#txtpricingamount").val();
    var processMovement = {
      SelectedRows: this.selectedJobs,
      EmployeeId: this.loginservice.getUsername(),
      StatusId: this.Status,
      Remarks: this.remarks,
      Value: this.data.value,
      ProcessId: this.data.processId,
      JobId: this.data.jobId,
      ScopeId: this.data.scopeId ? this.data.scopeId:0,
      SelectedScopeId: this.scopeid ? this.scopeid:0, 
      //Amount: $scope.specialPriceValue,
      Amount: this.pricingAmount,
      EstimatedTime: this.QueryEstimatedTime,
      ClientId: this.data.clientId,
      FileReceivedDate: this.data.fileReceivedDate,
      StitchCount: this.stitchcount,
      Comments:'',
      TimeStamp:'',
      CategoryDesc:'',
      FileInwardType:'',
      CommentsToClient:'',
      SelectedEmployees:[]
    }
    if (data.Status == 9) {
      //if ($scope.QueryDetailsList.SpecialPrice >= $scope.specialPriceValue) {
      if (this.QueryDetailsList.specialPrice != 0) {
        if (this.QueryDetailsList.SpecialPrice >= this.pricingAmount) {
        }
        else {
          alert('Aprroval Required');
        }
      }
    }
    this.jobMovement(processMovement);
    const res: string = btoa(this.data.jid);
    const res1: string = btoa(this.data.statusId);

    if (this.data.statusId === 6 || this.data.statusId === 8) {
      const url = environment.apiURL + 'ClientOrderLocal/SendMailForQueryJobs';
      const params = new HttpParams()
        .set('WFMId', this.data.tranMasterId
        )
        .set('JobId', res)
        .set('StatusIdVal', res1);

      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const options = { headers: headers, params: params };

      this.http.post(url, null, options).subscribe((response) => {
        this._coreService.openSnackBar('Data added successfully');
        this.dialogRef.close();
      });
    }
  };


}