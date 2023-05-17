import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/Services/Login/login.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isSubmitted: boolean;
  user: any;

  constructor(
    private loginservice: LoginService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  labelState = 'default';

  ngOnInit() {
  
  }



  onSubmit() {
    this.isSubmitted = true;
    this.loginservice.login(this.username, this.password).subscribe(result => {
      if (result) {
        this.cookieService.set('token', result.user.employeeName);
        this.cookieService.set('username', result.user.employeeId);
        this.username = this.user;
        this.router.navigate(['/topnavbar/dashboard']);
      }
    });
  }
}
