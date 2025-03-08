import { Products } from './../../../shared/interfaces/products';
import { Subcategory } from './../../../shared/interfaces/subcategory';
import { Component, inject } from '@angular/core';
import { producerAccessed } from '@angular/core/primitives/signals';
import { ProductService } from '../../../core/services/products/product.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  imports: [RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {

  _ProductService = inject(ProductService)
    _AuthService=inject(AuthService)
    _ToastrService= inject(ToastrService)
  product : Products[] = []

  ngOnInit() : void{
    this._ProductService.getWishList().subscribe({
      next : (res) =>{
          console.log(res.data)
          this.product = res.data
      }
    })
  }

  removeFromWishList(id: string) {
    if (!this._AuthService.isLogged.value) return;

    this._ProductService.removeProductToWishList(id).subscribe({
      next: (res) => {
        this.product = this.product.filter(p => p.id !== id);
        this._ToastrService.warning('Product removed from wish list');
      },
      error: (err) => {
        console.error('Failed to remove from wishlist', err);
      }
    });
  }
}
