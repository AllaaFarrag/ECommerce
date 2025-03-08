import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isErrorMsg : boolean = false
  isLoading : boolean = false

  _AuthService = inject(AuthService)
  _Router = inject(Router)

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required , Validators.email]),
    password: new FormControl(null, [
      Validators.required]),
  });

  forgetPassword(){
    this._Router.navigate(['/forgetPassword'])
  }

  login(form : any ){
    // console.log(form);
    this.isLoading = true
    if (form.valid){
      this._AuthService.login(form.value).subscribe({
        next:(resp) => {
          console.log(resp)
          this.isErrorMsg = false
          this.isLoading = false
          
          localStorage.setItem('token' , resp.token)
          let decodedToken:any = jwtDecode(resp.token)

          this._AuthService.userName.next(decodedToken.name)
          
          console.log(decodedToken)

          // this._AuthService.isLogged = true
          this._AuthService.isLogged.next(true)

          this._Router.navigate(['/home'])
        },
        error:(eror) => {
          console.log(eror);
          this.isErrorMsg = true
          this.isLoading = false
        },
        complete:() => {}
      })
    }
  }
}
