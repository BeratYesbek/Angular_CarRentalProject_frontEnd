"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminService = void 0;
var core_1 = require("@angular/core");
var AdminService = /** @class */ (function () {
    function AdminService(httpClient, localStorageService) {
        this.httpClient = httpClient;
        this.localStorageService = localStorageService;
        this.apiUrl = "https://localhost:44348/api/admins";
    }
    AdminService.prototype.getAdminByUserId = function (userId) {
        var newPath = this.apiUrl + "/getadminbyuserid?userId=" + userId;
        return this.httpClient.get(newPath);
    };
    AdminService.prototype.isAdmin = function () {
        var item = this.localStorageService.getGroupItem();
        if (item === 'admin') {
            return true;
        }
        return false;
    };
    AdminService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
