import { dirname } from 'node:path';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../../core/services/products/product.service';
import { Products } from '../../../shared/interfaces/products';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { pid } from 'node:process';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [LoaderComponent, RouterLink,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  _ProductService = inject(ProductService)
  _ToastrService = inject(ToastrService)
  cartData:any;
  product:any[] =[]
  isLoading : boolean = true;

  ngOnInit():void{
    this._ProductService.getLoggedUserCart().subscribe({
      next:(res) => {
        console.log(res);
        this.cartData= res;
        this.product=res.data.products;
        this.isLoading = false
      },
      error:(err) =>{
        console.log(err)
      }
    })
  }

  updateQuantity(count:any , pId:any){
    this._ProductService.updateItemQuantity(count,pId).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData= res;
        this.product=res.data.products;
        this._ToastrService.success('product updated successfully')
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.error('something went wrong')
        
      }
    })
  }

  removeItem(pId:any){
    this._ProductService.deleteItem(pId).subscribe({
      next:(res) => {
        console.log(res);
        this.cartData= res;
        this.product=res.data.products;
      },
      error:(err) =>{
        console.log(err);
      }
    })
  }

  clearcart(){
  this._ProductService.clearCart().subscribe({
    next:() => {
      console.log();
      this.cartData = { numOfCartItems: 0, data: { products: [] } };
      this.product= [] 
    },
    error:(err) =>{
      console.log(err);
    }
  })
  }
}
