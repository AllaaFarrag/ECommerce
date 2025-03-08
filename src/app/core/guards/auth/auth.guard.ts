import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _AuthService = inject(AuthService)
  let _Router = inject(Router)

  if(_AuthService.isLogged.value === false){
    return true;
  }
  else{
    _Router.navigate(['/home'])
    return false;
  }
};
