import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  let mytoken:any = localStorage.getItem('token');

  if(localStorage.getItem('token') !== null){
    let updatedRequest = req.clone({
      setHeaders:{
        token: mytoken
      }
    })
    return next(updatedRequest);
  }

  return next(req)
};
