"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarService = void 0;
var core_1 = require("@angular/core");
var CarService = /** @class */ (function () {
    function CarService(httpClient) {
        this.httpClient = httpClient;
        this.apiUrl = "https://localhost:44348/api/cars";
    }
    CarService.prototype.getAll = function () {
        return this.httpClient.get(this.apiUrl + "/getall");
    };
    CarService.prototype.getByBrand = function (brandId) {
        return this.httpClient.get(this.apiUrl + "/getbybrandid?brandId=" + brandId);
    };
    CarService.prototype.getById = function (carId) {
        return this.httpClient.get(this.apiUrl + "/getbyid?carId=" + carId);
    };
    CarService.prototype.getByCategory = function (categoryId) {
        var newPath = this.apiUrl + "/getbycategoryid?categoryId=" + categoryId;
        return this.httpClient.get(newPath);
    };
    CarService.prototype.getByColor = function (colorId) {
        var newPath = this.apiUrl + "/getbycolorid?colorId=" + colorId;
        return this.httpClient.get(newPath);
    };
    CarService.prototype.getCarDetail = function () {
        var newPath = this.apiUrl + "/getcardetails";
        return this.httpClient.get(newPath);
    };
    CarService.prototype.getCarDetailByCarId = function (cardId) {
        var newPath = this.apiUrl + "/getcarsdetailbyid?carId=" + cardId;
        return this.httpClient.get(newPath);
    };
    CarService.prototype.add = function (car) {
        return this.httpClient.post("https://localhost:44348/api/cars/add", car);
    };
    CarService.prototype.update = function (car) {
        return this.httpClient.post(this.apiUrl + "/update", car);
    };
    CarService.prototype["delete"] = function (car) {
        return this.httpClient.post(this.apiUrl + "/delete", car);
    };
    CarService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CarService);
    return CarService;
}());
exports.CarService = CarService;
