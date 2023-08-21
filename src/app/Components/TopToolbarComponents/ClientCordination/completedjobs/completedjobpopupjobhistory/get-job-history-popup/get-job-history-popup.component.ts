
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-get-job-history-popup',
  templateUrl: './get-job-history-popup.component.html',
  styleUrls: ['./get-job-history-popup.component.scss']
})
export class GetJobHistoryPopupComponent implements OnInit {
  selectedJobs: { DepartmentId: any; TranMasterId: any; JId: any; CustomerId: any; JobId: string; Remarks: string; Comments: string; TimeStamp: string; CategoryDesc: string; SelectedRows: never[]; FileInwardType: string; CommentsToClient: string; SelectedEmployees: never[]; }[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient,private loginservice:LoginService){}
  
 displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataJobSource: MatTableDataSource<any>;
 displayedQueryColumns: string[] = ['movedFrom', 'movedTo', 'jobStatus', 'movedDate', 'movedBy','MovedTo', 'remarks'];
 dataQuerySource: MatTableDataSource<any>;

 remarks: string;  // to store the remark value
 selectedQureryStatus: string; // to store the selected query status


 copyPreviousTrayFiles:boolean = false;
  ngOnInit() {
    // Fetch data from the REST API and populate the table job history
    this.http.post<any>(environment.apiURL+'JobOrder/getJobHistory',this.data.jid).subscribe(data => {
      this.dataJobSource = data.jobHistory;
      console.log(data,"JobDetails");
      
    });
  }

  selectedFile: File;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadToClient(){

  }


  uploadBulkFilesToClient(data) {
    this.selectedJobs = [{
      DepartmentId: data.departmentId,
      TranMasterId: data.tranMasterId,
      JId: data.jid,
      CustomerId: data.customerId,
      JobId: "",
      Remarks: "",
      Comments: "",
      TimeStamp: "",
      CategoryDesc: "",
      SelectedRows: [],
      FileInwardType: "",
      CommentsToClient: "",
      SelectedEmployees: []
    }];


    var processMovement = {
      "id": 0,
      "processId": 0,
      "statusId": data.statusId.toString(),
      "selectedScopeId": 0,
      "autoUploadJobs": true,
      "employeeId": this.loginservice.getUsername(),
      "remarks": this.remarks,
      "isBench": true,
      "jobId": data.jobId,
      "value": 0,
      "amount": 0,
      "stitchCount": 0,
      "estimationTime": 0,
      "dateofDelivery": "2023-06-24T09:40:49.877Z",
      "comments": "string",
      "validity": 0,
      "copyFiles": true,
      "updatedBy": 0,
      "jId": data.jid,
      "estimatedTime": data.estimatedTime !== null ? data.estimatedTime : 0,
      "tranMasterId": 0,
      "selectedRows": this.selectedJobs,
      "selectedEmployees": [],
      "departmentId": 0,
      "updatedUTC": "2023-06-24T09:40:49.877Z",
      "categoryDesc": "string",
      "allocatedEstimatedTime": 0,
      "tranId": 0,
      "fileInwardType": "string",
      "timeStamp": data.timeStamp,
      "scopeId": data.scopeId,
      "quotationRaisedby": 0,
      "quotationraisedOn": "2023-06-24T09:40:49.877Z",
      "clientId": data.clientId,
      "customerId": 0,
      "fileReceivedDate": data.estfileReceivedDate,
      "commentsToClient": "string",
      "isJobFilesNotTransfer": true
    }


    this.jobMovement(processMovement);
        
    }


    jobMovement(processMovement){

    }
};





