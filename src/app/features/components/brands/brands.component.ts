import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/products/product.service';
import { Brands } from './../../../shared/interfaces/brands';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  brands !:Brands[]
  selectedBrand : Brands | null = null
  isModelOpen :boolean = false

  _ProductService = inject(ProductService)

  ngOnInit() : void{
    this._ProductService.getAllBrands().subscribe({
      next :(res) => {
        console.log(res.data);
        this.brands = res.data
      }
    })
  }

  openModel(brands:Brands) : void{
    this.selectedBrand = brands
    this.isModelOpen = true
  }

  closeModel():void{
    this.isModelOpen = false;
    this.selectedBrand = null
  }
}
