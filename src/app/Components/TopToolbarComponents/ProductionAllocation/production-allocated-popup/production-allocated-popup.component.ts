import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-production-allocated-popup',
  templateUrl: './production-allocated-popup.component.html',
  styleUrls: ['./production-allocated-popup.component.scss'],
})
export class ProductionAllocatedPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private loginservice: LoginService
  ) {console.log(data,"ProductionAllocatedPopupComponent");
  }

  displayedJobColumns: string[] = [
    'movedFrom',
    'movedTo',
    'movedDate',
    'movedBy',
    'MovedTo',
    'remarks',
  ];
  dataJobSource: MatTableDataSource<any>;
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

  remarks: string; // to store the remark value
  selectedQureryStatus: string; // to store the selected query status
  estimatedTime: string;

  EstimatedTime: boolean = false;
  remarksdata: boolean = false;
  EmployeData: boolean = false;

  selectedScope: any;
  Scopes: any[];
  estTime: number;
  restApiData: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.fetchData();
    this.QueryDetailspost();
    this.fetchScopes();
    this.getAssignedEmployeesToChangeEstTime();
  }
  getIsVisible(): any {
    return this.dataQuerySource.data.length > 0;
  }
  onFilterChange() {
    if (this.selectedQureryStatus == 'Query') {
      this.remarksdata = true;
      this.EstimatedTime = false;
      this.EmployeData = false;
    } else if (this.selectedQureryStatus == 'specialpricing') {
      this.EstimatedTime = true;
      this.remarksdata = true;
      this.EmployeData = true;

      this.http
        .get<any>(
          environment.apiURL +
            `Allocation/getAssignedEmployeesToChangeEstTime/${this.data.jId}`
        )
        .subscribe((response) => {
          this.Scopes = response.assignedEmployees;
        });
    }
  }
  fetchScopes() {
    this.http
      .get<any>(
        environment.apiURL +
          `Allocation/getScopeValues/${this.loginservice.getUsername()}`
      )
      .subscribe((scopedata) => {
        this.Scopes = scopedata.scopeDetails;
        this.Scopes.sort((a, b) => a.name.localeCompare(b.name)); // Sort the scopes based on the 'name' property
      });
  }
  fetchData() {
    const apiUrl = environment.apiURL + 'JobOrder/getJobHistory';

    this.http.post<any>(apiUrl, this.data.jId ? this.data.jId : 0).subscribe(
      (response: any) => {
        this.dataJobSource = response;
        this.dataJobSource = new MatTableDataSource(response.jobHistory);
        this.dataJobSource.paginator = this.paginator;
        this.dataJobSource.sort = this.sort; // Assuming the REST API response is an array of objects
        this.dataQuerySource = response;
        this.dataQuerySource = new MatTableDataSource(response.jobQueryHistory);
        this.dataQuerySource.paginator = this.paginator1;
        this.dataQuerySource.sort = this.sort;
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
    return this.http.post(apiUrl, datas).subscribe(
      (response: any) => {
        this.restApiData = response; // Assuming the REST API response is an array of objects
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

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.Scopes = response.scopeDetails; // Assuming the REST API response is an array of objects
      },
      (error: any) => {
        console.log('Error fetching data from REST API:', error);
      }
    );
  }
  workFiles(id: number): void {
    this.http
      .get(
        environment.apiURL +
          `Allocation/getFileNames/PRAS_01-17-2022_AllocErrorBugFixing%203-VLA-Fr-0117-221_Quality%20Allocation_Pending-1`
      )
      .subscribe((response: any) => {
        const fileUrls: string[] = response.files;
        fileUrls.forEach((url) => {
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
  onSubmit() {
    if (this.selectedQureryStatus == 'Query') {
      this.processMovement();
    } else if (this.selectedQureryStatus === 'specialpricing') {
      this.changeEstTime();
    } else {
      // Handle the case when no option is selected or handle any other condition
    }
  }

  processMovement() {
    // let selectedRows: any[] = [
    //   {
    //     id: 0,
    //     processId: 3,
    //     statusId: this.selectedQureryStatus,
    //     selectedScopeId: 0,
    //     autoUploadJobs: true,
    //     employeeId: this.loginservice.getUsername(),
    //     remarks: this.remarks,
    //     isBench: true,
    //     jobId: this.data.jobId,
    //     value: 0,
    //     amount: 0,
    //     stitchCount: 0,
    //     dateofDelivery: '2023-07-01T11:15:03.552Z',
    //     comments: 'string',
    //     validity: 0,
    //     copyFiles: true,
    //     updatedBy: this.loginservice.getUsername(),
    //     jId: this.data.jId,
    //     estimatedTime: this.estimatedTime,
    //     tranMasterId: this.data.tranMasterId,
    //     selectedRows: [],
    //     selectedEmployees: [],
    //     departmentId: this.data.departmentId,
    //     updatedUTC: '2023-07-01T11:15:03.552Z',
    //     categoryDesc: 'string',
    //     allocatedEstimatedTime: 0,
    //     tranId: 0,
    //     fileInwardType: 'string',
    //     timeStamp: this.data.timeStamp,
    //     scopeId: 0,
    //     quotationRaisedby: 0,
    //     quotationraisedOn: '2023-07-01T11:15:03.552Z',
    //     clientId: 0,
    //     customerId: this.data.customerId,
    //     fileReceivedDate: '2023-07-01T11:15:03.553Z',
    //     commentsToClient: 'string',
    //     isJobFilesNotTransfer: true,
    //   },
    // ];
    let saveData = {
      id: 0,
      processId: 3,
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
      dateofDelivery: '2023-07-01T11:15:03.552Z',
      comments: 'string',
      validity: 0,
      copyFiles: true,
      updatedBy: this.loginservice.getUsername(),
      jId: this.data.jId,
      estimatedTime: this.estimatedTime,
      tranMasterId: this.data.tranMasterId,
      selectedRows: [
        {
          customerId: this.data.customerId,
          departmentId: this.data.departmentId,
          estimatedTime: this.estimatedTime,
          jId: this.data.jId,
          tranMasterId: this.data.tranMasterId,
        },
      ],
      selectedEmployees: [],
      departmentId: this.data.departmentId,
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
      customerId: this.data.customerId,
      fileReceivedDate: '2023-07-01T11:15:03.553Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    this.http
      .post<any>(environment.apiURL + 'Allocation/processMovement', saveData)
      .subscribe((response) => {});
  }

  changeEstTime() {
    let selectedRows = [
      {
        id: 0,
        processId: 3,
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
        customerId: this.data.customerId,
        fileReceivedDate: '2023-07-01T11:15:03.553Z',
        commentsToClient: 'string',
        isJobFilesNotTransfer: true,
      },
    ];
    let estTimeData = {
      id: 0,
      processId: 3,
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
      dateofDelivery: '2023-07-01T11:15:03.552Z',
      comments: 'string',
      validity: 0,
      copyFiles: true,
      updatedBy: this.loginservice.getUsername(),
      jId: this.data.jId,
      estimatedTime: this.estimatedTime,
      tranMasterId: this.data.tranMasterId,
      selectedRows: selectedRows,
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
      customerId: this.data.customerId,
      fileReceivedDate: '2023-07-01T11:15:03.553Z',
      commentsToClient: 'string',
      isJobFilesNotTransfer: true,
    };
    this.http
      .post<any>(
        environment.apiURL + 'Allocation/changeEstimatedTime',
        estTimeData
      )
      .subscribe(
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
}