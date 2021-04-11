"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarAddComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CarAddComponent = /** @class */ (function () {
    function CarAddComponent(formBuilder, carService, toastrService, brandService, colorService, categoryService) {
        this.formBuilder = formBuilder;
        this.carService = carService;
        this.toastrService = toastrService;
        this.brandService = brandService;
        this.colorService = colorService;
        this.categoryService = categoryService;
        this.brands = [];
        this.colors = [];
        this.categories = [];
    }
    CarAddComponent.prototype.ngOnInit = function () {
        this.getBrand();
        this.getColor();
        this.getCategory();
        this.createCarAddForm();
    };
    CarAddComponent.prototype.onSelectedCategory = function (val) {
        this.selectedCategory = val;
    };
    CarAddComponent.prototype.onSelected = function (val) {
        this.selectedBrand = val;
    };
    CarAddComponent.prototype.onSelectedColor = function (val) {
        this.selectedColor = val;
    };
    CarAddComponent.prototype.createCarAddForm = function () {
        this.carAddFrom = this.formBuilder.group({
            categoryId: ["", forms_1.Validators.required],
            modelYear: ["", forms_1.Validators.required],
            brandId: ["", forms_1.Validators.required],
            colorId: ["", forms_1.Validators.required],
            findeksScore: ["", forms_1.Validators.required],
            modelName: ["", forms_1.Validators.required],
            description: ["", forms_1.Validators.required],
            dailyPrice: ["", forms_1.Validators.required]
        });
    };
    CarAddComponent.prototype.getCategory = function () {
        var _this = this;
        this.categoryService.getCategories().subscribe(function (response) {
            _this.categories = response.data;
            console.log(_this.categories);
        });
    };
    CarAddComponent.prototype.getBrand = function () {
        var _this = this;
        this.brandService.getBrand().subscribe(function (response) {
            _this.brands = response.data;
        });
    };
    CarAddComponent.prototype.getColor = function () {
        var _this = this;
        this.colorService.getColor().subscribe(function (response) {
            _this.colors = response.data;
        });
    };
    CarAddComponent.prototype.add = function () {
        var _this = this;
        var carModel = Object.assign({}, this.carAddFrom.value);
        var brandId = +this.selectedBrand;
        var colorId = +this.selectedColor;
        var categoryId = +this.selectedCategory;
        carModel.brandId = brandId;
        carModel.colorId = colorId;
        carModel.categoryId = categoryId;
        if (this.carAddFrom.valid) {
            this.carService.add(carModel).subscribe(function (response) {
                if (response.success) {
                    _this.toastrService.success('Car was added', 'Adding Process is Successful');
                }
            }, function (responseError) {
                if (responseError.error.Errors.length > 0) {
                    for (var i = 0; i < responseError.error.Errors.length; i++) {
                        _this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error");
                    }
                }
            });
        }
        else {
            this.toastrService.error("Error", "You can't pass empty");
        }
    };
    CarAddComponent = __decorate([
        core_1.Component({
            selector: 'app-car-add',
            templateUrl: './car-add.component.html',
            styleUrls: ['./car-add.component.css']
        })
    ], CarAddComponent);
    return CarAddComponent;
}());
exports.CarAddComponent = CarAddComponent;
