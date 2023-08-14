import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { EmployeevsskillsetService } from 'src/app/Services/EmployeeVsSkillset/employeevsskillset.service';
import { TransitionCheckState } from '@angular/material/checkbox';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/Environments/environment';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-update-skill-set',
  templateUrl: './update-skill-set.component.html',
  styleUrls: ['./update-skill-set.component.scss']
})
export class UpdateSkillSetComponent implements OnInit {
  apiResponseData: any;
  ngOnInit(): void {
    let data: any[] = [];
    if (this._empservice.shouldFetchData) {
      const data = this._empservice.getViewData();
      console.log(data, "Data 1");
      this.apiResponseData = data.data;
      console.log(this.apiResponseData, "apiresponsedata");

      this.fetchUpdateData();
      this._empservice.shouldFetchData = false;
    }
  }

  constructor(private http: HttpClient, private router: Router, private spinnerService: SpinnerService, private _empservice: EmployeevsskillsetService,private loginservice:LoginService) { }

  employeeSkill: any;
  selectedProficiency:any
  fetchUpdateData() {
    this.employeeSkill = this.apiResponseData.skillSetName
  }

  updateForm(){
    let payload={
      "id": this.apiResponseData.id,
      "employeeId": this.apiResponseData.employeeId ,
      "employeeCode": this.apiResponseData.employeeCode ,
      "employeeName": this.apiResponseData.employeeName,
      "divisionId": this.apiResponseData.divisionId,
      "workingStatus": this.apiResponseData.workingStatus,
      "skillsetId": this.apiResponseData.skillSetId,
      "proficiencyLevel": this.apiResponseData.proficiencyLevel,
      "isDeleted": true,
      "createdBy": this.loginservice.getUsername(),
      "createdUtc": new Date().toISOString,
      "updatedBy": 0,
      "updatedUtc":  new Date().toISOString,
      "skillset": {
        "id": this.apiResponseData.skillSetId,
        "description": this.apiResponseData.skillSetName,
        "isDeleted": true,
        "createdBy": 0,
        "createdUtc": new Date().toISOString,
        "updatedBy": 0,
        "updatedUtc": new Date().toISOString
      }
    }

    this.http.post<any>(environment.apiURL+`EmployeeVsSkillset/UpdateEmployeeSkill`,payload).subscribe(response =>{
      Swal.fire(
        'Done!',
        'Updated Data Successfully!',
        'success'
      )
    })
  }
}