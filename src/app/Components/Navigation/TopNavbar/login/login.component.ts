import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(-50%)' })),
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
  showUsernameField: boolean;
  showPasswordField: boolean;
  constructor(
    private loginservice: LoginService,
    private router: Router,
    private cookieService: CookieService,
    private spinnerService:SpinnerService,
  ) { }

  labelState = 'default';

  ngOnInit() {
    this.showUsernameField = false;
    this.showPasswordField = false;
  }


  
  // showUsernameField = true;
  // showPasswordField = true;

    onSubmit() {
    this.spinnerService.requestStarted();
    this.isSubmitted = true;
    this.showUsernameField = false;
    this.showPasswordField = false;
    this.loginservice.login(this.username, this.password).subscribe({
      next: (result) => {
      this.spinnerService.requestEnded();
      if (result) {
        this.cookieService.set('token', result.user.employeeName);
        this.cookieService.set('username', result.user.employeeId);
        // this.cookieService.set('password',window.btoa( result.user.password));
        this.username = this.user;
        this.router.navigate(['/topnavbar/dashboard']);
      }
    },
    error:(err) =>{
      this.spinnerService.resetSpinner();
    }
    });
  }
}
