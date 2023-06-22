import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/AccountController/NonBillablejobs/Core/core.service';
import { NonbillablejobsService } from 'src/app/Services/AccountController/NonBillablejobs/nonbillablejobs.service';

@Component({
  selector: 'app-nonbillablejobs',
  templateUrl: './nonbillablejobs.component.html',
  styleUrls: ['./nonbillablejobs.component.scss']
})
export class NonbillablejobsComponent implements OnInit {
  displayedColumns: string[] = [
    'selected',
    'jobid',
    'jobdate',
    'filename',
    'department',
    'jobstatus',
    'customer',
    'Scope',
    'stitchcount',
    'nonbillablestatus',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorttable!: MatSort;
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private _empService: NonbillablejobsService,
    
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
     fromdate:'',
     todate:'',
     customer:0,
     department:0,
    });
  }

  selectednonbillableOption:any=0;
  Nonbillabledropdownvalues:any[] = [];

  //Customerdropdownvalues dropdowndeclaration
  selectedcustomerOption: any = '';
  Customerdropdownvalues: any[] = [];
  //Customerdropdownvalues dropdowndeclaration
  selecteddepartmentOption: any = '';
  Departmentdropdownvalues: any[] = [];

  ngOnInit(): void {

     // customerdata dropdown fetch the values from the API
     this.http.get<any[]>(environment.apiURL+'Dropdown/GetCustomers').subscribe(customerdata => {
      this.Customerdropdownvalues = customerdata;
  // Sort the array by a specific property
  this.Customerdropdownvalues.sort((a, b) => {
    if (a.shortName < b.shortName) {
      return -1;
    } else if (a.shortName > b.shortName) {
      return 1;
    } else {
      return 0;
    }
  });

    });
     // Departmentdropdownvalues  dropdown fetch the values from the API
     this.http.get<any>(environment.apiURL+'Employee/GetDropDownList').subscribe(departmentdata => {
      this.Departmentdropdownvalues = departmentdata.designationList;
    });

    //Nonbillable
    this.http.get<any>(environment.apiURL+'JobOrder/nGetNonBillable').subscribe(nonbillabledata => {
      this.Nonbillabledropdownvalues = nonbillabledata.getDDLNBList;
    });


  }
selectedInvoices:any[]=[];

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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onFormSubmit() {
    
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee added successfully');
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }

    onGoButtonClick() {
     let data:any = {
      "fromDate": this.empForm.value.fromdate,
      "toDate": this.empForm.value.todate,
      "clientId": this.empForm.value.customer,
      "departmentId":  this.empForm.value.department
    };
        this.http.post<any>(environment.apiURL+'JobOrder/nGetNonBillableData',data).subscribe(response => {
          this.dataSource.data = response.getNonBList;
          // Sort dataSource based on MatSort
          this.dataSource.sort = this.sorttable;
          // Paginate dataSource based on MatPaginator
          this.dataSource.paginator = this.paginator;
  
  
        });
        // PricingBillingInvoiceFactory.GetJobsHistory('GetWaiverJobWithclientIdfileName', jobOrder).$promise.then(function (result) {
        //    completedjobs.data = result.WaiverJobList;
        // });
      }

      submitnonbillable(){
       let temparray= this.selectedInvoices.map(x=>{
        return {
          "id": x.id,
          "nonBillableId": 0,
          "getNBPara":[]
        }
       })
       
        let data={
            "id": 0,
            "nonBillableId":this.selectednonbillableOption,
            "getNBPara": temparray
          }
  
          this.http.post<any>(environment.apiURL+'JobOrder/nUpdateNonBillable',data).subscribe(data=>{
            console.log(data,"NOnbillable");
            this.selectedInvoices=[];
            this. onGoButtonClick();
          })
      }

    };

