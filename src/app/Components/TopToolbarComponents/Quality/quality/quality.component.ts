import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QualitytableComponent } from '../qualitytable/qualitytable.component';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent  implements OnInit{
  @ViewChild(QualitytableComponent) QualitytableComponent: QualitytableComponent;
  ScopeApiData: any[];
 constructor(private http:HttpClient,private loginservice:LoginService){}
  ngOnInit(): void {
  //ScopeDropdown
    this.http.get<any>('ScopeUrl').subscribe(data =>{
      this.ScopeApiData = data;
    });
    
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
  this.QualitytableComponent.showAlert();
}

 BindPendingJobs() {
  console.log("2");
  this.http.get<any>(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/1`).subscribe(response=> {
    this.QualitytableComponent.assigndatasource(response.getWorkflowDetails)

  });

};
}
