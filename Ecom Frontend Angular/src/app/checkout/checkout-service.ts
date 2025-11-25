import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl:string = environment.baseURL;
  constructor(private _http : HttpClient) {}

  updateAddress (form:any){
    return this._http.put(this.baseUrl +"Account/update-address",form)
  }

  getAddress (){
    return this._http.get(this.baseUrl +"Account/get-address-for-user");
  }
}
