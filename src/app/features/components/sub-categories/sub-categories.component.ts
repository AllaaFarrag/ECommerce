import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/products/product.service';
import { Brands } from '../../../shared/interfaces/brands';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";

@Component({
  selector: 'app-sub-categories',
  imports: [LoaderComponent],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss'
})
export class SubCategoriesComponent {

   _ActivatedRoute=inject(ActivatedRoute)
  _ProductService = inject(ProductService)
  allSubCategories : Brands[] = []

  ngOnInit() : void{

    let productId = this._ActivatedRoute.snapshot.params?.['catId'];

    this._ProductService.getAllSubCategoriesOnCategory(productId).subscribe({
      next :(res) => {
          this.allSubCategories = res.data
      }
    })
  }
}
