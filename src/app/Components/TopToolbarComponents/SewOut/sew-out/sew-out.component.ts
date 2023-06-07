import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SewOutService } from 'src/app/Services/CoreStructure/SewOut/sew-out.service';
import { SewOutTableComponent } from '../sew-out-table/sew-out-table.component';

@Component({
  selector: 'app-sew-out',
  templateUrl: './sew-out.component.html',
  styleUrls: ['./sew-out.component.scss']
})
export class SewOutComponent implements OnInit {
  scopes: any[] = [];
  selectedScope: number;
@ViewChild(SewOutTableComponent) SewOutTableComponent:SewOutTableComponent;
  constructor(private http: HttpClient,private sewoutService:SewOutService) { }
  ngOnInit(): void {
this.freshJobs();
  }

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

 currentTab = 1;

 getCurrentTab(){
  console.log("inside sewout component",this.currentTab);
  
  return this.currentTab;

 } 
  onTabChange(event: any) {
    // Update the REST API based on the selected tab
    this.currentTab = event.index+1;
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

  freshJobs(){
    this.SewOutTableComponent.tab('1');
  }
revisionJobs(){
this.SewOutTableComponent.tab('2');
}
reworkJobs(){
this.SewOutTableComponent.tab('3');
}
quoteJobs(){
this.SewOutTableComponent.tab('4');
}
sewOut(){
  this.SewOutTableComponent.tab('5');
}
bulkJobs(){
  this.SewOutTableComponent.tab('6');
}
bulkUploadJobs(){
  this.SewOutTableComponent.tab('7');
}

}
