import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../shared/Models/Product';
import { AdminService } from '../admin-service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ICategory } from '../../shared/Models/Category';
@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss',
})
export class EditProduct implements OnInit {
  product: IProducts
  productId: number
  editForm!: FormGroup;
  catagories: ICategory[] = []
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _adminService: AdminService
  ) { }
  ngOnInit(): void {

    this._adminService.getCategories().subscribe({
      next: (value) => {
        this.catagories = value
      },
    })


        this.route.queryParamMap.subscribe(q => {
      this.productId = Number(q.get('id'));

    });
    this.editForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      newPrice: [0, Validators.required],
      oldPrice: [0, Validators.required],
      categoryId: [0, Validators.required],
      photos: [null]
    })



    this._adminService.getProductById(this.productId).subscribe({
      next: (value) => {
        this.product = value;
        this.editForm.patchValue({
          id: value.id,
          name: value.name,
          description: value.description,
          newPrice: value.newPrice,
          oldPrice: value.oldPrice,
          categoryId: this.categoryId(value.categoryName)// هتجيبها من الدروب داون لو عندك
        });
      },
    })
  }

categoryId(name: string): number {
  switch (name) {
    case 'Technology':
      return 1;
    case 'Fashion':
      return 2;
    case 'Books & Stationery':
      return 3;
    default:
      return 0; // أو throw error لو عايز
  }
}


  onFileSelect(event: any) {
    if (event.target.files) {
      this.selectedFiles = event.target.files;
      this.editForm.patchValue({
        photos: event.target.files
      });
    }

  }
  updateProduct() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Product will be updated!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!'
    }).then(result => {

      if (!result.isConfirmed) return;

      const formData = new FormData();

      formData.append("Id", this.editForm.value.id);
      formData.append("Name", this.editForm.value.name);
      formData.append("Description", this.editForm.value.description);
      formData.append("NewPrice", this.editForm.value.newPrice);
      formData.append("OldPrice", this.editForm.value.oldPrice);
      formData.append("CategoryId", this.editForm.value.categoryId);

      if (this.selectedFiles.length > 0) {
        for (let file of this.selectedFiles) {
          formData.append("Photo", file);
        }
      }

      this._adminService.updateProduct(formData).subscribe({
        next: () => {
          Swal.fire("Success", "Product updated successfully", "success");
        },
        error: () => {
          Swal.fire("Error", "Update failed", "error");
        }
      });
    });
  }

}


