"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminGuard = void 0;
var core_1 = require("@angular/core");
var AdminGuard = /** @class */ (function () {
    function AdminGuard(adminService, localStorageService, toastrService, router) {
        this.adminService = adminService;
        this.localStorageService = localStorageService;
        this.toastrService = toastrService;
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function (next, state) {
        if (this.adminService.isAdmin()) {
            return true;
        }
        this.router.navigate([""]);
        this.toastrService.info("You  have no auth");
        return false;
    };
    AdminGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AdminGuard);
    return AdminGuard;
}());
exports.AdminGuard = AdminGuard;
