import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { LogoutService } from 'src/app/Services/Logout/logout.service';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss']
})
export class TopnavbarComponent {
constructor(private loginservice:LoginService ,private router: Router, private logoutService:LogoutService,private cookieService: CookieService){}

  getloginusername():string{
    return this.loginservice.getToken();
  }

  toggleNav(nav:any){
    if(nav.opened){
      nav.close()
    }else{
      nav.open();
    }
  }

  logout() {
    this.logoutService.logout().subscribe(
      response => {
        // do something with the response if needed
        this.cookieService.delete('username', '/');
        this.cookieService.delete('token', '/');
        this.router.navigate(['/login']);
      },
      error => {
        // handle the error if needed
      }
    );
  }
}
