import { Component, OnInit, ViewChild } from '@angular/core';
// import { ProofReadingAllocationTableComponent } from '../../ProofReading/proof-reading-allocation-table/proof-reading-allocation-table.component';
import { HttpClient } from '@angular/common/http';
import { ProofReadingTableComponent } from '../proof-reading-table/proof-reading-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ProofjobdetailpopupComponent } from '../proofjobdetailpopup/proofjobdetailpopup.component';
import { ProofworkflowComponent } from '../proofworkflow/proofworkflow.component';

@Component({
  selector: 'app-proofreading',
  templateUrl: './proofreading.component.html',
  styleUrls: ['./proofreading.component.scss']
})
export class ProofreadingComponent implements OnInit{
  @ViewChild(ProofReadingTableComponent) ProofReadingTableComponent: ProofReadingTableComponent;

 constructor(private http:HttpClient,public dialog:MatDialog){}
  ngOnInit(): void {
  

    
  }
  onTabChange(event: any) {
    // Update the REST API based on the selected tab
    switch (event.index) {
      case 0: // Fresh Jobs tab
        // Call your REST API for Fresh Jobs
        this.freshJobs();        break;
      case 1: // Revision Jobs tab
        // Call your REST API for Revision Jobs
        this.revisionJobs();

        break;
      case 2: // Rework Jobs tab
        // Call your REST API for Rework Jobs
        this.reworkJobs();

        break;
      case 3: // Quote Jobs tab
        // Call your REST API for Quote Jobs
        this.quoteJobs();

        break;
      case 4: // Bulk Jobs tab
        // Call your REST API for Bulk Jobs
        this.bulkJobs();
        break;
      case 5: // Bulk Upload Jobs tab
        // Call your REST API for Bulk Upload Jobs
        this.bulkUploadJobs();
        break;
      default:
        break;
    }
  }


  freshJobs(){
    this.ProofReadingTableComponent.tab('1');
  }
revisionJobs(){
this.ProofReadingTableComponent.tab('2');
}
reworkJobs(){
this.ProofReadingTableComponent.tab('3');
}
quoteJobs(){
this.ProofReadingTableComponent.tab('4');
}
sewOut(){
  this.ProofReadingTableComponent.tab('5');
}
bulkJobs(){
  this.ProofReadingTableComponent.tab('6');
}
bulkUploadJobs(){
  this.ProofReadingTableComponent.tab('7');
}




  openproofdetailpop(){
    const dialogRef = this.dialog.open(ProofjobdetailpopupComponent, {
      width: '2000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openproofworkflowpop(){
    const dialogRef = this.dialog.open(ProofworkflowComponent, {
      width: '2000px',
    
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
};

