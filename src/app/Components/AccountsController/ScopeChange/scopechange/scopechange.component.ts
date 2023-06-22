import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/Services/AccountController/ScopeChange/Core/core.service';
import { ScopechangeService } from 'src/app/Services/AccountController/ScopeChange/scopechange.service';
import { environment } from 'src/Environments/environment';
//MARTIAL INTERFACE
interface Department {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-scopechange',
  templateUrl: './scopechange.component.html',
  styleUrls: ['./scopechange.component.scss']
})
export class ScopechangeComponent implements OnInit {
  displayedColumns: string[] = [
    'selected',
    'jobid',
    'jobdate',
    'department',
    'clientName',
    'filename',
    'jobstatus',
    'Scope',

  ];
  //martial status dropdown values
  departments: Department[] = [
    { value: '1', viewValue: 'Artwork' },
    { value: '2', viewValue: 'Digitizing' },
  ];
  dataSource = new MatTableDataSource([]);
  


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private _empService: ScopechangeService,
    private snackBar: MatSnackBar,
    private _coreService: CoreService
  ) {

    this.empForm = this._fb.group({
      fromdate: '',
      todate: '',
      client: '',
      department: '',
      scope: ''
    });
  }

  onSubmit() {
    let tempInvoices: any[] = []
    tempInvoices = this.selectedInvoices.map(x => {
      return {
        "fromDate": this.empForm?.value.fromdate,
        "toDate": this.empForm?.value.todate,
        "departmentId": this.empForm?.value.department,
        "clientId": this.empForm?.value.client,
        "scopeId": this.empForm.value.scope,
        "jobId": "string",
        "jId": x.jId,
        "changeScope": []
      }
    })
    this.http.post<any>(environment.apiURL+'CustomerMapping/ChangeScopeAPI', {
      "fromDate": this.empForm?.value.fromdate,
      "toDate": this.empForm?.value.todate,
      "departmentId": this.empForm?.value.department,
      "clientId": this.empForm?.value.client,
      "scopeId": this.empForm?.value.scope,
      "jobId": "string",
      "jId": 0,
      "changeScope": tempInvoices
    }).subscribe((results: any) => {

      // Show success message popup
      this.showSuccessMessage();
      console.log(results, "Change Scope Results")
    }
    )
  }

  showSuccessMessage() {
    this.snackBar.open('Data submitted successfully!', 'Close', {
      duration: 5000
    });
  }
  //Customerdropdownvalues dropdowndeclaration
  selectedclientOption: any = '';
  Clientdropdownvalues: any[] = [];
  //Scopedropdownvalues dropdowndeclaration
  selectedScopeOption: any = '';
  Scopedropdownvalues: any[] = [];
  //Resign dropdowndeclaration
  selectedresignOption: any = '';
  Resigndropdownvalues: any[] = [];

  selectedInvoices: any[] = [];

  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedInvoices)
    if (completed == true) {
      this.selectedInvoices.push(item)
    }
    else {

      if (this.selectedInvoices.find(x => x.jId == item.jId)) {
        this.selectedInvoices = this.selectedInvoices.filter(x => {
          if (x.jId != item.jId) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedInvoices)
  }

  ngOnInit(): void {

    // customerdata dropdown fetch the values from the API
    this.http.get<any[]>(environment.apiURL+'dropdown/getcustomers').subscribe(clientdata => {
      this.Clientdropdownvalues = clientdata;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getScopeList() {
    this.http.get(environment.apiURL+`CustomerMapping/DDLforScopeChange?departmentId=${this.empForm.value.department}&custId=${this.empForm.value.client}`).subscribe((data: any) => {
      this.Scopedropdownvalues = data;
    })
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({

      next: (res) => {

        this.dataSource = new MatTableDataSource(res);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: console.log,
    });
  }

  getJobOrderList() {
    this._empService.getJobOrderList({
      "clientId": this.empForm.value.client,
      "departmentId": this.empForm.value.department,
      "fromDate": this.empForm.value.fromdate,
      "toDate": this.empForm.value.todate
    }).subscribe((results: any) => {
      // Set the search results in the data source
      console.log(results, "results")
      this.dataSource.data = results.jobOrderDetailsReport;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(results, "results")
    }
    )
    this.getScopeList();
  }


}
