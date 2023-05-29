import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';
import { BuddyProofTableComponent } from '../buddy-proof-table/buddy-proof-table.component';

@Component({
  selector: 'app-buddy-proof',
  templateUrl: './buddy-proof.component.html',
  styleUrls: ['./buddy-proof.component.scss']
})
export class BuddyProofComponent {
  @ViewChild(BuddyProofTableComponent) BuddyProofTableComponent: BuddyProofTableComponent;
  scopes: any[] = [];
  selectedScope: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //scopedropdown
    this.http.get<any>('https://my-api.com/items').subscribe(scopesdata => {
      this.scopes = scopesdata;
    });
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


  onTabChange(event: any) {
    // Update the REST API based on the selected tab
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
        this.quoteJobs();
        break;
      case 4: // Bulk Jobs tab
        // Call your REST API for sewOut 
        this.sewOut();
        break;
      case 5: // Bulk Upload Jobs tab
        // Call your REST API for Bulk Jobs
        this.bulkJobs();

        break;
      case 6: // Bulk Upload Jobs tab'
        // Call your REST API for Bulk Upload Jobs
        this.bulkUploadJobs();
        break;

      default:
        break;
    }
  }

  freshJobs() {
    this.BuddyProofTableComponent.tab('1');
  }
  revisionJobs() {
    this.BuddyProofTableComponent.tab('2');
  }
  reworkJobs() {
    this.BuddyProofTableComponent.tab('3');
  }
  quoteJobs() {
    this.BuddyProofTableComponent.tab('4');
  }
  sewOut() {
    this.BuddyProofTableComponent.tab('5');
  }
  bulkJobs() {
    this.BuddyProofTableComponent.tab('6');
  }
  bulkUploadJobs() {
    this.BuddyProofTableComponent.tab('7');
  }

}
