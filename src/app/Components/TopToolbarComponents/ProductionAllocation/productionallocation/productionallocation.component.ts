import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobAssignedDetailsPopupComponent } from '../job-assigned-details-popup/job-assigned-details-popup.component';

@Component({
  selector: 'app-productionallocation',
  templateUrl: './productionallocation.component.html',
  styleUrls: ['./productionallocation.component.scss']
})
export class ProductionallocationComponent {


  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(JobAssignedDetailsPopupComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

