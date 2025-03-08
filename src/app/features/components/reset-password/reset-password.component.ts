import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  
  isErrorMsg : boolean = false
  isLoading : boolean = false

  _AuthService = inject(AuthService)
  _Router = inject(Router)

  resetForm = new FormGroup({
    email: new FormControl(null, [Validators.required , Validators.email]),
    newPassword : new FormControl(null, [
      Validators.required, 
      Validators.pattern(/^(?=.*\d)(?=.*[\W_]).{6,15}$/)])
  });

    setNewPassword(form : any ){
      // console.log(form);
      this.isLoading = true
      if (form.valid){
        this._AuthService.setNewPassword(form.value).subscribe({
          next:(resp) => {
            console.log(resp)
            this.isErrorMsg = false
            this.isLoading = false

            this._Router.navigate(['/login'])
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
