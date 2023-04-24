import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-wavier',
  templateUrl: './wavier.component.html',
  styleUrls: ['./wavier.component.scss']
})
export class WavierComponent {
  selectedFilter: string;
  selectedClient: number;
  selectedFileName:string;
  fromDate:Date;
   toDate:Date;
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
      this.selectedInvoices.push(item)
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
    this.fetchData()
  }
  
  fetchData() {
    let url = '<your API endpoint here>';
    // Add any necessary query parameters based on the selected filter and inputs
    this.http.get(url).subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }


  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myForm = new FormGroup({

    selectdropdown: new FormControl("", Validators.required),
    client: new FormControl("", Validators.required),
    ClientId: new FormControl("", Validators.required)
  });

  onFilterChange() {
    //client value 
    if (this.selectedFilter === 'client') {
      this.http.get<any[]>('https://localhost:7208/api/Customer/GetCustomers').subscribe(clientdata => {
        this.clients = clientdata;
      });
    }
  }

  onGoButtonClick() {
    // Check which filter is selected
    switch (this.selectedFilter) {
      case "client":
        // Call the REST API with the selected client ID and date range
        // Populate the table with the API response data
        let clienturl = '<your API endpoint here>' + '?clientId=' + this.selectedClient;
        this.http.get(clienturl).subscribe((response: any) => {
          this.dataSource.data = response;
        });
        
        break;
      case "filename":
        // Call the REST API with the selected filename and date range
        // Populate the table with the API response data
        break;
      case "date":
        // Call the REST API with the selected date range
        // Populate the table with the API response data
        break;
      case "all":
        // Call the REST API with no filters applied
        // Populate the table with the API response data
        break;
      case "Artwork":
        // Call the REST API with the selected filter applied
        // Populate the table with the API response data
        break;
      case "Digitizing":
        // Call the REST API with the selected filter applied
        // Populate the table with the API response data
        break;
    }
  }
  
  onSubmit() {
   
  this.fetchData();
  }





  ///practice

  customers:boolean= false;
  dateFields:boolean = false;
  inputField:boolean=false;

//    inputParameters(inputParameters) {
//     if (this.selectedFilter == client || inputParameters.deptId == 2 || inputParameters.deptId == 0) {
//         this.customers = false;
//         this.inputField = false;
//         this.dateFields = false;
//         this.SelectedValue.fileName = '';
//         this.SelectedValue.FromDate = '';
//         this.SelectedValue.Todate = '';
    
//         SelectedValue.clientId = 0;
//     }
//     if (inputParameters.deptId == 3) {
//         this.customers = true;
//         this.inputField = false;
//         this.dateFields = false;
//         this.SelectedValue.fileName = '';
//         this.SelectedValue.FromDate = '';
//         this.SelectedValue.Todate = '';
   
        
//         PricingBillingInvoiceFactory.GetCompletedJobs('getCustomers').$promise.then(function (result) {
//             // GetCustomers = result;  
//             GetCustomers = result.StringList;
//         });
        
//     }
//     else if (inputParameters.deptId == 4) {
//         this.inputField = true;
//         this.customers = false;
//         this.dateFields = false;
//         this.SelectedValue.clientId = 0;
//         this.SelectedValue.FromDate = '';
//         this.SelectedValue.Todate = '';
        
//     }

//     else if (inputParameters.deptId == 6) {
//         this.inputField = false;
//         this.customers = false;
//         this.dateFields = true;
//         this.SelectedValue.clientId = 0;
//         this.SelectedValue.fileName = '';
     
//     }
// };




// //job history

// jobHistories(data) {
//       if (data != undefined) {
//           if ((data.clientId == undefined || data.clientId == null)) {
//               data.clientId = 0;
//           }
//           if ((data.fileName == undefined || data.fileName == null || data.fileName == '')) {
//               data.fileName = '';
//           }
//           var departmentId = data.deptId;
//           if (departmentId == 3 || departmentId == 4 || departmentId == 5 || departmentId == 6) {
//               departmentId = 0;
//           }
//           var jobOrder = {
//               DepartmentId: departmentId,
//               ClientId:SelectedValue.clientId,
//               FileName:SelectedValue.fileName,
//               JobClosedUTC:SelectedValue.FromDate,
//               DateofUpload:SelectedValue.Todate
//           };
//           PricingBillingInvoiceFactory.GetJobsHistory('GetWaiverJobWithclientIdfileName', jobOrder).$promise.then(function (result) {
//              completedjobs.data = result.WaiverJobList;
//           });
//       }
//   };
}
