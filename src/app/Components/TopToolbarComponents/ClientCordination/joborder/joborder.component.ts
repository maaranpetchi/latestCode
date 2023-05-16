
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-joborder',
  templateUrl: './joborder.component.html',
  styleUrls: ['./joborder.component.scss']
})
export class JoborderComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;

  joborder:FormGroup;

  selectedGender: string = '';
  selectedClientStatus: string = '';
  selectedApparelLogoLocation: string = '';
  selectedVirtualProof: string = '';
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  constructor(private http: HttpClient,private _fb: FormBuilder,) { 
    this.joborder = this._fb.group({
      jobno:[''],
      jobdate:[{value:new Date().toLocaleDateString('en-GB'),disabled: true}],
      jobdescription:[''],
      instruction:[''],
      jobstatus:[''],
      department:[''],
      clientname:[''],
      customercontactname:[''],
      clientjobid:[''],
      filename:[''],
      filerecddate:[''],
      referencedate:[''],
      referencenumber:[''],
      fileinwardtype:[''],
      fileattachment:[''],
      employee:[''],
      division:[''],
      jobreferenceid:[''],
      username:[''],
      customer:[''],
      salesperson:[''],
      style:[''],
      temp:[''],
      teamcode:[''],
      projectcode:[''],
      schoolname:[''],
      logowidth:[''],
      logolength:[''],
      gender:[''],
      clientstatus: [''],
      apparellogo: [''],
      garmentcolor: [''],
      imprintcolor1:[''],
      virtualproof:[''],
      imprintcolor3:[''],
      imprintcolor2:[''],
  });
}
  
  

  
  //JOB STATUS
  selectedJobStatus: string;//will hold the currently selected job status from the dropdown.
  jobStatuses: any[];//will store the list of job statuses fetched from the API
  //DEPARTMENT
  selectedDepartment: string;
  Department: any[];
  //ClientName
  selectedClientName: any;
  ClientName: any[];
  //CustomerContactName
  selectedCustomerContactName: string;
  CustomerContactName: any[];
  //Division
  selectedDivision: string;
  Division: any[];


  ngOnInit(): void {
    //JOb status dropdown
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/getJobStatusForJO').subscribe(statuses => {
      this.jobStatuses = statuses;
    });
    //DEPARTMENT status dropdown
    this.http.get<any>('https://localhost:7208/api/ClientOrderService/getDepartmentsForJO').subscribe(Departmentstatus => {
      this.Department = Departmentstatus;
  });
   // ClientNamedropdown
   this.http.get<any>('https://localhost:7208/api/ClientOrderService/getCustomersForJO').subscribe(clientname => {
    this.ClientName = clientname;
  });
// CustomerContactName

//Division
this.http.get<any>('https://localhost:7208/api/ClientOrderService/nGetDivisionForJO').subscribe(Divisionstatus => {
  this.Division = Divisionstatus;
})

  }
selectedFile: File | undefined;
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];//store the selected file in selectdfile
}
  


//Selectionchange method to get customer contact
getcustomername(){
  this.http.get<any>(`https://localhost:7208/api/ClientOrderService/CCByCusId?custId=${this.selectedClientName.id}`).subscribe(CustomerContactName => {
  this.CustomerContactName = CustomerContactName;
  console.log(  this.CustomerContactName = CustomerContactName,"GetCustomer")
});
}

//get the current date
getCurrentDate(): string {
  const currentDate = new Date();
  return currentDate.toISOString().split('T')[0];
}

onFormSubmit(){
  console.log(this.joborder.value,"Formvalue");
  console.log( this.selectedClientName.name, "clientname");


  let jobordervalues={
    "id": 0,
    "dateofReceived": "2023-05-16T05:39:59.055Z",
    "clientName": this.selectedClientName.name,
    "clientJobId":this.joborder.value.clientjobid ,
    "fileName": this.joborder.value.filename ,
    "jobStatusDescription":this.joborder.value.jobstatusdescription,
    "username": this.joborder.value.username,
    "salesPersonName": this.joborder.value.salespersonname,
    "clientSalesPerson": this.joborder.value.clientSalesperson,
    "customerName": this.joborder.value.customername,
    "temp": this.joborder.value.temp,
    "style": this.joborder.value.style,
    "projectCode": this.joborder.value.projectcode,
    "teamCode": this.joborder.value.teamcode,
    "schoolName": this.joborder.value.schoolname,
    "ground": "",
    "gender": this.joborder.value.gender,
    "fileInwardMode": this.joborder.value.fileinwardmode,
    "status": true,
    "fileReceivedDate": "2023-05-16T05:39:59.055Z",
    "jobDescription": this.joborder.value.jobdescription,
    "jobStatusId": 0,
    "departmentId": 0,
    "divisionId": 0,
    "employeeId": 0,
    "clientId": 0,
    "remarks": "string",
    "poNo": "string",
    "fileInwardTypeId": 0,
    "color": "string",
    "logoDimensionWidth":  this.joborder.value.logowidth,
    "logoDimensionsLength": this.joborder.value.logolength,
    "apparelLogoLocation": this.joborder.value.apparellogo,
    "imprintColors1": this.joborder.value.imprintcolor1,
    "imprintColors2": this.joborder.value.imprintcolor2,
    "imprintColors3": this.joborder.value.imprintcolor3,
    "virtualProof": this.joborder.value.virtualProof,
    "dateofUpload": "2023-05-16T05:39:59.055Z",
    "dateofClose": "2023-05-16T05:39:59.055Z",
    "customerJobType": "string",
    "jobDate": "2023-05-16T05:39:59.055Z",
    "clientOrderId": 0,
    "viewDatas": null,
    "createdBy": 0,
    "poDate": "2023-05-16T05:39:59.055Z",
    "ccId": 0,
    "ccEmailId": "string",
    "dateofDelivery": "2023-05-16T05:39:59.055Z",
    "getAllValues": []
  }
}
}
