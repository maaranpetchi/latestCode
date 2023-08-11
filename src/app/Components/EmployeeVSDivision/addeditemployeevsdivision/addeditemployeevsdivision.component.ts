import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { log } from 'console';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from '../../Spinner/spinner.service';


@Component({
  selector: 'app-addeditemployeevsdivision',

  templateUrl: './addeditemployeevsdivision.component.html',
  styleUrls: ['./addeditemployeevsdivision.component.scss']
})
export class AddeditemployeevsdivisionComponent implements OnInit {
  displayedColumns = ['employeeCode', 'employeeCodeName', 'selected'];
  table1Data: MatTableDataSource<any>;

  table2Data: MatTableDataSource<any>;


  myForm: FormGroup;
  // table1Data: any;
  // table2Data: any;

  table1selectedarray: any[] = [];
  table2selectedarray: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private spinnerService:SpinnerService, private fb: FormBuilder, private http: HttpClient) {

  }


  ngOnInit(): void {
    // this.myForm = this.fb.group({
    //   selectedValues: this.fb.array([])
    // });
    this.myForm = new FormGroup({ selectedValues: this.fb.array([]) });
    this.spinnerService.requestStarted();

    this.http.get<any>(environment.apiURL+'EmployeeVsDivision/GetEmployee').subscribe(data => {
      this.spinnerService.requestEnded();
      // this.table1Data =data.eEvDList ;
      this.table1Data = new MatTableDataSource(data.eEvDList);
      this.table1Data.data.forEach(row => {
        this.myForm.addControl(row.employeeId.toString(), new FormControl());
      });
      this.table1Data.paginator = this.paginator;

    });

    this.http.get<any>(environment.apiURL+'EmployeeVsDivision/GetDivision').subscribe(data => {
      // this.table2Data = data.dEvDList;
      this.table2Data = new MatTableDataSource(data.dEvDList);
      this.table2Data.data.forEach(row => {
        this.myForm.addControl(row.id.toString() + "hi", new FormControl());
      });
      this.table2Data.paginator = this.paginator;
    });
  }
  // onPageChange(event: any) {
  //   this.spinnerService.requestStarted();
  //   const startIndex = event.pageIndex * event.pageSize;
  //   const endIndex = startIndex + event.pageSize;
  //   this.http.get<any>(environment.apiURL+`EmployeeVsDivision/GetEmployee?_start=${startIndex}&_end=${endIndex}`).subscribe(data => {
  //     this.spinnerService.requestEnded();
  //      this.table1Data.data = data.eEvDList;
  //   });
  // }
  // onPageChange2(event: any) {
  //   const startIndex = event.pageIndex * event.pageSize;
  //   const endIndex = startIndex + event.pageSize;
  //   this.http.get<any>(environment.apiURL+`EmployeeVsDivision/GetDivision?_start=${startIndex}&_end=${endIndex}`).subscribe(data => {
  //     this.spinnerService.requestEnded();
  //     this.table2Data.data = data.dEvDList;
  //   });
  // }

  onSubmit() {
    this.spinnerService.requestStarted();
    if (this.table1selectedarray.length > 0 && this.table2selectedarray.length > 0) {
      const selectedValues = this.myForm.get('selectedValues')?.value
      const data = { selectedValues };
      console.log(this.myForm)
      console.log(this.table1selectedarray)
      console.log(this.table2selectedarray)


      // Submit the selected values to the REST API using HttpClient

      this.http.post(environment.apiURL+'EmployeeVsDivision/SetEmployeeVsDivision', {
        "selectedEmployee": this.table1selectedarray,
        "selectedDivision": this.table2selectedarray,
        "createdBy": 152,
      }).subscribe(response => {
        this.spinnerService.requestEnded();

        // Handle the response from the API
        this.table1selectedarray = [];
        this.table2selectedarray = [];
        console.log(response, "response");
        
        alert("Successfuly data added")
      });
    }
    else {

    }
  }

  setAll(completed: boolean, item: any) {
    if (completed == true) {
      this.table1selectedarray.push({ employeeId: item.employeeId, departmentId: item.departmentId })
    }
  }


  setAll2(completed: boolean, item: any) {
    if (completed == true) {
      this.table2selectedarray.push({ id: item.id })
    }
  }
}
