import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { Products } from './products/products';
import { AddProduct } from './add-product/add-product';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProduct } from './edit-product/edit-product';


@NgModule({
  declarations: [
    Products,
    AddProduct,
    EditProduct
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,     
    AdminRoutingModule

  ]
})
export class AdminModule { }
