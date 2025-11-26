import { Component, Input, input } from '@angular/core';
import { BasketService } from '../../basket/basketService';
import { ICreateOrder } from '../../shared/Models/Order';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class Payment {
  constructor(private _basketService: BasketService, private _checkoutService: CheckoutService, private _toaster: ToastrService) { }
  order: ICreateOrder
  @Input() delivery: FormGroup
  @Input() shippingAddress: FormGroup

  createOrder() {
    var basket = this._basketService.getCurrentBasketValue();
    this.order = {
      deliveryMethodId: this.delivery.value.delivery,
      basketId: basket.id,
      shipAddress: this.shippingAddress.value
    }
    this._checkoutService.createOrder(this.order).subscribe({
      next: (value) => {
        this._toaster.success("Order Created Succefully", "Sucess");
      }
    })
  }
}
