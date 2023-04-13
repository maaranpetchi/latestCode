import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditService } from 'src/app/Services/Displayorhideform/edit-service.service';
import { CoreService } from 'src/app/Services/EmployeeController/Core/core.service';
import { EmployeeService } from 'src/app/Services/EmployeeController/employee.service';

//MARTIAL INTERFACE
interface MARTIAL {
  value: string;
  viewValue: string;
}
//Resign INTERFACE
interface RESIGN {
  resignvalue: string;
  resignViewValue: string;
}
//GENDER INTERFACE
interface GENDER {
  gendervalue: string;
  genderViewValue: string;
}

//GENDER INTERFACE
interface BLOOD {
  bloodvalue: string;
  bloodViewValue: string;
}
//Internetavailable INTERFACE
interface INTERNET {
  internetvalue: string;
  internetViewValue: string;
}
//system INTERFACE
interface SYSTEM {
  systemvalue: string;
  systemViewValue: string;
}


@Component({
  selector: 'app-add-edit-employeecontroller',
  templateUrl: './add-edit-employeecontroller.component.html',
  styleUrls: ['./add-edit-employeecontroller.component.scss'],

})

export class AddEditEmployeecontrollerComponent implements OnInit {
  editFormVisible$ = this.editService.editFormVisible;
  //adrress same as temporary field
  public firstValue: string = '';
  public secondValue: string = '';
  public thirdValue: string = '';
  public isBoxChecked: boolean = true;
  //store value for editing the page 
  public storingformvalue:any = { employeeCode:'',   
    employeeName:'',
  department:0,
  dob: new Date(''),
  doj: new Date(''),
  martialstatus: 0,
  dor:new Date(''),
  resignReasons:0,
  gender: 0,
  destination: 0,
  bloodGroup: 0,
  internet: 0,
  system: 0,
  ischecked: 0,
  reportingManager1:0,
  reportingLeader1: 0,
  reportingManager2:0 ,
  reportingLeader2: 0,
  proficiency:0,
  employeeHierachy: [],
  presentaddress1: '',
  permanentaddress1: '',
  presentaddress2: '',
  permanentaddress2: '',
  presentaddress3: '',
  permanentaddress3: '',
  phonenum: '',
  mobileNumber: '',
  emergencyContactName: '',
  emergencyMobilenumber:'', 
  officialemailaddress: '',
  employeeProcess: 0,
  employeeRoles: [],
  personalEmail: ''

}
  //Reporting Manager 1
  rm1options: any[] | any;
  selectedmanger1Value: string | any;

  //Reporting Leader 1
  rl1options: any[] | any;
  selectedleader1Value: string | any;
  //Reporting Manager 2
  rm2options: any[] | any;
  selectedmanger2Value: string | any;

  //Reporting Leader 2
  rl2options: any[] | any;
  selectedleader2Value: string | any;


  //EmployeeHierarchy
  selectControl = new FormControl();
  EmployeeHierarchyOptions: any[] | any;

  //EmployeeProcess
  selectEmployeeprocessControl = new FormControl();
  //EmployeeRole
  selectEmployeeRoleControl = new FormControl();


  employeeprocessOptions: any[] | any;
  //step validation
  isChecked = false;
  //martial status dropdown values
  martials: MARTIAL[] = [
    { value: '0', viewValue: 'SINGLE' },
    { value: '1', viewValue: 'MARRIED' },
  ];

