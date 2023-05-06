import { Component, ViewChild } from '@angular/core';
import { ClientorderstableComponent } from '../clientorderstable/clientorderstable.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clientorders',
  templateUrl: './clientorders.component.html',
  styleUrls: ['./clientorders.component.scss']
})
export class ClientordersComponent {
  @ViewChild(ClientorderstableComponent) ClientorderstableComponent: ClientorderstableComponent;


  constructor(private http:HttpClient) {  }

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

  BindPendingJobs() {
    console.log("2");
    this.http.get<any>('https://localhost:7208/api/Allocation/getWorkflowJobList/152/3/1/1').subscribe(response=> {
      this.ClientorderstableComponent.assigndatasource(response.getWorkflowDetails)
    });
  
  };

}
