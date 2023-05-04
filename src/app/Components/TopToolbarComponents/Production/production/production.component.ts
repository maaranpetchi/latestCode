import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductiontableComponent } from '../productiontable/productiontable.component';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit{
  @ViewChild(ProductiontableComponent) ProductiontableComponent: ProductiontableComponent;

 constructor(private http:HttpClient){}
  ngOnInit(): void {
  

    
  }
  onTabChange(event: any) {
    // Update the REST API based on the selected tab
    switch (event.index) {
      case 0: // Fresh Jobs tab
        // Call your REST API for Fresh Jobs
        this.BindPendingJobs();
        break;
      case 1: // Revision Jobs tab
        // Call your REST API for Revision Jobs
        break;
      case 2: // Rework Jobs tab
        // Call your REST API for Rework Jobs
        break;
      case 3: // Quote Jobs tab
        // Call your REST API for Quote Jobs
        break;
      case 4: // Bulk Jobs tab
        // Call your REST API for Bulk Jobs
        break;
      case 5: // Bulk Upload Jobs tab
        // Call your REST API for Bulk Upload Jobs
        break;
      default:
        break;
    }
  }

  alert(){
    console.log("alerttesting")
  }

tab(action){
  console.log("before");
    if (action == 'pendingJobs') {
        // workFlowJobs.data = {};
        // ScopeDetails = false;
        console.log("1");
      this.BindPendingJobs();

    }
//     else if (action == 'revisionJobs') {
//         workFlowJobs.data = {};
//         ScopeDetails = false;
//         BindRevisionJobs();
//     }
//     else if (action == 'reworkJobs') {
//         workFlowJobs.data = {};
//         ScopeDetails = false;
//         BindReworkJobs();
//     }
//     else if (action == 'quoteJobs') {
//         workFlowJobs.data = {};
//         ScopeDetails = false;
//         BindQuoteJobs();
//     }
//     else if (action == 'sewOut') {
//         workFlowJobs.data = {};
//         ScopeDetails = false;
//         BindSewOutJobs();
//     }
//     else if (action == 'buddyProof') {
//         workFlowJobs.data = {};
//         ScopeDetails = false;
//         BindSewOutJobs();
//     }
//         //Bulk Closure purpose --05/05/2017 2:40:00 PM
//     else if (action == 'Bulkjobs') {
//         workFlowJobs.data = {};
//         ScopeDetails = true;
//         BindBulkJobs();
//     }
//     else if (action == 'BulkUploadjobs') {
//         workFlowJobs.data = {};
//         ScopeDetails = false;
//         BindBulkUploadJobs();
//     }
// };
  }

showChildAlert() {
  this.ProductiontableComponent.showAlert();
}

 BindPendingJobs() {
  console.log("2");
  this.http.get<any>('https://localhost:7208/api/Allocation/getWorkflowJobList/152/3/1/1').subscribe(response=> {
    this.ProductiontableComponent.assigndatasource(response.getWorkflowDetails)

  });
  // PendingJobListFactory.GetAllocationAndErrorJobswithDept('getWorkflowJobList', EmployeeId, ProcessId, 1, rbnSelect).promise.then(function (result) {
  //     workFlowJobs.data = result.GetWorkflowDetails;
  //     getWorkflowDetails = result.GetWorkflowDetails;
  //     freshJobsCount = result.FreshJobsCount;
  //     revisionJobsCount = result.RevisionJobsCount;
  //     reworkJobsCount = result.ReworkJobsCount;
  //     quoteJobsCount = result.QuoteJobsCount;
  //     sewOutJobsCount = result.SewOutJobsCount;
  //     bulkJobsCount = result.BulkJobsCount;
  //     bulkUploadJobsCount = result.BulkUploadJobsCount;
  };
  // var pos1 = workFlowJobs.columnDefs.map(function (e) { return e.field; }).indexOf('Start');
  // workFlowJobs.columnDefs[pos1].visible = false;
  // var pos2 = workFlowJobs.columnDefs.map(function (e) { return e.field; }).indexOf('End');
  // workFlowJobs.columnDefs[pos2].visible = false;
  // var pos3 = workFlowJobs.columnDefs.map(function (e) { return e.field; }).indexOf('WorkFiles');
  // workFlowJobs.columnDefs[pos3].visible = false;
  // var pos4 = workFlowJobs.columnDefs.map(function (e) { return e.field; }).indexOf('actions');
  // workFlowJobs.columnDefs[pos4].visible = true;
  // var pos5 = workFlowJobs.columnDefs.map(function (e) { return e.field; }).indexOf('BulkUpload');
  // workFlowJobs.columnDefs[pos5].visible = false;
};

