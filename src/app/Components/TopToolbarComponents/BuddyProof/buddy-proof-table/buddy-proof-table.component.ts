import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BuddyProofService } from 'src/app/Services/CoreStructure/BuddyProof/buddy-proof.service';

@Component({
  selector: 'app-buddy-proof-table',
  templateUrl: './buddy-proof-table.component.html',
  styleUrls: ['./buddy-proof-table.component.scss']
})
export class BuddyProofTableComponent implements OnInit {

  scopes: any[] = [];
  selectedScope: any = 0;

  displayedColumns: string[] = [
    'selected',
    'jobId',
    'estjob',
    'actions',
    'client',
    'customerSatisfaction',
    'fileName',
    'fileInwardMode',
    'scope',
    'jobstatus',
    'projectcode',
    'allocatedby',
    'artistname',
    'processstatus',
    'esttime',
    'jobcategory',
    'deliverydate'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private buddyService: BuddyProofService) { }

  ngOnInit(): void {
    //maintable

  }



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  //to save the checkbox value
  selectedQuery: any[] = [];

  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedQuery)
    if (completed == true) {
      this.selectedQuery.push(item)
    }
    else {

      if (this.selectedQuery.find(x => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedQuery)
  }

  benchChecked: boolean = false;
  onBenchCheckboxChange(event: any) {
    this.benchChecked = event.checked;
  }
  tab(action){
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
      this.sewOut();
    }
    else if (action == '6') {
      this.bulkJobs();
    }
    else if (action == '6') {
      this.bulkUploadJobs();
    }
  }
  
  
  freshJobs(){
  this.buddyService.getTabValue1().subscribe( freshJobs =>{
  this.dataSource = new MatTableDataSource (freshJobs.GetWorkflowDetails );
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  });
  }
  revisionJobs(){
  this.buddyService.getTabValue2().subscribe( revisionJobs =>{
  this.dataSource = new MatTableDataSource (revisionJobs.GetWorkflowDetails );
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  });
  }
  reworkJobs(){
  this.buddyService.getTabValue3().subscribe( reworkJobs =>{
  this.dataSource = new MatTableDataSource (reworkJobs.GetWorkflowDetails );
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  });
  }
  quoteJobs(){
  this.buddyService.getTabValue4().subscribe( quoteJobs =>{
  this.dataSource = new MatTableDataSource (quoteJobs.GetWorkflowDetails );
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  });
  }
  sewOut(){
  this.buddyService.getTabValue5().subscribe( sewOut =>{
  this.dataSource = new MatTableDataSource (sewOut.GetWorkflowDetails );
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  });
  }
  
  displayScopeDropdown:boolean = false; // hide a scope dropdown
  bulkJobs(){
  this.buddyService.getTabValue6().subscribe( bulkJobs =>{
  this.dataSource = new MatTableDataSource (bulkJobs.GetWorkflowDetails );
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.displayScopeDropdown = true;
  });
  }
  bulkUploadJobs(){
  this.buddyService.getTabValue7().subscribe( bulkUploadJobs =>{
  this.dataSource = new MatTableDataSource (bulkUploadJobs.GetWorkflowDetails );
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  });
  }
  
  
  scopeDropdown(){
    this.buddyService.getScopeDropdown().subscribe(scopedata=>{
      this.scopes = scopedata.ScopeDetails 
    })
  }

}
