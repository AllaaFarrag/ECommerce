import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { catchError, EMPTY, first, map } from 'rxjs';

export const routingGuard: CanActivateFn = (route, state) => {

  let _AuthService = inject(AuthService)
  let _Router = inject(Router)
  let pId = inject(PLATFORM_ID)


  if(isPlatformBrowser(pId)){
   return _AuthService.verfiyToken(localStorage.getItem('token')).pipe(
    first(),
    map((res) =>{
      if(res.message ==='verified'){
        _AuthService.isLogged.next(true);
        return  true;
      }
      else{
      _AuthService.isLogged.next(false)
      return false;
      }
    }),
    catchError(error =>{
      console.error('RoutingGaurd Error:', error);
      _AuthService.isLogged.next(false);
      _Router.navigate(['login']);
      return EMPTY;
    })
   );
  }else{
    return true
  }

  // if(_AuthService.isLogged.value === true){
  //   return true;
  // }
  // else{
  //   _Router.navigate(['/login'])
  //   return false;
  // }
};
