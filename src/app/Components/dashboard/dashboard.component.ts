import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/Environments/environment';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public firstValue: string='';
  public secondValue: string='';
  public thirdValue: string='';
  public isChecked: boolean=true;
  process: { Id: any; Name: any; };
  constructor(private http:HttpClient,private router:Router,private loginservice:LoginService) { }

  ngOnInit(): void {
  }
  employeeProcess:any;



  getData(){
    this.http.get<any>(environment.apiURL+`Account/getEmployeeProcess/${this.loginservice.getUsername()}`).subscribe(results =>{
      this.employeeProcess = results.employeeProcess
      if (this.employeeProcess != null) {
        if (this.employeeProcess.length > 1) {
        }
        else if (this.employeeProcess.length == 1) {
            this.process = {
                Id: this.employeeProcess[0].id,
                Name: this.employeeProcess[0].name
            };
            if (this.process.Name != "Reports")
            {
                this.gotoProcess(process);
            }
        }
    }
    else {
        alert('This Employee don\'t have permission')
    }
      });
  }

  gotoProcess(process: any) {
    localStorage.setItem('processId', process.id);
    localStorage.setItem('processName', process.name);

    if (process.id == 1) {
      this.router.navigate(['/topnavbar/clientindex']);
    } else if (process.id == 2 || process.id == 4 || process.id == 6) {
      this.router.navigate(['/PendingJobList']);
    } else if (process.id == 3 || process.id == 5 || process.id == 7 || process.id == 9 || process.id == 11) {
      this.router.navigate(['/Workflow']);
    } else if (process.Name == "Reports") {
      this.openReportsWindow();
    }
  }

  openReportsWindow() {
    const UserId = localStorage.getItem('UserId');
    window.open('http://localhost:61928/#/Login?id=' + UserId, '_blank');
  }
}
