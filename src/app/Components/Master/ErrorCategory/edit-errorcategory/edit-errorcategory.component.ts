import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorCategoryService } from 'src/app/Services/Errorcategory/error-category.service';

@Component({
  selector: 'app-edit-errorcategory',
  templateUrl: './edit-errorcategory.component.html',
  styleUrls: ['./edit-errorcategory.component.scss']
})
export class EditErrorcategoryComponent implements OnInit{

  
  departments: any[];
  responseData: any;

  constructor (
    private builder:FormBuilder,
    private _service:ErrorCategoryService,
    private route:Router
    
    ){}
    
  scopeID:any;
  ngOnInit(): void {
    this.errorCategoryList()
    console.log(history.state.data, 'responseData');
    this.responseData = history.state.data;
    this.userRegistrationForm.get('departmentName')?.patchValue(this.responseData.department.id);
    this.userRegistrationForm.get('description')?.patchValue(this.responseData.description);
  }
  
  userRegistrationForm = this.builder.group({
    departmentName: '',
    description: '',
  });
  errorCategoryList(){
    this._service.getErrorCategoryList().subscribe((data) => {
      this.departments = data;
      console.log(data, 'Departments');
    });
  }
  onFormSubmit(){

  }

  onCancel(){
    this.route.navigate(['/topnavbar/errorCategory']);
  }

}
