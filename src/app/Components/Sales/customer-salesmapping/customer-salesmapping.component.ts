import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from '../../Spinner/spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-customer-salesmapping',
  templateUrl: './customer-salesmapping.component.html',
  styleUrls: ['./customer-salesmapping.component.scss'],
})
export class CustomerSalesmappingComponent implements OnInit {
  dropdownValues: any[] = [];
  selectedValue: string = '';
  selectedJobs: any;
  selectedCustomers: any;
  constructor(
    private http: HttpClient,
    private spinner: SpinnerService,
    private loginservice: LoginService
  ) {}

  ngOnInit(): void {
    this.GetAllddlList();
    this.onDropdownChange();
  }
  selectedQuery: any[] = [];
  selectedEmployee: any[]=[];

  displayedColumns: string[] = [
    'selected',
    'customerName',
    'shortname',
    'classification',
    'salesemployee',
  ];
  displayedEmployeeColumns: string[] = [
    'selected',
    'employeecode',
    'salesemployee',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // employee
  employeeDaSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator1!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyEmployeeFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeDaSource.filter = filterValue.trim().toLowerCase();
    if (this.employeeDaSource.paginator) {
      this.employeeDaSource.paginator.firstPage();
    }
  }
  checkAdmin(): Observable<any> {
    return this.http.get(
      environment.apiURL +
        `Account/checkIsAdmin/${this.loginservice.getUsername()}`
    );
  }
  checkUserName(): Observable<any> {
    return this.http.get(
      environment.apiURL +
        `Account/getEmployeeProcess/${this.loginservice.getUsername()}`
    );
  }

  setAll(completed: boolean, item: any) {
    console.log('item: ' + item);
    console.log('before', this.selectedQuery);
    if (completed == true) {
      if (item.allocatedEstimatedTime == null) item.allocatedEstimatedTime = 0;
      if (item.employeeId == null) item.employeeId = 0;
      if (item.estimatedTime == null) item.estimatedTime = 0;
      this.selectedQuery.push({
        ...item,
        CategoryDesc: '',
        Comments: '',
        CommentsToClient: '',
        Remarks: '',
        SelectedEmployees: [],
        SelectedRows: [],
        customerId:[item.customerId],
        CustomerName: item.employeeName
      });
    } else {
    if (this.selectedQuery.find((x) => x.id == item.id)) {
      this.selectedQuery = this.selectedQuery.filter((x) => {
        if (x.id != item.id) {
          return item;
        }
      });
      }
    }
    console.log('after', this.selectedQuery);
  }

  setEmployeeAll(completed: boolean, item: any) {
    console.log('before', this.selectedEmployee);
    console.log('item', item);
    if (completed == true) {
        this.selectedEmployee.push({
          ...item,
          // CategoryDesc: '',
          // Comments: '',
          // CommentsToClient: '',
          // FileInwardType: '',
          // JobId: 0,
          // Remarks: '',
          SelectedEmployees: [],
          SelectedRows: [],
          CustomerId:[0],
          CustomerName:item.employeeName,
          Description:item.employeeName,
          Name:item.employeeName,
          ShortName:item.employeeCode,
          TimeStamp: '',
        });
    } else {
    if (this.selectedEmployee.find((x) => x.id == item.id)) {
      this.selectedEmployee = this.selectedEmployee.filter((x) => {
        if (x.id != item.id) {
          return item;
        }
      });
      }
    }
    console.log('after', this.selectedEmployee);
  }
  onDropdownChange(): void {
    this.spinner.requestStarted();
    this.http
      .get<any[]>(
        environment.apiURL +
          `CustomerMapping/GetAllCustomerEmployee?Id=${this.selectedValue}`
      )
      .subscribe({
        next: (response: any) => {
          this.spinner.requestEnded();
          console.log(response);
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.employeeDaSource = new MatTableDataSource(response);
          this.employeeDaSource.sort = this.sort;
          this.employeeDaSource.paginator = this.paginator1;
          console.log(response);
          this.GetAllddlList();
        },
        error: (err) => {
          this.spinner.resetSpinner();
          console.log('Error loading table values:', err);
        },
      });
  }

  GetAllddlList() {
    // this.spinner.requestStarted();
    this.http
      .get(environment.apiURL + 'CustomerMapping/GetAllddlList')
      .subscribe({
        next: (response: any) => {
          this.spinner.requestEnded();
          console.log(response);
          this.employeeDaSource = new MatTableDataSource(response.employeeList);
          this.employeeDaSource.sort = this.sort;
          this.employeeDaSource.paginator = this.paginator1;
          console.log(response);
        },
        error(err) {
          console.log(err);
        },
      });
  }
  onSubmit() {
    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }
    let selectedCustomerCount =this.selectedQuery.length;
    let selectedEmployeeCount =this.selectedEmployee.length;
    if (this.selectedQuery.length > 0) {
      this.selectedJobs = this.selectedQuery;
    }
    if (selectedCustomerCount != 0 && selectedEmployeeCount != 0) {
      // if (selectedCustomerCount > 1) {
      if (selectedEmployeeCount > 1) {
        alert('Please select one Employee!');
      } else {
        var savecustomervsSalesemp = {
          selectedCustomers: this.selectedJobs,
          selectedEmployee: this.selectedEmployee,
          // customerId: this.selectedCustomers.customerId,
          createdBy: this.loginservice.getUsername(),
        };
        this.http
          .post(
            environment.apiURL +
              `CustomerMapping/CreateCustomerVsSalesEmployee`,
            savecustomervsSalesemp
          )
          .subscribe((response) => {
            if (response === true) {
              alert('added');
            } else {
              console.log('error');
            }
          });
      // }
    }
    } else {
      alert('Please select Customer and Employee');
    }
  }
//  CreateCustomerVsSalesEmployee = function () {
//     var selectedCustomerCount = JSON.stringify(selectedCustomers.length);
//     var selectedEmployeeCount = JSON.stringify(gridallocateApi.selection.getSelectedRows().length);
//     if (selectedCustomerCount != 0 && this.selectedEmployeeCount != 0) {
//         if (selectedEmployeeCount > 1) {
//           //  alertMessage = 'Please select one Employee!';
//           //   $('#alertPopup').modal('show');
//           alert('Please select one Employee!')
//         }
//         else {
//             var savecustomervsSalesemp = {
//                 selectedCustomers:selectedCustomers,
//                 SelectedEmployee:selectedEmployee,
//                 customerId:selectedCustomers.CustomerId,
//                 createdBy:EmployeeId,
//             }
            
            // CustomerMappingFactory.CreateCustomerVsSalesEmployee('CreateCustomerVsSalesEmployee', savecustomervsSalesemp).$promise.then(function (result) {
            //     if (result.Success == true) {
            //        confirmationMessage = result.Message;
            //         $('#confirmedPopup').modal('show');
            //     }
            //     else {
            //        confirmationMessage = result.Message;
            //         $('#confirmedPopup').modal('show');
            //     }
            // });
//         }
//     }
//     else {
//        alertMessage = 'Please select Customer and Employee';
//         $('#alertPopup').modal('show');
//     }
// }
}
