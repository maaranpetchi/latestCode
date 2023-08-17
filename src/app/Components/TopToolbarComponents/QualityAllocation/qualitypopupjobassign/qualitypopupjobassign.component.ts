import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'jquery';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'

interface Folder {
  id: number;
  name: string;
  files: string[]; // Array of file names in the folder
}
@Component({
  selector: 'app-qualitypopupjobassign',
  templateUrl: './qualitypopupjobassign.component.html',
  styleUrls: ['./qualitypopupjobassign.component.scss'],
})



export class QualitypopupjobassignComponent implements OnInit {
  restApiData: any[];
  // displayedColumns: string[] = [
  //   'sNo',
  //   'jobId',
  //   'client',
  //   'assignedDate',
  //   'fileName',
  //   'tray',
  //   'estimatedTime',
  //   'status',
  // ];
  EstimatedTime: boolean = false;
  remarksdata: boolean = false;
  EmployeData: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedEmployees: any;

  Employees: any[];
  estTime: number;
  jobCommonDetails: any;
  QueryDetailsList: any;
  confirmationMessage: any;
  selectedJobs: { DepartmentId: any; TranMasterId: any; JId: any; CustomerId: any; JobId:any;Comments:any;TimeStamp:any;CategoryDesc:any;SelectedRows:any;FileInwardType:any;CommentsToClient:any;SelectedEmployees:any}[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private loginservice: LoginService
  ) {
    console.log(data, "data");
  }
  displayedJobColumns: string[] = [
    'movedFrom',
    'movedTo',
    'movedDate',
    'movedBy',
    'MovedTo',
    'remarks',
  ];
  dataJobSource: MatTableDataSource<any[]>;
  displayedQueryColumns: string[] = [
    'movedFrom',
    'movedTo',
    'jobStatus',
    'movedDate',
    'movedBy',
    'MovedTo',
    'remarks',
  ];
  dataQuerySource: MatTableDataSource<any>;

  selectedQureryStatus: number;
  remarks: string;
  estimatedTime: any;

  ngOnInit() {
    this.fetchData(); // Call the function to fetch data from the REST API
    this.getAssignedEmployeesToChangeEstTime(); // this function for getting values in drop down list
    this.QueryDetailspost(); // this function for get the wftId and Jid
  }


