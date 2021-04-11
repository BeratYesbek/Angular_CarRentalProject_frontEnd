"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavProfileComponent = void 0;
var core_1 = require("@angular/core");
var NavProfileComponent = /** @class */ (function () {
    function NavProfileComponent(userService, localStorageService, adminService, customerService) {
        this.userService = userService;
        this.localStorageService = localStorageService;
        this.adminService = adminService;
        this.customerService = customerService;
    }
    NavProfileComponent.prototype.ngOnInit = function () {
        this.getUserDetail();
        this.isCustomer();
        this.isAdmin();
    };
    NavProfileComponent.prototype.getUserDetail = function () {
        var _this = this;
        var userId = this.localStorageService.getUserIdItem();
        this.userService.getById(userId).subscribe(function (response) {
            _this.userDetail = response.data[0];
            console.log(_this.userDetail);
        });
    };
    NavProfileComponent.prototype.isCustomer = function () {
        var _this = this;
        var userId = this.localStorageService.getUserIdItem();
        this.customerService.getById(userId).subscribe(function (response) {
            if (response.success) {
                _this.customer = true;
            }
        });
    };
    NavProfileComponent.prototype.isAdmin = function () {
        var _this = this;
        var userId = this.localStorageService.getUserIdItem();
        this.adminService.getAdminByUserId(userId).subscribe(function (adminResponse) {
            if (adminResponse.success) {
                _this.admin = true;
            }
        });
    };
    NavProfileComponent.prototype.signOut = function () {
        this.localStorageService.signOut();
        setTimeout(function () {
            window.location.reload();
        }, 50);
    };
    NavProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-nav-profile',
            templateUrl: './nav-profile.component.html',
            styleUrls: ['./nav-profile.component.css']
        })
    ], NavProfileComponent);
    return NavProfileComponent;
}());
exports.NavProfileComponent = NavProfileComponent;
