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
@NgModule({
  declarations: [
    AppComponent,
    
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
