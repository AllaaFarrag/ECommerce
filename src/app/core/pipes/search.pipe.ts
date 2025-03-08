import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../../shared/interfaces/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Products[]  , searchWord : string): Products[] {
    return products.filter(product=>
      product.title.toLowerCase().includes(searchWord.toLowerCase()));
  }

}
