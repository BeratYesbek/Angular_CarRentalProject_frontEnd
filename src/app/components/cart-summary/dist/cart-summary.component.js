"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartSummaryComponent = void 0;
var core_1 = require("@angular/core");
var CartSummaryComponent = /** @class */ (function () {
    function CartSummaryComponent(cartService, carService, toastrService, localStorageService) {
        this.cartService = cartService;
        this.carService = carService;
        this.toastrService = toastrService;
        this.localStorageService = localStorageService;
        this.quantity = 0;
    }
    CartSummaryComponent.prototype.ngOnInit = function () {
        this.getCart();
        this.getCartItemFromDatabase();
    };
    CartSummaryComponent.prototype.getCart = function () {
        this.cartItemMemory = this.cartService.list();
        this.getCartItemFromDatabase();
    };
    CartSummaryComponent.prototype.removeFromCart = function (car, i) {
        this.cartService.removeCart(car);
        this.toastrService.error(" Deleted from the cart ", " Deleted ");
        this.removeFromDatabase(i);
    };
    CartSummaryComponent.prototype.removeFromDatabase = function (i) {
        var _this = this;
        console.log(this.cartItemsDatabase[i]);
        this.cartService.removeToDatabase(this.cartItemsDatabase[i]).subscribe(function (response) {
            setTimeout(function () {
                window.location.reload();
            }, 100);
            _this.toastrService.error("Deleted from the database", "Deleted  ");
        });
    };
    CartSummaryComponent.prototype.getCartItemFromDatabase = function () {
        var _this = this;
        var userId = this.localStorageService.getUserIdItem();
        this.cartService.getToDataBase(userId).subscribe(function (response) {
            if (response.success) {
                _this.quantity = 1;
                _this.cartItemsDatabase = response.data;
                _this.getCarDetail();
            }
        });
    };
    CartSummaryComponent.prototype.getCarDetail = function () {
        var _this = this;
        this.carService.getCarDetailByCarId(this.cartItemsDatabase[0].carId).subscribe(function (response) {
            _this.carDetails = response.data;
        });
    };
    CartSummaryComponent = __decorate([
        core_1.Component({
            selector: 'app-cart-summary',
            templateUrl: './cart-summary.component.html',
            styleUrls: ['./cart-summary.component.css']
        })
    ], CartSummaryComponent);
    return CartSummaryComponent;
}());
exports.CartSummaryComponent = CartSummaryComponent;
