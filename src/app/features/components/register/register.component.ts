import { AuthService } from './../../../core/services/auth/auth.service';
import { Component,inject } from '@angular/core';
import{FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isErrorMsg : boolean = false
  isLoading : boolean = false

  _AuthService = inject(AuthService)
  _Router = inject(Router)

  registerForm = new FormGroup({
    name: new FormControl(null,[Validators.required , Validators.minLength(3) , Validators.maxLength(14)]),
    email: new FormControl(null, [Validators.required , Validators.email]),
    password: new FormControl(null, [
      Validators.required, 
      Validators.pattern(/^(?=.*\d)(?=.*[\W_]).{6,15}$/)]),
    rePassword: new FormControl(null,[Validators.required ,Validators.pattern(/^(?=.*\d)(?=.*[\W_]).{6,15}$/)]),
    phone: new FormControl(null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, this.confirmPassword);

  signIn(){
    this._Router.navigate(['/login'])
  }

  signUp(form : any){
    // console.log(this.registerForm);

    if (form.valid){
      this.isLoading = true
      this._AuthService.signUp(form.value).subscribe({
        next:(resp) => {
          console.log(resp)
          this.isErrorMsg = false
          this.isLoading = false

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


  //custom validation

  confirmPassword(f :any){
    if(f.get('password').value === f.get('rePassword').value)
    {
      return null
    }
    else{
      return{notMatch:true}
    }

  }


}
