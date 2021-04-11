import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/Car';
import { CarDetailModel } from 'src/app/models/carDetailModel';
import { CartItem } from 'src/app/models/cartItem';
import { CarService } from 'src/app/services/carService/car.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { RentalService } from 'src/app/services/rental.service';
@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentalForm: FormGroup;
  cartItems: CartItem[] = [];
  carDetail: CarDetailModel[] = [];
  modelRentDate: NgbDateStruct;
  modelReturnDate: NgbDateStruct;



  constructor(
    private cartService: CartService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastService: ToastrService,
    private rentalService: RentalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCartData(this.localStorageService.getUserIdItem());
    this.createRentalForm();
  }

  createRentalForm() {
    this.rentalForm = this.formBuilder.group({
      rentDate: ["", Validators.required],
      returnDate: ["", Validators.required],
    });
  }

  getCartData(userId: number) {
    this.cartItems = [];
    this.carDetail = [];
    this.cartService.getToDataBase(userId).subscribe(response => {
      if (response.success) {
        this.cartItems = response.data;
        this.getCar();
      }
    });

  }
  rentalCar() {
    let rentalModule = Object.assign({}, this.rentalForm.value);

    rentalModule.customerId = this.localStorageService.getCustomerId();
    rentalModule.userId = this.localStorageService.getUserIdItem();
    rentalModule.carId = this.carDetail[0].carId;

    if (this.carDetail !== null || this.rentalForm.valid) {
      this.rentalService.add(rentalModule).subscribe(response => {
        this.toastService.info('The car is rented, you must pay', 'info');
        this.router.navigate(['payment']);

      })
    }
  }
  getCar() {
    this.carService.getCarDetail().subscribe(response => {

      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < this.cartItems.length; j++) {

          if (response.data[i].carId === this.cartItems[j].carId) {
            this.carDetail.push(response.data[i]);
          }
        }
      }
      console.log(this.carDetail);
    });
  }
  getRentMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }
  getReturnMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10);
  }

}
