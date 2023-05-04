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
import { AdvanceadjustmentComponent } from 'src/app/Components/AccountsController/AdvanceAdjustment/Index/advanceadjustment/advanceadjustment.component';
import { EditadvanceadjustmentComponent } from 'src/app/Components/AccountsController/AdvanceAdjustment/Edit/editadvanceadjustment/editadvanceadjustment.component';
import { CreditnoteindexComponent } from 'src/app/Components/AccountsController/CreditNote/creditnoteindex/creditnoteindex.component';
import { AddCreditnoteComponent } from 'src/app/Components/AccountsController/CreditNote/add-creditnote/add-creditnote.component';
import { ChangepasswordComponent } from 'src/app/Components/Navigation/ChangePass/changepassword/changepassword.component';
import { InvoicecancellationComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/invoicecancellation/invoicecancellation.component';
import { ViewinvoicecancelComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/viewinvoicecancel/viewinvoicecancel.component';
import { InvoicecancelleddetailsComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/invoicecancelleddetails/invoicecancelleddetails.component';
import { InvoiceComponent } from 'src/app/Components/AccountsController/Invoice/invoice/invoice.component';
import { DetailsComponent } from 'src/app/Components/AccountsController/Invoice/details/details.component';
import { GeneratedinvoiceComponent } from 'src/app/Components/AccountsController/Invoice/generatedinvoice/generatedinvoice.component';
import { ConfirminvoiceComponent } from 'src/app/Components/AccountsController/Invoice/confirminvoice/confirminvoice.component';
import { PopupinvoicecancellistComponent } from 'src/app/Components/AccountsController/InvoiceCancellation/popupinvoicecancellist/popupinvoicecancellist.component';
import { PopupinvoiceComponent } from 'src/app/Components/AccountsController/Invoice/popupinvoice/popupinvoice.component';
import { WavierComponent } from 'src/app/Components/AccountsController/Wavier/wavier/wavier.component';
import { TallyComponent } from 'src/app/Components/AccountsController/Tally/tally/tally.component';
import { PopupwavierconfirmationComponent } from 'src/app/Components/AccountsController/Wavier/popupwavierconfirmation/popupwavierconfirmation.component';
import { PricingComponent } from 'src/app/Components/SalesController/Pricing/pricing/pricing.component';
import { ClientordinationindexComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/clientordinationindex/clientordinationindex.component';
import { QueryToClientComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/query-to-client/query-to-client.component';
import { JoborderComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/joborder/joborder.component';
import { ProductionallocationComponent } from 'src/app/Components/TopToolbarComponents/ProductionAllocation/productionallocation/productionallocation.component';
import { ProductionallocationtableComponent } from 'src/app/Components/TopToolbarComponents/ProductionAllocation/productionallocationtable/productionallocationtable.component';
import { ProductionComponent } from 'src/app/Components/TopToolbarComponents/Production/production/production.component';
import { ProductiontableComponent } from 'src/app/Components/TopToolbarComponents/Production/productiontable/productiontable.component';
import { JobAssignedDetailsPopupComponent } from 'src/app/Components/TopToolbarComponents/ProductionAllocation/job-assigned-details-popup/job-assigned-details-popup.component';
import { QualityallocationComponent } from 'src/app/Components/TopToolbarComponents/QualityAllocation/qualityallocation/qualityallocation.component';
import { QualityallocationtableComponent } from 'src/app/Components/TopToolbarComponents/QualityAllocation/qualityallocationtable/qualityallocationtable.component';
import { QualitypopupjobassignComponent } from 'src/app/Components/TopToolbarComponents/QualityAllocation/qualitypopupjobassign/qualitypopupjobassign.component';
import { QualityComponent } from 'src/app/Components/TopToolbarComponents/Quality/quality/quality.component';
import { QualitytableComponent } from 'src/app/Components/TopToolbarComponents/Quality/qualitytable/qualitytable.component';
import { QualityjobdetailpopupComponent } from 'src/app/Components/TopToolbarComponents/Quality/qualityjobdetailpopup/qualityjobdetailpopup.component';

const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'acc-viewinvdet', component: InvoicecancelleddetailsComponent, },

  {
    path: 'topnavbar',
    component: TopnavbarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
      //TOPNAVBAR COMPONENTS
      {
        path: 'clientindex', component: ClientordinationindexComponent, children: [
          { path: 'joborder', component: JoborderComponent }
        ]
      },
      { path: 'clientindex/joborder', component: JoborderComponent }, // Added redirect path
      { path: 'production', component: ProductionallocationComponent },
      { path: 'productiontable', component: ProductionallocationtableComponent },
      { path: 'JobAssignPopup', component: JobAssignedDetailsPopupComponent, },

      //QualityAlloactionsComponent
      { path: 'qualityallocation', component: QualityallocationComponent, },
      { path: 'qualityallocationtable', component: QualityallocationtableComponent },
      { path: 'qualitypopup', component: QualitypopupjobassignComponent },

      //Quality
      { path: 'quality', component: QualityComponent },
      { path: 'qualitytable', component: QualitytableComponent },
      { path: 'qualityjobpop', component:   QualityjobdetailpopupComponent },
      //Productionmaincomponent
      { path: 'productionmain', component: ProductionComponent },
      { path: 'productionmaintable', component: ProductiontableComponent },
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
      { path: 'acc-pricing', component: PricingcalculationComponent },
      { path: 'acc-pricingpopup', component: InformationpopupComponent },
      //Non-billable
      { path: 'acc-nonbill', component: NonbillablejobsComponent },
      //Customerreceipts
      { path: 'acc-customer', component: CustomerreceiptsindexComponent },
      { path: 'acc-addeditcustomer', component: AddEditCustomerreceiptsComponent },
      //ScopeChange
      { path: 'acc-scopechange', component: ScopechangeComponent },
      //Advance-Adjustment
      { path: 'acc-advance', component: AdvanceadjustmentComponent },
      { path: 'acc-editadvance', component: EditadvanceadjustmentComponent },
      //credit-note
      { path: 'acc-creditnote', component: CreditnoteindexComponent },
      { path: 'acc-addcredit', component: AddCreditnoteComponent },
      //wavier
      { path: 'acc-wavier', component: WavierComponent },
      //popupwaiver
      { path: 'acc-wavierpop', component: PopupwavierconfirmationComponent },
      //Tally
      { path: 'acc-tally', component: TallyComponent },
      // Invoicecancellation,
      { path: 'acc-invcan', component: InvoicecancellationComponent },
      // ViewinvoicecancelComponent,
      { path: 'acc-viewinvcan', component: ViewinvoicecancelComponent, },
      // InvoicecancelleddetailsComponent,
      { path: 'acc-viewinvdet', component: InvoicecancelleddetailsComponent, },
      //popupinvoicecancelledlist
      { path: 'acc-popinvcan', component: PopupinvoicecancellistComponent, },
      //Invoicecomponent
      { path: 'acc-invoice', component: InvoiceComponent, },
      { path: 'acc-details', component: DetailsComponent, },
      { path: 'acc-generatedinvoice', component: GeneratedinvoiceComponent, },
      { path: 'acc-confirminvoice', component: ConfirminvoiceComponent, },
      { path: 'acc-popupinvoice', component: PopupinvoiceComponent, },
      //SALES CONTROLLER
      //1.PRICING    
      { path: 'sales-pricing', component: PricingComponent, },
    ]
  },
  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
