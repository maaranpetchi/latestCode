import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryToClientComponent } from '../query-to-client/query-to-client.component';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';

@Component({
  selector: 'app-clientordinationindex',
  templateUrl: './clientordinationindex.component.html',
  styleUrls: ['./clientordinationindex.component.scss']
})
export class ClientordinationindexComponent implements OnInit {
  @ViewChild(QueryToClientComponent) QueryToClientComponent: QueryToClientComponent;
  constructor(private http: HttpClient, private loginservice: LoginService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.queriesToClient();

    this.getclientordercount();
    this.getcompleteordercount();
    this.getquerytoclientcount();
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

  queriesToClient() {
    if (this.QueryToClientComponent) {
      this.QueryToClientComponent.tab('1');
    }
  };

  queryResponse() {
    if (this.QueryToClientComponent) {
      this.QueryToClientComponent.tab('2');
    }
  };
  cancelledJobs() {
    if (this.QueryToClientComponent) {
      this.QueryToClientComponent.tab('3');
    }
  };
  quotationJobs() {
    if (this.QueryToClientComponent) {
      this.QueryToClientComponent.tab('4');
    }
  }

  CompletedJobsCount: number;
  getcompleteordercount() {
    this.http.get<any>(environment.apiURL + `Allocation/getCompletedJobs?EmpId=${this.loginservice.getUsername()}`).subscribe(response => {
      this.CompletedJobsCount = response.clientDetails.resultForCompletedList;
    });
  }

  NewJobCount: any;
  QuoteJobCount: any;
  getclientordercount() {
    this.http.get<any>(environment.apiURL + `ClientOrderService/ClientOrdersExts/1`).subscribe(responsedata1 => {
      console.log(responsedata1, "responsedata1");

      this.NewJobCount = responsedata1.data[0].workType;
    });
    this.http.get<any>(environment.apiURL + `ClientOrderService/ClientOrdersExts/2`).subscribe(responsedata2 => {
      console.log(responsedata2, "responsedata2");

      this.QuoteJobCount = responsedata2.data[0].workType;

      console.log(this.NewJobCount + this.QuoteJobCount, "completedcountvalues");
    });

  }


  QueryJobCount: any;
  querycount: any;
  cancelledcount: any;
  quotationcount: any;

  getquerytoclientcount() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Allocation/getcountforcc/${this.loginservice.getUsername()}/1`).subscribe(getquerycount => {
      this.spinnerService.requestEnded();
      this.QueryJobCount = getquerycount.queriesJobsCount;
      this.querycount = getquerycount.queryResponseJobsCount;
      this.cancelledcount = getquerycount.cancelledJobsCount
      this.quotationcount = getquerycount.quotationJobCount;
    },error => {
      this.spinnerService.resetSpinner();
    });
  }



}
