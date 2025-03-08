import { Component, inject, Pipe } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/products/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  addressForm = new FormGroup({
    phone: new FormControl(null , [Validators.required]),
    city: new FormControl(null , [Validators.required]),
    details: new FormControl(null , [Validators.required]),
  })

  _ProductService = inject(ProductService)
  _ActivatedRoute = inject(ActivatedRoute)
  _Router = inject(Router)
  cartId !: string;

  onlinePayment(formData:any){

    let id=this._ActivatedRoute.snapshot.params?.['cartId'];


    console.log(formData)
    if(formData.valid){
      this._ProductService.checkOutSession(id,formData.value).subscribe({
        next:(res) =>{
          console.log(res)
          location.href = res.session.url
        },
        error:(err) =>{
          console.log(err)
        }
      })
    }
  }

  cashOnDelicey(formData:any){
    let id=this._ActivatedRoute.snapshot.params?.['cartId'];


    console.log(formData)
    if(formData.valid){
      this._ProductService.cashOnDelivery(id,formData.value).subscribe({
        next:(res) =>{
          console.log(res)
          location.href = res.session.url
        },
        error:(err) =>{
          console.log(err)
        }
      })
    }
  }
}
