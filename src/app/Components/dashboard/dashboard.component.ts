import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public firstValue: string='';
  public secondValue: string='';
  public thirdValue: string='';
  public isChecked: boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

}
