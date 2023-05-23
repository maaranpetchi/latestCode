import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-details-client-index',
  templateUrl: './job-details-client-index.component.html',
  styleUrls: ['./job-details-client-index.component.scss']
})
export class JobDetailsClientIndexComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}


}
