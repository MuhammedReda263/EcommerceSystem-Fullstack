import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products } from './products/products';
import { AddProduct } from './add-product/add-product';
import { EditProduct } from './edit-product/edit-product';

const routes: Routes = [
  {path:'' , component:Products},
  {path:'addProduct' , component:AddProduct},
  {path:'editProduct' , component:EditProduct},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
