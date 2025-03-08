import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-verfiy-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verfiy-code.component.html',
  styleUrl: './verfiy-code.component.scss'
})
export class VerfiyCodeComponent {

  isLoading : boolean = false
    
      _AuthService = inject(AuthService)
      _Router = inject(Router)
    
      verfyForm = new FormGroup({
        resetCode: new FormControl(null, [Validators.required]),
      });
  
        verfyCode(form : any ){
          // console.log(form);
          this.isLoading = true
          if (form.valid){
            this._AuthService.verfyCode(form.value).subscribe({
              next:(resp) => {
                console.log(resp)
                this.isLoading = false
  
                this._Router.navigate(['/resetPassword'])
              },
              error:(eror) => {
                console.log(eror);
                this.isLoading = false
              },
              complete:() => {}
            })
          }
        }
}
