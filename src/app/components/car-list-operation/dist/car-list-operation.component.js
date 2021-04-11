"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarListOperationComponent = void 0;
var core_1 = require("@angular/core");
var CarListOperationComponent = /** @class */ (function () {
    function CarListOperationComponent(carService, toastrService, carImageService) {
        this.carService = carService;
        this.toastrService = toastrService;
        this.carImageService = carImageService;
        this.carDetails = [];
        this.defaultImage = "assets/img/defaultPicture.jpg";
    }
    CarListOperationComponent.prototype.ngOnInit = function () {
        this.getcar();
    };
    CarListOperationComponent.prototype.getcar = function () {
        var _this = this;
        this.carService.getCarDetail().subscribe(function (response) {
            _this.carDetails = response.data;
            console.log(_this.carDetails);
        });
    };
    CarListOperationComponent.prototype["delete"] = function (index) {
        var _this = this;
        this.carService["delete"](this.carDetails[index]).subscribe(function (response) {
            if (response.success) {
                _this.deleteImage(index);
                _this.toastrService.success('Car was deleted', 'Success');
                _this.getcar();
            }
        });
    };
    CarListOperationComponent.prototype.deleteImage = function (index) {
        this.carImageService["delete"](this.carDetails[index].carImages[0]).subscribe(function (response) {
        });
    };
    CarListOperationComponent = __decorate([
        core_1.Component({
            selector: 'app-car-list-operation',
            templateUrl: './car-list-operation.component.html',
            styleUrls: ['./car-list-operation.component.css']
        })
    ], CarListOperationComponent);
    return CarListOperationComponent;
}());
exports.CarListOperationComponent = CarListOperationComponent;
