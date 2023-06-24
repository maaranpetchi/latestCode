import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-job-details-client-index',
  templateUrl: './job-details-client-index.component.html',
  styleUrls: ['./job-details-client-index.component.scss']
})
export class JobDetailsClientIndexComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient,private spinnerService:SpinnerService,private loginservice:LoginService){console.log(data,"datainformation");
  }
  
 displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataJobSource: MatTableDataSource<any>;
 displayedQueryColumns: string[] = ['movedFrom', 'movedTo', 'jobStatus', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataQuerySource: MatTableDataSource<any>;

 remarks: string;  // to store the remark value
 selectedQureryStatus: string; // to store the selected query status



  ngOnInit() {
    // Fetch data from the REST API and populate the table
this.getJobHistory();
    // Fetch data from the REST API and populate the table
   this.getJobqueryHistory();
  }

  getJobHistory(){
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL+'JobOrder/getJobHistory',this.data.jid).subscribe(data => {
      this.spinnerService.requestEnded();
      this.dataJobSource = data.jobHistory;
      console.log(data,"JobDetails");
    });
  }

  getJobqueryHistory(){
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL+'JobOrder/getJobHistory',this.data.jid).subscribe(data => {
      this.spinnerService.requestEnded();
      this.dataQuerySource = data.jobQueryHistory;
    });
  }
  QueryDetailsList : undefined;
   selectedJobs:any;
   postQueryData(data) {
     this.selectedJobs = [{
            DepartmentId:data.departmentId,
            TranMasterId:data.tranMasterId,
            JId:data.jid,
            CustomerId:data.customerId
        }];

        // if (this.QueryDetailsList == undefined) {
        //     scopeid = null;
        //     esttime = null;
        //     stitchcount = null;
        // }
        // else {
        //     scopeid =QueryDetailsList.Scope.Id;
        //     //esttime =QueryDetailsList.Value;
        //     esttime =QueryDetailsList.EstimatedTime;
        //     stitchcount =QueryDetailsList.StitchCount;
        // }
        //$scope.specialPriceValue = $("#txtpricingamount").val();
        var processMovement ={
          "id": 0,
          "processId": 0,
          "statusId": data.statusId,
          "selectedScopeId": 0,
          "autoUploadJobs": true,
          "employeeId": this.loginservice.getUsername(),
          "remarks": "string",
          "isBench": true,
          "jobId": "string",
          "value": 0,
          "amount": 0,
          "stitchCount": 0,
          "estimationTime": 0,
          "dateofDelivery": "2023-06-24T09:40:49.877Z",
          "comments": "string",
          "validity": 0,
          "copyFiles": true,
          "updatedBy": 0,
          "jId":data.jobId,
          "estimatedTime": null,
          "tranMasterId": 0,
          "selectedRows": this.selectedJobs,
          "selectedEmployees": [
            "string"
          ],
          "departmentId": 0,
          "updatedUTC": "2023-06-24T09:40:49.877Z",
          "categoryDesc": "string",
          "allocatedEstimatedTime": 0,
          "tranId": 0,
          "fileInwardType": "string",
          "timeStamp": "string",
          "scopeId":data.scopeId,
          "quotationRaisedby": 0,
          "quotationraisedOn": "2023-06-24T09:40:49.877Z",
          "clientId": data.clientId,
          "customerId": 0,
          "fileReceivedDate": data.estfileReceivedDate,
          "commentsToClient": "string",
          "isJobFilesNotTransfer": true
        }
      
      //  jobMovement(processMovement);
      //   var res = window.btoa($scope.jobCommonDetails.JId);
      //   var res1 = window.btoa(data.Status);
      //   if (data.Status == 6 || data.Status == 8) {
      //       $http({
      //           url: "/ClientOrder/SendMailForQueryJobs",
      //           method: "POST",
      //           params: { WFMId:jobCommonDetails.TranMasterId, JobId: res, StatusIdVal: res1 }
      //       });
      //   }
    };


  jobMovement(processMovement) {

this.http.post( environment.apiURL+`Allocation/processMovement`,processMovement).subscribe(result => {


});

      // PendingJobListFactory.ProcessMovementData('processMovement', processMovement).$promise.then(function (result) {
      //     if (result.Success) {
      //         if ($scope.AttachedFiles.length != 0) {
      //             $scope.uploadFile(result);
      //         }
      //         else {
      //             $scope.jobSubmitted = false;
      //             $scope.confirmationMessage = result.Message;
      //             if (processMovement.StatusId == 9 || processMovement.StatusId == 7) {
      //                 $scope.confirmationMessage = "Job moved to next tray";
      //             }
      //             $('#confirmedPopup').modal('show');
      //             //if (processMovement.StatusId == 12 || processMovement.StatusId == 19) {
      //                 if (processMovement.StatusId == 19) {
      //                 $http({
      //                     url: "/ClientOrder/SendMailForCompletedJobs",
      //                     method: "POST",
      //                     params: { JobId: result.OrderId }
      //                 });
      //             }
      //             BindCompletedJobs();
      //             $scope.gridApi.core.refresh();
      //             $scope.completedJobs();
      //             $scope.AttachedFiles = [];
      //         }

      //     } else {
      //         $scope.confirmationMessage = result.Message;
      //         $('#confirmedPopup').modal('show');
      //         $scope.clear();
      //     }
      // });
  };

}
