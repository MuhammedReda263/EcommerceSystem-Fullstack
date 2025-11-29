import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/Pagination';
import { ICategory } from '../shared/Models/Category';
import { ProductParams } from '../shared/Models/ProducrParams';
import { environment } from '../../environments/environment.development';
import { IProducts } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private _http: HttpClient) { }
  private baseUrl: string = environment.baseURL;

  getProducts(productParams: ProductParams) {
    let params = new HttpParams()
    if (productParams.categoryId != null) {
      params = params.append('CategoryId', productParams.categoryId.toString())

    }
    if (productParams.SortingValue != null) {
      params = params.append('Sort', productParams.SortingValue)
    }
    if (productParams.searchVal != null) {
      params = params.append('Search', productParams.searchVal)
    }
    params = params.append('PageNumber', productParams.PageNumber)
    params = params.append('pageSize', productParams.pagesize)
    return this._http.get<IPagination>(this.baseUrl + "Products", { params })
  }

  getCategories() {
    return this._http.get<ICategory[]>(this.baseUrl + "Categories")
  }

  addProduct(form: any) {
    return this._http.post(this.baseUrl + "Products", form)
  }

  deleteProduct(id: number) {
    return this._http.delete(`${this.baseUrl}Products`, {
      params: { id: id }
    });
  }

getProductById(id: number) {
  return this._http.get<IProducts>(this.baseUrl + "Products/" + id);
}

  updateProduct(formData: FormData) {
  return this._http.put(this.baseUrl + "Products", formData);
}
}
