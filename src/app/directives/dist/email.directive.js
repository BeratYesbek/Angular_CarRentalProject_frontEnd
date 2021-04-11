"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmailDirective = void 0;
var core_1 = require("@angular/core");
var EmailDirective = /** @class */ (function () {
    function EmailDirective(element, control) {
        this.element = element;
        this.control = control;
    }
    EmailDirective.prototype.onFocus = function () {
        this.element.nativeElement.classList.add('bg-light');
    };
    EmailDirective.prototype.onBlur = function () {
        this.element.nativeElement.classList.add('bg-light');
        var value = this.element.nativeElement.value;
        if (!value.includes('@')) {
            this.element.nativeElement.value = value + "@gmail.com";
            this.element.nativeElement.formControl = value + "@gmail.com";
            this.control.control.setValue(value + "@gmail.com");
        }
    };
    __decorate([
        core_1.HostListener('focus')
    ], EmailDirective.prototype, "onFocus");
    __decorate([
        core_1.HostListener('blur')
    ], EmailDirective.prototype, "onBlur");
    EmailDirective = __decorate([
        core_1.Directive({
            selector: '[appEmail]'
        })
    ], EmailDirective);
    return EmailDirective;
}());
exports.EmailDirective = EmailDirective;
