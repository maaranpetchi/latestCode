import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/AngularMaterialModule/material/material.module';

import { NavigationRoutingModule } from './navigation-routing.module';
import { TopnavbarComponent } from 'src/app/Components/Navigation/TopNavbar/topnavbar/topnavbar.component';
import { EmployeecontrollerComponent } from 'src/app/Components/EmployeeController/Components/employeecontroller/employeecontroller.component';
import { AddEditEmployeecontrollerComponent } from 'src/app/Components/EmployeeController/Components/add-edit-employeecontroller/add-edit-employeecontroller.component';
import { DashboardComponent } from 'src/app/Components/dashboard/dashboard.component';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddeditemployeevsdivisionComponent } from 'src/app/Components/EmployeeVSDivision/addeditemployeevsdivision/addeditemployeevsdivision.component';
import { indexemployeevsdivisionComponent } from 'src/app/Components/EmployeeVSDivision/indexemployeevsdivision/indexemployeevsdivision.component';
import { LoginComponent } from 'src/app/Components/Navigation/TopNavbar/login/login.component';
import { CustomerVSEmployeeComponent } from 'src/app/Components/CustomerController/CustomerVSEmployee/customer-vsemployee/customer-vsemployee.component';
import { AddEditCustomerVSEmployeeComponent } from 'src/app/Components/CustomerController/CustomerVSEmployee/add-edit-customer-vsemployee/add-edit-customer-vsemployee.component';
import { CustomervsprocessComponent } from 'src/app/Components/CustomerController/CustomerVsProcess/customervsprocess/customervsprocess.component';
import { PricingcalculationComponent } from 'src/app/Components/AccountsController/PricingCalculation/pricingcalculation/pricingcalculation.component';
import { NonbillablejobsComponent } from 'src/app/Components/AccountsController/Non-BillableJobs/nonbillablejobs/nonbillablejobs.component';
import { CustomerreceiptsindexComponent } from 'src/app/Components/AccountsController/CustomerReceipts/customerreceiptsindex/customerreceiptsindex.component';
import { AddEditCustomerreceiptsComponent } from 'src/app/Components/AccountsController/CustomerReceipts/add-edit-customerreceipts/add-edit-customerreceipts.component';
import { ScopechangeComponent } from 'src/app/Components/AccountsController/ScopeChange/scopechange/scopechange.component';
import { AdvanceadjustmentComponent } from 'src/app/Components/AccountsController/AdvanceAdjustment/Index/advanceadjustment/advanceadjustment.component';
import { EditadvanceadjustmentComponent } from 'src/app/Components/AccountsController/AdvanceAdjustment/Edit/editadvanceadjustment/editadvanceadjustment.component';
import { CreditnoteindexComponent } from 'src/app/Components/AccountsController/CreditNote/creditnoteindex/creditnoteindex.component';
import { AddCreditnoteComponent } from 'src/app/Components/AccountsController/CreditNote/add-creditnote/add-creditnote.component';
import { ChangepasswordComponent } from 'src/app/Components/Navigation/ChangePass/changepassword/changepassword.component';
import { InvoicecancellationComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/invoicecancellation/invoicecancellation.component';
import { ViewinvoicecancelComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/viewinvoicecancel/viewinvoicecancel.component';
import { InvoicecancelleddetailsComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/invoicecancelleddetails/invoicecancelleddetails.component';
import { MatSortModule } from '@angular/material/sort';
import { InvoiceComponent } from 'src/app/Components/AccountsController/Invoice/invoice/invoice.component';
import { DetailsComponent } from 'src/app/Components/AccountsController/Invoice/details/details.component';
import { GeneratedinvoiceComponent } from 'src/app/Components/AccountsController/Invoice/generatedinvoice/generatedinvoice.component';
import { ConfirminvoiceComponent } from 'src/app/Components/AccountsController/Invoice/confirminvoice/confirminvoice.component';
@NgModule({
  declarations: [
    DashboardComponent,
    //Login
    LoginComponent,
    //changepassword
    ChangepasswordComponent,
    //navbar
    TopnavbarComponent,
    //EmployeeController
    EmployeecontrollerComponent,
    AddEditEmployeecontrollerComponent,
    //EmployeeVsDivController
    AddeditemployeevsdivisionComponent,
    indexemployeevsdivisionComponent,
    //Customercontroller
    CustomerVSEmployeeComponent,
    AddEditCustomerVSEmployeeComponent,
    //Customervsprocess
    CustomervsprocessComponent,
    //AccountsController
    //1.pricingcalculation
    PricingcalculationComponent,
    //2.NonBillableJobs
    NonbillablejobsComponent,
    //3.customerreceipts
    CustomerreceiptsindexComponent,
    AddEditCustomerreceiptsComponent,
    //4.scopeChange
    ScopechangeComponent,
    //5.AdvanceAdjustment
    AdvanceadjustmentComponent,
    EditadvanceadjustmentComponent,
    //6.creditnote
    CreditnoteindexComponent,
    AddCreditnoteComponent,
    //7.invoicecancellation
    InvoicecancellationComponent,
    // 1.viewinvoicecancelationlist
    ViewinvoicecancelComponent,
    //2.InvoicecancelleddetailsComponent
    InvoicecancelleddetailsComponent,
    //3.invoice
    InvoiceComponent,
    DetailsComponent,
    GeneratedinvoiceComponent,
    ConfirminvoiceComponent,
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSortModule
  ]
})
export class NavigationModule { }
