import { ProductService } from '../../services/products/product.service';
import { LogeedUser } from './../../../shared/interfaces/logeed-user';
import { AuthService } from './../../services/auth/auth.service';
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 _AuthService = inject( AuthService);
 _Router = inject(Router)
   _ProductService=inject(ProductService)
 

 numOfCart = computed(() => {
  return this._ProductService.numOfCartItems()
 })
 enableNavBar : boolean = false
 loggedUserName!:string
//  enableNavBar : boolean = this._AuthService.isLogged;
  ngOnInit():void{
    this._AuthService.isLogged.subscribe((val) =>{
      this.enableNavBar = val
      console.log('navbar subscribe')
    })
    
    this._AuthService.userName.subscribe((val) =>{
    this.loggedUserName = val
    })

  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('lastVisitedPage');
    this._AuthService.isLogged.next(false)
    this._Router.navigate(['/login'])
  }
  
}
