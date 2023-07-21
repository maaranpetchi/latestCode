import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../Spinner/spinner.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { CoreService } from 'src/app/Services/CustomerVSEmployee/Core/core.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/Environments/environment';

@Component({
  selector: 'app-bench-options',
  templateUrl: './bench-options.component.html',
  styleUrls: ['./bench-options.component.scss']
})
export class BenchOptionsComponent implements OnInit {
  list: any;
  disableWorkTypeEnd: boolean;

  Statusid: string = '';
  Remarks: string = '';
  ngOnInit(): void {
    this.getStatus();
  }
  constructor(private http: HttpClient, private _coreService: CoreService, private loginservice: LoginService, private spinnerService: SpinnerService, private router: Router) { }
  disableWorkType: boolean;


  GetStatuslist: any[] = [];
  getStatus() {
    this.http.get<any>(environment.apiURL + `BenchOption/GetStatus?EmployeeId=${this.loginservice.getUsername()}`).subscribe(results => {
      this.GetStatuslist = results.data
    })
  }

  changeBench(data) {
    if (data == 'Start') {
      var Startbench = {
        EmployeeId: this.loginservice.getUsername(),
        Status:''
      }

      this.http.post<any>(environment.apiURL + `BenchOption/Startbench?Worktype=Start`, Startbench).subscribe(result => {
        console.log(result, "Start");
        this.list = result;
        if (result.data == true) {
          this.disableWorkType = true;
          this.disableWorkTypeEnd = false;
        }

      });


    }
    else if (data == 'Break') {
      var Startbench = {
        EmployeeId: this.loginservice.getUsername(),
        Status:''
      }
      this.http.post<any>(environment.apiURL + `BenchOption/Startbench?Worktype=Break`, Startbench).subscribe(result => {
        console.log(result, "Break");
        this.list = result;
        if (result.data == true) {
          this.disableWorkType = false;
          this.disableWorkTypeEnd = true;
        }

      });

    }
    else {

      let Startbench = {
        Status: this.Statusid,
        EmployeeId: this.loginservice.getUsername(),
        Remarks: this.Remarks,
      }

      this.http.post<any>(environment.apiURL + `BenchOption/Startbench?Worktype=End`, Startbench).subscribe(result => {
        this.list = result;
        if (result.data == true) {
          this.Statusid = "";
          this.Remarks = "";
          this.disableWorkType = false;
          this.disableWorkTypeEnd = true;
          this._coreService.openSnackBar("End files successfully!")
        }
      });
      // else {
      //     alert('in else');
      // }
    }
  }


  submit() {

  }
}
