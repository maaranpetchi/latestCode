import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { LogoutService } from 'src/app/Services/Logout/logout.service';
import { ChangepasswordComponent } from '../../ChangePass/changepassword/changepassword.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { environment } from 'src/Environments/environment';
import { SpinnerService } from 'src/app/Components/Spinner/spinner.service';


@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss'],
  animations: [
    trigger('sidenavAnimation', [
      state('void', style({ transform: 'translateX(-100%)' })),
      transition(':enter', [
        animate('0.3s', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('0.3s', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class TopnavbarComponent implements OnInit {
  isAdmin: any;
  menus: any;
  showingMenu: any;
  constructor(private _dialog: MatDialog, private loginservice: LoginService, private router: Router, private logoutService: LogoutService, private cookieService: CookieService, private http: HttpClient, private spinnerService: SpinnerService) { }
  ngOnInit(): void {
    this.getProcesses();
    this.checkIsAdmin();
  }


  //toggle 
  isSidenavOpen = true;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }




  getloginusername(): string {
    return this.loginservice.getToken();
  }

  toggleNav(nav: any) {
    if (nav.opened) {
      nav.close()
    } else {
      nav.open();
    }
  }

  logout() {
    this.logoutService.logout().subscribe(
      response => {
        // do something with the response if needed
        this.cookieService.delete('token');
        this.cookieService.delete('username');
        this.cookieService.deleteAll();
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error => {
        // handle the error if needed
      }
    );
  }

  openchangepassword() {
    const dialogRef = this._dialog.open(ChangepasswordComponent);
    dialogRef.afterClosed().subscribe({
      // next: (val) => {
      //   if (val) {
      //     this.getEmployeeList();
      //   }
      // },
    });

  }

  Processes: any[] = [];
  getProcesses() {
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Account/getEmployeeProcess/${this.loginservice.getUsername()}`).subscribe(data => {
      this.spinnerService.requestEnded();
      this.Processes = data.employeeProcess;
    }, error => {
      this.spinnerService.resetSpinner();
    });
  }

  routeNav(process: any) {
    if (process.id == 1) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/clientindex']);
    }
    else if (process.id == 2) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/production']);
    }
    else if (process.id == 3) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/productionmain']);
    }
    else if (process.id == 4) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/qualityallocation']);
    }
    else if (process.id == 5) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/quality']);
    }
    else if (process.id == 6) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/proofreadingallocation']);
    }
    else if (process.id == 7) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/proofreading']);
    }
    else if (process.id == 9) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/buddyproof']);
    }
    else if (process.id == 11) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/sewout']);
    }
    else if (process.id == 1013) {
      this.cookieService.set('processId', process.id);
      this.cookieService.set('processName', process.name);
      this.router.navigate(['/topnavbar/Reports']);
    }
  }




  //////////////////////SideNavbar////////////////////////////
  // checkIsAdmin() {
  //   // this.loader = true;
  //   this.spinnerService.requestStarted();
  //   this.http.get<any>(environment.apiURL + `Account/checkIsAdmin/${this.loginservice.getUsername()}`).subscribe(
  //     (data) => {
  //       this.spinnerService.requestEnded();
  //       this.isAdmin = data.success;
  //       this.menus = data.menu;

  //       if (this.menus != null && this.menus.length > 0) {
  //         this.menus = this.menus.split(',');
  //         this.menus.forEach((menu) => {
  //           menu = menu.replace('|', '_').replace('|', '_');
  //           this.showingMenu = menu;
  //           
  //           this[menu] = true;
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.error('Error checking admin status:', error);
  //     },
  //     () => {
  //       this.spinnerService.resetSpinner();
  //     }
  //   );
  // }
  // Online Javascript Editor for free
  // Write, Edit and Run your Javascript code using JS Online Compiler
  permission: any[] = []
  checkIsAdmin() {
    // this.loader = true;
    this.spinnerService.requestStarted();
    this.http.get<any>(environment.apiURL + `Account/checkIsAdmin/${this.loginservice.getUsername()}`).subscribe(
      (data) => {
        this.spinnerService.requestEnded();
        this.isAdmin = data.success;
        this.permission = this.GetMenuPermission(data.menu);
      },
      (error) => {
        console.error('Error checking admin status:', error);
      },
      () => {
        this.spinnerService.resetSpinner();
      }
    );
  }
  GetMenuPermission(val: string) {

    if (val) {

      val = val.replaceAll('|', '');
      const b = val.split(',');
      const c = b.map(x => parseInt(x))
      
      return c;
    }
    return [];
  }


  checkIsTrue(inputarray, isAdmin) {
    let result = false
    if (isAdmin) {
      result = true;
    }
    if (!result) {
      this.permission.forEach(x => {
        if (inputarray.includes(x)) {
          result = true;

        }
      })
    }
    return result;
  }

}
