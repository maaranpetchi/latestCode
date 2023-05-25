import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-productiontable',
  templateUrl: './productiontable.component.html',
  styleUrls: ['./productiontable.component.scss']
})
export class ProductiontableComponent {
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
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,private loginservice: LoginService) { }

  ngOnInit(): void {
    // //ScopeDropdown
    this.fetchScope();
  }
  ScopeApiData: any[];
  fetchScope() {
    this.http.get<any>('ScopeUrl').subscribe(data => {
      this.ScopeApiData = data;
    });
  }

  assigndatasource(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //maintable
  // fetchData(): void {
  //   this.http.get<any>('YOUR_API_URL').subscribe(data => {
  //     this.dataSource = new MatTableDataSource(data);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }
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

  showAlert() {
    alert('HI TESTING');
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
    else if (action == '5') {
      this.bulkJobs();
    }
    else if (action == '6') {
      this.bulkUploadJobs();
    }

  }

  freshJobs() {
    this.http.get<any>(`http://localhost:56081/api/Allocation/getPendingAllocationJobsAndEmployees/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`).subscribe(freshdata => {
      this.dataSource = freshdata.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  revisionJobs() {
    this.http.get<any>(`http://localhost:56081/api/Allocation/getPendingAllocationJobsAndEmployees/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/2/0`).subscribe(freshdata => {
      this.dataSource = freshdata.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  reworkJobs() {
    this.http.get<any>(`http://localhost:56081/api/Allocation/getPendingAllocationJobsAndEmployees/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/3/0`).subscribe(freshdata => {
      this.dataSource = freshdata.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  quoteJobs() {
    this.http.get<any>(`http://localhost:56081/api/Allocation/getPendingAllocationJobsAndEmployees/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/4/0`).subscribe(freshdata => {
      this.dataSource = freshdata.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  bulkJobs() {
    this.http.get<any>(`http://localhost:56081/api/Allocation/getPendingAllocationJobsAndEmployees/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/5/0`).subscribe(freshdata => {
      this.dataSource = freshdata.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  bulkUploadJobs() {
    this.http.get<any>(`http://localhost:56081/api/Allocation/getPendingAllocationJobsAndEmployees/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/6/0`).subscribe(freshdata => {
      this.dataSource = freshdata.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  

}