import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-add-edit-skillset',
  templateUrl: './add-edit-skillset.component.html',
  styleUrls: ['./add-edit-skillset.component.scss']
})
export class AddEditSkillsetComponent implements OnInit {
  ngOnInit(): void {
    this.getEmployeeCode();
  }

  constructor(private http: HttpClient) { }

  //Search 
  inputValue: string = ''; // Input value from the text field

  // Filter employee codes based on input value
  get matchingEmployeeCodes() {
    return this.employeeCodes.filter(code => code.employeeCode.includes(this.inputValue));
  }

  // Update selected employee code when input matches a code
  checkDropdownValue() {
    const matchingCode = this.employeeCodes.find(code => code.employeeCode === this.inputValue);
    if (matchingCode) {
      this.selectedEmployeeCode = matchingCode.employeeId;
    }
  }

  //EmployeeCode
  employeeCodes: any[] = [];
  selectedEmployeeCode: any; // Property to store selected code
  onSelectCode(code: string): void {

    console.log(code, "CodeId");
    this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/GetEmployeeCodeByEmployeeId?employeeid=${code}`).subscribe(getEmployeeName => {
      this.selectedEmployeeName = getEmployeeName.employeeName;
    })
    // this.selectedEmployeeCode = code;
  }
  getEmployeeCode() {
    this.http.get<any>(environment.apiURL + `EmployeeVsSkillset/GetDropDownList`).subscribe(getCode => {
      this.employeeCodes = getCode.employeelist,
        this.divisions = getCode.divisionlist;
        this.scopeOptions = getCode.skilllist  ;
    })
  }

  //EmployeeName
  EmployeeName: boolean = true;
  selectedEmployeeName: any;


  //Division
  selectedDivision: any;
  divisions: any[] = [];

  //WorkingStatus
  selectedWorkingStatus: string = ''; // To store the selected option
  WorkingStatus: string[] = ['Work From Home', 'Office'];


  //scope
  selectedScope: string;
  scopeOptions: any[] = []



}
