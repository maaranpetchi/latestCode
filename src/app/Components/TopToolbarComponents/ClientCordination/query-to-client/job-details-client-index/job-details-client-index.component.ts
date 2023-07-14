import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-job-details-client-index',
  templateUrl: './job-details-client-index.component.html',
  styleUrls: ['./job-details-client-index.component.scss']
})
export class JobDetailsClientIndexComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private spinnerService: SpinnerService, private loginservice: LoginService,private _coreService:CoreService, public dialogRef: MatDialogRef<JobDetailsClientIndexComponent>,) {
    console.log(data, "datainformation");
  }

  displayedJobColumns: string[] = ['movedFrom', 'movedTo', 'movedDate', 'movedBy', 'MovedTo', 'remarks'];
  dataJobSource: MatTableDataSource<any>;
  displayedQueryColumns: string[] = ['movedFrom', 'movedTo', 'jobStatus', 'movedDate', 'movedBy', 'MovedTo', 'remarks'];
  dataQuerySource: MatTableDataSource<any>;

  remarks: string;  // to store the remark value
  selectedQureryStatus: string; // to store the selected query status



  ngOnInit() {
    // Fetch data from the REST API and populate the table
    this.getJobHistory();
    // Fetch data from the REST API and populate the table
    this.getJobqueryHistory();
  }

  getJobHistory() {
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'JobOrder/getJobHistory', this.data.jid).subscribe(data => {
      this.spinnerService.requestEnded();
      this.dataJobSource = data.jobHistory;
      console.log(data, "JobDetails");
    });
  }

  getJobqueryHistory() {
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + 'JobOrder/getJobHistory', this.data.jid).subscribe(data => {
      this.spinnerService.requestEnded();
      this.dataQuerySource = data.jobQueryHistory;
    });
  }
  QueryDetailsList: undefined;
  selectedJobs: any;



  res: string;
  res1: string;

  postQueryData(data) {
    this.selectedJobs = [{
      DepartmentId: data.departmentId,
      TranMasterId: data.tranMasterId,
      JId: data.jid,
      CustomerId: data.customerId,
      JobId:"",
      Remarks:"",
      Comments:"",
      TimeStamp:"",
      CategoryDesc:"",
      SelectedRows: [],
      FileInwardType:"",
      CommentsToClient:"",
      SelectedEmployees :[]
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
      "jobId":data.jobId,
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
      "estimatedTime":  data.estimatedTime !== null ? data.estimatedTime : 0,
      "tranMasterId": 0,
      "selectedRows": this.selectedJobs,
      "selectedEmployees":[] ,
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
    const res: string = btoa(this.data.jid);
    const res1: string = btoa(this.data.statusId);

    if (this.data.statusId === 6 || this.data.statusId === 8) {
      const url = environment.apiURL +'ClientOrderLocal/SendMailForQueryJobs';
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

  confirmationMessage: string;
  jobMovement(processMovement) {
    this.http.post(environment.apiURL + `Allocation/processMovement`, processMovement).subscribe(result => {
      console.log(result,"jobmovementresultresult");
      
      // if (processMovement.StatusId === 19) {
      //   const url = '/ClientOrder/SendMailForCompletedJobs';
      //   // const params = new HttpParams().set('JobId', result.J);
  
      //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
      //   const options = { headers: headers, params: params };
  
      //   this.http.post(url, null, options)
      //     .subscribe(
      //       () => {
      //         // Success callback
      //       },
      //       (error) => {
      //         // Error callback
      //       }
      //     );
      // }

    });

  }
}