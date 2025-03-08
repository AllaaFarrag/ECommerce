import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../shared/interfaces/products';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-single-product',
  imports: [],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {
 _ProductService=inject(ProductService)
 _ActivatedRoute=inject(ActivatedRoute)
 _AuthService = inject(AuthService)
 _ToastrService = inject(ToastrService)

 wishlist: Set<string> = new Set(); // Store wishlisted product IDs

 productDetails !:Products;

 ngOnInit():void{

  let productId = this._ActivatedRoute.snapshot.params?.['proId'];
  console.log(productId)
  this._ProductService.getSpecificProduct(productId).subscribe({
    next:(res) => {
      console.log(res.data)
      this.productDetails = res.data

      this._ProductService.getWishList().subscribe({
        next: (res) => {
          res.data.forEach((product: Products) => {
            this.wishlist.add(product._id);  // Ensure correct ID reference
          });
        },
        error: (err) => {
          console.error('Failed to load wishlist', err);
        }
      });
    },
    error:(err) =>{

    }
  }
)
 }


 addToCart(id:any){
  if(this._AuthService.isLogged.value){
    this._ProductService.addProductToCart(id).subscribe({
      next:(res) =>{
        console.log(res)
        this._ToastrService.success("Product add to cart")
      }
    })
  }
}

toggleWishList(id: string) {
  if (!this._AuthService.isLogged.value) return;

  if (this.wishlist.has(id)) {
    // Remove from wishlist
    this._ProductService.removeProductToWishList(id).subscribe({
      next: () => {
        this.wishlist.delete(id);
        this._ToastrService.warning('Product removed from wish list');
      }
    });
  } else {
    // Add to wishlist
    this._ProductService.addProductToWishList(id).subscribe({
      next: () => {
        this.wishlist.add(id);
        this._ToastrService.success('Product added to wish list');
      }
    });
  }
}

isWishlisted(id: string): boolean {
  return this.wishlist.has(id);
}
}
