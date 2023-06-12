import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/Services/Login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in')
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ transform: 'translateX(0%)' }))
      ])
    ])
  ]
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

  showUsernameField = true;
  showPasswordField = true;

  onSubmit() {
    this.isSubmitted = true;
    this.showUsernameField = false;
    this.showPasswordField = false;
    this.loginservice.login(this.username, this.password).subscribe(result => {
      console.log(result,"login");
      if (result) {
        this.cookieService.set('token', result.user.employeeName);
        this.cookieService.set('username', result.user.employeeId);
        // this.cookieService.set('password',window.btoa( result.user.password));
        this.username = this.user;
        this.router.navigate(['/topnavbar/dashboard']);
      }
    });
  }
}