  onFilterChange() {
    if (this.selectedQureryStatus == 6) {
      this.remarksdata = true;
      this.EstimatedTime = false;
      this.EmployeData = false;
    } else if (this.selectedQureryStatus == 8) {
      this.EstimatedTime = false;
      this.remarksdata = true;
      this.EmployeData = false;
    } else if (this.selectedQureryStatus == 100) {
      this.EstimatedTime = true;
      this.EmployeData = true;
      this.remarksdata = false;

      this.http
        .get<any>(
          environment.apiURL +
          `Allocation/getAssignedEmployeesToChangeEstTime/${this.data.jId}`
        )
        .subscribe((response) => {
          this.Employees = response.assignedEmployees;
        });
    }
  }
  fetchData() {
    const apiUrl = environment.apiURL + 'JobOrder/getJobHistory';

    this.http.post(apiUrl, this.data.jId).subscribe(
      (response: any) => {
        this.restApiData = response;
        this.jobCommonDetails = response;
        this.dataJobSource = new MatTableDataSource(response.jobHistory);
        this.dataJobSource.paginator = this.paginator;
        this.dataJobSource.sort = this.sort; // Assuming the REST API response is an array of objects
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }

  getAssignedEmployeesToChangeEstTime() {
    const apiUrl =
      environment.apiURL +
      `Allocation/getAssignedEmployeesToChangeEstTime/${this.data.jId}`;

    this.http.get(apiUrl, this.data.jId).subscribe(
      (response: any) => {
        this.restApiData = response; // Assuming the REST API response is an array of objects
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }

  QueryDetailspost() {
    const apiUrl = environment.apiURL + `ClientOrderService/QueryDetailspost`;
    var datas = {
      wftid: 0,
      jid: this.data.jId,
    };


    this.http.post(apiUrl, datas).subscribe(
      (response: any) => {
        this.restApiData = response; // Assuming the REST API response is an array of objects
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }

  onSubmit() {
    if (this.selectedQureryStatus == 6 || this.selectedQureryStatus == 8) {
      this.processMovement();
    } else if (this.selectedQureryStatus === 100) {
      this.changeEstTime();
    } else {
      // Handle the case when no option is selected or handle any other condition
    }
  }
  processMovement() {
    const apiUrl = environment.apiURL + `Allocation/processMovement`;

    let saveData = {
      id: 0,
      processId: this.loginservice.getProcessId(),
      statusId: this.selectedQureryStatus,
      selectedScopeId: 0,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: this.remarks,
      isBench: true,
      jobId: this.data.jobId,
      value: 0,
      amount: 0,
      stitchCount: 0,
      estimationTime: this.estTime !== 0 ? this.estTime : 0,
      dateofDelivery: '2023-07-01T10:02:55.095Z',
      comments: 'string',
      validity: 0,
      copyFiles: true,
      updatedBy: 0,
      jId: this.data.jId,
      estimatedTime: 0,
      tranMasterId: 0,
      selectedRows: this.data.selectedJobs,
      // customerId:'',
      // DepartmentId:0

      selectedEmployees: [],
      departmentId: 0,
      updatedUTC: '2023-07-01T10:02:55.095Z',
      categoryDesc: 'string',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: 'string',
      timeStamp: '',
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: '2023-07-01T10:02:55.095Z',
      clientId: 0,
      customerId: 0,
      fileReceivedDate: '2023-07-01T10:02:55.095Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    this.http.post<any>(apiUrl, saveData).subscribe((response) => {
      console.log(response, "SubmitResponse");

    });
  }

  changeEstTime() {
    let estTimeData = {
      id: 0,
      processId: 3,
      statusId: this.selectedQureryStatus,
      selectedScopeId: 0,
      autoUploadJobs: true,
      employeeId: this.loginservice.getUsername(),
      remarks: null,
      isBench: true,
      jobId: 'string',
      value: 0,
      amount: 0,
      stitchCount: 0,
      dateofDelivery: '2023-07-01T11:15:03.552Z',
      comments: 'string',
      validity: 0,
      copyFiles: true,
      updatedBy: this.loginservice.getUsername(),
      jId: this.data.jId,
      estimatedTime: this.estimatedTime,
      tranMasterId: this.data.tranMasterId,
      selectedRows: [],
      selectedEmployees: [],
      departmentId: 0,
      updatedUTC: '2023-07-01T11:15:03.552Z',
      categoryDesc: 'string',
      allocatedEstimatedTime: 0,
      tranId: 0,
      fileInwardType: 'string',
      timeStamp: this.data.timeStamp,
      scopeId: 0,
      quotationRaisedby: 0,
      quotationraisedOn: '2023-07-01T11:15:03.552Z',
      clientId: 0,
      customerId: 0,
      fileReceivedDate: '2023-07-01T11:15:03.553Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    this.http.post<any>(environment.apiURL + 'Allocation/changeEstimatedTime', estTimeData).subscribe(
      (response) => {
        console.log(response);

        // Handle the API response
      },
      (error) => {
        console.log(error);

        // Handle the API error
      }
    );

  }


  // workFiles(id:number){
  //   const folder = this.data.find(f => f.id === id);
  //   console.log(this.data, 'download');


  //   if (folder) {
  //     folder.files.forEach(fileName => {
  //       // Check if the file type is Excel or text
  //       if (fileName.endsWith('.xlsx') || fileName.endsWith('.txt')) {
  //         const downloadLink = document.createElement('a');
  //         downloadLink.href = 'JobFiles\PRAS' + fileName; // Replace with your folder path
  //         downloadLink.download = fileName;
  //         downloadLink.click();
  //       } else {
  //         console.log('File type not supported for download:', fileName);
  //       }
  //     });
  //   } else {
  //     console.log('Folder not found with ID:', id);
  //   }
  // }


  // workFiles(id: number): void {
  //   this.http.get(`https://localhost:7208/api/Allocation/getFileNames/${id}`, { responseType: 'blob' }).subscribe((data: any) => {

  //     const url = window.URL.createObjectURL(data);

  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = 'file.txt'; 
  //     link.click();
  //     window.URL.revokeObjectURL(url);
  //   });
  // }
  workFiles(id: number): void {
    this.http.get(environment.apiURL + `Allocation/getFileNames/PRAS_01-17-2022_AllocErrorBugFixing%203-VLA-Fr-0117-221_Quality%20Allocation_Pending-1`).subscribe((response: any) => {
      const fileUrls: string[] = response.files;
      fileUrls.forEach(url => {
        const link = document.createElement('a');
        link.href = url;
        link.download = this.getFileNameFromPath(url);
        link.click();
      });
    });
  }

  getFileNameFromPath(filePath: string): string {
    const pathParts = filePath.split('/');
    return pathParts[pathParts.length - 1];
  }


  //////////////Popupsubmit////

  getQueryDetailList() {
    console.log(this.jobCommonDetails.jobCommonDetails.jid      , "jobcommondetails");

    this.http.get<any>(environment.apiURL + `Allocation/GetQuerySPDetailsForQA/${this.jobCommonDetails.jobCommonDetails.jid}`).subscribe(result => {
      this.QueryDetailsList = result;
    })
  }
  stitchCountdisplay: boolean = false;
  stitchCount: any;


  displayEstimationTime:boolean=false;
  estimationTime:any;
  postQueryData() {
    if (this.selectedQureryStatus == 100) {
      var changeEstimatedTime = {
        EmployeeId: this.selectedEmployees,
        TranMasterId: this.jobCommonDetails.tranMasterId,
        JId: this.jobCommonDetails.jobCommonDetails.jid,
        EstimatedTime: this.estimatedTime,
        ProcessId: 3,
        UpdatedBy: this.loginservice.getUsername()
      };
      this.http.post<any>(environment.apiURL + 'Allocation/changeEstimatedTime', changeEstimatedTime).subscribe(result => {
        if (result.Success) {
          Swal.fire(
            'info!',
            'Estimated Time Updated!',
            'info'
          )
        }
        else {
          Swal.fire(
            'info!',
            'Estimated Time Not Updated!',
            'info'
          )
        }
      });

    }
    else {
       this.selectedJobs = [{
        DepartmentId: this.data.deptartmentId,
        TranMasterId: this.jobCommonDetails.tranMasterId,
        JId: this.jobCommonDetails.jobCommonDetails.jid,
        CustomerId: this.jobCommonDetails.jobCommonDetails.customerId,
        JobId:"",
        Comments:"",
        TimeStamp:"",
        CategoryDesc:"",
        SelectedRows:[],
        FileInwardType:'',
        CommentsToClient:'',
        SelectedEmployees:[]
      }];
      var estime;
      var scopeid;
      var stitchCount;
      this.getQueryDetailList();
      if (this.QueryDetailsList == undefined || this.QueryDetailsList == null) {
        estime = this.estimationTime;
        scopeid = 0;
        if (this.data.deptartmentId == 2 && this.jobCommonDetails.scopeId == null && scopeid == undefined) {
          // scopeid = 21; //
          stitchCount = this.stitchCount;
        }
        else if (this.data.deptartmentId == 2 && this.jobCommonDetails.scopeId != null && scopeid == undefined) {
          scopeid = this.jobCommonDetails.scopeId;
          stitchCount = $("#stitchCountForSP").val();
        }
      }
      else {
        estime = this.estimatedTime;
        stitchCount = $("#stitchCountForSP").val();
        //if ($scope.QueryDetailsList.Scope == undefined) {
        //    scopeid = $scope.QueryDetailsList.ScopeId
        //}
        //else {
        //     scopeid = $scope.QueryDetailsList.Scope.Id;                                       
        //}
        scopeid = this.QueryDetailsList.scopeId;
      }
      //alert(JSON.stringify(scopeid));
      var processMovement = {
        selectedRows: this.selectedJobs,
        JobId: this.data.jobId,
        EmployeeId: this.loginservice.getUsername(),
        StatusId: this.selectedQureryStatus,
        Remarks: this.remarks,
        ProcessId: this.data.processId,
        Value: estime,
        SelectedScopeId: scopeid,
        StitchCount: stitchCount,
        FileReceivedDate: this.jobCommonDetails.fileReceivedDate,


        //////alreadypayload//
        autoUploadJobs: true,
        employeeId: this.loginservice.getUsername(),
      
        isBench: true,
        value: 0,
        amount: 0,
        stitchCount: 0,
        estimationTime: this.estTime !== 0 ? this.estTime : 0,
        dateofDelivery: '2023-07-01T10:02:55.095Z',
        comments: '',
        validity: 0,
        copyFiles: true,
        updatedBy: 0,
        jId: this.data.jId,
        estimatedTime: 0,
        tranMasterId: 0,
        // customerId:'',
        // DepartmentId:0
  
        selectedEmployees: [],
        departmentId: 0,
        updatedUTC: new Date().toISOString,
        categoryDesc: '',
        allocatedEstimatedTime: 0,
        tranId: 0,
        fileInwardType: 'string',
        timeStamp: '',
        scopeId: 0,
        quotationRaisedby: 0,
        quotationraisedOn: '2023-07-01T10:02:55.095Z',
        clientId: 0,
        customerId: 0,
        commentsToClient: '',
        isJobFilesNotTransfer: true,
      };
      this.http.post<any>(environment.apiURL + `Allocation/processMovement`, processMovement).subscribe(result => {
        this.confirmationMessage = result.message;
        Swal.fire(
          result.message,
    
        )
      },error =>{
        Swal.fire(
          'Error!',
        "Error occured",
          'error'
        )
      });


    }
  };

}
