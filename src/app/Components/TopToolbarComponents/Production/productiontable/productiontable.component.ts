import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ProdjobpopupComponent } from '../prodjobpopup/prodjobpopup.component';
import { ProductionworkflowComponent } from '../productionworkflow/productionworkflow.component';

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


  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,private loginservice: LoginService,private dialog:MatDialog) { }

  ngOnInit(): void {
    // //ScopeDropdown
    this.fetchScope();

    //FreshJobs
    this.freshJobs();
  }
  ScopeApiData: any[];
  fetchScope() {
    this.http.get<any>(environment.apiURL+'Allocation/getScopeValues/152').subscribe(data => {
      this.ScopeApiData = data.ScopeDetails ;
    });
  }


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
      this.scopeDisplay = true;

    }
    else if (action == '6') {
      this.bulkUploadJobs();
    }

  }

  freshJobs() {
    this.http.get<any>(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/1/0`).subscribe(freshdata => {
      console.log(freshdata,"freshdata");
      this.dataSource =  new MatTableDataSource (freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  revisionJobs() {
    this.http.get<any>(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/2/0`).subscribe(freshdata => {
      this.dataSource =new MatTableDataSource  (freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  reworkJobs() {
    this.http.get<any>(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/3/0`).subscribe(freshdata => {
      this.dataSource =new MatTableDataSource (freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  quoteJobs() {
    this.http.get<any>(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/4/0`).subscribe(freshdata => {
      this.dataSource=new MatTableDataSource( freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  scopeDisplay:boolean = false; // display a scope dropdown div
  bulkJobs() {
    this.http.get<any>(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/6/0`).subscribe(freshdata => {
      this.dataSource =new MatTableDataSource(freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.scopeDisplay = true;
    });
  }
  bulkUploadJobs() {
    this.http.get<any>(environment.apiURL+`Allocation/getWorkflowJobList/${this.loginservice.getUsername()}/${this.loginservice.getProcessId()}/7/0`).subscribe(freshdata => {
      this.dataSource = new MatTableDataSource (freshdata.getWorkflowDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

// passingdata(){
//   this.http.get('https://api.example.com/job-details').subscribe(
//     (response: any) => {
//       // Pass the API response data to the dialog component
//       this.openJobDetailsDialog(response);
//     },
//     (error) => {
//       console.log('Error occurred while fetching job details:', error);
//     }
//   );
// }

openJobDetailsDialog(data){
    this.dialog.open(ProdjobpopupComponent,{
      width:'80vw',
      data
    })
    }

    workflow(data){
      this.dialog.open(ProductionworkflowComponent,{
        width:'80vw',
        height:'80vh',
        data
      })
    }

}