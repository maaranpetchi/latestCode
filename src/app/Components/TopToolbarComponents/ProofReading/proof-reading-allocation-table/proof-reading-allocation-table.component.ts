import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Employee {
  id: number;
  name: string;
  estTime: number;
  jobCategory: string;
  shift: string;
}

@Component({
  selector: 'app-proof-reading-allocation-table',
  templateUrl: './proof-reading-allocation-table.component.html',
  styleUrls: ['./proof-reading-allocation-table.component.scss']
})
export class ProofReadingAllocationTableComponent implements OnInit {

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
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      //maintable
      this.fetchData();
      //Employeetable
      this.fetchEmployees();
      //scopes
      this.fetchScopes();
    }
  
    fetchData(): void {
      this.http.get<any>('YOUR_API_URL').subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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
  
  

    benchChecked: boolean = false;
    onBenchCheckboxChange(event: any) {
      this.benchChecked = event.checked;
    }
  
  }
  
