"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RentalComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RentalComponent = /** @class */ (function () {
    function RentalComponent(cartService, carService, formBuilder, localStorageService, toastService, rentalService, router) {
        this.cartService = cartService;
        this.carService = carService;
        this.formBuilder = formBuilder;
        this.localStorageService = localStorageService;
        this.toastService = toastService;
        this.rentalService = rentalService;
        this.router = router;
        this.cartItems = [];
        this.carDetail = [];
    }
    RentalComponent.prototype.ngOnInit = function () {
        this.getCartData(this.localStorageService.getUserIdItem());
        this.createRentalForm();
    };
    RentalComponent.prototype.createRentalForm = function () {
        this.rentalForm = this.formBuilder.group({
            rentDate: ["", forms_1.Validators.required],
            returnDate: ["", forms_1.Validators.required]
        });
    };
    RentalComponent.prototype.getCartData = function (userId) {
        var _this = this;
        this.cartItems = [];
        this.carDetail = [];
        this.cartService.getToDataBase(userId).subscribe(function (response) {
            if (response.success) {
                _this.cartItems = response.data;
                _this.getCar();
            }
        });
    };
    RentalComponent.prototype.rentalCar = function () {
        var _this = this;
        var rentalModule = Object.assign({}, this.rentalForm.value);
        rentalModule.customerId = this.localStorageService.getCustomerId();
        rentalModule.userId = this.localStorageService.getUserIdItem();
        rentalModule.carId = this.carDetail[0].carId;
        if (this.carDetail !== null || this.rentalForm.valid) {
            this.rentalService.add(rentalModule).subscribe(function (response) {
                _this.toastService.info('The car is rented, you must pay', 'info');
                _this.router.navigate(['payment']);
            });
        }
    };
    RentalComponent.prototype.getCar = function () {
        var _this = this;
        this.carService.getCarDetail().subscribe(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                for (var j = 0; j < _this.cartItems.length; j++) {
                    if (response.data[i].carId === _this.cartItems[j].carId) {
                        _this.carDetail.push(response.data[i]);
                    }
                }
            }
            console.log(_this.carDetail);
        });
    };
    RentalComponent.prototype.getRentMinDate = function () {
        var today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().slice(0, 10);
    };
    RentalComponent.prototype.getReturnMinDate = function () {
        var today = new Date();
        today.setDate(today.getDate() + 2);
        return today.toISOString().slice(0, 10);
    };
    RentalComponent = __decorate([
        core_1.Component({
            selector: 'app-rental',
            templateUrl: './rental.component.html',
            styleUrls: ['./rental.component.css']
        })
    ], RentalComponent);
    return RentalComponent;
}());
exports.RentalComponent = RentalComponent;
