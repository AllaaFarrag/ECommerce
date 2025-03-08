import { Component,OnInit, inject, Input, Output } from '@angular/core';
import { ProductService } from '../../../core/services/products/product.service';
import { Category } from '../../interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-slider-categories',
  imports: [CarouselModule, LoaderComponent],
  templateUrl: './slider-categories.component.html',
  styleUrl: './slider-categories.component.scss'
})
export class SliderCategoriesComponent {
 
  @Input() categories !: Category[]
  
  _ProductService = inject(ProductService);
  ngOnInit():void{

  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}
