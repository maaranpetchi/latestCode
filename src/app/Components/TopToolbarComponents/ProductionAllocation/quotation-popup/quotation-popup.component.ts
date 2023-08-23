import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-quotation-popup',
  templateUrl: './quotation-popup.component.html',
  styleUrls: ['./quotation-popup.component.scss']
})
export class QuotationPopupComponent implements OnInit{
  Scopes: any[] = [];
  selectedScope: any = 0;
  comments:any;
  selectedfromDate:any;
  
  constructor(
    
    public dialogRef: MatDialogRef<QuotationPopupComponent>,    
    private builder: FormBuilder,
    private http:HttpClient,
    private loginservice:LoginService
  ){}

  ngOnInit(): void {
    this.fetchScopes();
  }
  userRegistrationForm = this.builder.group({
    employeeUsers:['', Validators.required],
    accessName: ['', Validators.required],
    employeeName: [null, Validators.required],
  });

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
    // You can perform further operations with the selected file here
  }
  onCancel(){
    this.dialogRef.close();
  }

  onFormSubmit(){

  }
  fetchScopes() {
    this.http
      .get<any>(
        environment.apiURL +
        `Allocation/getScopeValues/${this.loginservice.getUsername()}`
      )
      .subscribe((scopedata) => {
        this.Scopes = scopedata.scopeDetails; // Sort the scopes based on the 'name' property
      });
  }
}
