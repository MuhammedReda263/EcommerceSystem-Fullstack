import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop/shop-service';
import { ProductParams } from '../shared/Models/ProducrParams';
import { IProducts } from '../shared/Models/Product';
import { BasketService } from '../basket/basketService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
categories = [
  { name: "Technology", image: "assets/images/homePage/TechImage.png" ,id:"1"},
  { name: "Fashion", image: "assets/images/homePage/FashionImage.webp",id:"2" },
  { name: "Books & Stationery", image: "assets/images/homePage/BookImage.jpg",id:"3"},
];


  productsmm = [
    { name: "MacBook Pro", price: 1999, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
    { name: "iPhone 14", price: 1199, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { name: "Wireless Headset", price: 199, image: "https://images.unsplash.com/photo-1512499617640-c2f999098c01" },
    { name: "Gaming Chair", price: 350, image: "https://images.unsplash.com/photo-1610440042657-d1b65eb38a4e" },
  ];

  productParams = new ProductParams();
  products: IProducts[]
  product : IProducts
  constructor(private _shopSerivce: ShopService, private _basketService: BasketService,private _toaster :ToastrService) { }

  addToBasket (id:number){
    this.product = this.products.find(temp=>temp.id==id)
    console.log(this.product)
    this._basketService.addItemToBasket(this.product)
    this._toaster.success("Product added to card","Success")
  }

  ngOnInit(): void {
    this.productParams.pagesize = 4;
    this._shopSerivce.getProducts(this.productParams).subscribe({
      next: (value) => {
        console.log(value.data)
        this.products = value.data;
      },
    })
  }
}
