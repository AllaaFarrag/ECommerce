import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/products/product.service';
import { Brands } from '../../../shared/interfaces/brands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  _ProductService = inject(ProductService)
  subCategories !: Brands[]

  ngOnInit() : void{
    this._ProductService.getAllSubCategories().subscribe({
      next :(res) =>{
        this.subCategories = res.data
      }
    })
  }
}

