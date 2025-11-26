import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryModel } from '../../shared/Models/Delivery';
import { CheckoutService } from '../checkout-service';
import { BasketService } from '../../basket/basketService';

@Component({
  selector: 'app-delivery',
  standalone: false,
  templateUrl: './delivery.html',
  styleUrl: './delivery.scss',
})
export class Delivery implements OnInit {
  constructor(private _checkoutService : CheckoutService,private _basketService:BasketService){}
  _deliveryOptions: DeliveryModel[]
  @Input () deliveryFormGroup : FormGroup

  setDeliveryPrice (id:any){
  var delivery  = this._deliveryOptions.find(temp=>temp.id==id);
  this._basketService.setShippingPrice(delivery.price);

  }
  ngOnInit(): void {
    this._checkoutService.getDelivery().subscribe({
      next: (value)=>{
       this._deliveryOptions = value;
       console.log(value);
      }
    })
  }




}
