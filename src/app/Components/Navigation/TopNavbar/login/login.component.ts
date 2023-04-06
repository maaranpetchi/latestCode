import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/Services/Login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  user:any;
  constructor(private loginservice: LoginService, private router: Router,private cookieService: CookieService) {}

  onSubmit() {
    this.loginservice.login(this.username, this.password).subscribe(result => {
      if (result) {
        // this.user.loggedInUser = this.user;
        this.cookieService.set('token', result.user.employeeName);
        this.cookieService.set('username', result.user.employeeId);
        this.username = this.user;
        this.router.navigate(['/topnavbar/dashboard']);
      }
    });
  }

  
}