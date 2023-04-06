import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopnavbarComponent } from './Components/Navigation/TopNavbar/topnavbar/topnavbar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
