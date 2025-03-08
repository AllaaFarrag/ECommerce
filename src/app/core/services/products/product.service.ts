import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _HttpClient = inject(HttpClient)
  numOfCartItems = signal(0)
  constructor() { }

  getAllProduct():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  getAllCategories():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  getSpecificProduct(pId: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${pId}`);
  }
  
  addProductToCart( pId :any) : Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId : pId})
  }
  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  }

  updateItemQuantity(count:any , pId : any):Observable<any>{
    let myToken : any = localStorage.getItem('token');

    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`,{count:count},
  {
    headers :{
      token:myToken
    }
  })
  }


  deleteItem(pId : any):Observable<any>{
    let myToken : any = localStorage.getItem('token');

    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`,
  {
    headers :{
      token:myToken
    }
  })
  }

  clearCart():Observable<any>{
    let myToken : any = localStorage.getItem('token')
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
       token : myToken
      }
    })
  }

  checkOutSession(cartId : any , addressData:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{
      shippingAddress :addressData})
  }

  cashOnDelivery(cartId : any , addressData : any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
      shippingAddress :addressData})
  }

  addProductToWishList(pId : any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId : pId})
  }

  removeProductToWishList(pId : any):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${pId}`)
  }

  getWishList():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`)
  }


  getAllBrands():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/brands")
  }


  getSpecificBrands(pId : any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${pId}`)
  }

  getAllSubCategories() : Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)
  }

  getSpecificSubCategories(pId : any) : Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${pId}`)
  }


  getAllSubCategoriesOnCategory(pId : any) : Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${pId}/subcategories`)
  }
  
}
