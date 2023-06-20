import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { ScopeService } from 'src/app/Services/Scope/scope.service';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss']
})
export class ScopeComponent {

  //  Table view heading
  displayedColumns:string[] = [
    'DepartmentName',
    'Description',
    'action',
  ]

  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private _scopeService: ScopeService,
    private builder:  FormBuilder,
    private router: Router,
    private _coreService: CoreService,
    private http: HttpClient
  ){}
  scopeRegistrationForm = this.builder.group({

  });

  ngOnInit() {
    this.listScope()
  }

  listScope(){
    this._scopeService.getListScope().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        console.log(data);
        
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })  
  }

  addItem(){
    this.router.navigate(['/topnavbar/master-scopeAdd']);
  }
  
  openViewForm(data:any){
    this.http.get(`https://localhost:7208/api/Scope/GetScopeDetails?Id=${data.id}`).subscribe((response:any) =>{
    this.router.navigate(['/topnavbar/master-scope/view'], {state:{data:response}});
  })
  }
  
  openEditForm(id:any){
      this.http.get(`https://localhost:7208/api/Scope/GetScopeDetails?Id=${id}`).subscribe((response:any) =>{
        this.router.navigate(["topnavbar/master-scope/edit"], {state:{data:response}});
    })
    //  Below method is used to get data from serice using behaviour subject
    // this.dataSource.filteredData.forEach((data:any)=>{
    //   if(data.id === id){
    //     this._scopeService.setScopeData(data);
    //   }
    // })
  }


  deleteScopeUser(id:number){
    console.log(id, "deleteScopeUser");
    this._scopeService.deleteScope(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.listScope();
        console.log(res);
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
