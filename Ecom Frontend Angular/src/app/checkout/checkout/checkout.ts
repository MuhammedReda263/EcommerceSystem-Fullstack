import { Component, OnInit } from '@angular/core';
import { BasketService, IBasketTotal } from '../../basket/basketService';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit {
constructor(private _basketService : BasketService){}
basketTotal : IBasketTotal;
  ngOnInit(): void {
   this._basketService.basketTotal$.subscribe({ 
    next:(bas) => {
      this.basketTotal = bas;
      console.log("Basket total loaded in BasketComponent:", bas);
    }
   })
  }
}
