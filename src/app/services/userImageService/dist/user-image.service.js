"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserImageService = void 0;
var core_1 = require("@angular/core");
var UserImageService = /** @class */ (function () {
    function UserImageService(httpClient) {
        this.httpClient = httpClient;
        this.apiUrl = "https://localhost:44348/api/userImages";
    }
    UserImageService.prototype.add = function (formData) {
        return this.httpClient.post(this.apiUrl + "/add", formData);
    };
    UserImageService.prototype.update = function (formData) {
        return this.httpClient.post(this.apiUrl + "/update", formData);
    };
    UserImageService.prototype["delete"] = function (userImage) {
        return this.httpClient.post(this.apiUrl + "/delete", userImage);
    };
    UserImageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserImageService);
    return UserImageService;
}());
exports.UserImageService = UserImageService;
