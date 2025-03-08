import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  
  let _NgxSpinnerService = inject(NgxSpinnerService)
  
  if(req.url ==='https://ecommerce.routemisr.com/api/v1/products' ||
    req.url ==='https://ecommerce.routemisr.com/api/v1/cart' ||
    req.url ==='https://ecommerce.routemisr.com/api/v1/categories' 
  ){
    _NgxSpinnerService.show()    
  }
  return next(req).pipe(finalize(() =>{
  _NgxSpinnerService.hide()
  }));
};
