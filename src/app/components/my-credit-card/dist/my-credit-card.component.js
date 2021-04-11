"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyCreditCardComponent = void 0;
var core_1 = require("@angular/core");
var MyCreditCardComponent = /** @class */ (function () {
    function MyCreditCardComponent(creditCardService, localStorageService, toastrService) {
        this.creditCardService = creditCardService;
        this.localStorageService = localStorageService;
        this.toastrService = toastrService;
    }
    MyCreditCardComponent.prototype.ngOnInit = function () {
        this.getCreditCard();
    };
    MyCreditCardComponent.prototype.getCreditCard = function () {
        var _this = this;
        var userId = this.localStorageService.getUserIdItem();
        this.creditCardService.getCardByUserId(userId).subscribe(function (response) {
            _this.creditCards = response.data;
        });
    };
    MyCreditCardComponent.prototype.removeCreditCard = function (creditCard) {
        var _this = this;
        this.creditCardService["delete"](creditCard).subscribe(function (response) {
            if (response.success) {
                _this.toastrService.success('Credit card was deleted', 'Success');
            }
        }, function (responseError) {
            _this.toastrService.error('Credit card could not be  deleted', 'Error');
        });
    };
    MyCreditCardComponent = __decorate([
        core_1.Component({
            selector: 'app-my-credit-card',
            templateUrl: './my-credit-card.component.html',
            styleUrls: ['./my-credit-card.component.css']
        })
    ], MyCreditCardComponent);
    return MyCreditCardComponent;
}());
exports.MyCreditCardComponent = MyCreditCardComponent;