  //resignValue status dropdown values
  resigns: RESIGN[] = [
    { resignvalue: '1', resignViewValue: 'HEALTHPROBLEM' },
    { resignvalue: '2', resignViewValue: 'PERSONALPROBLEM' },
    { resignvalue: '3', resignViewValue: 'BETTEROFFER' },
  ];
  //Gender dropdown values
  genders: GENDER[] = [
    { gendervalue: 'MALE', genderViewValue: 'MALE' },
    { gendervalue: 'FEMALE', genderViewValue: 'FEMALE' },
  ];
  //internet dropdown values
  internets: INTERNET[] = [
    { internetvalue: 'Yes', internetViewValue: 'Yes' },
    { internetvalue: 'No', internetViewValue: 'No' },
  ];
  //system dropdown values
  systems: SYSTEM[] = [
    { systemvalue: '0', systemViewValue: 'Yes' },
    { systemvalue: '1', systemViewValue: 'No' },
  ];
  //Gender dropdown values
  bloods: BLOOD[] = [
    { bloodvalue: 'A+-0', bloodViewValue: 'A+' },
    { bloodvalue: 'A--1', bloodViewValue: 'A-' },
    { bloodvalue: 'B+-1', bloodViewValue: 'B+' },
    { bloodvalue: 'B--1', bloodViewValue: 'B-' },
    { bloodvalue: 'AB+-1', bloodViewValue: 'AB+' },
    { bloodvalue: 'AB--1', bloodViewValue: 'AB-' },
    { bloodvalue: '0+-1', bloodViewValue: 'O+' },
    { bloodvalue: '0--1', bloodViewValue: '0-' },
  ];
  
  public updatedata: any;

  constructor(private builder: FormBuilder,
    private editService:EditService,
     private http: HttpClient, 
     private _empservice: EmployeeService, 
     private _dialogRef: MatDialogRef<AddEditEmployeecontrollerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) 
    
    
    {
      console.log(this.data);
      console.log(this.Empregister);
    const savedChecked = localStorage.getItem('isChecked');
    if (savedChecked) {
      this.isChecked = JSON.parse(savedChecked);
    }
  }
  isLinear = false;
  destinationoptions: any[] | any;

  //proficiency
  proficiencyoptions: any[] | any;
  //EmployeeRole
  EmployeeRolesoptions: any[] | any;

  selecteddepartmentOption: any = '';
  //store the sort values of employee hierarchy
  sortedData: any[];

  Departmentdropdownvalues: any[] = [];

    //Resign dropdowndeclaration
    selectedresignOption: any = '';
    Resigndropdownvalues: any[] =[];

  ngOnInit(): void {
 
    this.Empregister.patchValue(this.data);
    // department dropdown fetch the values from the API
    this.http.get<any>('https://localhost:7208/api/Employee/GetDropDownList').subscribe(departmentdata => {
      this.Departmentdropdownvalues = departmentdata.departmentList;
    });

    //destination dropdown fetch the api value to show it in dropdown
    this.http.get<any>('https://localhost:7208/api/Employee/GetDropDownList').subscribe(departmentdata => {
      this.destinationoptions = departmentdata.designationList;
    });

    //Employee Hierarchy dropdown fetch the api value to show it in dropdown
    this.http.get<any>('https://localhost:7208/api/Employee/GetEmployeeList').subscribe(departmentdata => {
      this.EmployeeHierarchyOptions = departmentdata;
      this.sortData();
    });

 // resign reason dropdown fetch the values from the API
    this.http.get<any>('https://localhost:7208/api/Employee/getresignresaonslist').subscribe(resignreasons => {
      this.Resigndropdownvalues = resignreasons;
    });

    //Employee Process dropdown fetch the api value to show it in dropdown
    this.http.get('https://localhost:7208/api/Process/ListProcess').subscribe(employeeprocessdata => {
      this.employeeprocessOptions = employeeprocessdata;
    });
    //proficiency dropdown fetch the api value to show it in dropdown
    this.http.get<any>('https://localhost:7208/api/Employee/GetDropDownList').subscribe(departmentdata => {
      this.proficiencyoptions = departmentdata.proficiencyList;
    });
    //EmployeeRoles dropdown fetch the api value to show it in dropdown
    this.http.get('https://localhost:7208/api/Employee/GetRolesList')
      .subscribe(data => {
        this.EmployeeRolesoptions = data as any[];
      });
    //reporting manager 1
    // this.http.get('https://api.example.com/options').subscribe(reportingmanager1options => {
    //   this.rm1options = reportingmanager1options;
    // });
    this.http.get<any>('https://localhost:7208/api/Employee/GetEmployeeList').subscribe(departmentdata => {
      this.rm1options = departmentdata;
      this.rm2options = departmentdata;
      this.rl1options = departmentdata;
      this.rl2options = departmentdata;
      this.EmployeeHierarchyOptions = departmentdata;
    });


    // //reporting leader 1
    // this.http.get('https://api.example.com/options').subscribe(reportingleader1options => {
    //   this.rl1options = reportingleader1options;
    // });
    // //reporting manager 2
    // this.http.get('https://api.example.com/options').subscribe(reportingmanager2options => {
    //   this.rm2options = reportingmanager2options;
    // });
    // //reporting leader 2
    // this.http.get('https://api.example.com/options').subscribe(reportingleader2options => {
    //   this.rl2options = reportingleader2options;
    // });

  }
  sortData() {
    this.sortedData = this.EmployeeHierarchyOptions.sort((a, b) => {
      return a - b; // Change this to the property name you want to sort by
    });
  }

