import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // Set useHash to true
  exports: [RouterModule],
})
export class AppRoutingModule { }
