import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

    isErrorMsg : boolean = false
    isLoading : boolean = false
  
    _AuthService = inject(AuthService)
    _Router = inject(Router)
  
    forgetForm = new FormGroup({
      email: new FormControl(null, [Validators.required , Validators.email]),
    });

      forgetPassword(form : any ){
        // console.log(form);
        this.isLoading = true
        if (form.valid){
          this._AuthService.forgetPassword(form.value).subscribe({
            next:(resp) => {
              console.log(resp)
              this.isErrorMsg = false
              this.isLoading = false

              this._Router.navigate(['/verfyCode'])
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
