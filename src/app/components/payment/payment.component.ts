import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { CarService } from 'src/app/services/carService/car.service';
import { CartService } from 'src/app/services/cartService/cart.service';
import { LocalStorageService } from 'src/app/services/localStorageService/local-storage.service';
import { CreditCardService } from 'src/app/services/creditCardService/credit-card.service';

import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { CreditCard } from 'src/app/models/creditCard';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  closeResult = '';
  paymentForm: FormGroup;
  cartItems: CartItem[] = [];
  cars: Car[] = [];
  totalPrice = 0;


  creditCard: CreditCard;
  creditCards: CreditCard[];


  constructor(
    private cartService: CartService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private localStorageService: LocalStorageService,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    this.controlForm();
    this.getCard();
    this.getCartData(this.localStorageService.getUserIdItem());
  }
  getCartData(userId: number) {

    this.cartService.getToDataBase(userId).subscribe(response => {
      if (response.success) {
        this.cartItems = response.data;
        this.getCar();
      }
    });

  }
  getCar() {
    this.carService.getAll().subscribe(response => {

      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < this.cartItems.length; j++) {

          if (response.data[i].carId === this.cartItems[j].carId) {
            this.cars.push(response.data[i]);
            this.totalPrice += response.data[i].dailyPrice;
          }
        }
      }

    });
  }

  removeItem(index: number) {
    this.cartService.removeToDatabase(this.cartItems[index]).subscribe(response => {
      if (response.success) {
        this.getCartData(1);
      }
    });
  }

  controlForm() {

    this.paymentForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      email: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required],
      cardName: ["", Validators.required],
      cardNumber: ["", Validators.required],
      cardMonth: ["", Validators.required],
      cardYear: ["", Validators.required],
      cvv: ["", Validators.required],
      checkbox: ["", Validators.required],

    });

  }
  payment() {
    let paymentModel = Object.assign({}, this.paymentForm.value);

    this.creditCard = Object.assign({}, this.paymentForm.value);

    paymentModel.totalPrice = this.totalPrice;
    if (this.paymentForm.valid) {
      if (this.totalPrice !== 0) {
        this.paymentService.payment(paymentModel).subscribe(response => {
          if (response.success) {
            this.removeItem(0);
            this.toastService.success("Payment is completed successfully", "Success");
          }
        });
      }
    }else{
      this.toastService.error("Fields cannot be left blank", "Error");

    }

  }

  getCard(){
    const userId = this.localStorageService.getUserIdItem();
    this.creditCardService.getCardByUserId(userId).subscribe(response => {
        this.creditCards = response.data;
    });
  }

  saveCard() {
    this.creditCard.userId = this.localStorageService.getUserIdItem();
    this.creditCardService.add(this.creditCard).subscribe(response => {

    });

  }





  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
