"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarDetailsComponent = void 0;
var core_1 = require("@angular/core");
var CarDetailsComponent = /** @class */ (function () {
    function CarDetailsComponent(carService, activatedRoute) {
        this.carService = carService;
        this.activatedRoute = activatedRoute;
    }
    CarDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            if (params["carId"]) {
                _this.getCarDetail(params["carId"]);
            }
        });
    };
    CarDetailsComponent.prototype.getCarDetail = function (carId) {
        var _this = this;
        this.carService.getCarDetailByCarId(carId).subscribe(function (response) {
            _this.carDetail = response.data[0];
            console.log(_this.carDetail);
        });
    };
    CarDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-car-details',
            templateUrl: './car-details.component.html',
            styleUrls: ['./car-details.component.css']
        })
    ], CarDetailsComponent);
    return CarDetailsComponent;
}());
exports.CarDetailsComponent = CarDetailsComponent;
