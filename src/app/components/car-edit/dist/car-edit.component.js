"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CarEditComponent = /** @class */ (function () {
    function CarEditComponent(formBuilder, carService, toastrService, brandService, colorService, categoryService, activatedRoute, carImageService) {
        this.formBuilder = formBuilder;
        this.carService = carService;
        this.toastrService = toastrService;
        this.brandService = brandService;
        this.colorService = colorService;
        this.categoryService = categoryService;
        this.activatedRoute = activatedRoute;
        this.carImageService = carImageService;
        this.brands = [];
        this.colors = [];
        this.categories = [];
        this.defaultImage = "assets/img/defaultPicture.jpg";
        this.selectedFile = null;
    }
    CarEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getBrand();
        this.getColor();
        this.getCategory();
        this.createCarUpdateForm();
        this.createImageForm();
        this.activatedRoute.params.subscribe(function (params) {
            if (params["carId"]) {
                _this.getCarDetail(params["carId"]);
            }
        });
    };
    CarEditComponent.prototype.onSelectedCategory = function (val) {
        this.selectedCategory = val;
    };
    CarEditComponent.prototype.onFileSelected = function (fileIput) {
        this.selectedFile = fileIput.target.files[0];
    };
    CarEditComponent.prototype.onSelected = function (val) {
        this.selectedBrand = val;
    };
    CarEditComponent.prototype.onSelectedColor = function (val) {
        this.selectedColor = val;
    };
    CarEditComponent.prototype.createCarUpdateForm = function () {
        this.carEditForm = this.formBuilder.group({
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
    CarEditComponent.prototype.getCarDetail = function (carId) {
        var _this = this;
        this.carService.getCarDetailByCarId(carId).subscribe(function (response) {
            _this.carDetailModel = response.data[0];
            console.log(_this.carDetailModel);
        });
    };
    CarEditComponent.prototype.createImageForm = function () {
        this.carImageForm = this.formBuilder.group({
            file: ["", forms_1.Validators.required]
        });
    };
    CarEditComponent.prototype.getCategory = function () {
        var _this = this;
        this.categoryService.getCategories().subscribe(function (response) {
            _this.categories = response.data;
        });
    };
    CarEditComponent.prototype.getBrand = function () {
        var _this = this;
        this.brandService.getBrand().subscribe(function (response) {
            _this.brands = response.data;
        });
    };
    CarEditComponent.prototype.getColor = function () {
        var _this = this;
        this.colorService.getColor().subscribe(function (response) {
            _this.colors = response.data;
        });
    };
    CarEditComponent.prototype.update = function () {
        var _this = this;
        var carModel = Object.assign({}, this.carEditForm.value);
        var brandId = +this.selectedBrand;
        var colorId = +this.selectedColor;
        var categoryId = +this.selectedCategory;
        carModel.brandId = brandId;
        carModel.colorId = colorId;
        carModel.categoryId = categoryId;
        carModel.carId = this.carDetailModel.carId;
        if (this.carEditForm.valid) {
            if (this.carImageForm.valid) {
                this.carService.update(carModel).subscribe(function (response) {
                }, function (responseError) {
                    if (responseError.error.Errors.length > 0) {
                        for (var i = 0; i < responseError.error.Errors.length; i++) {
                            _this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Validation Error");
                        }
                    }
                });
            }
            else {
                this.toastrService.error("Error", "You can't pass picture");
            }
        }
        else {
            this.toastrService.error("Error", "You can't pass empty");
        }
    };
    CarEditComponent.prototype.checkImage = function (val) {
        var formData = new FormData();
        formData.append('file', val.target.files[0]);
        formData.append('carId', this.carDetailModel.carId.toString());
        if (this.carDetailModel.carImages.length > 0) {
            formData.append('carImageId', this.carDetailModel.carImages[0].carImageId.toString());
            formData.append('imagePath', this.carDetailModel.carImages[0].imagePath);
            formData.append('carId', this.carDetailModel.carId.toString());
            this.updateImage(formData);
        }
        else {
            this.addImage(formData);
        }
    };
    CarEditComponent.prototype.updateImage = function (formData) {
        var _this = this;
        this.carImageService.update(formData).subscribe(function (response) {
            if (response.success) {
                _this.toastrService.success('Picture was added successfully', 'Success');
            }
        });
    };
    CarEditComponent.prototype.addImage = function (formData) {
        var _this = this;
        this.carImageService.add(formData).subscribe(function (response) {
            if (response.success) {
                _this.toastrService.success('Picture was added successfully', 'Success');
            }
        });
    };
    CarEditComponent = __decorate([
        core_1.Component({
            selector: 'app-car-edit',
            templateUrl: './car-edit.component.html',
            styleUrls: ['./car-edit.component.css']
        })
    ], CarEditComponent);
    return CarEditComponent;
}());
exports.CarEditComponent = CarEditComponent;
