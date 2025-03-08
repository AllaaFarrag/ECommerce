import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogeedUser } from '../../../shared/interfaces/logeed-user';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Email } from '../../../shared/interfaces/email';
import { VerfyCode } from '../../../shared/interfaces/verfy-code';
import { ResetPassword } from '../../../shared/interfaces/reset-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  pId = inject(PLATFORM_ID)
  r = inject(Router)

  isLogged:BehaviorSubject<boolean> = new BehaviorSubject(false)
  userName:BehaviorSubject<string> = new BehaviorSubject("")

  constructor(private _HttpClient:HttpClient) { 

    // if(isPlatformBrowser(this.pId))
    // {
    //   if(localStorage.getItem('token') !== null){
    //     this.verfiyToken(localStorage.getItem('token')).subscribe({
    //       next: (res) => {
    //         if(res.message == 'verified')
    //         {
    //           this.isLogged.next(true)
    //           this.r.navigate(['/home'])

    //           let token:any = localStorage.getItem('token')
    //           let decodedToken:any = jwtDecode(token)
              
    //           this.userName.next(decodedToken.name)
    //         }
    //       },
    //       error: () => {
    //         this.isLogged.next(false)
    //         this.r.navigate(['/login'])

    //       }
    //     })
    //   }
    // }

    if(isPlatformBrowser(this.pId)){
      if(localStorage.getItem('token')){
        this.doVerifyToken
      }
      else{
        this.r.navigate(['/login'])
      }
    }
  }

  doVerifyToken(){
    this.verfiyToken(localStorage.getItem('token')).subscribe({
      next:(res) => {
        console.log(res);
        this.isLogged.next(true)
      },

      error:() => {
        this.isLogged.next(false);
        this.r.navigate(['/login'])
      }
    })
  }

  verfiyToken(t:any):Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',{
      headers:{
        token:t
      }
    })
  }

  signUp(userData : User):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , userData);
  }

  login(userData : LogeedUser):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , userData);
  }

  forgetPassword(userData : Email):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , userData);
  }

  verfyCode(userData : VerfyCode):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , userData);
  }

  setNewPassword(userData : ResetPassword):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , userData);
  }

  
}