import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './AngularMaterialModule/material/material.module';
import { NavigationModule } from './NavigationModuleRouting/navigation/navigation.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AdvanceadjustmentComponent } from './Components/AccountsController/AdvanceAdjustment/Index/advanceadjustment/advanceadjustment.component';
import { EditadvanceadjustmentComponent } from './Components/AccountsController/AdvanceAdjustment/Edit/editadvanceadjustment/editadvanceadjustment.component';
import { MovetointegrationComponent } from './Components/AccountsController/Tally/movetointegration/movetointegration.component';
import { UpdateExchangeRateComponent } from './Components/AccountsController/Tally/update-exchange-rate/update-exchange-rate.component';
import { JobDetailsClientIndexComponent } from './Components/TopToolbarComponents/ClientCordination/query-to-client/job-details-client-index/job-details-client-index.component';

@NgModule({
  declarations: [
    AppComponent,
    MovetointegrationComponent,
    UpdateExchangeRateComponent,

  


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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
