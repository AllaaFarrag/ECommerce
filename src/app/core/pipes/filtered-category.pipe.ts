import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteredCategory'
})
export class FilteredCategoryPipe implements PipeTransform {

  transform(products: any[], selectedCategory: string): any[] {
    if (!products || !selectedCategory) {
      return products; // Return all products if no category is selected
    }
    return products.filter(product => product.category === selectedCategory);
  }

}
