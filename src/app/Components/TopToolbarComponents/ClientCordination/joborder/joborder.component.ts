
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-joborder',
  templateUrl: './joborder.component.html',
  styleUrls: ['./joborder.component.scss']
})
export class JoborderComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;


  selectedGender: string = '';
  selectedClientStatus:string = '';
  selectedApparelLogoLocation:string = '';
  selectedVirtualProof:string='';
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
 constructor(private http:HttpClient){} 
//JOB STATUS
 selectedJobStatus: string;//will hold the currently selected job status from the dropdown.
  jobStatuses: string[];//will store the list of job statuses fetched from the API
 //DEPARTMENT
  selectedDepartment: string;
  Department: string[];
  //ClientName
  selectedClientName:string;
  ClientName: string[];
  //CustomerContactName
  selectedCustomerContactName:string;
  CustomerContactName: string[];



 //Division
  selectedDivision: string;
  Division: string[];


  ngOnInit(): void {
   //JOb status dropdown
   this.http.get<any>('JOB-STATUS-DROPDOWN-RESTAPI-URL').subscribe(statuses => {
    this.jobStatuses = statuses;
  });
   //DEPARTMENT status dropdown
   this.http.get<any>('DEPARTMENT-DROPDOWN-RESTAPI-URL').subscribe(Departmentstatus => {
    this.Department = Departmentstatus;
  });
   // ClientNamedropdown
   this.http.get<any>('ClientName-DROPDOWN-RESTAPI-URL').subscribe(clientname => {
    this.ClientName = clientname;
  });
   // CustomerContactName
   this.http.get<any>('ClientName-DROPDOWN-RESTAPI-URL').subscribe(CustomerContactName => {
    this.CustomerContactName = CustomerContactName;
  });
  //Division
  this.http.get<any>('Division-DROPDOWN-RESTAPI-URL').subscribe(Divisionstatus => {
    this.Division = Divisionstatus;
  })

  }
  selectedFile: File | undefined;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];//store the selected file in selectdfile
  }
  
}
