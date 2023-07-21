import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './AngularMaterialModule/material/material.module';
import { NavigationModule } from './NavigationModuleRouting/navigation/navigation.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AdvanceadjustmentComponent } from './Components/AccountsController/AdvanceAdjustment/Index/advanceadjustment/advanceadjustment.component';
import { EditadvanceadjustmentComponent } from './Components/AccountsController/AdvanceAdjustment/Edit/editadvanceadjustment/editadvanceadjustment.component';
import { MovetointegrationComponent } from './Components/AccountsController/Tally/movetointegration/movetointegration.component';
import { UpdateExchangeRateComponent } from './Components/AccountsController/Tally/update-exchange-rate/update-exchange-rate.component';
import { SpinnerComponent } from './Components/Spinner/spinner/spinner.component';
import { DialogComponent } from './Components/dialog/dialog.component';
import { EmployeePopupComponent } from './Components/TopToolbarComponents/ProofReadingAllocation/employee-popup/employee-popup.component';
import { JobCategorypopupComponent } from './Components/TopToolbarComponents/ProofReadingAllocation/job-categorypopup/job-categorypopup.component';
import { VendorService } from './Services/Vendor/vendor.service';
import { ViewchecklistComponent } from './Components/CustomerVSChecklist/viewchecklist/viewchecklist.component';
import { ItAssetindexComponent } from './Components/ITAssets/it-assetindex/it-assetindex.component';
import { AddItassetsComponent } from './Components/ITAssets/add-itassets/add-itassets.component';
import { BenchOptionsComponent } from './Components/BenchOptions/bench-options/bench-options.component';
@NgModule({
  declarations: [
    AppComponent,
    MovetointegrationComponent,
    UpdateExchangeRateComponent,
    SpinnerComponent,
    DialogComponent,
    EmployeePopupComponent,
    JobCategorypopupComponent,
   
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    NavigationModule,
    MatDialogModule,
  ],
  providers: [
    EditadvanceadjustmentComponent,
    AdvanceadjustmentComponent,
    VendorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }