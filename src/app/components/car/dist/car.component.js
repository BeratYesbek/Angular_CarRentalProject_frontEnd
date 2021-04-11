"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var CarComponent = /** @class */ (function () {
    function CarComponent(carService, activatedRoute, toastrService, cartService, brandService, modalService, localStorageService, customerService) {
        this.carService = carService;
        this.activatedRoute = activatedRoute;
        this.toastrService = toastrService;
        this.cartService = cartService;
        this.brandService = brandService;
        this.modalService = modalService;
        this.localStorageService = localStorageService;
        this.customerService = customerService;
        this.cartItem = [];
        this.carDetails = [];
        this.brands = [];
        this.dataLoaded = false;
        this.filterText = "";
        this.control = false;
        this.closeResult = '';
    }
    CarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getBrand();
        this.getCartItem();
        this.activatedRoute.params.subscribe(function (params) {
            if (params["categoryId"]) {
                _this.getCarByCategory(params["categoryId"]);
            }
            else if (params["colorId"]) {
                _this.getCarByColor(params["colorId"]);
            }
            else {
                _this.getCarDetails();
            }
        });
    };
    CarComponent.prototype.getCartItem = function () {
        var _this = this;
        var userId = this.localStorageService.getUserIdItem();
        this.cartService.getToDataBase(userId).subscribe(function (response) {
            _this.totalCartItem = response.data.length;
        });
    };
    CarComponent.prototype.getCarDetails = function () {
        var _this = this;
        this.carService.getCarDetail().subscribe(function (response) {
            _this.carDetails = response.data;
            _this.dataLoaded = true;
            _this.isRental();
        });
    };
    CarComponent.prototype.isRental = function () {
        var dateNow = Date.now();
        for (var i = 0; i < this.carDetails.length; i++) {
            for (var j = 0; j < this.carDetails[i].rentals.length; j++) {
                var returnDate = this.carDetails[i].rentals[j].returnDate.toString();
                if (Date.parse(returnDate) > dateNow) {
                    this.carDetails[i].isRented = true;
                }
            }
        }
    };
    CarComponent.prototype.onSelected = function (val) {
        this.customFunction(val);
    };
    CarComponent.prototype.customFunction = function (val) {
        if (val === '0') {
            this.getCarDetails();
        }
        else {
            this.getCarByBrand(val);
        }
    };
    CarComponent.prototype.getCarByBrand = function (brandId) {
        var _this = this;
        this.dataLoaded = false;
        this.carService.getByBrand(brandId).subscribe(function (response) {
            _this.carDetails = response.data;
            _this.isRental();
            _this.dataLoaded = true;
        });
    };
    CarComponent.prototype.getCarByCategory = function (categoryId) {
        var _this = this;
        this.dataLoaded = false;
        this.carService.getByCategory(categoryId).subscribe(function (response) {
            _this.carDetails = response.data;
            _this.isRental();
            _this.dataLoaded = true;
        });
    };
    CarComponent.prototype.getCarByColor = function (colorId) {
        var _this = this;
        this.dataLoaded = false;
        this.carService.getByColor(colorId).subscribe(function (response) {
            _this.carDetails = response.data;
            _this.dataLoaded = true;
            _this.isRental();
        });
    };
    CarComponent.prototype.checkCustomerAndFindeksPoint = function (car) {
        var _this = this;
        var userId = this.localStorageService.getUserIdItem();
        this.customerService.getById(userId).subscribe(function (response) {
            if (response.success) {
                if (response.data.findeksScore >= car.findeksScore) {
                    _this.addToCart(car);
                }
                else {
                    _this.toastrService.info('Unfortunately your findeks score not enough for this car', 'Info');
                }
            }
            else {
                _this.toastrService.info('You are not a customer. please go to the settings menu and make customer application', 'Info');
            }
        }, function (responseError) {
            _this.toastrService.info('You are not a customer. please go to the settings menu and make customer application', 'Info');
        });
    };
    CarComponent.prototype.addToCart = function (car) {
        if (this.totalCartItem != null || this.totalCartItem > 0) {
            this.toastrService.error("Your cart has one item you cannot add more item", "Error");
        }
        else {
            this.toastrService.success("Added to cart");
            this.cartService.addToCart(car);
            setTimeout(function () {
                window.location.reload();
            }, 100);
            this.userId = this.localStorageService.getUserIdItem();
            this.cartItem = [{ cartItemId: 0, carId: car.carId, userId: this.userId }];
            this.cartService.addToDataBase(this.cartItem[0]).subscribe(function (respone) {
            });
        }
    };
    CarComponent.prototype.getBrand = function () {
        var _this = this;
        this.brandService.getBrand().subscribe(function (response) {
            _this.brands = response.data;
            _this.brands.push({ brandId: 0, brandName: "All" });
            _this.selectedItem = 0;
        });
    };
    CarComponent.prototype.setClass = function () {
        this.control = true;
    };
    CarComponent.prototype.getClass = function () {
        if (this.control) {
            return 'display:block';
        }
    };
    /*Bootstrap modal*/
    CarComponent.prototype.open = function (content, i) {
        var _this = this;
        this.index = i;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    CarComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    CarComponent = __decorate([
        core_1.Component({
            selector: 'app-car',
            templateUrl: './car.component.html',
            styleUrls: ['./car.component.css']
        })
    ], CarComponent);
    return CarComponent;
}());
exports.CarComponent = CarComponent;
