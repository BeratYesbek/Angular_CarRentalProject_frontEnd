"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerDemandComponent = void 0;
var core_1 = require("@angular/core");
var CustomerDemandComponent = /** @class */ (function () {
    function CustomerDemandComponent(customerApplicantService) {
        this.customerApplicantService = customerApplicantService;
    }
    CustomerDemandComponent.prototype.ngOnInit = function () {
        this.getCustomerDemand();
    };
    CustomerDemandComponent.prototype.getCustomerDemand = function () {
        var _this = this;
        this.customerApplicantService.getAll().subscribe(function (response) {
            _this.customerApplications = response.data;
            console.log(response);
        });
    };
    CustomerDemandComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-demand',
            templateUrl: './customer-demand.component.html',
            styleUrls: ['./customer-demand.component.css']
        })
    ], CustomerDemandComponent);
    return CustomerDemandComponent;
}());
exports.CustomerDemandComponent = CustomerDemandComponent;
