import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/Car';
import { CarDetailModel } from 'src/app/models/carDetailModel';
import { CartItem } from 'src/app/models/cartItem';
import { CartItemMemory } from 'src/app/models/cartItemMemory';
import { CarService } from 'src/app/services/carService/car.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  quantity = 0;
  cartItemMemory: CartItemMemory[];
  cartItemsDatabase: CartItem[];
  carDetails: CarDetailModel[];

  constructor(
    private cartService: CartService,
    private carService: CarService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getCart();
    this.getCartItemFromDatabase();
  }

  getCart() {
    this.cartItemMemory = this.cartService.list();
    this.getCartItemFromDatabase();
  }


  removeFromCart(car: Car, i: number) {
    this.cartService.removeCart(car);
    this.toastrService.error(" Deleted from the cart ", " Deleted ");
    this.removeFromDatabase(i);

  }


  removeFromDatabase(i: number) {
    console.log(this.cartItemsDatabase[i]);
    this.cartService.removeToDatabase(this.cartItemsDatabase[i]).subscribe(response => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
      this.toastrService.error("Deleted from the database", "Deleted  ")

    });
  }


  getCartItemFromDatabase() {
    const userId = this.localStorageService.getUserIdItem();
    this.cartService.getToDataBase(userId).subscribe(response => {
      if (response.success) {
        this.quantity = 1;
        this.cartItemsDatabase = response.data;
        this.getCarDetail();
      }
    });
  }


  getCarDetail() {
    this.carService.getCarDetailByCarId(this.cartItemsDatabase[0].carId).subscribe(response => {
      this.carDetails = response.data;
    });
  }

}
