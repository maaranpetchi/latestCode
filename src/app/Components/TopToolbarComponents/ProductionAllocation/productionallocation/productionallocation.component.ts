import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobAssignedDetailsPopupComponent } from '../job-assigned-details-popup/job-assigned-details-popup.component';
import { ProductionallocationtableComponent } from '../productionallocationtable/productionallocationtable.component';

@Component({
  selector: 'app-productionallocation',
  templateUrl: './productionallocation.component.html',
  styleUrls: ['./productionallocation.component.scss']
})
export class ProductionallocationComponent {
  @ViewChild(ProductionallocationtableComponent) ProductionallocationtableComponent: ProductionallocationtableComponent;


  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(JobAssignedDetailsPopupComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  onTabChange(event: any) {
    // Update the REST API based on the selected tab
    console.log("first", event);
    switch (event.index) {
      case 0: // Fresh Jobs tab
        // Call your REST API for Fresh Jobs
        this.freshJobs();
        break;
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
        this.allocatedJobs();
        break;
      case 4:
        this.queries();
        break;
      case 5:
        this.queryResponse();
        break;
        case 6:
          this.errorJobs();
          break;
      default:
        break;
    }
  }

  freshJobs() {
    this.ProductionallocationtableComponent.tab('1');
  };

  revisionJobs() {
    this.ProductionallocationtableComponent.tab('2');
  };
  reworkJobs() {
    this.ProductionallocationtableComponent.tab('3');
  };
  allocatedJobs() {
    this.ProductionallocationtableComponent.tab('4');
  }
  queries() {
    this.ProductionallocationtableComponent.tab('5');
  }
  queryResponse() {
    this.ProductionallocationtableComponent.tab('6');
  }
errorJobs(){
  this.ProductionallocationtableComponent.tab('7');
}
quotationJobs(){
  this.ProductionallocationtableComponent.tab('8');
}
}

