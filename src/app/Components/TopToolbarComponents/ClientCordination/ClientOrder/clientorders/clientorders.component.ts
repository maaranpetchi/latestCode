import { ClientorderstableComponent } from '../clientorderstable/clientorderstable.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';

@Component({
  selector: 'app-clientorders',
  templateUrl: './clientorders.component.html',
  styleUrls: ['./clientorders.component.scss']
})
export class ClientordersComponent implements OnInit {
  @ViewChild(ClientorderstableComponent) ClientorderstableComponent: ClientorderstableComponent;


  constructor(private http: HttpClient) { }
  
  DivisionApiData: any[];
  ngOnInit(): void {
//division dropdown
this.http.get<any>('APIURL').subscribe(divisiondata =>{
  this.DivisionApiData = divisiondata;
})
  }
 
  onTabChange(event: any) {
    // Update the REST API based on the selected tab
    console.log("first", event);

    switch (event.index) {
      case 0: // Fresh Jobs tab
        // Call your REST API for Fresh Jobs
        this.BindPendingJobs();
        break;
      case 1: // Revision Jobs tab
    
        // Call your REST API for Revision Jobs
        this.quotationjobs();
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
    this.ClientorderstableComponent.tab('1');
  };
  quotationjobs() {
    this.ClientorderstableComponent.tab('2');
  }
}
