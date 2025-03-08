import { Routes } from '@angular/router';
import { HomeComponent } from './features/components/home/home.component';
import { ProductsComponent } from './features/components/products/products.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { CartComponent } from './features/components/cart/cart.component';
import { LoginComponent } from './features/components/login/login.component';
import { RegisterComponent } from './features/components/register/register.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { routingGuard } from './core/guards/auth/routing.guard';
import { authGuard } from './core/guards/auth/auth.guard';
import { ForgetPasswordComponent } from './features/components/forget-password/forget-password.component';
import { VerfiyCodeComponent } from './features/components/verfiy-code/verfiy-code.component';
import { ResetPasswordComponent } from './features/components/reset-password/reset-password.component';
import { SingleProductComponent } from './features/components/single-product/single-product.component';
import { CheckoutComponent } from './features/components/checkout/checkout.component';
import { WishListComponent } from './features/components/wish-list/wish-list.component';
import { SubCategoriesComponent } from './features/components/sub-categories/sub-categories.component';

export const routes: Routes = [
    {path:"" ,redirectTo:"/login",pathMatch:"full"},
    {path:"home",component:HomeComponent,title:"Home" , canActivate:[routingGuard]},
    {path:"product",component:ProductsComponent,title:"Product",canActivate:[routingGuard]},
    {path:"categories",component:CategoriesComponent,title:"Categories",canActivate:[routingGuard]},
    {path:"cart",component:CartComponent,title:"Cart",canActivate:[routingGuard]},
    {path:"brands",component:BrandsComponent,title:"Brands",canActivate:[routingGuard]},
    {path:"wishList",component:WishListComponent,title:"WishList",canActivate:[routingGuard]},
    {path:"checkout/:cartId",component:CheckoutComponent,title:"Checkout",canActivate:[routingGuard]},
    {path:"single/:proId",component:SingleProductComponent,title:"Single",canActivate:[routingGuard]},
    {path:"subCategory/:catId/:catName",component:SubCategoriesComponent,title:"SubCategory",canActivate:[routingGuard]},
    {path:"login",component:LoginComponent,title:"Login",canActivate:[authGuard]},
    {path:"register",component:RegisterComponent,title:"Register", canActivate:[authGuard]},
    {path:"forgetPassword",component:ForgetPasswordComponent,title:"Forget Password", canActivate:[authGuard]},
    {path:"verfyCode",component:VerfiyCodeComponent,title:"Verfy Code", canActivate:[authGuard]},
    {path:"resetPassword",component:ResetPasswordComponent,title:"Reset Password", canActivate:[authGuard]},
    {path:"**",component:NotfoundComponent,title:"404 Not Found"},
];
