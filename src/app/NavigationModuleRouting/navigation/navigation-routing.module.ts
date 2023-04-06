import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCustomerreceiptsComponent } from 'src/app/Components/AccountsController/CustomerReceipts/add-edit-customerreceipts/add-edit-customerreceipts.component';
import { CustomerreceiptsindexComponent } from 'src/app/Components/AccountsController/CustomerReceipts/customerreceiptsindex/customerreceiptsindex.component';
import { NonbillablejobsComponent } from 'src/app/Components/AccountsController/Non-BillableJobs/nonbillablejobs/nonbillablejobs.component';
import { InformationpopupComponent } from 'src/app/Components/AccountsController/PricingCalculation/Dialogpop/informationpopup/informationpopup.component';
import { PricingcalculationComponent } from 'src/app/Components/AccountsController/PricingCalculation/pricingcalculation/pricingcalculation.component';
import { ScopechangeComponent } from 'src/app/Components/AccountsController/ScopeChange/scopechange/scopechange.component';
import { AddEditCustomerVSEmployeeComponent } from 'src/app/Components/CustomerController/CustomerVSEmployee/add-edit-customer-vsemployee/add-edit-customer-vsemployee.component';
import { CustomerVSEmployeeComponent } from 'src/app/Components/CustomerController/CustomerVSEmployee/customer-vsemployee/customer-vsemployee.component';
import { CustomervsprocessComponent } from 'src/app/Components/CustomerController/CustomerVsProcess/customervsprocess/customervsprocess.component';
import { AddEditEmployeecontrollerComponent } from 'src/app/Components/EmployeeController/Components/add-edit-employeecontroller/add-edit-employeecontroller.component';
import { EmployeecontrollerComponent } from 'src/app/Components/EmployeeController/Components/employeecontroller/employeecontroller.component';
import { AddeditemployeevsdivisionComponent } from 'src/app/Components/EmployeeVSDivision/addeditemployeevsdivision/addeditemployeevsdivision.component';
import { indexemployeevsdivisionComponent } from 'src/app/Components/EmployeeVSDivision/indexemployeevsdivision/indexemployeevsdivision.component';
import { TopnavbarComponent } from 'src/app/Components/Navigation/TopNavbar/topnavbar/topnavbar.component';
import { DashboardComponent } from 'src/app/Components/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/Components/Navigation/TopNavbar/login/login.component';

const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  {
    path: 'topnavbar',
    component: TopnavbarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      //EmployeeController
      { path: 'Emp-Empcontroller', component: EmployeecontrollerComponent },
      { path: 'Emp-addeditEmpcontroller', component: AddEditEmployeecontrollerComponent },
      //EmployeevsdivController
      { path: 'Emp-empvsdiv', component: indexemployeevsdivisionComponent },
      { path: 'Emp-addeditempvsdiv', component: AddeditemployeevsdivisionComponent },
      //customercontroller
      //CustomerVSEmployee
      { path: 'cus-cusvsemp', component: CustomerVSEmployeeComponent },
      { path: 'cus-addeditcusvsemp', component: AddEditCustomerVSEmployeeComponent },
      //CustomerVSprocess
      { path: 'cus-cusvsprocess', component: CustomervsprocessComponent },
       //AccountsController
        //pricingcalculation
        {path:'acc-pricing', component:PricingcalculationComponent},
        {path:'acc-pricingpopup', component:InformationpopupComponent},
        //Non-billable
        {path:'acc-nonbill', component:NonbillablejobsComponent},
         //Customerreceipts
        {path:'acc-customer', component:CustomerreceiptsindexComponent},
        {path:'acc-addeditcustomer', component:AddEditCustomerreceiptsComponent},
        //ScopeChange
        {path:'acc-scopechange', component:ScopechangeComponent}
    ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
