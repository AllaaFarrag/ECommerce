import { dirname } from 'node:path';
import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/products/product.service';
import { Brands } from '../../../shared/interfaces/brands';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  _ProductService = inject(ProductService)
  allCategories !: Brands[]
  selectedBrand : Brands | null = null
  isModelOpen :boolean = false


  ngOnInit() : void{
    this._ProductService.getAllCategories().subscribe({
      next :(res) => {
        console.log(res.data)
        this.allCategories = res.data
      }
    })
  }

  openModel(allCategories:Brands) : void{
    this.selectedBrand = allCategories
    this.isModelOpen = true
  }

  closeModel():void{
    this.isModelOpen = false;
    this.selectedBrand = null
  }
}
