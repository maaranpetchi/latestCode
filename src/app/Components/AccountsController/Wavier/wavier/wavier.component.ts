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
}
