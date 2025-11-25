import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.html',
  styleUrl: './address.scss',
})
export class Address implements OnInit {
  @Input() addressFromGroup: FormGroup
  constructor(private _checkoutService: CheckoutService, private _toaster: ToastrService) { }
  ngOnInit(): void {
    this._checkoutService.getAddress().subscribe({
      next: (value) => {
        this.addressFromGroup.patchValue(value);
      },
      error:(value) => {
        console.log(value);
      }
    })
  }

  updateAddress() {
    if (this.addressFromGroup.valid) {
      this._checkoutService.updateAddress(this.addressFromGroup.value).subscribe({
        next: (value) => {
          console.log(value);
          this._toaster.success("Address Added successfully", "Success")
        },
        error: (value) => {
          console.log(value);
          this._toaster.error("Error has happpnd", "Error")
        }
      })
    }


  }
}
