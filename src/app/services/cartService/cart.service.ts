import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CartItemMemory } from 'src/app/models/cartItemMemory';
import { CartItemsMemory } from 'src/app/models/cartItemsMemory';
import { ResponseModel } from 'src/app/responseModels/responseModel';
import { CartItem } from 'src/app/models/cartItem';
import { ListResponseModel } from 'src/app/responseModels/ListResponseModule';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = "https://localhost:44348/api/cartitems";

  constructor(private httpClient: HttpClient) { }

  addToDataBase(cartItem: CartItem): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>("https://localhost:44348/api/cartitems/add", cartItem);
  }

  getToDataBase(userId: number): Observable<ListResponseModel<CartItem>> {
    let newPath = this.apiUrl + "/getbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<CartItem>>(newPath);
  }

  removeToDatabase(cartItem: CartItem): Observable<ResponseModel> {
    let newPath = this.apiUrl + "/delete";
    return this.httpClient.post<ResponseModel>(newPath, cartItem);
  }

  addToCart(car: Car) {
    let item = CartItemsMemory.find(c => c.car.carId === car.carId);
    if (item) {
      item.quantity += 1;
    } else {
      let cartItem = new CartItemMemory();
      cartItem.car = car;
      cartItem.quantity = 1;
      CartItemsMemory.push(cartItem);
    }
  }

  removeCart(car: Car) {
    let item: CartItemMemory = CartItemsMemory.find(c => c.car.carId === car.carId);
    CartItemsMemory.splice(CartItemsMemory.indexOf(item), 1);
  }

  list(): CartItemMemory[] {
    return CartItemsMemory;
  }
}
