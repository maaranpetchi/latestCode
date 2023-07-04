import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { ProofReadingService } from 'src/app/Services/CoreStructure/ProofReading/proof-reading.service';
import { ProofreadingComponent } from '../proofreading/proofreading.component';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';


@Component({
  selector: 'app-proof-reading-table',
  templateUrl: './proof-reading-table.component.html',
  styleUrls: ['./proof-reading-table.component.scss']
})
export class ProofReadingTableComponent implements OnInit {

  @Output() showAlertEvent: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = [
    'selected',
    'jobId',
    'estjob',
    'action',
    'fileName',
    'fileInwardMode',
    'client',
    'customerSatisfaction',
    'jobstatus',
    'projectcode',
    'allocatedby',
    'processstatus',
    'scope',
    'esttime',
    'deliverydate',
    'start',
    'workfiles',
    'end',
    'bulkupload'
  ];
  displayedColumnsVisibility: any = {
    'selected': true,
    'jobId': true,
    'estjob': true,
    'action': true,
    'fileName': true,
    'fileInwardMode': true,
    'client': true,
    'customerSatisfaction': true,
    'jobstatus': true,
    'projectcode': true,
    'allocatedby': true,
    'processstatus': true,
    'scope': true,
    'esttime': true,
    'deliverydate': true,
    'start': false,
    'workfiles': false,
    'end': false,
    'bulkupload': false
  };

  visibility() {
    let result: string[] = [];
    if (this.displayedColumnsVisibility.selected) {
      result.push('selected');
    }
    if (this.displayedColumnsVisibility.jobId) {
      result.push('jobId');
    }
    if (this.displayedColumnsVisibility.estjob) {
      result.push('estjob');
    }
    if (this.displayedColumnsVisibility.action) {
      result.push('action');
    }
    if (this.displayedColumnsVisibility.fileName) {
      result.push('fileName');
    }
    if (this.displayedColumnsVisibility.fileInwardMode) {
      result.push('fileInwardMode');
    }
    if (this.displayedColumnsVisibility.client) {
      result.push('client');
    }
    if (this.displayedColumnsVisibility.customerSatisfaction) {
      result.push('customerSatisfaction');
    }
    if (this.displayedColumnsVisibility.jobstatus) {
      result.push('jobstatus');
    }
    if (this.displayedColumnsVisibility.projectcode) {
      result.push('projectcode');
    }
    if (this.displayedColumnsVisibility.allocatedby) {
      result.push('allocatedby');
    }
    if (this.displayedColumnsVisibility.processstatus) {
      result.push('processstatus');
    }
    if (this.displayedColumnsVisibility.scope) {
      result.push('scope');
    }
    if (this.displayedColumnsVisibility.esttime) {
      result.push('esttime');
    }
    if (this.displayedColumnsVisibility.deliverydate) {
      result.push('deliverydate');
    }
    if (this.displayedColumnsVisibility.start) {
      result.push('start');
    }
    if (this.displayedColumnsVisibility.workfiles) {
      result.push('workfiles');
    }
    if (this.displayedColumnsVisibility.end) {
      result.push('end');
    }
    if (this.displayedColumnsVisibility.bulkupload) {
      result.push('bulkupload');
    }

    return result;
  }


  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private loginservice: LoginService, private http: HttpClient, private proofReadingService: ProofReadingService, private proofreadingcomponent: ProofreadingComponent) { }

  ngOnInit(): void {
    // //ScopeDropdown
    this.freshJobs()
  }
  selectedValue: number = 0; // to save the radio button values 

  //to save the checkbox values
  selectedproduction: any[] = [];
  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedproduction)
    if (completed == true) {
      this.selectedproduction.push(item)
    }
    else {

      if (this.selectedproduction.find(x => x.id == item.id)) {
        this.selectedproduction = this.selectedproduction.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedproduction)
  }

  getTabValue() {
    console.log("Inside table", this.proofreadingcomponent.getCurrentTab());
    return this.proofreadingcomponent.getCurrentTab();
  }

  tab(action) {
    if (action == '1') {
      this.freshJobs();
    }
    else if (action == '2') {
      this.revisionJobs();
    }
    else if (action == '3') {
      this.reworkJobs();
    }
    else if (action == '4') {
      this.quoteJobs();
    }

    else if (action == '6') {
      this.bulkJobs();
    }
    else if (action == '7') {
      this.bulkUploadJobs();
    }
  }


  freshJobs() {
    this.displayedColumnsVisibility.start = false;
    this.displayedColumnsVisibility.workfiles = false;
    this.displayedColumnsVisibility.end = false;
    this.displayedColumnsVisibility.bulkupload = false;
    console.log(localStorage.getItem('selectedRadioValue'), "radioValue");

    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/${this.selectedValue}`).subscribe(freshJobs => {
      console.log(freshJobs.getWorkflowDetails[0], "proofreadingvalues"),
        console.log(freshJobs.getWorkflowDetails, "proofreadingvalues1"),

        this.dataSource = new MatTableDataSource(freshJobs.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  revisionJobs() {
    this.displayedColumnsVisibility.start = false;
    this.displayedColumnsVisibility.workfiles = false;
    this.displayedColumnsVisibility.end = false;
    this.displayedColumnsVisibility.bulkupload = false;
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/2/${this.selectedValue}`).subscribe(revisionJobs => {
      this.dataSource = new MatTableDataSource(revisionJobs.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  reworkJobs() {
    this.displayedColumnsVisibility.start = false;
    this.displayedColumnsVisibility.workfiles = false;
    this.displayedColumnsVisibility.end = false;
    this.displayedColumnsVisibility.bulkupload = false;
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/3/${this.selectedValue}`).subscribe(reworkJobs => {
      this.dataSource = new MatTableDataSource(reworkJobs.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  quoteJobs() {
    this.displayedColumnsVisibility.start = false;
    this.displayedColumnsVisibility.workfiles = false;
    this.displayedColumnsVisibility.end = false;
    this.displayedColumnsVisibility.bulkupload = false;
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/4/${this.selectedValue}`).subscribe(quoteJobs => {
      this.dataSource = new MatTableDataSource(quoteJobs.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  displayScopeDropdown: boolean = false; // hide a scope 

  bulkJobs() {
    this.displayScopeDropdown = true;
    this.displayedColumnsVisibility.start = true;
    this.displayedColumnsVisibility.workfiles = true;
    this.displayedColumnsVisibility.end = true;
    this.displayedColumnsVisibility.bulkupload = true;
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/6/${this.selectedValue}`).subscribe(bulkJobs => {
      this.dataSource = new MatTableDataSource(bulkJobs.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  bulkUploadJobs() {
    this.displayedColumnsVisibility.start = false;
    this.displayedColumnsVisibility.workfiles = false;
    this.displayedColumnsVisibility.end = false;
    this.displayedColumnsVisibility.bulkupload = false;
    this.http.get<any>(environment.apiURL + `Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/7/${this.selectedValue}`).subscribe(bulkUploadJobs => {
      this.dataSource = new MatTableDataSource(bulkUploadJobs.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  selectedScope: string = "";
  scopes: any[];
  scopeDropdown() {
    this.proofReadingService.getScopeDropdown().subscribe(scopedata => {
      this.scopes = scopedata.ScopeDetails
    })
  }

}

