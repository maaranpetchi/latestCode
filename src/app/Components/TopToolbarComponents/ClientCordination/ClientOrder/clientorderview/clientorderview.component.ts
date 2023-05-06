import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clientorderview',
  templateUrl: './clientorderview.component.html',
  styleUrls: ['./clientorderview.component.scss']
})
export class ClientorderviewComponent {


  constructor(private router: Router, private location: Location) { }

  goBack() {
    this.location.back();
  }
  
}
