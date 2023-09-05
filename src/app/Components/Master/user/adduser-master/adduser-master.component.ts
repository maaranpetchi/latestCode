import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/Environments/environment';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { UserMasterService } from 'src/app/Services/Master/user-master.service';

@Component({
  selector: 'app-adduser-master',
  templateUrl: './adduser-master.component.html',
  styleUrls: ['./adduser-master.component.scss'],
})
export class AdduserMasterComponent implements OnInit {
  isEmployee: boolean = false;
  isCustomer: boolean = false;
  isAdmin: boolean = false;
  isUser: boolean = false;
  selectedemployeeEmailOption: '';
  employees: any[] = [];
  customers: any[] = [];
  employeeUsers: '' = '';
  selectedEmployee: '';
  selectedCustomerName: '';
  employeeId: number;
  hide = true;
  formVisible: boolean;
  // userRegistrationForm:FormGroup;

  // checkbox
  checkboxes: any[] = [];
  selectedIds: number[] = [];


  constructor(
    private builder: FormBuilder,
    private _empService: UserMasterService,
    public dialogRef: MatDialogRef<AdduserMasterComponent>,
    private http: HttpClient,
    private loginservice:LoginService,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.getEmployee();
    this.getMenuDetails();
    this.getCustomers();
  }
  userRegistrationForm = this.builder.group({
    chooseRole:['', Validators.required],
    accessName: ['', Validators.required],
    employeeName: [null, Validators.required],
    employeeUsers: { value: '', disabled: false },
    userName: ['', Validators.required],
    employeePassword: ['', Validators.required],
    customerPassword: '',
    adminRole: ['', Validators.required],
    customer: ['',Validators.required],
    employeeEmail: '',
  });

  getEmployee() {
    this._empService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response;
      },
      error: (err) => {
        
      },
    });
  }

  getCustomers() {
    this._empService.getAllCustomers().subscribe({
      next: (response) => {
        this.customers = response;
      },
      error: (err) => {
        
      },
    });
  }

  showEmployeeData() {
    this.isEmployee = true;
    this.isCustomer = false;
    this.userRegistrationForm.get('customer')?.setErrors(null);
  }

  showCustomerData() {
    this.isEmployee = false;
    this.isCustomer = true;
    // this.userRegistrationForm.get('employeeName')?.setErrors(null);
  }

  showAdminData() {
    this.isAdmin = false;
    this.isUser = false;
    this.selectedMenu = [];
    this.selectedMenuArray = [];
  }
  showUserData() {
    this.isAdmin = false;
    this.isUser = true;
    this.selectedMenu = [];
    this.selectedMenuArray = [];
  }

  onCancel() {
    this.dialogRef.close();
  }
  getEmployeeId(data: any) {
    
    this._empService.getEmployeeCodeByEmployId(parseInt(data)).subscribe(
      (data: any) => {
        this.userRegistrationForm.get('employeeUsers')?.patchValue(data.employeeCode);
      },
      (error: any) => {}
    );
  }

  // Select of dropdown menu EmployeeName
  menus: any[] = [];
  getMenuDetails() {
    this._empService.getMenu().subscribe(
      (data: any) => {
        this.menus = data;
        
      },
      (error: any) => {}
    );
  }

  // Menu section allignment
  keepGoing = true;
  getSubMenuPadding(parentId: any, padding: any) {
    var paddingLeft = padding;
    if (parentId != null) {
      paddingLeft = paddingLeft + 20;
      let t: any = {};
      this.menus.forEach((item) => {
        if (this.keepGoing) {
          var id = '|' + parentId + '|';
          if (item.Id == id) {
            t = item;
            this.keepGoing = false;
          }
        }
      });
      this.keepGoing = true;
      if (t.ParentId != null && t.ParentId != undefined) {
        var res = this.getSubMenuPadding(t.ParentId, paddingLeft);
        return res;
      }
    }
    var result = paddingLeft + 'px';
    return { 'padding-left': result };
  }
  selectedMenu: any[] = [];
  selectedMenuArray: any[] = [];
  onMenuSelection = (event: any, id) => {
    
    var idx = this.selectedMenuArray.indexOf(id);
    if (idx > -1) {
      this.selectedMenuArray.splice(idx, 1);
    } else {
      this.selectedMenuArray.push(id);
    }
    this.selectedMenu = this.selectedMenuArray;
  };

  hideForm() {
    this.formVisible = false;
  }

  
  onFormSubmit(){
        let str:string = this.selectedMenu.reduce((str,item)=>{
          return str+"|" + item+"|,";
        },"")
        let saveUserData = {
            menuAccess: str.substring(0,str.length-1),
              id: 0,
              username: this.userRegistrationForm.value.employeeUsers,
              password: this.userRegistrationForm.value.employeePassword,
              domain: '',
              roles: this.userRegistrationForm.value.adminRole,
              userType: this.userRegistrationForm.value.chooseRole,
              employeeId: this.userRegistrationForm.value.employeeName,
              customerId: '',
              isDeleted: false,
              createdBy: this.loginservice.getUsername(),
              createdDate: new Date().toISOString(),
              customer: null,
              employee: null
            }
        
       this.http.post(environment.apiURL+'User/SaveUser?actionType=1',saveUserData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User detail added!');
            
          },
          error: (err: any) => {
            throw new Error('API Error', err);
          },
        });
    
  }

}
