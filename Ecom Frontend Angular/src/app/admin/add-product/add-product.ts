import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin-service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../shared/Models/Category';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  addProductForm!: FormGroup;
  selectedPhotos: File[] = [];
  categories: ICategory[] = []; // جيبها من API لو عايز

  constructor(private fb: FormBuilder,private _adminService :AdminService,private _toaster : ToastrService ) { }

  ngOnInit(): void {

  this._adminService.getCategories().subscribe({
    next:(value)=> {
      this.categories= value;
    },
  })

    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      newPrice: ['', Validators.required],
      oldPrice: [''],
      categoryId: ['', Validators.required],
      photo: ['']
    });

  }

  onFilesSelected(event: any): void {
    this.selectedPhotos = Array.from(event.target.files) as File[];
  }

  submitForm(): void {
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('Name', this.addProductForm.value.name);
    formData.append('Description', this.addProductForm.value.description);
    formData.append('NewPrice', this.addProductForm.value.newPrice);
    formData.append('OldPrice', this.addProductForm.value.oldPrice);
    formData.append('CategoryId', this.addProductForm.value.categoryId);

    this.selectedPhotos.forEach(file => {
      formData.append('Photo', file);
    });

    // API call

    this._adminService.addProduct(formData).subscribe({
      next:(value)=> {
        this._toaster.success("Product added successfully","Success")
      },
      error:(err)=> {
       this._toaster.success("Somthing went worng","Error")

      },
    })
    
  }

  isInvalid(controlName: string): boolean {
  const control = this.addProductForm.get(controlName);
  return !!(control && control.invalid && (control.dirty || control.touched));
}

}
