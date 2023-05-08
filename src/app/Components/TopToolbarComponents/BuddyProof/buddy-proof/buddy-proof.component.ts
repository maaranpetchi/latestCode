import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buddy-proof',
  templateUrl: './buddy-proof.component.html',
  styleUrls: ['./buddy-proof.component.scss']
})
export class BuddyProofComponent {
  scopes: any[] = [];
  selectedScope: number;

  constructor(private http: HttpClient) {}

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
  selectedproduction:any[]=[];
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
        
        break;
      case 1: // Revision Jobs tab
        // Call your REST API for Revision Jobs
        break;
      case 2: // Rework Jobs tab
        // Call your REST API for Rework Jobs
        break;
      case 3: // Quote Jobs tab
        // Call your REST API for Quote Jobs
        break;
      case 4: // Bulk Jobs tab
        // Call your REST API for Bulk Jobs
        break;
      case 5: // Bulk Upload Jobs tab
        // Call your REST API for Bulk Upload Jobs
        break;
      default:
        break;
    }
  }
}
