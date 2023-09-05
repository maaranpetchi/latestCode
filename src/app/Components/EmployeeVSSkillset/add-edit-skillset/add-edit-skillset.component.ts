import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/Environments/environment';
import { EmpvsdivService } from 'src/app/Services/EmployeeVSDivision/empvsdiv.service';
import { EmployeevsskillsetService } from 'src/app/Services/EmployeeVsSkillset/employeevsskillset.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { SpinnerService } from '../../Spinner/spinner.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-edit-skillset',
  templateUrl: './add-edit-skillset.component.html',
  styleUrls: ['./add-edit-skillset.component.scss']
})
export class AddEditSkillsetComponent implements OnInit {
  getSelectedProficiency: any;
  apiResponseData: any;
  filteredEmployeeCodes: any[] = [];
  ngOnInit(): void {
    this.getEmployeeCode();
  }

  constructor(private http: HttpClient, private loginservice: LoginService, private _empservice: EmployeevsskillsetService, private spinnerService: SpinnerService,private router:Router ) { }

  //Search 
  inputValue: string = ''; // Input value from the text field

  // Filter employee codes based on input value
  get matchingEmployeeCodes() {
    return this.employeeCodes.filter(code => code.employeeCode.includes(this.inputValue));
  }

  // Update selected employee code when input matches a code
  filterEmployeeCodes() {
    this.filteredEmployeeCodes = this.employeeCodes.filter(code => code.employeeCode.includes(this.inputValue));
  }

  //EmployeeName
  EmployeeName: boolean = true;
  selectedEmployeeName: any;
  //EmployeeCode
  employeeCodes: any[] = [];
  selectedEmployeeCode: any; // Property to store selected code
  onSelectCode(code: string): void {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/GetEmployeeCodeByEmployeeId?employeeid=${code}`).subscribe({
      next: (getEmployeeName) => {
        this.spinnerService.requestEnded();

        this.selectedEmployeeName = getEmployeeName.employeeName;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }

    })
    // this.selectedEmployeeCode = code;
  }
  getEmployeeCode() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/GetDropDownList`).subscribe({
      next: (getCode) => {
        this.spinnerService.requestEnded();

        this.employeeCodes = getCode.employeelist,
          this.filteredEmployeeCodes = this.employeeCodes; // Initialize the filtered list with all codes
        this.divisions = getCode.divisionlist;
        this.scopeOptions = getCode.skilllist;
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        Swal.fire(
          'Error!',
          'An error occurred !',
          'error'
        );
      }

    })
  }



  //Division
  selectedDivision: any;
  divisions: any[] = [];

  //WorkingStatus
  selectedWorkingStatus: string = ''; // To store the selected option
  WorkingStatus: string[] = ['Work From Home', 'Office'];


  //scope
  selectedScope: any;
  scopeOptions: any[] = []


  //Proficiency
  selectedProficiency: string = ''; // Property to store the selected value

  //table
  tableData: any[] = [];
  tableDisplay: boolean = false
  addItem() {

    if (this.selectedScope && this.selectedProficiency) {
      

      this.tableDisplay = true;
      const skillsetId = this.selectedScope
      const skill = this.scopeOptions.find(scope => scope.id === this.selectedScope)?.description || '';
      const ProficiencyLevel = this.selectedProficiency;
      this.tableData.push({ skillsetId, skill, ProficiencyLevel, AddCountpara: [], EmployeeCode: '', EmployeeName: '', WorkingStatus: '', });
      this.selectedScope = null;
      this.getSelectedProficiency = this.selectedProficiency;
      this.selectedProficiency = '';
    }
  }

  removeItem(index: number) {
    this.tableData.splice(index, 1);
  }


  onSubmit() {

    

    let payload = {
      "employeeId": this.selectedEmployeeCode.employeeId,
      "employeeCode": this.selectedEmployeeCode.employeeCode,
      "employeeName": this.selectedEmployeeName,
      "divisionId": this.selectedDivision,
      "workingStatus": this.selectedWorkingStatus,
      "skillsetId": 0,
      "proficiencyLevel": this.getSelectedProficiency,
      "createdBy": this.loginservice.getUsername(),
      "updatedBy": this.loginservice.getUsername(),
      "addCountpara": this.tableData

    }
    this.spinnerService.requestStarted();
    this.http.post<any>(environment.apiURL + `EmployeeVsSkillset/CreateEmployeeSkillset`, payload).subscribe({
      next: (response) => {
        this.spinnerService.requestEnded();

        Swal.fire(
          'Done!',
          response.evSList,
          'success'
        ).then((result)=>{
          if (result.isConfirmed) {
            this.router.navigate(['/topnavbar/indexskillset']);
        }
        })
      },
      error: (err) => {
        this.spinnerService.resetSpinner(); // Reset spinner on error
        Swal.fire(
          'Error!',
          'An error occurred !.',
          'error'
        );
      }
    })
  }
}
