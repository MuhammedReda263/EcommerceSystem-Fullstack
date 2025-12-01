import { Component } from '@angular/core';
import { AdminService } from '../admin-service';
import { IPagination } from '../../shared/Models/Pagination';
import { ICategory } from '../../shared/Models/Category';
import { IProducts } from '../../shared/Models/Product';
import { ProductParams } from '../../shared/Models/ProducrParams';
import { environment } from '../../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {

  constructor(private _adminSerice: AdminService, private _toaster: ToastrService) { }
  private baseUrl: string = environment.baseURL;
  products: IProducts[];
  categories: ICategory[];
  productParams = new ProductParams();
  totalCount: number;

  getProduct() {
    this.productParams.pagesize = 8
    this._adminSerice.getProducts(this.productParams).subscribe({

      next: ((value: IPagination) => {
        console.log(value.data)
        this.products = value.data;
        this.totalCount = value.totalCount;
      })
    })
    // this.toastr.success('Products loaded successfully','Success')
  }

  getCategory() {
    this._adminSerice.getCategories().subscribe({
      next: ((value: ICategory[]) => {
        this.categories = value;
        console.log(value)
      })
    })
  }
  ngOnInit(): void {
    this.getProduct();
    this.getCategory();
  }

  selectedId(categoryId: number) {
    this.productParams.categoryId = categoryId;
    this.getProduct();
  }

  deleteProduct(id: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "This product will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {

        this._adminSerice.deleteProduct(id).subscribe({
          next: (value) => {
            this.getProduct();

            Swal.fire({
              title: 'Deleted!',
              text: 'Product deleted successfully.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          },

          error: (err) => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong.',
              icon: 'error'
            });
          }
        });

      }

    });

  }

}