  //checkbox
  ngOnChanges() {
    localStorage.setItem('isChecked', JSON.stringify(this.isChecked));
  }


   
  Empregister = this.builder.group({
    basic: this.builder.group({
      // employeeCode: this.builder.control(this.storingformvalue.employeeCode, Validators.required),
       employeeCode: this.builder.control(this.data?.employeeCode, Validators.required),
      employeeName: this.builder.control(this.data?.employeeName, Validators.required),
      department: this.builder.control(this.data?.departmentId, Validators.required),
      dob: this.builder.control(this.data?.dateOfBirth, Validators.required),
      doj: this.builder.control(this.data?.dateOfJoining, Validators.required),
      martialstatus: this.builder.control(this.data?.maritalStatus, Validators.required),
      dor: this.builder.control(this.data?.dateOfResignation, Validators.required),
      resignReasons: this.builder.control(this.data?.resignReasons, Validators.required),
      gender: this.builder.control(this.data?.gender, Validators.required),
      destination: this.builder.control(this.data?.designationId, Validators.required),
      bloodGroup: this.builder.control(this.data?.bloodGroup, Validators.required),
      internet: this.builder.control(this.data?.isInternetConnection, Validators.required),
      system: this.builder.control(this.data?.isSystem, Validators.required),
      isOutOfSourceChecked: this.builder.control(this.data?.isOutsource, Validators.required),

    }),
    contact: this.builder.group({
      reportingManager1: this.builder.control(this.data?.reportingManager1, Validators.required),
      reportingLeader1: this.builder.control(this.data?.reportLeader1, Validators.required),
      reportingManager2: this.builder.control(this.data?.reportingManager2, Validators.required),
      reportingLeader2: this.builder.control(this.data?.reportingLeader2, Validators.required),
      proficiency: this.builder.control(this.data?.proficiency, Validators.required),
      employeeHierachy: this.builder.control(this.data?.employeeHierachy, Validators.required),

    }),
    address: this.builder.group({
      presentaddress1: this.builder.control(this.data?.presentaddress1, Validators.required),
      permanentaddress1: this.builder.control(this.data?.permanentaddress1, Validators.required),
      presentaddress2: this.builder.control(this.data?.presentaddress2, Validators.required),
      permanentaddress2: this.builder.control(this.data?.permanentaddress2, Validators.required),
      presentaddress3: this.builder.control(this.data?.presentaddress3, Validators.required),
      permanentaddress3: this.builder.control(this.data?.permanentaddress3, Validators.required),
      phonenum: this.builder.control(this.data?.phonenum, Validators.required),
      mobileNumber: this.builder.control(this.data?.mobileNumber, Validators.required),
      emergencyContactName: this.builder.control(this.data?.emergencyContactName, Validators.required),
      emergencyMobilenumber: this.builder.control(this.data?.emergencyMobilenumber, Validators.required),
      officialemailaddress: this.builder.control(this.data?.officialemailaddress, Validators.required),
      employeeProcess: this.builder.control(this.data?.employeeProcess, Validators.required),
      employeeRoles: this.builder.control(this.data?.employeeRoles, Validators.required),
      personalEmail: this.builder.control(this.data?.personalEmail, Validators.required),
    })
  });

