import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qualityallocation',
  templateUrl: './qualityallocation.component.html',
  styleUrls: ['./qualityallocation.component.scss']
})
export class QualityallocationComponent  implements OnInit {
  ngOnInit(): void {
    
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
