"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentRentalListOperationComponent = void 0;
var core_1 = require("@angular/core");
var PaymentRentalListOperationComponent = /** @class */ (function () {
    function PaymentRentalListOperationComponent(paymentService, rentalService) {
        this.paymentService = paymentService;
        this.rentalService = rentalService;
    }
    PaymentRentalListOperationComponent.prototype.ngOnInit = function () {
        this.getRentals();
        this.getPayments();
    };
    PaymentRentalListOperationComponent.prototype.getRentals = function () {
        var _this = this;
        this.rentalService.getAllDetails().subscribe(function (response) {
            _this.rentals = response.data;
        });
    };
    PaymentRentalListOperationComponent.prototype.getPayments = function () {
        var _this = this;
        this.paymentService.getAll().subscribe(function (response) {
            _this.payments = response.data;
        });
    };
    PaymentRentalListOperationComponent = __decorate([
        core_1.Component({
            selector: 'app-payment-rental-list-operation',
            templateUrl: './payment-rental-list-operation.component.html',
            styleUrls: ['./payment-rental-list-operation.component.css']
        })
    ], PaymentRentalListOperationComponent);
    return PaymentRentalListOperationComponent;
}());
exports.PaymentRentalListOperationComponent = PaymentRentalListOperationComponent;
