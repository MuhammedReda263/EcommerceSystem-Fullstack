import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home';
import { AdminRoutingModule } from "../admin/admin-routing-module";



@NgModule({
  declarations: [
    Home
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
],
  exports:[
    Home
  ]
})
export class HomeModule { }
