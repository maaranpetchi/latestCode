import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopnavbarComponent } from './Components/Navigation/TopNavbar/topnavbar/topnavbar.component';
import { ClientordinationindexComponent } from './Components/TopToolbarComponents/ClientCordination/clientordinationindex/clientordinationindex.component';
import { JoborderComponent } from './Components/TopToolbarComponents/ClientCordination/joborder/joborder.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
