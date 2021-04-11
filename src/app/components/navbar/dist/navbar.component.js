"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authService, adminService, localStorageService) {
        this.authService = authService;
        this.adminService = adminService;
        this.localStorageService = localStorageService;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.loginControl();
        this.adminControl();
        1;
    };
    NavbarComponent.prototype.loginControl = function () {
        this.auth = this.authService.isAuthenticated();
    };
    NavbarComponent.prototype.adminControl = function () {
        var _this = this;
        var userId = this.localStorageService.getUserIdItem();
        this.adminService.getAdminByUserId(userId).subscribe(function (response) {
            if (response.success) {
                console.log(response);
                _this.admin = true;
            }
        });
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.css']
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
