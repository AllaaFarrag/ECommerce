import { SubCategoriesComponent } from './../sub-categories/sub-categories.component';
import { SearchPipe } from './../../../core/pipes/search.pipe';
import { afterNextRender, afterRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../../core/services/products/product.service';
import { Products } from '../../../shared/interfaces/products';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { SliderCategoriesComponent } from "../../../shared/components/slider-categories/slider-categories.component";
import { Category } from '../../../shared/interfaces/category';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroComponent } from "../hero/hero.component";

@Component({
  selector: 'app-home',
  imports: [SliderCategoriesComponent, RouterLink, CurrencyPipe, UpperCasePipe, SearchPipe, FormsModule, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  _ProductService=inject(ProductService)
  _AuthService=inject(AuthService)
  _ToastrService= inject(ToastrService)
  allProducts :Products[] = [];
  allCategories!:Category[];
  isLoading : boolean = true;

  searchValue:string = ""

  wishlist: Set<string> = new Set(); // Store wishlisted product IDs


  ngOnInit() : void{
    this._ProductService.getAllProduct().subscribe({
       next:(resp) =>{
           console.log(resp.data)
           this.allProducts = resp.data;
           this.isLoading=false
           if (this._AuthService.isLogged.value) {
            this.loadWishlist(); // Load wishlist on page refresh
          }
       },

       error:(err) =>{
          console.log(err)
       }
    })

    this._ProductService.getAllCategories().subscribe({
      next:(res) => {
        // console.log(res.data)
        this.allCategories = res.data
      },
      error:() =>{}
    })

    this._ProductService.getLoggedUserCart().subscribe({
      next : (res) =>{
        this._ProductService.numOfCartItems.set(res.numOfCartItems)
      }
    })
  }
  
  addToCart(id:any){
    if(this._AuthService.isLogged.value){
      this._ProductService.addProductToCart(id).subscribe({
        next:(res) =>{
          console.log(res)
          this._ToastrService.success("Product add to cart")

          this._ProductService.getLoggedUserCart().subscribe({
            next : (res) =>{
              this._ProductService.numOfCartItems.set(res.numOfCartItems)
            }
          })
        }
      })
    }
  }

  loadWishlist() {
    this._ProductService.getWishList().subscribe({
      next: (res) => {
        res.data.forEach((product: Products) => {
          this.wishlist.add(product.id); 
        });
      },
      error: (err) => {
        console.error('Failed to load wishlist', err);
      }
    });
  }
  

  addToWishList(id: string) {
    if (!this._AuthService.isLogged.value) return;

    this._ProductService.addProductToWishList(id).subscribe({
      next: () => {
        this.wishlist.add(id);
        this._ToastrService.success('Product added to wish list');
      },
      error: (err) => {
        console.error('Failed to add to wishlist', err);
      }
    });
  }

  removeFromWishList(id: string) {
    if (!this._AuthService.isLogged.value) return;

    this._ProductService.removeProductToWishList(id).subscribe({
      next: () => {
        this.wishlist.delete(id);
        this._ToastrService.warning('Product removed from wish list');
      },
      error: (err) => {
        console.error('Failed to remove from wishlist', err);
      }
    });
  }

  isWishlisted(id: string): boolean {
    return this.wishlist.has(id);
  }
}

