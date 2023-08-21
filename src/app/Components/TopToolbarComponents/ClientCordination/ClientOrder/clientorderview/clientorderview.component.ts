import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clientorderview',
  templateUrl: './clientorderview.component.html',
  styleUrls: ['./clientorderview.component.scss']
})
export class ClientorderviewComponent {


  constructor(private router: Router, private location: Location,    @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<ClientorderviewComponent>) { }

  goBack() {
this.dialogRef.close();
  }
  
}
