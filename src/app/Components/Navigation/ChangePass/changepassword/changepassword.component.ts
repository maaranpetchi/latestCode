import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  passwordForm: FormGroup;
  passwordsMatch: boolean = true;
 

  constructor(private fb: FormBuilder, private getCookie:CookieService ,private snackBar: MatSnackBar,private http: HttpClient, private loginservice: LoginService) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.checkPasswords
    });
  }
  getloginusername(): string {
    return this.loginservice.getToken();
  }

  checkPasswords(group: FormGroup) {
    let newPassword = group.get('newPassword')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const userId = 0;
      const oldPassword = this.passwordForm.value.oldPassword; 

      this.http.post('https://localhost:7208/api/Account/ChangePassword', {
        "userId": userId,
        "oldPassword": oldPassword,
        "latestPassword": this.passwordForm.value.newPassword,
        "conformPassword": this.passwordForm.value.confirmPassword
      }).subscribe(
        (response) => {
          console.log('Password change successful!');
          this.snackBar.open('Password changed successfully!', 'Close', {
            duration: 3000
          });
        },
        (error) => {
          console.error('Password change failed:', error);
         
        }
      );
    }
  } 
}
