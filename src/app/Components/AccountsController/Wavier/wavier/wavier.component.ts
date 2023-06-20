import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PopupwavierconfirmationComponent } from '../popupwavierconfirmation/popupwavierconfirmation.component';
declare var $: any;
@Component({
  selector: 'app-wavier',
  templateUrl: './wavier.component.html',
  styleUrls: ['./wavier.component.scss']
})
export class WavierComponent {
  selectedFilter: number;
  selectedClient: number;
  selectedFileName: string;
  fromDate: string;
  toDate: string;



  message:string='';

  clients: any[]; // Change to match the shape of your client data

  constructor(private http: HttpClient, private dialog: MatDialog) { }
  displayedColumns: string[] = [
    'selected',
    'jobnumber',
    'jobdate',
    'department',
    'client',
    'jobstatus',
    'filename',
    'jobdate1',

  ];

  selectedInvoices: any[] = [];


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedInvoices)
    if (completed == true) {
      this.selectedInvoices.push({id:item.id})
    }
    else {

      if (this.selectedInvoices.find(x => x.id == item.id)) {
        this.selectedInvoices = this.selectedInvoices.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedInvoices)
  }

  


  ngOnInit(): void {

    this.onGoButtonClick()
  }

  fetchData() {
    // let url = '<your API endpoint here>';
    // // Add any necessary query parameters based on the selected filter and inputs
    // this.http.get(url).subscribe((response: any) => {
    //   this.dataSource.data = response;
    // });
  }


  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myForm = new FormGroup({

    selectdropdown: new FormControl("", Validators.required),
    client: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required),
    filename: new FormControl("")
  });




  onSubmit() {

    this.fetchData();
  }

  submitassignvalue(){
    if (this.selectedInvoices.length == 0) {
      // const dialogRef = this.dialog.open(PopupwavierconfirmationComponent, {
      //   width: '500px',
      //   height: '150px',
      //   data: 'Please select the list items!'

      // }
      // );
      this.message="please select the list items!"
      $('#myModal1').appendTo("body").modal('show');
    }
    else{
      
      $('#myModal').appendTo("body").modal('show');
    }
  }



  ///practice

  customers: boolean = false;
  dateFields: boolean = false;
  inputField: boolean = false;

  onFilterChange() {
    if (this.selectedFilter == 1 || this.selectedFilter == 2 || this.selectedFilter == 0) {
      this.customers = false;
      this.inputField = false;
      this.dateFields = false;
      this.selectedFileName = '';
      this.fromDate = '';
      this.toDate = '';

      this.selectedClient = 0;
    }
    if (this.selectedFilter == 3) {
      this.customers = true;
      this.inputField = false;
      this.dateFields = false;
      this.selectedFileName = '';
      this.fromDate = '';
      this.toDate = '';

      this.http.get<any[]>('https://localhost:7208/api/Customer/GetCustomers').subscribe(clientdata => {
        this.clients = clientdata;
      });
      // PricingBillingInvoiceFactory.GetCompletedJobs('getCustomers').$promise.then(function (result) {
      //     // GetCustomers = result;  
      //     GetCustomers = result.StringList;
      // });

    }
    else if (this.selectedFilter == 4) {
      this.inputField = true;
      this.customers = false;
      this.dateFields = false;
      this.selectedClient = 0;
      this.fromDate = '';
      this.toDate = '';

    }

    else if (this.selectedFilter == 6) {
      this.inputField = false;
      this.customers = false;
      this.dateFields = true;
      this.selectedClient = 0;
      this.selectedFileName = '';

    }
  };

  closebutton(){
    $('#myModal').modal('hide');
    $('#myModal1').modal('hide');
  }


  //job history

  onGoButtonClick() {
    if (this.selectedClient != undefined || this.selectedFileName != undefined || this.selectedFilter != undefined || this.fromDate != undefined || this.toDate != undefined) {
      if ((this.selectedClient == undefined || this.selectedClient == null)) {
        this.selectedClient = 0;
      }
      if ((this.selectedFileName == undefined || this.selectedFileName == null || this.selectedFileName == '')) {
        this.selectedFileName = '';
      }
      var departmentId = this.selectedFilter;
      if (departmentId == 3 || departmentId == 4 || departmentId == 6) {
        departmentId = 0;
      }
      var jobOrder = {
        DepartmentId: departmentId,
        ClientId: this.selectedClient,
        FileName: this.selectedFileName,
        JobClosedUTC: this.fromDate,
        DateofUpload: this.toDate
      };
      this.http.post<any>('https://localhost:7208/api/Invoice/GetWaiverJobWithclientIdfileName', jobOrder).subscribe(response => {
      console.log(response, "response");
        
      this.dataSource.data = response.waiverJobList;
        // Sort dataSource based on MatSort
        this.dataSource.sort = this.sort;
        // Paginate dataSource based on MatPaginator
        this.dataSource.paginator = this.paginator;
        console.log(response.waiverJobList);

      });
      // PricingBillingInvoiceFactory.GetJobsHistory('GetWaiverJobWithclientIdfileName', jobOrder).$promise.then(function (result) {
      //    completedjobs.data = result.WaiverJobList;
      // });
    }
  };


  savechanges(){
    
    $('#myModal').modal('hide');
    this.http.post<any>('https://localhost:7208/api/Invoice/AddWaiverJobList',this.selectedInvoices).subscribe(data => {
     this.onGoButtonClick();
    this.message=data.message;
      $('#myModal1').appendTo("body").modal('show');
      console.log(data,"savechanges");
    });
  }
}
