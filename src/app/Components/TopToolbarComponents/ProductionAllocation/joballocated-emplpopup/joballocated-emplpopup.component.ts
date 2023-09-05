import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-joballocated-emplpopup',
  templateUrl: './joballocated-emplpopup.component.html',
  styleUrls: ['./joballocated-emplpopup.component.scss'],
})
export class JoballocatedEmplpopupComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['employee', 'estimatedTime', 'status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private loginservice: LoginService
  ) {}
  ngOnInit(): void {
    this.getJobAllocatedDetails();
  }

  getJobAllocatedDetails() {
    let storeData = {
      tranId: this.data.tranId,
      tranMasterId: 0,
      estimatedTime: 0,
      statusId: 0,
      divEmpId: 0,
      employeeName: 'string',
      employeeCount: 0,
      timeStamp: '',
      processId: 0,
      isActive: true,
      allocatedEstimatedTime: 0,
      projectCode: 'string',
      customerClassification: 'string',
      dateofDelivery: '2023-07-07T06:29:53.271Z',
      previousProcessId: 0,
      artistName: 'string',
      name: 'string',
      jid: 0,
      jobId: 'string',
      jobDate: '2023-07-07T06:29:53.271Z',
      queryJobDate: '2023-07-07T06:29:53.271Z',
      isDeleted: true,
      fileName: 'string',
      customerJobType: 't',
      commentsToClient: 'string',
      jobStatusId: 0,
      jobStatusDescription: 'string',
      customerId: 0,
      shortName: 'string',
      isBulk: true,
      categoryDesc: 'string',
      employeeId:  this.loginservice.getUsername(),
      workStatus: 'string',
      scopeDesc: 'string',
      jobDateQueryDate: '2023-07-07T06:29:53.271Z',
      estjobDate: '2023-07-07T06:29:53.271Z',
      estfileReceivedDate: '2023-07-07T06:29:53.271Z',
      jobDateEst: '2023-07-07T06:29:53.271Z',
      fileInwardType: 'string',
      overAllTime: 0,
      trayTime: 0,
      balanceTime: 0,
    };
    this.http
      .post(
        environment.apiURL + 'JobOrder/GetAssignedEmployees',
        storeData
      )
      .subscribe(
        (response:any) => {
          
          this.dataSource = new MatTableDataSource(response.assignedEmployees);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          
        }
      );
  
  }
}
