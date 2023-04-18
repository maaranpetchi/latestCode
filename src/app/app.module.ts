import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopnavbarComponent } from './Components/Navigation/TopNavbar/topnavbar/topnavbar.component';
import { MaterialModule } from './AngularMaterialModule/material/material.module';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NavigationModule } from './NavigationModuleRouting/navigation/navigation.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AdvanceadjustmentComponent } from './Components/AccountsController/AdvanceAdjustment/Index/advanceadjustment/advanceadjustment.component';
import { EditadvanceadjustmentComponent } from './Components/AccountsController/AdvanceAdjustment/Edit/editadvanceadjustment/editadvanceadjustment.component';
import { InvoiceComponent } from './Components/AccountsController/Invoice/invoice/invoice.component';
import { DetailsComponent } from './Components/AccountsController/Invoice/details/details.component';
import { GeneratedinvoiceComponent } from './Components/AccountsController/Invoice/generatedinvoice/generatedinvoice.component';
import { ConfirminvoiceComponent } from './Components/AccountsController/Invoice/confirminvoice/confirminvoice.component';
import { PopupinvoiceComponent } from './Components/AccountsController/Invoice/popupinvoice/popupinvoice.component';


@NgModule({
  declarations: [
    AppComponent,
    PopupinvoiceComponent,
    
    
   
   
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
    AdvanceadjustmentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
