
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientcordinationService } from 'src/app/Services/CoreStructure/ClientCordination/clientcordination.service';
import { LoginService } from 'src/app/Services/Login/login.service';
@Component({
  selector: 'app-joborder',
  templateUrl: './joborder.component.html',
  styleUrls: ['./joborder.component.scss']
})
export class JoborderComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;

  joborder: FormGroup;

  selectedGender: string = '';
  selectedClientStatus: string = '';
  selectedApparelLogoLocation: string = '';
  selectedVirtualProof: string = '';
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  constructor(private http: HttpClient, private _fb: FormBuilder,private loginservice:LoginService,private clientcordinationservice:ClientcordinationService) {
    this.joborder = this._fb.group({
      jobno: [''],
      jobdate: [{ value: new Date().toLocaleDateString('en-GB'), disabled: true }],
      jobdescription: [''],
      instruction: [''],
      jobstatus: [''],
      department: [''],
      clientname: [''],
      customercontactname: [''],
      clientjobid: [''],
      filename: [''],
      filerecddate: [''],
      referencedate: [''],
      referencenumber: [''],
      fileinwardtype: [''],
      fileattachment: [''],
      employee: [''],
      division: [''],
      jobreferenceid: [''],
      username: [''],
      customer: [''],
      salesperson: [''],
      style: [''],
      temp: [''],
      teamcode: [''],
      projectcode: [''],
      schoolname: [''],
      logowidth: [''],
      logolength: [''],
      gender: [''],
      clientstatus: [''],
      apparellogo: [''],
      garmentcolor: [''],
      imprintcolor1: [''],
      virtualproof: [''],
      imprintcolor3: [''],
      imprintcolor2: [''],
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
 
   //FileInwardType
   selectedfileinwardtype: string;
   fileinwardtype:any[];
  
  //Division
  selectedDivision: string;
  Division: any[];


  ngOnInit(): void {
    console.log(this.selectedCustomerContactName,"selectedCustomerContactName");
    
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

    //fileinwardtype
    this.clientcordinationservice.getFileInwardType().subscribe(fileinwarddata => {
this.fileinwardtype = fileinwarddata
    });

  }
  selectedFile: File | undefined;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];//store the selected file in selectdfile
  }



  //Selectionchange method to get customer contact
  getcustomername() {
    this.http.get<any>(`https://localhost:7208/api/ClientOrderService/CCByCusId?custId=${this.selectedClientName.id}`).subscribe(CustomerContactName => {
      this.CustomerContactName = CustomerContactName;
      console.log(this.CustomerContactName = CustomerContactName, "GetCustomer")
    });
  }

  //selectionchange to customer contact name
  onCustomerContactChange() {
    const selectedContact = this.CustomerContactName.find(contact => contact.contactId === this.selectedCustomerContactName);
    if (selectedContact) {
      const contactId = selectedContact.contactId;
      const contactName = selectedContact.contactName;
      console.log('Selected Contact ID:', contactId);
      console.log('Selected Contact Name:', contactName);
      // Perform any additional actions with the selected contact ID and name
    }
  }

  //get the current date
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  onFormSubmit() {
    console.log(this.joborder.value, "Formvalue");
    console.log(this.selectedClientName.name, "clientname");

    let exisitingJordervalue = {
      "id": 0,
      "dateofReceived": new Date().toISOString,
      "clientName": this.selectedClientName.name,
      "clientJobId": this.joborder.value.clientjobid,
      "fileName": this.joborder.value.filename,
      "jobStatusDescription": this.joborder.value.jobdescription,
      "username": this.joborder.value.username,
      "salesPersonName": this.joborder.value.salesperson,
      "clientSalesPerson": this.joborder.value.customercontactname,
      "customerName": this.joborder.value.customername,
      "temp": this.joborder.value.temp,
      "style": this.joborder.value.style,
      "projectCode": this.joborder.value.projectcode,
      "teamCode": this.joborder.value.teamcode,
      "schoolName": this.joborder.value.schoolname,
      "ground": "",
      "gender": this.joborder.value.gender,
      "fileInwardMode": "",
      "status": true,
      "fileReceivedDate": new Date().toISOString(),
      "jobDescription": this.joborder.value.jobdescription,
      "jobStatusId": this.joborder.value.jobstatus,
      "departmentId": this.joborder.value.department,
      "divisionId": this.joborder.value.division,
      "employeeId": this.loginservice.getUsername(),
      "clientId": this.joborder.value.clientname.id,
      "remarks": this.joborder.value.instruction,
      "poNo": this.joborder.value.referencenumber,
      "fileInwardTypeId": this.joborder.value.fileinwardtype,
      "color":  this.joborder.value.garmentcolor,
      "logoDimensionWidth": this.joborder.value.logowidth,
      "logoDimensionsLength": this.joborder.value.logolength,
      "apparelLogoLocation": this.joborder.value.apparellogo,
      "imprintColors1": this.joborder.value.imprintcolor1,
      "imprintColors2": this.joborder.value.imprintcolor2,
      "imprintColors3": this.joborder.value.imprintcolor3,
      "virtualProof": this.joborder.value.virtualproof,
      "dateofUpload": new Date().toISOString,
      "dateofClose": new Date().toISOString,
      "customerJobType": "string",
      "jobDate": new Date().toISOString,
      "clientOrderId": 0,
      "viewDatas": null,
      "createdBy": this.loginservice.getUsername(),
      "poDate": new Date().toISOString,
      "ccId": this.joborder.value.clientSalesperson,
      "ccEmailId": "string",
      "dateofDelivery": new Date().toISOString,
      "getAllValues": []
    }

    let jobordervalues = {
      "id": 0,
      "dateofReceived": new Date().toISOString,
      "clientName": this.selectedClientName.name,
      "clientJobId": this.joborder.value.clientjobid,
      "fileName": this.joborder.value.filename,
      "jobStatusDescription": this.joborder.value.jobdescription,
      "username": this.joborder.value.username,
      "salesPersonName": this.joborder.value.salesperson,
      "clientSalesPerson": this.joborder.value.customercontactname,
      "customerName": this.joborder.value.customer,
      "temp": this.joborder.value.temp,
      "style": this.joborder.value.style,
      "projectCode": this.joborder.value.projectcode,
      "teamCode": this.joborder.value.teamcode,
      "schoolName": this.joborder.value.schoolname,
      "ground": "",
      "gender": this.joborder.value.gender,
      "fileInwardMode": "",
      "status": true,
      "fileReceivedDate": new Date().toISOString(),
      "jobDescription": this.joborder.value.jobdescription,
      "jobStatusId": this.joborder.value.jobstatus,
      "departmentId": this.joborder.value.department,
      "divisionId": this.joborder.value.division,
      "employeeId": this.loginservice.getUsername(),
      "clientId": this.joborder.value.clientname.id,
      "remarks": this.joborder.value.instruction,
      "poNo": this.joborder.value.referencenumber,
      "fileInwardTypeId": this.joborder.value.fileinwardtype,
      "color": this.joborder.value.garmentcolor,
      "logoDimensionWidth": this.joborder.value.logowidth,
      "logoDimensionsLength": this.joborder.value.logolength,
      "apparelLogoLocation": this.joborder.value.apparellogo,
      "imprintColors1": this.joborder.value.imprintcolor1,
      "imprintColors2": this.joborder.value.imprintcolor2,
      "imprintColors3": this.joborder.value.imprintcolor3,
      "virtualProof": this.joborder.value.virtualproof,
      "dateofUpload": new Date().toISOString,
      "dateofClose": new Date().toISOString,
      "customerJobType": "string",
      "jobDate": new Date().toISOString,
      "clientOrderId": 0,
      "viewDatas":[ exisitingJordervalue],
      "createdBy": this.loginservice.getUsername(),
      "poDate": new Date().toISOString,
      "ccId": this.joborder.value.clientSalesperson,
      "ccEmailId": "string",
      "dateofDelivery": new Date().toISOString,
      "getAllValues": []
    }
    this.http.post<any>(`https://localhost:7208/api/JobOrder/InternalOrder`, jobordervalues).subscribe(data => {
      console.log(data, "Joborder");
    }
    )
  }


}
