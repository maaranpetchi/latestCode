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
import { JoborderexcelComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/joborderexcel/joborderexcel.component';
import { CompletedjobsComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/completedjobs/completedjobs.component';
import { ClientordersComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/clientorders/clientorders.component';
import { ClientorderstableComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/clientorderstable/clientorderstable.component';
import { ClientorderviewComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/clientorderview/clientorderview.component';
// import { ProofReadingAllocationComponent } from 'src/app/Components/TopToolbarComponents/ProofReading/proof-reading-allocation/proof-reading-allocation.component';
// import { ProofReadingAllocationTableComponent } from 'src/app/Components/TopToolbarComponents/ProofReading/proof-reading-allocation-table/proof-reading-allocation-table.component';
import { ProofreadingComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proofreading/proofreading.component';
import { ProofReadingTableComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proof-reading-table/proof-reading-table.component';
import { BuddyProofComponent } from 'src/app/Components/TopToolbarComponents/BuddyProof/buddy-proof/buddy-proof.component';
import { BuddyProofTableComponent } from 'src/app/Components/TopToolbarComponents/BuddyProof/buddy-proof-table/buddy-proof-table.component';
import { SewOutComponent } from 'src/app/Components/TopToolbarComponents/SewOut/sew-out/sew-out.component';
import { SewOutTableComponent } from 'src/app/Components/TopToolbarComponents/SewOut/sew-out-table/sew-out-table.component';
import { QualityWorkflowComponent } from 'src/app/Components/TopToolbarComponents/Quality/quality-workflow/quality-workflow.component';
import { JobhistorypopuptableComponent } from 'src/app/Components/TopToolbarComponents/Quality/jobhistorypopuptable/jobhistorypopuptable.component';
import { ProofjobdetailpopupComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proofjobdetailpopup/proofjobdetailpopup.component';
import { ProofjobhistorypopupComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proofjobhistorypopup/proofjobhistorypopup.component';
import { ProofworkflowComponent } from 'src/app/Components/TopToolbarComponents/ProofReadings/proofworkflow/proofworkflow.component';
// import { EmployeejobassisgnedpopupComponent } from 'src/app/Components/TopToolbarComponents/ProofReading/employeejobassisgnedpopup/employeejobassisgnedpopup.component';
import { ClientdetailspopupComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/clientdetailspopup/clientdetailspopup.component';
import { FileconvertComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/ClientOrder/clientorderstable/fileconvert/fileconvert.component';
import { UserMasterComponent } from 'src/app/Components/Master/user/user-master/user-master.component';
import { ScopeComponent } from 'src/app/Components/Master/Scope/scope/scope.component';
import { AddScopeComponent } from 'src/app/Components/Master/Scope/add-scope/add-scope.component';
import { ViewEditScopeComponent } from 'src/app/Components/Master/Scope/view-edit-scope/view-edit-scope.component';
import { ViewScopeComponent } from 'src/app/Components/Master/Scope/view-scope/view-scope.component';
import { ErrorCategoryComponent } from 'src/app/Components/Master/ErrorCategory/error-category/error-category.component';
import { AddErrorcategoryComponent } from 'src/app/Components/Master/ErrorCategory/add-errorcategory/add-errorcategory.component';
import { ViewErrorCategoryComponent } from 'src/app/Components/Master/ErrorCategory/view-error-category/view-error-category.component';
import { EditErrorcategoryComponent } from 'src/app/Components/Master/ErrorCategory/edit-errorcategory/edit-errorcategory.component';
import { JobDetailsClientIndexComponent } from 'src/app/Components/TopToolbarComponents/ClientCordination/query-to-client/job-details-client-index/job-details-client-index.component';
import { JobDetailsSewPopComponent } from 'src/app/Components/TopToolbarComponents/SewOut/SewOut-JobDetailsPopup/job-details-sew-pop/job-details-sew-pop.component';
import { SewoutworkflowComponent } from 'src/app/Components/TopToolbarComponents/SewOut/SewOut-JobDetailsPopup/sewoutworkflow/sewoutworkflow.component';
import { ProcessComponent } from 'src/app/Components/Master/process/process/process.component';
import { AddEditprocessComponent } from 'src/app/Components/Master/process/add-editprocess/add-editprocess.component';
import { ViewProcessComponent } from 'src/app/Components/Master/process/view-process/view-process.component';
import { BenchStatusComponent } from 'src/app/Components/Master/BenchStatus/bench-status/bench-status.component';
import { OneTimemasterComponent } from 'src/app/Components/Master/one-timemaster/one-timemaster.component';
import { JobHistoryComponent } from 'src/app/Components/JobHistory/job-history/job-history.component';
import { JobTransferComponent } from 'src/app/Components/JobTransfer/job-transfer/job-transfer.component';
import { ProdjobpopupComponent } from 'src/app/Components/TopToolbarComponents/Production/prodjobpopup/prodjobpopup.component';
import { ProductionworkflowComponent } from 'src/app/Components/TopToolbarComponents/Production/productionworkflow/productionworkflow.component';
import { ProofreadingAllocationComponent } from 'src/app/Components/TopToolbarComponents/ProofReadingAllocation/proofreading-allocation/proofreading-allocation.component';
import { BankComponent } from 'src/app/Components/Bank/bank/bank.component';
import { VendorComponent } from 'src/app/Components/Vendor/vendor/vendor.component';
import { EditVendorComponent } from 'src/app/Components/Vendor/edit-vendor/edit-vendor.component';

const routes: Routes = [

  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'acc-viewinvdet', component: InvoicecancelleddetailsComponent, },
  // { path: 'topnavbar/clientindex/joborder', component: JoborderComponent },

  {
    path: 'topnavbar',
    component: TopnavbarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
      //TOPNAVBAR COMPONENTS
      {
        path: 'clientindex', component: ClientordinationindexComponent
      },
      { path: 'clientindex/joborder', component: JoborderComponent }, // Added redirect path
      { path: 'production', component: ProductionallocationComponent },
      { path: 'productiontable', component: ProductionallocationtableComponent },
      { path: 'JobAssignPopup', component: JobAssignedDetailsPopupComponent, },
      //ClientCordination
      { path: 'clientindex/Jobexcel', component: JoborderexcelComponent },
      { path: 'clientindex/completedjobs', component: CompletedjobsComponent },
      { path: 'clientindex/clientorder', component: ClientordersComponent },
      { path: 'clientindex/clientordertable', component: ClientorderstableComponent },
      { path: 'clientindex/clientordertable', component: ClientorderstableComponent },
      { path: 'clientindex/clientorder/clientorderview', component: ClientorderviewComponent },
      { path: 'clientindex/clientorder/clientdetailpopup', component:  ClientdetailspopupComponent, },
      { path: 'clientindex/clientorder/fileconvert', component: FileconvertComponent, },
      { path: 'clientindex/clientorder/fileconvert', component:JobDetailsClientIndexComponent},  //Main index Jobdetailpopup

      //QualityAlloactionsComponent
      { path: 'qualityallocation', component: QualityallocationComponent,},
      { path: 'qualityallocationtable', component: QualityallocationtableComponent },
      { path: 'qualitypopup', component: QualitypopupjobassignComponent },

      //Quality
      { path: 'quality', component: QualityComponent },
      { path: 'qualitytable', component: QualitytableComponent },
      { path: 'qualityjobpop', component: QualityjobdetailpopupComponent },
      { path: 'qualityworkflow', component: QualityWorkflowComponent },
      { path: 'jobhistorytable', component: JobhistorypopuptableComponent, },
      //Productionmaincomponent
      { path: 'productionmain', component: ProductionComponent },
      { path: 'productionmaintable', component: ProductiontableComponent },
      { path: 'prodjobpopup', component: ProdjobpopupComponent },
      { path: 'prodworkflow', component: ProductionworkflowComponent },

      //ProofReadingAllocation
      {path:'proofreadingallocation', component: ProofreadingAllocationComponent},
      //ProofReading
      { path: 'proofreading', component: ProofreadingComponent },
      { path: 'proofreadingtable', component: ProofReadingTableComponent },
      { path: 'proofreadingdetails', component: ProofjobdetailpopupComponent },
      { path: 'proofhistory', component: ProofjobhistorypopupComponent },
      { path: 'proofworkflow', component: ProofworkflowComponent },

      //BuddyProof
      { path: 'buddyproof', component: BuddyProofComponent },
      { path: 'buddyprooftable', component: BuddyProofTableComponent },
      //SewoutProof
      { path: 'sewout', component: SewOutComponent },
      { path: 'sewtable', component: SewOutTableComponent },
      { path: 'sewJobDetails', component:JobDetailsSewPopComponent, },
      { path: 'sewoutworkflow', component:SewoutworkflowComponent},
      //SideNavbarMenu
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

      // Master Order
      {path:'master-user', component: UserMasterComponent},
      // Scope
      {path:'master-scope', component: ScopeComponent},
      {path:'master-scopeAdd', component: AddScopeComponent},
      {path:'master-scope/edit', component: ViewEditScopeComponent},
      {path:'master-scope/view', component: ViewScopeComponent},

      // Error Category
      {path:'errorCategory', component: ErrorCategoryComponent},
      {path:'error-Categoryadd', component: AddErrorcategoryComponent},
      {path:'error-Categoryview', component: ViewErrorCategoryComponent},
      {path:'error-Categoryedit', component: EditErrorcategoryComponent},


      //  Process Master
      {path:'processMaster', component:ProcessComponent},
      {path:'process-addEdit', component:AddEditprocessComponent},
      {path:'process-view', component:ViewProcessComponent},

      //  Bench Status
      {path:'benchStatus', component:BenchStatusComponent},

      // OneTime Master
      {path:'oneTimeMaster', component:OneTimemasterComponent}, 
      //  Job History
      {path:'jobHistory', component:JobHistoryComponent},
      
      // Job Transfer
      {path:'jobTransfer', component:JobTransferComponent},

       //Bank
       {path:'bank', component:BankComponent},

       //VENDOR
       {path:'vendor', component:VendorComponent},
       {path:'editvendor', component:EditVendorComponent},

    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }