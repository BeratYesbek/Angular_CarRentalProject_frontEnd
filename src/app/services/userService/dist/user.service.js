"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var UserService = /** @class */ (function () {
    function UserService(httpClient) {
        this.httpClient = httpClient;
        this.apiUrl = "https://localhost:44348/api/users";
    }
    UserService.prototype.getAll = function () {
        return this.httpClient.get(this.apiUrl + "/getall");
    };
    UserService.prototype.getById = function (userId) {
        var newPath = this.apiUrl + "/getuserbyid?userId=" + userId;
        return this.httpClient.get(newPath);
    };
    UserService.prototype["delete"] = function (user) {
        var newPath = this.apiUrl + "/delete";
        return this.httpClient.post(newPath, user);
    };
    UserService.prototype.add = function (user) {
        var newPath = this.apiUrl + "/add";
        return this.httpClient.post(newPath, user);
    };
    UserService.prototype.update = function (user) {
        var newPath = this.apiUrl + "/update";
        return this.httpClient.post(newPath, user);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
