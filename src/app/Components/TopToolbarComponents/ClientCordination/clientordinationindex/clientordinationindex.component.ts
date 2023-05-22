import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryToClientComponent } from '../query-to-client/query-to-client.component';

@Component({
  selector: 'app-clientordinationindex',
  templateUrl: './clientordinationindex.component.html',
  styleUrls: ['./clientordinationindex.component.scss']
})
export class ClientordinationindexComponent  implements OnInit {
  @ViewChild(QueryToClientComponent) QueryToClientComponent: QueryToClientComponent;

  ngOnInit(): void {
    this.queriesToClient();
  }


  onTabChange(event: any) {
    // Update the REST API based on the selected tab
    console.log("first", event);
    switch (event.index) {
      case 0: // Fresh Jobs tab
        // Call your REST API for Fresh Jobs
        this.queriesToClient();
        break;
      case 1: // Revision Jobs tab

        // Call your REST API for Revision Jobs
        this.queryResponse();
        break;
      case 2: // Rework Jobs tab
        // Call your REST API for Rework Jobs
        this.cancelledJobs();
        break;
      case 3: // Quote Jobs tab
        // Call your REST API for Quote Jobs
        this.quotationJobs();
        break;
      default:
        break;
    }
  }

  queriesToClient(){
    this.QueryToClientComponent.tab('1');
  };

queryResponse(){
  this.QueryToClientComponent.tab('2');
};
cancelledJobs(){
  this.QueryToClientComponent.tab('3');
};
quotationJobs(){
  this.QueryToClientComponent.tab('4');
}

}