  get Basicform() {
    return this.Empregister.get("basic") as FormGroup;
  }
  get contactform() {
    return this.Empregister.get("contact") as FormGroup;
  }
  get addressform() {
    return this.Empregister.get("address") as FormGroup;
  }
  HandleSubmit() {
    if (this.Empregister.valid) {
      console.log(this.Empregister.value);
    }
  }

  onFormSubmit() {
    const roleValues = [{}];
    const storingrolevariable = this.EmployeeRolesoptions.filter(x => {
      this.Empregister.value.address?.employeeRoles?.forEach((y): any => {

        if (x.id == y) {
          roleValues.push(
            {
              roleDescription: x.description,
              roleId: x.id,
              createdBy: 152,
              updatedBy: 0
            }
          );

          return {
            roleValues
          }
        }
      })
    })

    const hierarchyvalues = [{}];
    const storinghierarchyvariable = this.EmployeeHierarchyOptions.filter(x => {
      this.Empregister.value.contact?.employeeHierachy?.forEach((y): any => {

        if (x.employeeId == y) {
          hierarchyvalues.push(
            {
              subEmpId: x.employeeId,
              subEmpName: x.employeeName,
              createdBy: 152
            }
          );

          return {
            hierarchyvalues
          }
        }
      })
    })

    //  console.log(hierarchyvalues)
    //  console.log(roleValues)

    
   
    if (this.Empregister.valid) {


      if (this.data) {
        var updatedata = {
          employeeId: 0,
          employeeCode: this.Empregister.value.basic?.employeeCode,
          employeeName: this.Empregister.value.basic?.employeeName,
          departmentId: this.Empregister.value.basic?.department,
          designationId: this.Empregister.value.basic?.destination,
          dateOfJoining: this.Empregister.value.basic?.doj,
          dateOfResigning: this.Empregister.value.basic?.dor,
          dateOfBirth: this.Empregister.value.basic?.dob,
          bloodGroup: this.Empregister.value.basic?.bloodGroup,
          gender: this.Empregister.value.basic?.gender,
          maritalStatus: this.Empregister.value.basic?.martialstatus,
          companyId: 0,
          profiencyId: this.Empregister.value.contact?.proficiency,
          emergencyContactName: this.Empregister.value.address?.emergencyContactName,
          emergencyContactNo: this.Empregister.value.address?.emergencyMobilenumber,
          email: this.Empregister.value.address?.officialemailaddress,
          personalEmail: this.Empregister.value.address?.personalEmail,
          createdUTC: "2023-03-14T11:28:30.034Z",
          createdBy: 152,
          updatedUTC: "2023-03-14T11:28:30.034Z",
          updatedBy: 152,
          reportingManager1: this.Empregister.value.contact?.reportingManager1,
          reportLeader1: this.Empregister.value.contact?.reportingLeader1,
          reportingManager2: this.Empregister.value.contact?.reportingManager2,
          reportingLeader2: this.Empregister.value.contact?.reportingLeader2,
          address1: this.Empregister.value.address?.permanentaddress1,
          address2: this.Empregister.value.address?.permanentaddress2,
          address3: this.Empregister.value.address?.permanentaddress3,
          address11: this.Empregister.value.address?.presentaddress1,
          address22: this.Empregister.value.address?.presentaddress2,
          address33: this.Empregister.value.address?.presentaddress3,
          locationId: 0,
          locationId1: 0,
          addressType: "Permanent",
          mobileNo: this.Empregister.value.address?.mobileNumber,
          phoneNo: this.Empregister.value.address?.phonenum,
          resignReasons: this.Empregister.value.basic?.resignReasons,
          dateOfResignation: this.Empregister.value.basic?.dor,
          processCode: this.Empregister.value.address?.employeeProcess,
          result: true,
          roleDescription: '',
          isOutsource: this.Empregister.value.basic?.isOutOfSourceChecked,
          isInternetConnection: this.Empregister.value.basic?.internet,
          isSystem: this.Empregister.value.basic?.system,
          netWorkType: "",
          serviceProvider: "",
          systemConfig: "",
          empRolesList: roleValues.slice(1),
          empHierarchyList: hierarchyvalues.slice(1),
          
        }
        console.log(this.data,"updatedata")
        this._empservice
          .updateEmployee(this.updatedata)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        var data = {
          employeeId: 0,
          employeeCode: this.Empregister.value.basic?.employeeCode,
          employeeName: this.Empregister.value.basic?.employeeName,
          departmentId: this.Empregister.value.basic?.department,
          designationId: this.Empregister.value.basic?.destination,
          dateOfJoining: this.Empregister.value.basic?.doj,
          dateOfResigning: this.Empregister.value.basic?.dor,
          dateOfBirth: this.Empregister.value.basic?.dob,
          bloodGroup: this.Empregister.value.basic?.bloodGroup,
          gender: this.Empregister.value.basic?.gender,
          maritalStatus: this.Empregister.value.basic?.martialstatus,
          companyId: 0,
          profiencyId: this.Empregister.value.contact?.proficiency,
          emergencyContactName: this.Empregister.value.address?.emergencyContactName,
          emergencyContactNo: this.Empregister.value.address?.emergencyMobilenumber,
          email: this.Empregister.value.address?.officialemailaddress,
          personalEmail: this.Empregister.value.address?.personalEmail,
          createdUTC: "2023-03-14T11:28:30.034Z",
          createdBy: 152,
          updatedUTC: "2023-03-14T11:28:30.034Z",
          updatedBy: 0,
          reportingManager1: this.Empregister.value.contact?.reportingManager1,
          reportLeader1: this.Empregister.value.contact?.reportingLeader1,
          reportingManager2: this.Empregister.value.contact?.reportingManager2,
          reportingLeader2: this.Empregister.value.contact?.reportingLeader2,
          address1: this.Empregister.value.address?.permanentaddress1,
          address2: this.Empregister.value.address?.permanentaddress2,
          address3: this.Empregister.value.address?.permanentaddress3,
          address11: this.Empregister.value.address?.presentaddress1,
          address22: this.Empregister.value.address?.presentaddress2,
          address33: this.Empregister.value.address?.presentaddress3,
          locationId: 0,
          locationId1: 0,
          addressType: "Permanent",
          mobileNo: this.Empregister.value.address?.mobileNumber,
          phoneNo: this.Empregister.value.address?.phonenum,
          resignReasons: this.Empregister.value.basic?.resignReasons,
          dateOfResignation: this.Empregister.value.basic?.dor,
          processCode: this.Empregister.value.address?.employeeProcess,
          result: true,
          roleDescription: '',
          isOutsource: this.Empregister.value.basic?.isOutOfSourceChecked,
          isInternetConnection: this.Empregister.value.basic?.internet,
          isSystem: this.Empregister.value.basic?.system,
          netWorkType: "",
          serviceProvider: "",
          systemConfig: "",
          empRolesList: roleValues.slice(1),
          empHierarchyList: hierarchyvalues.slice(1),
        }
        
        console.log(data,"Before data");
        this._empservice.addEmployee(data).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
        console.log(data,"after data");
      }
    }
  }





  //Entering new role will store into the database
  formVisible = false;
  formData = {
    id: 0,
    description: '',
    companyId: 0,
    createdBy: 152,
    createdUtc: "2023-03-14T11:28:30.034Z",
    updatedBy: 0,
    updatedUtc: "2023-03-14T11:28:30.034Z",
    isActive: true

    // add more form fields here as needed
  };


  showForm() {
    this.formVisible = true;
  }

  hideForm() {
    this.formVisible = false;
  }



  newRoleSubmit() {
    // Send the form data to the backend to store in the database
    // For example, using Angular's HttpClient module:
    this.http.post('https://localhost:7208/api/Employee/AddEmpNewRoles', this.formData).subscribe(() => {
      // Show a success message to the user
      alert('Data saved successfully!');
      // Close the form
      this.hideForm();
    }, () => {
      // Show an error message to the user
      alert('An error occurred while saving the data.');
    });
  }
}