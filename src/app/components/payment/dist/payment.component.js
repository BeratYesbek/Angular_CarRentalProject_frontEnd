"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var PaymentComponent = /** @class */ (function () {
    function PaymentComponent(cartService, carService, formBuilder, paymentService, localStorageService, toastService, modalService, creditCardService) {
        this.cartService = cartService;
        this.carService = carService;
        this.formBuilder = formBuilder;
        this.paymentService = paymentService;
        this.localStorageService = localStorageService;
        this.toastService = toastService;
        this.modalService = modalService;
        this.creditCardService = creditCardService;
        this.closeResult = '';
        this.cartItems = [];
        this.cars = [];
        this.totalPrice = 0;
    }
    PaymentComponent.prototype.ngOnInit = function () {
        this.controlForm();
        this.getCard();
        this.getCartData(this.localStorageService.getUserIdItem());
    };
    PaymentComponent.prototype.getCartData = function (userId) {
        var _this = this;
        this.cartService.getToDataBase(userId).subscribe(function (response) {
            if (response.success) {
                _this.cartItems = response.data;
                _this.getCar();
            }
        });
    };
    PaymentComponent.prototype.getCar = function () {
        var _this = this;
        this.carService.getAll().subscribe(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                for (var j = 0; j < _this.cartItems.length; j++) {
                    if (response.data[i].carId === _this.cartItems[j].carId) {
                        _this.cars.push(response.data[i]);
                        _this.totalPrice += response.data[i].dailyPrice;
                    }
                }
            }
        });
    };
    PaymentComponent.prototype.removeItem = function (index) {
        var _this = this;
        this.cartService.removeToDatabase(this.cartItems[index]).subscribe(function (response) {
            if (response.success) {
                _this.getCartData(1);
            }
        });
    };
    PaymentComponent.prototype.controlForm = function () {
        this.paymentForm = this.formBuilder.group({
            fullName: ["", forms_1.Validators.required],
            email: ["", forms_1.Validators.required],
            address: ["", forms_1.Validators.required],
            city: ["", forms_1.Validators.required],
            state: ["", forms_1.Validators.required],
            zip: ["", forms_1.Validators.required],
            cardName: ["", forms_1.Validators.required],
            cardNumber: ["", forms_1.Validators.required],
            cardMonth: ["", forms_1.Validators.required],
            cardYear: ["", forms_1.Validators.required],
            cvv: ["", forms_1.Validators.required],
            checkbox: ["", forms_1.Validators.required]
        });
    };
    PaymentComponent.prototype.payment = function () {
        var _this = this;
        var paymentModel = Object.assign({}, this.paymentForm.value);
        this.creditCard = Object.assign({}, this.paymentForm.value);
        paymentModel.totalPrice = this.totalPrice;
        if (this.paymentForm.valid) {
            if (this.totalPrice !== 0) {
                this.paymentService.payment(paymentModel).subscribe(function (response) {
                    if (response.success) {
                        _this.removeItem(0);
                        _this.toastService.success("Payment is completed successfully", "Success");
                    }
                });
            }
        }
        else {
            this.toastService.error("Fields cannot be left blank", "Error");
        }
    };
    PaymentComponent.prototype.getCard = function () {
        var _this = this;
        var userId = this.localStorageService.getUserIdItem();
        this.creditCardService.getCardByUserId(userId).subscribe(function (response) {
            _this.creditCards = response.data;
        });
    };
    PaymentComponent.prototype.saveCard = function () {
        this.creditCard.userId = this.localStorageService.getUserIdItem();
        this.creditCardService.add(this.creditCard).subscribe(function (response) {
        });
    };
    PaymentComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    PaymentComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    PaymentComponent = __decorate([
        core_1.Component({
            selector: 'app-payment',
            templateUrl: './payment.component.html',
            styleUrls: ['./payment.component.css']
        })
    ], PaymentComponent);
    return PaymentComponent;
}());
exports.PaymentComponent = PaymentComponent;
