import { ClientorderstableComponent } from '../clientorderstable/clientorderstable.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { data } from 'jquery';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-clientorders',
  templateUrl: './clientorders.component.html',
  styleUrls: ['./clientorders.component.scss']
})
export class ClientordersComponent implements OnInit {
  @ViewChild(ClientorderstableComponent) ClientorderstableComponent: ClientorderstableComponent;


  constructor(private http: HttpClient) {
  }

  DivisionApiData: any[];
  ngOnInit(): void {
    //division dropdown
    this.http.get<any>(environment.apiURL+'ClientOrderService/nGetDivisionForJO').subscribe(divisiondata => {
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
        this.convertedjobs();
        break;
      case 3: // Quote Jobs tab
        // Call your REST API for Quote Jobs
        this.deletedjobs();
        break;
      case 4: // Bulk Jobs tab
        // Call your REST API for Bulk Jobs
        this.quotenotapprovaljobs();
        break;
      case 5: // Bulk Upload Jobs tab
        // Call your REST API for Bulk Upload Jobs
        this.queryforsp();
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
  convertedjobs() {
    this.ClientorderstableComponent.tab('3');
  }
  deletedjobs() {
    this.ClientorderstableComponent.tab('4');
  }
  quotenotapprovaljobs(){
    this.ClientorderstableComponent.tab('5');
  }
  queryforsp(){
    this.ClientorderstableComponent.tab('6');
  }

}
