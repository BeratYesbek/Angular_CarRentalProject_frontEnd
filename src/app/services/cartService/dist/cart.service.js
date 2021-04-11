"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartService = void 0;
var core_1 = require("@angular/core");
var cartItemMemory_1 = require("src/app/models/cartItemMemory");
var cartItemsMemory_1 = require("src/app/models/cartItemsMemory");
var CartService = /** @class */ (function () {
    function CartService(httpClient) {
        this.httpClient = httpClient;
        this.apiUrl = "https://localhost:44348/api/cartitems";
    }
    CartService.prototype.addToDataBase = function (cartItem) {
        return this.httpClient.post("https://localhost:44348/api/cartitems/add", cartItem);
    };
    CartService.prototype.getToDataBase = function (userId) {
        var newPath = this.apiUrl + "/getbyuserid?userId=" + userId;
        return this.httpClient.get(newPath);
    };
    CartService.prototype.removeToDatabase = function (cartItem) {
        var newPath = this.apiUrl + "/delete";
        return this.httpClient.post(newPath, cartItem);
    };
    CartService.prototype.addToCart = function (car) {
        var item = cartItemsMemory_1.CartItemsMemory.find(function (c) { return c.car.carId === car.carId; });
        if (item) {
            item.quantity += 1;
        }
        else {
            var cartItem = new cartItemMemory_1.CartItemMemory();
            cartItem.car = car;
            cartItem.quantity = 1;
            cartItemsMemory_1.CartItemsMemory.push(cartItem);
        }
    };
    CartService.prototype.removeCart = function (car) {
        var item = cartItemsMemory_1.CartItemsMemory.find(function (c) { return c.car.carId === car.carId; });
        cartItemsMemory_1.CartItemsMemory.splice(cartItemsMemory_1.CartItemsMemory.indexOf(item), 1);
    };
    CartService.prototype.list = function () {
        return cartItemsMemory_1.CartItemsMemory;
    };
    CartService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
