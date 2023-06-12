import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScopeService } from 'src/app/Services/Scope/scope.service';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-edit-scope',
  templateUrl: './view-edit-scope.component.html',
  styleUrls: ['./view-edit-scope.component.scss'],
})
export class ViewEditScopeComponent implements OnInit {
  selectedAccessNameOption: string;

  selectedDepartment: '';
  data: any;
  responseData: any;
  departments: any[];
  isAddMode!: boolean;

  constructor(
    private _scopeService: ScopeService,
    private builder: FormBuilder,
    private router: Router,
    private _coreService: CoreService,
    private loginservice: LoginService,
    private http: HttpClient
  ) {}
  scopeID: any;
  ngOnInit(): void {
    this.listScope();

    console.log(history.state.data, 'responseData');
    this.responseData = history.state.data;
    // this.scopeID = this.responseData.department.id;
    this.userRegistrationForm
      .get('departmentName')
      ?.patchValue(this.responseData.department.id);
    this.userRegistrationForm
      .get('description')
      ?.patchValue(this.responseData.description);

    // this._scopeService.getScopeData().subscribe((data: any) => {
    // });
  }

  userRegistrationForm = this.builder.group({
    departmentName: '',
    description: '',
  });

  // getScopeDetails(id:any) {
  //   this.http
  //     .get(`https://localhost:7208/api/Scope/GetScopeDetails?Id=${id}`)
  //     .subscribe((response: any) => {
  //       // this.router.navigate(["topnavbar/master-scope/edit"], {state:{data:response}});
  //     });
  // }

  listScope() {
    this._scopeService.listScopes().subscribe((data) => {
      this.departments = data.departmentList;
      console.log(data.departmentList, 'Departments');
    });
  }

  onFormSubmit() {
    console.log(this.userRegistrationForm.value.description, 'description');

    let saveData = {
      id:  this.responseData.id,
      departmentId: this.userRegistrationForm.value.departmentName,
      description: this.userRegistrationForm.value.description,
      isDeleted: false,
      createdUtc:new Date().toISOString(),
      updatedUtc: new Date().toISOString(),
      createdBy: this.loginservice.getUsername(),
      updatedBy: this.loginservice.getUsername(),
      needTraining: false,
      scopeGroupId: null,
      department: {
        id: this.userRegistrationForm.value.departmentName,
        description: this.departments.find(
          (d) => d.id === this.userRegistrationForm.value.departmentName
        ).description,
        isDeleted: false,
        createdUtc: new Date().toISOString(),
        updatedUtc: new Date().toISOString(),
        createdBy: this.loginservice.getUsername(),
        updatedBy: this.loginservice.getUsername(),
      },
    };
    this._scopeService.updateScope(saveData).subscribe({
      next: (response: any) => {
        if (this.data) {
          this._coreService.openSnackBar('Scope detail updated!');
          console.log(response);
        } else {
          return;
        }
      },
      error: (err: any) => {
        throw new Error('API Error', err);
      },
    });
  }
  onCancel() {
    this.router.navigate(['/topnavbar/master-scope']);
  }
}
