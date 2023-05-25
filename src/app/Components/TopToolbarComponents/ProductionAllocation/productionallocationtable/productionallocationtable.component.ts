import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from 'src/app/Services/Login/login.service';

interface Employee {
  id: number;
  name: string;
  estTime: number;
  jobCategory: string;
  shift: string;
}
@Component({
  selector: 'app-productionallocationtable',
  templateUrl: './productionallocationtable.component.html',
  styleUrls: ['./productionallocationtable.component.scss']
})
export class ProductionallocationtableComponent implements OnInit {
exchangenumber:number;
  dataEmployeeSource: MatTableDataSource<Employee>;
  displayedEmployeeColumns: string[] = ['selected', 'employee', 'estTime', 'jobCategory', 'shift'];

  scopes: any[] = [];
  selectedScope: any=0;

  displayedColumns: string[] = [
    'selected',
    'jobId',
    'estjob',
    'fileName',
    'fileInwardMode',
    'client',
    'customerSatisfaction',
    'jobstatus',
    'projectcode',
    'status',
    'scope',
    'esttime',
    'deliverydate'
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,private loginservice:LoginService) {}

  ngOnInit(): void {
    this.freshJobs();
    //Employeetable
    this.fetchEmployees();
    //scopes
    this.fetchScopes();
  }

  

  fetchEmployees() {
    // Replace 'your-api-endpoint' with the actual endpoint to fetch employee data from your REST API
    this.http.get<Employee[]>('your-api-endpoint').subscribe((employees: Employee[]) => {
      this.dataEmployeeSource = new MatTableDataSource(employees);
      this.dataEmployeeSource.paginator = this.paginator;
      this.dataEmployeeSource.sort = this.sort;
    });
  }
  fetchScopes() {
    // Replace 'your-api-endpoint' with the actual endpoint to fetch scope data from your REST API
    this.http.get<any[]>('your-api-endpoint').subscribe(scopes => {
      this.scopes = scopes;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyEmployeeFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataEmployeeSource.filter = filterValue.trim().toLowerCase();

    if (this.dataEmployeeSource.paginator) {
      this.dataEmployeeSource.paginator.firstPage();
    }
  }


  //to save the checkbox value
  selectedQuery:any[]=[];
  selectedEmployee:any[]=[];

  setAll(completed: boolean, item: any) {
    console.log("before", this.selectedQuery)
    if (completed == true) {
      this.selectedQuery.push(item)
    }
    else {

      if (this.selectedQuery.find(x => x.id == item.id)) {
        this.selectedQuery = this.selectedQuery.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedQuery)
  }

  setEmployeeAll(completed: boolean, item: any) {
    console.log("before", this.selectedEmployee)
    if (completed == true) {
      this.selectedEmployee.push(item)
    }
    else {

      if (this.selectedEmployee.find(x => x.id == item.id)) {
        this.selectedEmployee = this.selectedEmployee.filter(x => {
          if (x.id != item.id) {
            return item
          }
        })
      }
    }
    console.log("after", this.selectedEmployee)
  }

  exchangeHeader: number;


  setExchangeHeader() {
  //   let temparray:any[]=[]
  //  let skip:boolean;
  //     this.dataSource.data.filter((y:any)=>{
  //       skip=false;
  //       this.selectedInvoices.forEach(x=>{
  //       if(y.id===x.id){
  //         temparray.push({  ...y,
  //           exchangeRate:this.exchangeHeader,
  //         isSelected:true})
  //           skip=true;
  //       }
       
  //     })
  //     if(!skip){
  //       temparray.push(y)
  //     }
     
  //     })
  
  //   this.dataSource.data=temparray;
  }

  benchChecked: boolean = false;
  onBenchCheckboxChange(event: any) {
    this.benchChecked = event.checked;
  }



  freshJobs(){
    this.http.get<any>(`https://localhost:7208/api/Allocation/getPendingAllocationJobsAndEmployees/${ parseInt(this.loginservice.getUsername())}/${ parseInt(this.loginservice.getProcessId())}/1/0`).subscribe(freshJobs => {
      this.dataSource = freshJobs.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("freshJobs")
    });  
  }
  revisionJobs(){
    this.http.get<any>(`https://localhost:7208/api/Allocation/getPendingAllocationJobsAndEmployees/${ parseInt(this.loginservice.getUsername())}/${ parseInt(this.loginservice.getProcessId())}/2/0`).subscribe(revisionJobs => {
      this.dataSource = revisionJobs.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(" revisionJobs")
    });  
  }
  reworkJobs(){
    this.http.get<any>(`https://localhost:7208/api/Allocation/getPendingAllocationJobsAndEmployees/${ parseInt(this.loginservice.getUsername())}/${ parseInt(this.loginservice.getProcessId())}/3/0`).subscribe(reworkJobs => {
      this.dataSource = reworkJobs.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("reworkJobs")
    });  
  }
  allocaetdJobs(){
    this.http.get<any>(`https://localhost:7208/api/Allocation/getPendingAllocationJobsAndEmployees/${ parseInt(this.loginservice.getUsername())}/${ parseInt(this.loginservice.getProcessId())}/4/0`).subscribe(allocaetdJobs => {
      this.dataSource = allocaetdJobs.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("allocaetdJobs")
    });  
  }
  queries(){
    this.http.get<any>(`https://localhost:7208/api/Allocation/getQueryPendingJobs/${ parseInt(this.loginservice.getUsername())}/${ parseInt(this.loginservice.getProcessId())}/0`).subscribe(queries => {
      this.dataSource = queries.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("queries")
    });  
  }
  queryResposne(){
    this.http.get<any>(`https://localhost:7208/api/Allocation/getQueryResponseJobsAndEmployees/${ parseInt(this.loginservice.getUsername())}/${ parseInt(this.loginservice.getProcessId())}/0`).subscribe(queryResposne => {
      this.dataSource = queryResposne.allocationJobs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("queries")
    });  
  }
  errorJobs(){
    this.http.get<any>(`
    https://localhost:7208/api/Allocation/getPendingAllocationJobsAndEmployees/${ parseInt(this.loginservice.getUsername())}/${ parseInt(this.loginservice.getProcessId())}/5/0`).subscribe(errorJobs => {
      this.dataSource =   errorJobs
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("errorJobs")
    });  
  }
  quotationJobs(){
    this.http.get<any>(`https://localhost:7208/api/Allocation/getPendingAllocationJobsAndEmployees/${ parseInt(this.loginservice.getUsername())}/${ parseInt(this.loginservice.getProcessId())}/7/0`).subscribe(quotationJobs => {
      this.dataSource =   quotationJobs
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("errorJobs")
    });  
  }

  

  tab(action){
    if (action == '1') {
      this.freshJobs();
    }
    else if (action == '2') {
      this.revisionJobs();
    }
    else if (action == '3') {
      this.reworkJobs();
    }
    else if (action == '4') {
      this.allocaetdJobs();
    }
    else if(action == '5') {
      this.queries();
    }
    else if(action == '6') {
      this.queryResposne();
    }
    else if(action == '7') {
      this.errorJobs();
    }
    else if(action == '8') {
      this.quotationJobs();
    }
  }

}
