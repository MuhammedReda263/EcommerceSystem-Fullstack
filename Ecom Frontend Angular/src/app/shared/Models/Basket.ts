import { v4 as uuidv4 } from 'uuid';
export interface IBasket {
  id: string
  paymentIntentId : string
  clientSecret : string
  basketItems: IBasketItem[]
}

export interface IBasketItem {
  id: number
  name: string
  image: any
  quantity: number
  price: number
  category: string
}

export class BasketClass implements IBasket {
  paymentIntentId: string;
  clientSecret: string;
  id = uuidv4();
  basketItems: IBasketItem[] = [];
}

