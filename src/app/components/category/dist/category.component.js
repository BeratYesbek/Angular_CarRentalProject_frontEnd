"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryComponent = void 0;
var core_1 = require("@angular/core");
var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(categoryService) {
        this.categoryService = categoryService;
        this.categories = [];
        this.currentCategory = null;
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.getCategories();
    };
    CategoryComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoryService.getCategories().subscribe(function (response) {
            _this.categories = response.data;
        });
    };
    CategoryComponent.prototype.setCurrentCategory = function (category) {
        this.currentCategory = category;
        this.getAllCurrentCategoryClass();
    };
    CategoryComponent.prototype.getCurrentCategoryClass = function (category) {
        if (category === this.currentCategory) {
            return "list-group-item bg-light text-color-dark";
        }
        else {
            return "list-group-item bg-dark text-color-white";
        }
    };
    CategoryComponent.prototype.setAllCategoryClass = function () {
        this.currentCategory = null;
    };
    CategoryComponent.prototype.getAllCurrentCategoryClass = function () {
        if (this.currentCategory === null) {
            return "list-group-item bg-light text-color-dark";
        }
        return "list-group-item bg-dark text-color-white";
    };
    CategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-category',
            templateUrl: './category.component.html',
            styleUrls: ['./category.component.css']
        })
    ], CategoryComponent);
    return CategoryComponent;
}());
exports.CategoryComponent = CategoryComponent;
