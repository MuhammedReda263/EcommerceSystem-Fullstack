import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing-module';
import { Checkout } from './checkout/checkout';
import { Stepper } from './stepper/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { Address } from './address/address';


@NgModule({
  declarations: [
    Checkout,
    Stepper,
    Address
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports:[
    Stepper,
    Address
  ]
})
export class CheckoutModule { }
