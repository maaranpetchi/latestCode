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
  selector: 'app-buddy-proof-table',
  templateUrl: './buddy-proof-table.component.html',
  styleUrls: ['./buddy-proof-table.component.scss']
})
export class BuddyProofTableComponent implements OnInit {
   
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
      // this.http.get<Employee[]>('your-api-endpoint').subscribe((employees: Employee[]) => {
      //   this.dataEmployeeSource = new MatTableDataSource(employees);
      //   this.dataEmployeeSource.paginator = this.paginator;
      //   this.dataEmployeeSource.sort = this.sort;
      // });
    }
 
  
    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  

  
  
    //to save the checkbox value
    selectedQuery:any[]=[];
  
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
  
    benchChecked: boolean = false;
    onBenchCheckboxChange(event: any) {
      this.benchChecked = event.checked;
    }
  
  }
  