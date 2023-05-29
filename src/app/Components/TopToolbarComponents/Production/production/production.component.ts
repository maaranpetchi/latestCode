import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductiontableComponent } from '../productiontable/productiontable.component';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit{
  @ViewChild(ProductiontableComponent) ProductiontableComponent: ProductiontableComponent;

 constructor(private http:HttpClient){}
  ngOnInit(): void {
  

    
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
  this.ProductiontableComponent.tab('1');
}
revisionJobs(){
  this.ProductiontableComponent.tab('2');
}
reworkJobs(){
  this.ProductiontableComponent.tab('3');
}
quoteJobs(){
  this.ProductiontableComponent.tab('4');
}
bulkJobs(){
  this.ProductiontableComponent.tab('5');
}
bulkUploadJobs(){
  this.ProductiontableComponent.tab('6');
}


 };

